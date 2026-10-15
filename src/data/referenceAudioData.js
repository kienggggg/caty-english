/**
 * referenceAudioData.js
 *
 * Chú thích cũ ghi "3 lớp nguồn âm mẫu". Đo lại 03/09/2026 thì chỉ có 1:
 *
 *   lớp 1  Web Speech Synthesis (TTS)  — có thật, chạy qua services/webSpeech
 *   lớp 2  Pre-recorded Audio Bundle   — 10/10 mục đều `localAudio: null`
 *   lớp 3  Mentor Voice                — không có mã nào nạp, không có tệp nào
 *
 * Và bản thân tệp này CHƯA CÓ NGƯỜI GỌI: `grep -rn "getReferenceAudio\|
 * REFERENCE_AUDIO_MAP" src/` ra 0 kết quả ngoài chính nó. `rate` và `ipa` ở
 * dưới vì thế chưa từng tới được màn hình — màn Luyện Âm lấy IPA từ nguồn khác.
 *
 * Giữ lại thì phải nối vào cửa vào; không nối thì nên xoá. Để nguyên như cũ là
 * cách chắc chắn nhất khiến người đọc sau tưởng app có 3 lớp âm mẫu.
 */

export const REFERENCE_AUDIO_MAP = {
  // Mapping từ vựng sang nguồn âm thanh
  'cats': { tts: true, rate: 0.8, ipa: '/kæts/', localAudio: null },
  'watches': { tts: true, rate: 0.8, ipa: '/ˈwɒtʃ.ɪz/', localAudio: null },
  'dogs': { tts: true, rate: 0.8, ipa: '/dɒɡz/', localAudio: null },
  'stopped': { tts: true, rate: 0.8, ipa: '/stɒpt/', localAudio: null },
  'wanted': { tts: true, rate: 0.8, ipa: '/ˈwɒn.tɪd/', localAudio: null },
  'think': { tts: true, rate: 0.8, ipa: '/θɪŋk/', localAudio: null },
  'sheep': { tts: true, rate: 0.8, ipa: '/ʃiːp/', localAudio: null },
  'ship': { tts: true, rate: 0.8, ipa: '/ʃɪp/', localAudio: null },
  'see': { tts: true, rate: 0.8, ipa: '/siː/', localAudio: null },
  'she': { tts: true, rate: 0.8, ipa: '/ʃiː/', localAudio: null }
};

export const getReferenceAudio = (word, accent = 'US') => {
  const config = REFERENCE_AUDIO_MAP[word.toLowerCase()] || { tts: true, rate: 0.85 };
  return {
    word,
    accent,
    ...config
  };
};
