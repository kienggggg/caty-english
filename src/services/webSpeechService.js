/**
 * webSpeechService.js
 * Quản lý âm thanh Web Speech Synthesis, Web Speech Recognition & Web Audio SFX
 * $0 Chi Phí - 100% Chạy Cục Bộ Trên Trình Duyệt
 * Bổ sung phát hiện iOS Safari & chế độ thoái lui thông minh (Graceful Degradation)
 */

class WebSpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.recognition = null;
    this.audioCtx = null;
    this.isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
    this.isSupported = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
    this.initSpeechRecognition();
  }

  // Khởi tạo Speech Recognition
  initSpeechRecognition() {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
    }
  }

  // Xác định chế độ hoạt động tối ưu theo thiết bị
  getOperationalMode() {
    if (!this.isSupported) return 'self-assessment-only';
    if (this.isIOS) return 'short-phrase-only'; // iOS Safari giới hạn cụm ngắn
    return 'full';
  }

  // Khởi tạo Audio Context cho hiệu ứng âm thanh Synthesizer
  getAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // === 1. PHÁT ÂM VĂN BẢN (TEXT-TO-SPEECH) ===
  speak(text, options = {}) {
    if (!this.synth) return;

    this.synth.cancel(); // Dừng câu trước nếu đang nói

    const utterance = new SpeechSynthesisUtterance(text);
    const accent = options.accent || 'US';
    utterance.lang = accent === 'UK' ? 'en-GB' : 'en-US';
    utterance.rate = options.rate || 0.85; // Mặc định chậm vừa phải để người mới nghe rõ
    utterance.pitch = options.pitch || 1.0;

    // Chọn voice tự nhiên nếu có
    const voices = this.synth.getVoices();
    const targetLang = utterance.lang;
    const preferredVoice = voices.find(v => v.lang.includes(targetLang) && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Siri')));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    this.synth.speak(utterance);
  }

  // === 2. NHẬN DIỆN GIỌNG NÓI (SPEECH-TO-TEXT) ===
  startListening({ onResult, onError, onEnd, lang = 'en-US' }) {
    if (!this.recognition) {
      if (onError) onError('Trình duyệt không hỗ trợ nhận diện giọng nói hoặc chuyển sang chế độ Tự đánh giá.');
      return null;
    }

    this.recognition.lang = lang;

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence || 0.85;
      if (onResult) onResult({ transcript, confidence });
    };

    this.recognition.onerror = (event) => {
      console.warn('Speech Recognition error:', event.error);
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
      return true;
    } catch (e) {
      console.error('Không thể bắt đầu ghi âm:', e);
      if (onError) onError(e.message);
      return false;
    }
  }

  stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
  }

  // === 3. HIỆU ỨNG ÂM THANH GAME (WEB AUDIO SFX - $0) ===
  playCorrectSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
    osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  playWrongSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now); // A3
    osc.frequency.linearRampToValueAtTime(164.81, now + 0.2); // E3

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  playStreakCelebrationSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [440, 554.37, 659.25, 880]; // A major chime
    notes.forEach((freq, index) => {
      const now = ctx.currentTime + index * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    });
  }
}

export const webSpeech = new WebSpeechService();
