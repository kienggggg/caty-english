/**
 * srsEngine.js
 * Thuật toán Lặp Lại Ngắt Quãng (SRS) dựa trên Hệ Thống Hộp Leitner 5 Cấp Độ
 * Mô phỏng đường cong lãng quên Ebbinghaus giúp ghi nhớ dài hạn
 */

export const LEITNER_INTERVALS_DAYS = {
  1: 1,   // Hộp 1: Ôn sau 24h (1 ngày)
  2: 3,   // Hộp 2: Ôn sau 3 ngày
  3: 7,   // Hộp 3: Ôn sau 7 ngày (1 tuần)
  4: 14,  // Hộp 4: Ôn sau 14 ngày (2 tuần)
  5: 30   // Hộp 5: Ôn sau 30 ngày (Khắc sâu vĩnh viễn)
};

export const srsEngine = {
  /**
   * Tính toán hộp tiếp theo và thời điểm ôn tập kế tiếp
   * @param {number} currentBox - Hộp hiện tại (1 - 5)
   * @param {boolean} isCorrect - Người học trả lời đúng/đạt hay sai
   * @returns {Object} { newBox, nextReviewDate, isMastered }
   */
  processItemReview(currentBox = 1, isCorrect = true) {
    let newBox = currentBox;

    if (isCorrect) {
      // Thăng cấp hộp (tối đa hộp 5)
      newBox = Math.min(5, currentBox + 1);
    } else {
      // Trả lời sai: Rớt ngay về Hộp 1 để củng cố lại trí nhớ ngắn hạn
      newBox = 1;
    }

    const intervalDays = LEITNER_INTERVALS_DAYS[newBox] || 1;
    const nextReviewDate = Date.now() + intervalDays * 24 * 60 * 60 * 1000;
    const isMastered = newBox === 5 && isCorrect;

    return {
      newBox,
      nextReviewDate,
      isMastered,
      intervalDays
    };
  },

  /**
   * Lọc danh sách các từ đã "chín muồi" cần ôn tập hôm nay
   * @param {Array} items - Danh sách từ vựng với trường nextReviewDate
   * @returns {Array} Các mục đến hạn ôn
   */
  getDueItems(items = []) {
    const now = Date.now();
    return items.filter(item => {
      if (!item.nextReviewDate) return true; // Chưa học bao giờ
      return item.nextReviewDate <= now;
    });
  },

  /**
   * Đếm số lượng từ trong từng hộp để vẽ biểu đồ tiến độ
   * @param {Array} items - Danh sách từ
   * @returns {Object} { box1: N, box2: N, box3: N, box4: N, box5: N }
   */
  getBoxDistribution(items = []) {
    const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    items.forEach(item => {
      const box = item.box || 1;
      if (dist[box] !== undefined) {
        dist[box]++;
      }
    });
    return dist;
  }
};
