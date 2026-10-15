import { create } from 'zustand';
import { INITIAL_VOCAB_SRS } from '../data/vocabSRSData';
import { srsEngine } from '../services/srsEngine';
import { storageStrategy } from '../services/storageStrategy';

const savedSRSItems = storageStrategy.getPreference('srs_items', INITIAL_VOCAB_SRS);

export const useSRSStore = create((set, get) => ({
  items: savedSRSItems,

  // Lấy các từ đến hạn ôn hôm nay
  getDueItems: () => {
    return srsEngine.getDueItems(get().items);
  },

  // Lấy phân bố số lượng từ trong 5 hộp
  getBoxCounts: () => {
    return srsEngine.getBoxDistribution(get().items);
  },

  // Người dùng ôn tập 1 từ
  reviewWord: (wordId, isCorrect) => {
    const currentItems = get().items;
    const itemIndex = currentItems.findIndex(i => i.id === wordId);
    if (itemIndex === -1) return;

    const item = currentItems[itemIndex];
    const currentBox = item.box || 1;
    const { newBox, nextReviewDate } = srsEngine.processItemReview(currentBox, isCorrect);

    const updatedItems = [...currentItems];
    updatedItems[itemIndex] = {
      ...item,
      box: newBox,
      nextReviewDate,
      lastReviewed: Date.now()
    };

    set({ items: updatedItems });
    storageStrategy.setPreference('srs_items', updatedItems);
  }
}));
