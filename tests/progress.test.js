import { describe, it, expect } from 'vitest';
import { computeStageProgress } from '../src/services/progress';

const bai = (...ids) => ids.map((id) => ({ id }));

describe('computeStageProgress', () => {
  it('chặng chưa có bài nào KHÔNG cho NaN', () => {
    const kq = computeStageProgress([], [1, 2, 3]);
    expect(kq.percent).toBe(0);
    expect(Number.isNaN(kq.percent)).toBe(false);
    // Bản inline cũ trong JourneyScreen tính 0/0 -> NaN, in ra "NaN% Hoàn Thành".
  });

  it('đếm đúng phần đã xong trong chặng, bỏ qua bài của chặng khác', () => {
    const kq = computeStageProgress(bai(1, 2, 3, 4), [1, 3, 99]);
    expect(kq).toEqual({ completed: 2, total: 4, percent: 50 });
  });

  it('0% khi chưa xong bài nào, 100% khi xong hết', () => {
    expect(computeStageProgress(bai(1, 2), []).percent).toBe(0);
    expect(computeStageProgress(bai(1, 2), [1, 2]).percent).toBe(100);
  });

  it('làm tròn về số nguyên gần nhất, không cắt cụt', () => {
    // 1/3 = 33.33 -> 33 ; 2/3 = 66.67 -> 67 (cắt cụt sẽ ra 66)
    expect(computeStageProgress(bai(1, 2, 3), [1]).percent).toBe(33);
    expect(computeStageProgress(bai(1, 2, 3), [1, 2]).percent).toBe(67);
  });

  it('bài trùng trong completedLessons không đếm hai lần', () => {
    expect(computeStageProgress(bai(1, 2), [1, 1, 1]).percent).toBe(50);
  });

  it('không tham số thì trả 0, không nổ', () => {
    expect(computeStageProgress()).toEqual({ completed: 0, total: 0, percent: 0 });
  });
});
