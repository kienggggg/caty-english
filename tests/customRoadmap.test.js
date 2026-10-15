import { describe, it, expect, beforeEach } from 'vitest';
import { useUserStore } from '../src/stores/useUserStore';
import { storageStrategy } from '../src/services/storageStrategy';

describe('CatY Custom Learning Roadmap & Methods', () => {
  beforeEach(() => {
    localStorage.clear();
    useUserStore.setState({
      learningStyle: 'balanced',
      dailyGoalMinutes: 15,
      roadmapPace: 'accelerated_30',
      focusTopics: ['daily', 'pronunciation', 'survival']
    });
  });

  it('1. Khởi tạo tùy chỉnh học mặc định', () => {
    const user = useUserStore.getState();
    expect(user.learningStyle).toBe('balanced');
    expect(user.dailyGoalMinutes).toBe(15);
    expect(user.roadmapPace).toBe('accelerated_30');
    expect(user.focusTopics).toContain('daily');
  });

  it('2. Cập nhật phương pháp học cá nhân hóa sang Audio Mirror & 30 phút/ngày', () => {
    useUserStore.getState().updateLearningCustomization({
      learningStyle: 'audio_mirror',
      dailyGoalMinutes: 30,
      roadmapPace: 'standard_60',
      focusTopics: ['pronunciation', 'work']
    });

    const updated = useUserStore.getState();
    expect(updated.learningStyle).toBe('audio_mirror');
    expect(updated.dailyGoalMinutes).toBe(30);
    expect(updated.roadmapPace).toBe('standard_60');
    expect(updated.focusTopics).toEqual(['pronunciation', 'work']);
  });

  it('3. Hoán đổi trường phái sang SRS Flashcards và lưu trữ bền vững', () => {
    useUserStore.getState().updateLearningCustomization({
      learningStyle: 'srs_vocab',
      dailyGoalMinutes: 5
    });

    const updated = useUserStore.getState();
    expect(updated.learningStyle).toBe('srs_vocab');
    expect(updated.dailyGoalMinutes).toBe(5);

    // Kiểm tra đã lưu vào storage
    const stored = storageStrategy.getPreference('user_state');
    expect(stored.learningStyle).toBe('srs_vocab');
  });
});
