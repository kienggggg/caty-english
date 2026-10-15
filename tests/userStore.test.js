import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

/**
 * XP cộng dồn và luật "một bài chỉ tính điểm MỘT lần".
 *
 * Store đọc localStorage NGAY LÚC nạp module, nên mỗi bài phải `resetModules()`
 * rồi import lại — dùng chung một bản nạp thì bài sau thừa hưởng state của bài
 * trước và con số đọc ra là của ca khác.
 */
async function napStore(trangThaiDaLuu = null) {
  localStorage.clear();
  if (trangThaiDaLuu) {
    localStorage.setItem('lingoflow_user_state', JSON.stringify(trangThaiDaLuu));
  }
  vi.resetModules();
  const { useUserStore } = await import('../src/stores/useUserStore');
  return useUserStore;
}

const doc = (s) => s.getState();

describe('useUserStore — XP', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('mặc định bắt đầu ở 120 XP', async () => {
    const s = await napStore();
    expect(doc(s).xp).toBe(120);
  });

  it('addXp cộng dồn, không ghi đè', async () => {
    const s = await napStore();
    doc(s).addXp(30);
    expect(doc(s).xp).toBe(150);
    doc(s).addXp(5);
    expect(doc(s).xp).toBe(155);
  });

  it('addXp ghi ngay xuống localStorage, không đợi nạp lại', async () => {
    const s = await napStore();
    doc(s).addXp(10);
    const luu = JSON.parse(localStorage.getItem('lingoflow_user_state'));
    expect(luu.xp).toBe(130);
  });

  it('completeLesson cộng đúng 25 XP và thêm bài vào danh sách', async () => {
    const s = await napStore();
    doc(s).completeLesson(7);
    expect(doc(s).xp).toBe(145);
    expect(doc(s).completedLessons).toContain(7);
  });

  it('làm lại bài ĐÃ xong thì KHÔNG cộng thêm XP', async () => {
    const s = await napStore();
    doc(s).completeLesson(7);
    const sauLan1 = doc(s).xp;
    doc(s).completeLesson(7);
    doc(s).completeLesson(7);
    expect(doc(s).xp).toBe(sauLan1);
    expect(doc(s).completedLessons.filter((x) => x === 7)).toHaveLength(1);
  });

  it('bài 1 mở sẵn nên hoàn thành lại nó cũng không cho XP', async () => {
    const s = await napStore();
    expect(doc(s).completedLessons).toContain(1);
    doc(s).completeLesson(1);
    expect(doc(s).xp).toBe(120);
  });

  it('XP đã lưu được nạp lại đúng ở phiên sau', async () => {
    const s = await napStore({ xp: 999, completedLessons: [1, 2], theme: 'light' });
    expect(doc(s).xp).toBe(999);
    doc(s).addXp(1);
    expect(doc(s).xp).toBe(1000);
  });
});

describe('useUserStore — bảng màu', () => {
  beforeEach(() => localStorage.clear());

  it('mặc định là SÁNG và gắn data-theme lên <html>', async () => {
    const s = await napStore();
    expect(doc(s).theme).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('người dùng cũ CHƯA có trường theme thì được cho bản sáng', async () => {
    const s = await napStore({ xp: 300, completedLessons: [1] });
    expect(doc(s).theme).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('toggleTheme lật qua lại và GỠ thuộc tính khi về nền tối', async () => {
    const s = await napStore();
    doc(s).toggleTheme();
    expect(doc(s).theme).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    doc(s).toggleTheme();
    expect(doc(s).theme).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('bảng màu đã chọn sống qua lần nạp sau', async () => {
    const s1 = await napStore();
    doc(s1).setTheme('dark');
    expect(JSON.parse(localStorage.getItem('lingoflow_user_state')).theme).toBe('dark');
    vi.resetModules();
    const { useUserStore: s2 } = await import('../src/stores/useUserStore');
    expect(s2.getState().theme).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
  });
});
