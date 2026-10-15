import { describe, it, expect } from 'vitest';
import { srsEngine, LEITNER_INTERVALS_DAYS } from '../src/services/srsEngine';

/**
 * Hộp Leitner: đúng thì lên một hộp (trần 5), sai thì rơi thẳng về hộp 1.
 *
 * Các mốc dưới đây chép TAY từ chú thích trong `srsEngine.js` (1/3/7/14/30
 * ngày) chứ không đọc lại `LEITNER_INTERVALS_DAYS` rồi so với chính nó — làm
 * thế thì bài test luôn xanh dù ai đổi bảng số, vì hai vế cùng đổi.
 */
describe('srsEngine.processItemReview', () => {
  it('trả lời đúng thì lên đúng MỘT hộp, trần là 5', () => {
    expect(srsEngine.processItemReview(1, true).newBox).toBe(2);
    expect(srsEngine.processItemReview(2, true).newBox).toBe(3);
    expect(srsEngine.processItemReview(3, true).newBox).toBe(4);
    expect(srsEngine.processItemReview(4, true).newBox).toBe(5);
    expect(srsEngine.processItemReview(5, true).newBox).toBe(5);
  });

  it('trả lời sai thì rơi về hộp 1 từ BẤT KỲ hộp nào', () => {
    for (const box of [1, 2, 3, 4, 5]) {
      expect(srsEngine.processItemReview(box, false).newBox).toBe(1);
    }
  });

  it('isMastered chỉ bật ở hộp 5 và khi trả lời đúng', () => {
    expect(srsEngine.processItemReview(4, true).isMastered).toBe(true);
    expect(srsEngine.processItemReview(5, true).isMastered).toBe(true);
    expect(srsEngine.processItemReview(5, false).isMastered).toBe(false);
    expect(srsEngine.processItemReview(3, true).isMastered).toBe(false);
  });

  it('khoảng ôn khớp mốc chép tay 1/3/7/14/30 ngày', () => {
    const MOC_TAY = { 1: 1, 2: 3, 3: 7, 4: 14, 5: 30 };
    expect(LEITNER_INTERVALS_DAYS).toEqual(MOC_TAY);
    // Đi từ hộp trước sang: hộp 1->2 phải cho 3 ngày, không phải 1.
    expect(srsEngine.processItemReview(1, true).intervalDays).toBe(MOC_TAY[2]);
    expect(srsEngine.processItemReview(4, true).intervalDays).toBe(MOC_TAY[5]);
    expect(srsEngine.processItemReview(5, false).intervalDays).toBe(MOC_TAY[1]);
  });

  it('nextReviewDate nằm đúng số ngày phía trước, không phải mốc quá khứ', () => {
    const truoc = Date.now();
    const { nextReviewDate } = srsEngine.processItemReview(1, true);
    const cach = nextReviewDate - truoc;
    // 3 ngày, cho phép lệch 5 giây vì hai lời gọi Date.now() khác nhau.
    expect(cach).toBeGreaterThan(3 * 86400000 - 5000);
    expect(cach).toBeLessThan(3 * 86400000 + 5000);
  });

  it('mặc định không tham số = hộp 1, trả lời đúng', () => {
    expect(srsEngine.processItemReview().newBox).toBe(2);
  });
});

describe('srsEngine.getDueItems', () => {
  it('từ CHƯA học bao giờ thì luôn đến hạn', () => {
    expect(srsEngine.getDueItems([{ id: 'a' }])).toHaveLength(1);
  });

  it('tách đúng đã-đến-hạn và chưa-đến-hạn', () => {
    const now = Date.now();
    const ds = [
      { id: 'qua_han', nextReviewDate: now - 86400000 },
      { id: 'dung_luc', nextReviewDate: now - 1 },
      { id: 'con_som', nextReviewDate: now + 86400000 }
    ];
    expect(srsEngine.getDueItems(ds).map((i) => i.id)).toEqual(['qua_han', 'dung_luc']);
  });

  it('danh sách rỗng không nổ', () => {
    expect(srsEngine.getDueItems()).toEqual([]);
  });
});

describe('srsEngine.getBoxDistribution', () => {
  it('đếm đúng từng hộp, mục thiếu box tính vào hộp 1', () => {
    const ds = [{ box: 1 }, { box: 1 }, { box: 3 }, { box: 5 }, { id: 'khong_co_box' }];
    expect(srsEngine.getBoxDistribution(ds)).toEqual({ 1: 3, 2: 0, 3: 1, 4: 0, 5: 1 });
  });

  it('box ngoài 1..5 bị BỎ QUA, không làm hỏng bảng', () => {
    const d = srsEngine.getBoxDistribution([{ box: 9 }, { box: 0 }, { box: 2 }]);
    // box: 0 là falsy nên `item.box || 1` đẩy nó về hộp 1 — ghi lại hành vi
    // THẬT ở đây, không ghi hành vi mình mong muốn.
    expect(d).toEqual({ 1: 1, 2: 1, 3: 0, 4: 0, 5: 0 });
  });
});
