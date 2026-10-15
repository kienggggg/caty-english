/**
 * vocabSRSData.js
 * Kho từ vựng cốt lõi học theo CỤM (Chunks / Phrasal Verbs)
 * Tích hợp hệ thống 5 Hộp Leitner để khắc sâu vào trí nhớ dài hạn
 */

export const INITIAL_VOCAB_SRS = [
  {
    id: 'v_1',
    word: 'look',
    ipa: '/lʊk/',
    endingSound: '/k/',
    rootMeaning: 'nhìn, xem',
    chunk: 'look after',
    chunkMeaning: 'chăm sóc, trông nom (khác nghĩa gốc)',
    exampleEn: 'I look after my little sister.',
    exampleVi: 'Tôi chăm sóc em gái nhỏ của mình.',
    box: 1,
    nextReviewDate: Date.now() - 1000 // Sẵn sàng để ôn ngay
  },
  {
    id: 'v_2',
    word: 'take',
    ipa: '/teɪk/',
    endingSound: '/k/',
    rootMeaning: 'cầm, lấy',
    chunk: 'take off',
    chunkMeaning: 'cất cánh (máy bay) / cởi áo',
    exampleEn: 'The plane will take off soon.',
    exampleVi: 'Máy bay sẽ cất cánh sớm thôi.',
    box: 1,
    nextReviewDate: Date.now() - 1000
  },
  {
    id: 'v_3',
    word: 'make',
    ipa: '/meɪk/',
    endingSound: '/k/',
    rootMeaning: 'làm, chế tạo',
    chunk: 'make a decision',
    chunkMeaning: 'đưa ra quyết định (đi với make, không đi với do)',
    exampleEn: 'You need to make a decision now.',
    exampleVi: 'Bạn cần phải đưa ra quyết định ngay bây giờ.',
    box: 1,
    nextReviewDate: Date.now() - 1000
  },
  {
    id: 'v_4',
    word: 'give',
    ipa: '/ɡɪv/',
    endingSound: '/v/',
    rootMeaning: 'cho, tặng',
    chunk: 'give up',
    chunkMeaning: 'từ bỏ, bỏ cuộc',
    exampleEn: 'Never give up your dream.',
    exampleVi: 'Đừng bao giờ từ bỏ ước mơ của bạn.',
    box: 1,
    nextReviewDate: Date.now() - 1000
  },
  {
    id: 'v_5',
    word: 'turn',
    ipa: '/tɜːn/',
    endingSound: '/n/',
    rootMeaning: 'quay, rẽ',
    chunk: 'turn on / turn off',
    chunkMeaning: 'bật / tắt thiết bị điện',
    exampleEn: 'Please turn on the light.',
    exampleVi: 'Làm ơn hãy bật đèn lên.',
    box: 1,
    nextReviewDate: Date.now() - 1000
  },
  {
    id: 'v_6',
    word: 'get',
    ipa: '/ɡet/',
    endingSound: '/t/',
    rootMeaning: 'nhận, lấy',
    chunk: 'get along with',
    chunkMeaning: 'hòa thuận, hợp cạ với ai',
    exampleEn: 'I get along well with my coworkers.',
    exampleVi: 'Tôi rất hòa thuận với các đồng nghiệp của mình.',
    box: 1,
    nextReviewDate: Date.now() - 1000
  },
  {
    id: 'v_7',
    word: 'find',
    ipa: '/faɪnd/',
    endingSound: '/nd/',
    rootMeaning: 'tìm thấy',
    chunk: 'find out',
    chunkMeaning: 'tìm ra, khám phá ra sự thật',
    exampleEn: 'I need to find out the truth.',
    exampleVi: 'Tôi cần tìm ra sự thật.',
    box: 1,
    nextReviewDate: Date.now() - 1000
  },
  {
    id: 'v_8',
    word: 'run',
    ipa: '/rʌn/',
    endingSound: '/n/',
    rootMeaning: 'chạy',
    chunk: 'run out of',
    chunkMeaning: 'hết, cạn kiệt (tiền, xăng, thời gian)',
    exampleEn: 'We are running out of time.',
    exampleVi: 'Chúng ta sắp hết thời gian rồi.',
    box: 1,
    nextReviewDate: Date.now() - 1000
  }
];
