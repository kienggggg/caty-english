import { create } from 'zustand';
import { SPARRING_SCENARIOS } from '../data/sparringData';
import { evaluateUserSpeech } from '../services/sparringEvaluator';
import { storageStrategy } from '../services/storageStrategy';
import { useUserStore } from './useUserStore';
import { useMotivationStore } from './useMotivationStore';
import { useSRSStore } from './useSRSStore';

const STORAGE_KEY = 'caty_sparring_state';

const defaultSparringState = {
  activeScenarioId: 'coffee_order',
  messages: [],
  turnIndex: 0,
  stats: {
    totalExchanges: 0,
    mistakesCaught: 0,
    correctionsSaved: 0,
    averageFluency: 85
  },
  savedMistakes: []
};

// Khởi tạo tin nhắn chào đầu tiên cho kịch bản
const getInitialMessages = (scenarioId) => {
  const scenario = SPARRING_SCENARIOS.find(s => s.id === scenarioId) || SPARRING_SCENARIOS[0];
  return [
    {
      id: 'bot_starter_' + Date.now(),
      sender: 'bot',
      author: scenario.partnerName,
      avatar: scenario.partnerAvatar,
      text: scenario.starterBotMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      feedback: null
    }
  ];
};

export const useSparringStore = create((set, get) => {
  const saved = storageStrategy.getPreference(STORAGE_KEY, defaultSparringState);
  const initialMessages = saved.messages && saved.messages.length > 0 
    ? saved.messages 
    : getInitialMessages(saved.activeScenarioId);

  return {
    activeScenarioId: saved.activeScenarioId || 'coffee_order',
    messages: initialMessages,
    turnIndex: saved.turnIndex || 0,
    stats: saved.stats || defaultSparringState.stats,
    savedMistakes: saved.savedMistakes || [],
    isListening: false,
    isSpeaking: false,

    // Chọn kịch bản đối luyện
    selectScenario: (scenarioId) => {
      const scenario = SPARRING_SCENARIOS.find(s => s.id === scenarioId);
      if (!scenario) return;

      const newMessages = getInitialMessages(scenarioId);
      const nextState = {
        activeScenarioId: scenarioId,
        messages: newMessages,
        turnIndex: 0
      };
      set(nextState);
      get().persistState();

      // Đọc lời chào của Bot
      get().speakText(scenario.starterBotMessage);
    },

    // Gửi tin nhắn của người học và phân tích lỗi tức thì
    sendMessage: (userText) => {
      const text = (userText || '').trim();
      if (!text) return;

      const currentScenario = SPARRING_SCENARIOS.find(s => s.id === get().activeScenarioId) || SPARRING_SCENARIOS[0];
      
      // 1. Phân tích lỗi và gợi ý nói chuẩn bản xứ
      const feedback = evaluateUserSpeech(text, {
        suggestedVocab: currentScenario.targetVocab ? currentScenario.targetVocab[0] : null
      });

      const userMsg = {
        id: 'user_' + Date.now(),
        sender: 'user',
        author: 'Bạn',
        avatar: '👤',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        feedback
      };

      // 2. Tính toán câu đáp của Bot
      const currentTurn = get().turnIndex;
      const responses = currentScenario.dialogueTree?.defaultBotResponses || [
        "That's great! Let's continue practicing.",
        "I understand. What else would you like to say?"
      ];
      const botResponseText = responses[currentTurn % responses.length];

      const botMsg = {
        id: 'bot_' + (Date.now() + 1),
        sender: 'bot',
        author: currentScenario.partnerName,
        avatar: currentScenario.partnerAvatar,
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        feedback: null
      };

      // 3. Cập nhật thống kê
      const newTotalExchanges = get().stats.totalExchanges + 1;
      const newMistakesCaught = get().stats.mistakesCaught + (feedback.hasMistake ? feedback.mistakes.length : 0);
      const newAverageFluency = Math.round(
        (get().stats.averageFluency * (newTotalExchanges - 1) + feedback.fluencyScore) / newTotalExchanges
      );

      const nextState = {
        messages: [...get().messages, userMsg, botMsg],
        turnIndex: currentTurn + 1,
        stats: {
          ...get().stats,
          totalExchanges: newTotalExchanges,
          mistakesCaught: newMistakesCaught,
          averageFluency: newAverageFluency
        }
      };

      set(nextState);
      get().persistState();

      // 4. Cộng điểm XP và kích hoạt chuỗi học tập
      try {
        useUserStore.getState().addXp(15);
        useMotivationStore.getState().checkinDailyStreak();
      } catch (e) {
        // Safe fallback
      }

      // 5. Đọc to phản hồi của Bot
      setTimeout(() => {
        get().speakText(botResponseText);
      }, 350);

      return feedback;
    },

    // Lưu lỗi sai vào Hộp Ôn Tập SRS (1 chạm chuyển thành Flashcard)
    saveCorrectionToSRS: (originalText, nativePolish, ruleTip) => {
      const currentScenario = SPARRING_SCENARIOS.find(s => s.id === get().activeScenarioId) || SPARRING_SCENARIOS[0];
      
      const card = {
        id: 'mistake_card_' + Date.now(),
        originalText,
        nativePolish: nativePolish || originalText,
        ruleTip: ruleTip || 'Cần chú ý cách diễn đạt chuẩn bản xứ',
        scenarioTitle: currentScenario.title,
        date: new Date().toLocaleDateString('vi-VN')
      };

      // Đồng bộ vào useSRSStore nếu hàm addCustomItem hoặc tương đương có sẵn
      try {
        const srsState = useSRSStore.getState();
        if (srsState && srsState.items) {
          const newSrsItem = {
            id: card.id,
            term: originalText,
            phonetic: '/sửa lỗi đối luyện/',
            meaning: `Chuẩn bản xứ: "${nativePolish}". Lưu ý: ${ruleTip}`,
            example: nativePolish,
            box: 1,
            nextReviewDate: new Date().toISOString()
          };
          useSRSStore.setState({
            items: [newSrsItem, ...srsState.items]
          });
        }
      } catch (e) {
        console.warn('SRS Sync Warning:', e);
      }

      const nextSaved = [card, ...get().savedMistakes];
      const nextStats = {
        ...get().stats,
        correctionsSaved: get().stats.correctionsSaved + 1
      };

      set({ savedMistakes: nextSaved, stats: nextStats });
      get().persistState();
      return true;
    },

    // Xóa làm mới cuộc hội thoại của kịch bản hiện tại
    resetScenario: () => {
      const initial = getInitialMessages(get().activeScenarioId);
      set({ messages: initial, turnIndex: 0 });
      get().persistState();
    },

    // Phát âm thanh giọng đọc bản ngữ qua Web Speech Synthesis
    speakText: (text) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return;
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const userAccent = useUserStore.getState().accent || 'US';
        utterance.lang = userAccent === 'UK' ? 'en-GB' : 'en-US';
        utterance.rate = 0.95;
        utterance.onstart = () => set({ isSpeaking: true });
        utterance.onend = () => set({ isSpeaking: false });
        utterance.onerror = () => set({ isSpeaking: false });
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        set({ isSpeaking: false });
      }
    },

    stopSpeaking: () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      set({ isSpeaking: false });
    },

    // Lưu bền vững vào local storage
    persistState: () => {
      storageStrategy.setPreference(STORAGE_KEY, {
        activeScenarioId: get().activeScenarioId,
        messages: get().messages,
        turnIndex: get().turnIndex,
        stats: get().stats,
        savedMistakes: get().savedMistakes
      });
    }
  };
});
