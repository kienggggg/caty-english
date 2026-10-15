import { describe, it, expect, beforeEach } from 'vitest';
import { evaluateUserSpeech } from '../src/services/sparringEvaluator';
import { useSparringStore } from '../src/stores/useSparringStore';

describe('CatY Sparring Evaluator & Real-Time Mistake Engine', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('1. Bắt chính xác lỗi "very like" và gợi ý "really like"', () => {
    const result = evaluateUserSpeech('I very like this coffee.');
    expect(result.hasMistake).toBe(true);
    expect(result.mistakes.some(m => m.original === 'very like')).toBe(true);
    expect(result.nativePolish).toContain('really like');
  });

  it('2. Bắt lỗi to-be đi với động từ thường "I am agree"', () => {
    const result = evaluateUserSpeech('I am agree with your opinion.');
    expect(result.hasMistake).toBe(true);
    expect(result.mistakes.some(m => m.original === 'I am agree')).toBe(true);
    expect(result.nativePolish).toContain('I agree');
  });

  it('3. Bắt lỗi dịch word-by-word tiếng Việt: "open the light / open the fan"', () => {
    const result = evaluateUserSpeech('Can you open the light please?');
    expect(result.hasMistake).toBe(true);
    expect(result.mistakes[0].fix).toContain('turn on');
  });

  it('4. Bắt lỗi khiếm khuyết đi kèm to: "must to go" / "can to speak"', () => {
    const result = evaluateUserSpeech('I must to go now because it is late.');
    expect(result.hasMistake).toBe(true);
    expect(result.mistakes[0].original).toBe('must to');
  });

  it('5. Đánh giá câu chuẩn bản xứ đạt điểm trôi chảy cao (Fluency >= 80)', () => {
    const result = evaluateUserSpeech('Could I please get an iced latte with oat milk and light ice?');
    expect(result.hasMistake).toBe(false);
    expect(result.fluencyScore).toBeGreaterThanOrEqual(80);
    expect(result.encouragement).toContain('😻');
  });
});

describe('CatY Sparring Store — Quản Lý Phiên Đối Luyện & Lưu SRS', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('6. Khởi tạo kịch bản mặc định và tin nhắn mở đầu của đối tác', () => {
    const store = useSparringStore.getState();
    expect(store.activeScenarioId).toBe('coffee_order');
    expect(store.messages.length).toBeGreaterThan(0);
    expect(store.messages[0].sender).toBe('bot');
  });

  it('7. Gửi câu trả lời và tự động nhận phản hồi phân tích lỗi', () => {
    const store = useSparringStore.getState();
    store.sendMessage('I very like milk tea and I want to buy one cup.');
    
    const updatedMessages = useSparringStore.getState().messages;
    const userMsg = updatedMessages.find(m => m.sender === 'user');
    expect(userMsg).toBeDefined();
    expect(userMsg.feedback.hasMistake).toBe(true);
    expect(userMsg.feedback.mistakes.length).toBeGreaterThan(0);

    // Bot cũng phải tự động trả lời
    const botMsg = updatedMessages[updatedMessages.length - 1];
    expect(botMsg.sender).toBe('bot');
  });

  it('8. Lưu câu sửa lỗi vào danh sách thẻ SRS thành công', () => {
    const store = useSparringStore.getState();
    const success = store.saveCorrectionToSRS(
      'I am agree with you',
      'I totally agree with you',
      'Agree là động từ, không dùng với to-be am'
    );
    expect(success).toBe(true);
    expect(useSparringStore.getState().savedMistakes.length).toBe(1);
    expect(useSparringStore.getState().savedMistakes[0].nativePolish).toBe('I totally agree with you');
  });
});
