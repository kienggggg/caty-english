/**
 * minimalPairsData.js
 * Các cặp âm tối thiểu (Minimal Pairs) kinh điển cho người Việt luyện tai và phản xạ
 */

export const MINIMAL_PAIRS = [
  {
    id: 'pair_1',
    pairTitle: 'Âm /s/ (s nhẹ) vs /ʃ/ (s nặng chu môi)',
    wordA: { word: 'see', ipa: '/siː/', meaning: 'nhìn thấy' },
    wordB: { word: 'she', ipa: '/ʃiː/', meaning: 'cô ấy' },
    tip: 'Từ "she" phải chu tròn môi như ra hiệu "suỵt!", từ "see" cười nhẹ.'
  },
  {
    id: 'pair_2',
    pairTitle: 'Âm /i:/ (i dài) vs /ɪ/ (i ngắn)',
    wordA: { word: 'sheep', ipa: '/ʃiːp/', meaning: 'con cừu' },
    wordB: { word: 'ship', ipa: '/ʃɪp/', meaning: 'con tàu' },
    tip: '"sheep" cười kéo dài âm i; "ship" giật dứt khoát nửa i nửa ê.'
  },
  {
    id: 'pair_3',
    pairTitle: 'Âm /θ/ (thè lưỡi) vs /s/ (răng khép)',
    wordA: { word: 'think', ipa: '/θɪŋk/', meaning: 'suy nghĩ' },
    wordB: { word: 'sink', ipa: '/sɪŋk/', meaning: 'chìm / bồn rửa' },
    tip: 'Phải đặt đầu lưỡi giữa 2 hàm răng khi nói "think".'
  },
  {
    id: 'pair_4',
    pairTitle: 'Có Âm Đuôi /k/ vs Không Có Âm Đuôi',
    wordA: { word: 'like', ipa: '/laɪk/', meaning: 'thích' },
    wordB: { word: 'lie', ipa: '/laɪ/', meaning: 'nói dối / nằm' },
    tip: 'Đừng nói "lai", phải bật âm khựng /k/ ở cuối để thành "like"!'
  },
  {
    id: 'pair_5',
    pairTitle: 'Âm Đuôi /t/ vs Âm Đuôi /n/',
    wordA: { word: 'night', ipa: '/naɪt/', meaning: 'ban đêm' },
    wordB: { word: 'nine', ipa: '/naɪn/', meaning: 'số 9' },
    tip: 'Người Việt hay phát âm cả 2 từ giống hệt nhau ("nai"). Nhớ bật /t/ cho "night".'
  }
];
