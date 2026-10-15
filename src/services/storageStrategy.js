/**
 * storageStrategy.js
 * Phân tầng lưu trữ dữ liệu 2 cấp:
 * 1. LocalStorage: Dữ liệu nhẹ (<5MB), truy xuất đồng bộ tức thì (User settings, Streak, Accent)
 * 2. IndexedDB: Dữ liệu lớn, nhị phân (Audio Recordings Before/After, SRS full offline cache)
 */

const DB_NAME = 'LingoFlowDB';
const DB_VERSION = 1;
const STORE_AUDIO = 'audio_recordings';
const STORE_OFFLINE = 'offline_lessons';

// Helper mở IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      console.warn('Trình duyệt không hỗ trợ IndexedDB, dùng bộ nhớ đệm tạm thời.');
      resolve(null);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_AUDIO)) {
        db.createObjectStore(STORE_AUDIO, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_OFFLINE)) {
        db.createObjectStore(STORE_OFFLINE, { keyPath: 'lessonId' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const storageStrategy = {
  // === TẦNG 1: LOCAL STORAGE (Fast Preferences) ===
  getPreference(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(`lingoflow_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error(`Lỗi đọc localStorage [${key}]:`, e);
      return defaultValue;
    }
  },

  setPreference(key, value) {
    try {
      localStorage.setItem(`lingoflow_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error(`Lỗi ghi localStorage [${key}]:`, e);
    }
  },

  // === TẦNG 2: INDEXED DB (Deep Object & Audio Storage) ===
  async saveAudioRecording(id, audioBlob, metadata = {}) {
    try {
      const db = await openDB();
      if (!db) return false;

      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_AUDIO], 'readwrite');
        const store = transaction.objectStore(STORE_AUDIO);
        const record = {
          id,
          audioBlob,
          metadata,
          timestamp: Date.now()
        };
        const request = store.put(record);

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      console.error('Lỗi lưu audio vào IndexedDB:', e);
      return false;
    }
  },

  async getAudioRecording(id) {
    try {
      const db = await openDB();
      if (!db) return null;

      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_AUDIO], 'readonly');
        const store = transaction.objectStore(STORE_AUDIO);
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      console.error('Lỗi đọc audio từ IndexedDB:', e);
      return null;
    }
  }
};
