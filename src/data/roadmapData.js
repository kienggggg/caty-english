/**
 * roadmapData.js
 * Lộ trình 4 chặng học có vạch xuất phát và vạch đích rõ ràng
 * Giải quyết dứt điểm nỗi sợ "Con đường vô tận không thấy đích đến"
 */

export const ROADMAP_STAGES = [
  {
    id: 1,
    title: 'Chặng 1: Phá Băng Phát Âm & Diệt Âm Đuôi',
    subtitle: '7 Ngày Vỡ Lòng — Mở khẩu hình & Bật âm gió',
    duration: '7 Ngày',
    badge: 'Thợ Săn Âm Đuôi',
    target: 'Làm chủ 44 âm IPA + Quy tắc đuôi s/es/ed',
    lessons: [
      { id: 1, title: 'Bài 1: Khẩu hình cặp âm /i:/ và /ɪ/', xp: 20, type: 'ipa', isCompleted: true },
      { id: 2, title: 'Bài 2: Bật hơi phụ âm cuối /t/, /k/, /p/', xp: 25, type: 'soundlab' },
      { id: 3, title: 'Bài 3: Thần chú đuôi s/es "Thời phong kiến"', xp: 30, type: 'rules' },
      { id: 4, title: 'Bài 4: Thần chú đuôi ed "Tiền Đô"', xp: 30, type: 'rules' },
      { id: 5, title: 'Bài 5: Luyện tai cặp âm /s/ vs /ʃ/', xp: 25, type: 'pairs' },
      { id: 6, title: 'Bài 6: Bí quyết nối âm tự nhiên', xp: 30, type: 'soundlab' },
      { id: 7, title: 'Bài 7: Vạch Đích Chặng 1 — Kiểm tra & Nhận Chứng Chỉ', xp: 50, type: 'milestone' }
    ]
  },
  {
    id: 2,
    title: 'Chặng 2: Xương Sống Câu & Ngữ Pháp Sinh Tồn',
    subtitle: '14 Ngày Tiếp Theo — Ghép câu chuẩn trật tự S-V-O',
    duration: '14 Ngày',
    badge: 'Kiến Trúc Sư Câu',
    target: '300 từ thông dụng + Phân biệt rạch ròi To Be vs Do/Does',
    lessons: [
      { id: 8, title: 'Bài 8: Trận chiến kinh điển: To Be vs Động từ Thường', xp: 30, type: 'grammar' },
      { id: 9, title: 'Bài 9: Trật tự ngược: Tính từ đứng trước Danh từ', xp: 25, type: 'builder' },
      { id: 10, title: 'Bài 10: Phễu thời gian & địa điểm In - On - At', xp: 30, type: 'grammar' },
      { id: 11, title: 'Bài 11: 3 Thì sinh tồn: Hiện tại - Quá khứ - Tương lai', xp: 35, type: 'grammar' },
      { id: 12, title: 'Bài 12: Đặt câu hỏi sinh tồn: Where, What, How much', xp: 30, type: 'builder' },
      { id: 13, title: 'Bài 13: Vạch Đích Chặng 2 — Kiểm tra & Nhận Chứng Chỉ', xp: 60, type: 'milestone' }
    ]
  },
  {
    id: 3,
    title: 'Chặng 3: Phản Xạ Cụm Từ & Giao Tiếp Sinh Tồn',
    subtitle: '21 Ngày Đột Phá — Chống bẫy dịch từng chữ Word-by-Word',
    duration: '21 Ngày',
    badge: 'Giao Tiếp Sinh Tồn',
    target: '50 cụm Chunks phổ biến + 5 kịch bản thực tế',
    lessons: [
      { id: 14, title: 'Bài 14: 10 cụm động từ thường ngày với Take, Make, Give', xp: 35, type: 'chunks' },
      { id: 15, title: 'Bài 15: Tình huống 1: Gọi cà phê & Đồ ăn trưa', xp: 40, type: 'dialogue' },
      { id: 16, title: 'Bài 16: Tình huống 2: Check-in sân bay & Khách sạn', xp: 40, type: 'dialogue' },
      { id: 17, title: 'Bài 17: Tình huống 3: Hỏi đường & Mua sắm', xp: 40, type: 'dialogue' },
      { id: 18, title: 'Bài 18: Tốt Nghiệp Khóa Xóa Mất Gốc LingoFlow', xp: 100, type: 'graduation' }
    ]
  },
  {
    id: 4,
    title: 'Chặng 4: Daily Fluency & Thử Thách 100 Ngày',
    subtitle: 'Duy trì phản xạ vĩnh viễn — 3 phút mỗi ngày',
    duration: 'Không giới hạn',
    badge: 'Hội Viên Trăm Ngày (Century Club)',
    target: 'Bảo toàn vệt Streak 🔥 & Ôn tập thẻ Leitner tự động',
    lessons: [
      { id: 19, title: 'Nhiệm vụ hàng ngày: Ôn 10 thẻ SRS đến hạn', xp: 20, type: 'srs' },
      { id: 20, title: 'Thử thách Audio Mirror: Đọc 1 câu thời sự ngắn', xp: 20, type: 'mirror' }
    ]
  }
];
