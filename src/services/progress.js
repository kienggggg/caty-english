/**
 * progress.js
 *
 * `progressPercent` trước 03/09/2026 nằm inline trong `JourneyScreen.jsx`, nên
 * không có cách nào chấm nó mà không dựng cả màn hình. Tách ra đây để test
 * được bằng số, không qua DOM.
 *
 * Ca chia cho 0 là ca thật, không phải giả tưởng: một chặng chưa có bài nào
 * thì `stageLessons.length === 0`, và `0/0` cho `NaN` — React in ra thẳng chữ
 * "NaN% Hoàn Thành" và `width: NaN%` làm thanh tiến độ biến mất. Bản inline cũ
 * KHÔNG chặn ca này.
 */

export function computeStageProgress(stageLessons = [], completedLessons = []) {
  const total = stageLessons.length;
  if (total === 0) return { completed: 0, total: 0, percent: 0 };

  const done = new Set(completedLessons);
  const completed = stageLessons.filter((l) => done.has(l.id)).length;
  return { completed, total, percent: Math.round((completed / total) * 100) };
}
