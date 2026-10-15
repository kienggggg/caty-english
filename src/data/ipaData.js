/**
 * ipaData.js
 * Kho âm IPA chuẩn và Bộ Thần Chú Âm Đuôi s/es & ed
 * Kèm mẹo nhớ tiếng Việt dân dã, dễ thuộc ngay sau 3 phút
 */

export const ENDING_SOUNDS_RULES = {
  s_es: {
    title: 'Thần Chú Đuôi /s/ & /es/',
    summary: 'Người Việt hay nuốt mất âm gió cuối từ. Hãy nhớ 3 quy tắc sau:',
    rules: [
      {
        sound: '/s/',
        endingSounds: '/p/, /k/, /f/, /t/, /θ/',
        mnemonic: '👉 Mẹo nhớ: "Thời phong kiến fương tây" (hoặc "Thảo phải khao phở tôi")',
        explanation: 'Gặp các âm vô thanh này thì đuôi s/es đọc bật hơi nhẹ thành /s/.',
        examples: [
          { word: 'cats', ipa: '/kæts/', meaning: 'những con mèo' },
          { word: 'books', ipa: '/bʊks/', meaning: 'những cuốn sách' },
          { word: 'stops', ipa: '/stɒps/', meaning: 'dừng lại' },
          { word: 'laughs', ipa: '/lɑːfs/', meaning: 'cười' }
        ]
      },
      {
        sound: '/ɪz/',
        endingSounds: '/s/, /z/, /ʃ/, /tʃ/, /dʒ/, /ʒ/ (tận cùng: ch, sh, s, x, z, ce, ge)',
        mnemonic: '👉 Mẹo nhớ: "Sóng gió chẳng sợ gì zui zẻ" (âm gió xì xào)',
        explanation: 'Vì bản thân từ đã có âm gió nên phải thêm âm /ɪz/ để phân biệt.',
        examples: [
          { word: 'kisses', ipa: '/ˈkɪs.ɪz/', meaning: 'những nụ hôn' },
          { word: 'watches', ipa: '/ˈwɒtʃ.ɪz/', meaning: 'đồng hồ / xem' },
          { word: 'boxes', ipa: '/ˈbɒks.ɪz/', meaning: 'những chiếc hộp' },
          { word: 'changes', ipa: '/ˈtʃeɪn.dʒɪz/', meaning: 'thay đổi' }
        ]
      },
      {
        sound: '/z/',
        endingSounds: 'Tất cả các nguyên âm và phụ âm hữu thanh còn lại',
        mnemonic: '👉 Mẹo nhớ: Còn lại đọc rung cổ họng là /z/',
        explanation: 'Dây thanh quản rung lên, phát âm mềm mại như tiếng ong vo ve.',
        examples: [
          { word: 'dogs', ipa: '/dɒɡz/', meaning: 'những chú chó' },
          { word: 'plays', ipa: '/pleɪz/', meaning: 'chơi' },
          { word: 'cars', ipa: '/kɑːrz/', meaning: 'những chiếc xe hơi' },
          { word: 'dreams', ipa: '/driːmz/', meaning: 'những giấc mơ' }
        ]
      }
    ]
  },

  ed: {
    title: 'Thần Chú Đuôi Quá Khứ /ed/',
    summary: 'Không phải từ nào có đuôi ed cũng đọc là "đựt". Hãy áp dụng bí kíp:',
    rules: [
      {
        sound: '/ɪd/',
        endingSounds: 'Kết thúc bằng âm /t/ hoặc /d/',
        mnemonic: '👉 Mẹo nhớ: "Tiền - Đô" (hoặc "Tôi - Đói")',
        explanation: 'Chỉ 2 âm này mới phát âm đuôi ed thành 1 âm tiết mới /ɪd/.',
        examples: [
          { word: 'wanted', ipa: '/ˈwɒn.tɪd/', meaning: 'đã muốn' },
          { word: 'needed', ipa: '/ˈniː.dɪd/', meaning: 'đã cần' }
        ]
      },
      {
        sound: '/t/',
        endingSounds: '/p/, /k/, /f/, /s/, /ʃ/, /tʃ/, /θ/',
        mnemonic: '👉 Mẹo nhớ: "Chính phủ phát sách không thèm share"',
        explanation: 'Bật nhẹ đầu lưỡi thành âm gió /t/.',
        examples: [
          { word: 'stopped', ipa: '/stɒpt/', meaning: 'đã dừng lại' },
          { word: 'looked', ipa: '/lʊkt/', meaning: 'đã nhìn' },
          { word: 'washed', ipa: '/wɒʃt/', meaning: 'đã giặt/rửa' },
          { word: 'watched', ipa: '/wɒtʃt/', meaning: 'đã xem' }
        ]
      },
      {
        sound: '/d/',
        endingSounds: 'Các âm còn lại',
        mnemonic: '👉 Mẹo nhớ: Âm êm tai còn lại đọc là /d/',
        explanation: 'Phát âm rung nhẹ cổ họng, không bật gió quá mạnh.',
        examples: [
          { word: 'played', ipa: '/pleɪd/', meaning: 'đã chơi' },
          { word: 'loved', ipa: '/lʌvd/', meaning: 'đã yêu' },
          { word: 'opened', ipa: '/ˈəʊ.pənd/', meaning: 'đã mở' }
        ]
      }
    ]
  }
};

export const CORE_IPA_SOUNDS = [
  { sound: '/i:/', type: 'vowel', name: 'i dài', tip: 'Cười tươi, kéo dài âm i', example: 'sheep', meaning: 'con cừu' },
  { sound: '/ɪ/', type: 'vowel', name: 'i ngắn', tip: 'Miệng thả lỏng, giật nhanh nửa i nửa ê', example: 'ship', meaning: 'con tàu' },
  { sound: '/e/', type: 'vowel', name: 'e thường', tip: 'Mở miệng vừa phải, đọc dứt khoát', example: 'bed', meaning: 'cái giường' },
  { sound: '/æ/', type: 'vowel', name: 'a bẹt', tip: 'Mở rộng miệng hết cỡ theo chiều dọc, phát âm nửa a nửa e', example: 'cat', meaning: 'con mèo' },
  { sound: '/u:/', type: 'vowel', name: 'u dài', tip: 'Chu môi tròn, ngân âm u', example: 'shoot', meaning: 'bắn' },
  { sound: '/ʊ/', type: 'vowel', name: 'u ngắn', tip: 'Môi hơi tròn, giật âm u ngắn', example: 'good', meaning: 'tốt' },
  { sound: '/θ/', type: 'consonant', name: 'th vô thanh', tip: 'Thè đầu lưỡi giữa 2 răng, thổi hơi gió ra', example: 'think', meaning: 'suy nghĩ' },
  { sound: '/ð/', type: 'consonant', name: 'th hữu thanh', tip: 'Thè đầu lưỡi giữa 2 răng, rung cổ họng', example: 'this', meaning: 'cái này' },
  { sound: '/ʃ/', type: 'consonant', name: 's nặng', tip: 'Chu môi tròn như đang ra hiệu im lặng "suỵt"', example: 'she', meaning: 'cô ấy' },
  { sound: '/tʃ/', type: 'consonant', name: 'ch bật hơi', tip: 'Chu môi, bật mạnh âm ch', example: 'chair', meaning: 'cái ghế' },
  { sound: '/dʒ/', type: 'consonant', name: 'j rung', tip: 'Chu môi, rung họng và bật âm', example: 'job', meaning: 'công việc' }
];
