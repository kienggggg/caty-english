import { create } from 'zustand';
import { storageStrategy } from '../services/storageStrategy';

const defaultUser = {
  name: 'Học Viên Mới',
  accent: 'US', // 'US' hoặc 'UK'
  isPlacementDone: false,
  userLevel: 'beginner', // 'beginner' (mất gốc hoàn toàn) hoặc 'elementary' (đã có nền tảng)
  streakDays: 1,
  lastActiveDate: new Date().toDateString(),
  xp: 120,
  hearts: 5,
  currentStage: 1, // Chặng 1 đến Chặng 4
  completedLessons: [1], // Mặc định mở khóa bài 1
  activeTab: 'journey', // 'journey', 'soundlab', 'srs', 'vault', 'profile'
  // Tùy chỉnh cách học & lộ trình học CatY
  learningStyle: 'balanced', // 'balanced' (toàn diện), 'audio_mirror' (luyện âm), 'srs_vocab' (từ vựng), 'survival_comm' (giao tiếp)
  dailyGoalMinutes: 15, // 5, 15, hoặc 30 phút mỗi ngày
  roadmapPace: 'accelerated_30', // 'accelerated_30' (30 ngày), 'standard_60' (60 ngày), 'mastery_90' (90 ngày)
  focusTopics: ['daily', 'pronunciation', 'survival'], // Chủ đề ưu tiên
  customStageOrder: null, // Sắp xếp lại thứ tự chặng nếu muốn
  // 'light' hoặc 'dark'. MẶC ĐỊNH SÁNG.
  theme: 'light'
};

// Gắn/gỡ `data-theme` trên thẻ <html>. Chỉ CÓ mặt thuộc tính ấy thì bảng màu
// sáng trong index.css mới được áp; gỡ đi là quay về bảng tối mặc định.
export const applyTheme = (theme) => {
  const el = document.documentElement;
  if (theme === 'light') el.setAttribute('data-theme', 'light');
  else el.removeAttribute('data-theme');
};

const savedUser = storageStrategy.getPreference('user_state', defaultUser);
// Người dùng cũ (đã lưu state trước khi có tuỳ chọn này) không có `theme` —
// cho họ bản sáng luôn, thay vì để `undefined` rơi về nền đen.
if (!savedUser.theme) savedUser.theme = 'light';
applyTheme(savedUser.theme);

export const useUserStore = create((set, get) => ({
  ...savedUser,

  setActiveTab: (tab) => {
    set({ activeTab: tab });
    storageStrategy.setPreference('user_state', { ...get(), activeTab: tab });
  },

  setAccent: (accent) => {
    set({ accent });
    storageStrategy.setPreference('user_state', { ...get(), accent });
  },

  setTheme: (theme) => {
    set({ theme });
    applyTheme(theme);
    storageStrategy.setPreference('user_state', { ...get(), theme });
  },

  toggleTheme: () => {
    const theme = get().theme === 'light' ? 'dark' : 'light';
    get().setTheme(theme);
  },

  finishPlacementTest: ({ level, accent }) => {
    const nextState = {
      ...get(),
      isPlacementDone: true,
      userLevel: level,
      accent: accent || get().accent,
      currentStage: level === 'elementary' ? 2 : 1
    };
    set(nextState);
    storageStrategy.setPreference('user_state', nextState);
  },

  addXp: (amount) => {
    const newXp = get().xp + amount;
    const nextState = { ...get(), xp: newXp };
    set(nextState);
    storageStrategy.setPreference('user_state', nextState);
  },

  updateLearningCustomization: (customObj) => {
    const nextState = {
      ...get(),
      ...customObj
    };
    set(nextState);
    storageStrategy.setPreference('user_state', nextState);
  },

  completeLesson: (lessonId) => {
    const currentCompleted = get().completedLessons;
    if (!currentCompleted.includes(lessonId)) {
      const nextCompleted = [...currentCompleted, lessonId];
      const nextState = {
        ...get(),
        completedLessons: nextCompleted,
        xp: get().xp + 25
      };
      set(nextState);
      storageStrategy.setPreference('user_state', nextState);

      // Tự động đồng bộ điểm danh vào Hũ Kỷ Luật CatY nếu đang có hợp đồng cọc tiền
      try {
        const { useMotivationStore } = require('./useMotivationStore');
        if (useMotivationStore && useMotivationStore.getState) {
          useMotivationStore.getState().checkinDailyStreak();
        }
      } catch (e) {
        // Safe fallback in ESM environments where dynamic import or direct store is handled
      }
    }
  }
}));
