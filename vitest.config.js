import { defineConfig } from 'vitest/config';

// Ba tệp test: hai tệp logic thuần chạy được ở môi trường `node`, còn
// `userStore.test.js` cần DOM vì store gắn `data-theme` lên <html> và đọc
// localStorage ngay lúc nạp module.
//
// Đặt `environment: 'jsdom'` cho CẢ BỘ thay vì để `// @vitest-environment jsdom`
// trong một tệp: đo 03/09/2026 trên máy này, cách đánh dấu theo tệp bắt vitest
// dựng thêm một worker riêng, và worker ấy hết giờ ("Timeout waiting for worker
// to respond") — bộ test vẫn báo "2 passed" kèm 1 unhandled error, tức là một
// tệp KHÔNG CHẠY mà tổng kết đọc như đã chạy hết.
export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.js'],
    pool: 'threads'
  }
});
