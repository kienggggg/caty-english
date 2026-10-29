/**
 * lessonsContentData.js
 * Kho nội dung chi tiết và bài tập tương tác cho 20 bài học trên Lộ trình (Chặng 1 -> Chặng 4)
 * Thiết kế sư phạm chuẩn phản xạ: Lý thuyết súc tích 30s -> Luyện tai -> Ghép câu S-V-O -> Hội thoại thực tế
 */

export const LESSONS_CONTENT = {
  // ==========================================
  // CHẶNG 1: PHÁ BĂNG PHÁT ÂM & DIỆT ÂM ĐUÔI
  // ==========================================
  1: {
    id: 1,
    title: 'Bài 1: Khẩu hình cặp âm /i:/ và /ɪ/',
    stageId: 1,
    steps: [
      {
        type: 'theory',
        title: 'Bí Kíp 30 Giây: Cười Tươi vs Giật Bụng',
        rule: 'Âm /i:/ (i dài): Cười thật tươi, khóe miệng kéo sang 2 bên, ngân dài âm "iii".\nÂm /ɪ/ (i ngắn): Môi thả lỏng, giật bụng dứt khoát phát ra nửa âm "i" nửa âm "ê".',
        examples: [
          { word: 'sheep', ipa: '/ʃiːp/', meaning: 'con cừu (i dài cười tươi)' },
          { word: 'ship', ipa: '/ʃɪp/', meaning: 'con tàu (i ngắn giật nhanh)' }
        ]
      },
      {
        type: 'choice',
        question: 'Nghe và phân biệt: Người bản xứ vừa nói từ nào?',
        audioWord: 'sheep',
        options: [
          { text: 'sheep /ʃiːp/ (con cừu)', isCorrect: true },
          { text: 'ship /ʃɪp/ (con tàu)', isCorrect: false }
        ],
        explanation: 'Âm /i:/ kéo dài và vang hơn. Nếu nói "ship" mà kéo dài, người Tây sẽ nghe nhầm thành "sheep"!'
      },
      {
        type: 'choice',
        question: 'Chọn từ có nguyên âm /i:/ dài trong câu sau: "Please sit on this seat."',
        options: [
          { text: 'seat /siːt/ (chỗ ngồi)', isCorrect: true },
          { text: 'sit /sɪt/ (ngồi xuống)', isCorrect: false },
          { text: 'this /ðɪs/ (cái này)', isCorrect: false }
        ],
        explanation: '"seat" chứa /i:/ dài; "sit" và "this" đều là âm /ɪ/ ngắn giật dứt khoát.'
      }
    ]
  },

  2: {
    id: 2,
    title: 'Bài 2: Bật hơi phụ âm cuối /t/, /k/, /p/',
    stageId: 1,
    steps: [
      {
        type: 'theory',
        title: 'Đừng Nuốt Âm Đuôi (Ending Sounds)',
        rule: 'Người Việt có thói quen nuốt phụ âm cuối (nói "cát" thay vì "cat /kæt/"). Bật nhẹ âm đuôi giúp người nghe nhận diện từ vựng ngay lập tức!',
        examples: [
          { word: 'cat', ipa: '/kæt/', meaning: 'con mèo (bật nhẹ /t/ ở đầu lưỡi)' },
          { word: 'cap', ipa: '/kæp/', meaning: 'mũ lưỡi trai (mím môi bật /p/)' },
          { word: 'back', ipa: '/bæk/', meaning: 'phía sau (khựng hơi /k/ ở cuống họng)' }
        ]
      },
      {
        type: 'choice',
        question: 'Từ "like" (thích) có âm kết thúc chuẩn là gì?',
        options: [
          { text: 'Bật âm khựng /k/ ở cổ họng (/laɪk/)', isCorrect: true },
          { text: 'Đọc là "lai" không có âm đuôi', isCorrect: false },
          { text: 'Bật âm /t/ ở đầu lưỡi', isCorrect: false }
        ],
        explanation: 'Nếu nói "lai", người bản xứ sẽ nghe thành từ "lie" (nói dối / nằm). Phải bật /k/ mới là "like"!'
      },
      {
        type: 'choice',
        question: 'Nghe và nhận diện âm đuôi: Từ nào có âm cuối là /t/?',
        audioWord: 'night',
        options: [
          { text: 'night /naɪt/ (ban đêm)', isCorrect: true },
          { text: 'nine /naɪn/ (số 9)', isCorrect: false }
        ],
        explanation: '"night" kết thúc bằng /t/ bật nhẹ đầu lưỡi chạm nướu trên; còn "nine" kết thúc bằng âm mũi /n/.'
      }
    ]
  },

  3: {
    id: 3,
    title: 'Bài 3: Thần chú đuôi s/es "Thời phong kiến"',
    stageId: 1,
    steps: [
      {
        type: 'theory',
        title: 'Thần Chú: "Thời phong kiến fương tây"',
        rule: 'Gặp các phụ âm vô thanh tận cùng: /t/, /p/, /k/, /f/, /θ/ (Th-P-K-F-T), đuôi -s/es luôn phát âm là /s/ gió bật nhẹ!',
        examples: [
          { word: 'cats', ipa: '/kæts/', meaning: 'tận cùng /t/ -> đọc /s/' },
          { word: 'books', ipa: '/bʊks/', meaning: 'tận cùng /k/ -> đọc /s/' },
          { word: 'stops', ipa: '/stɒps/', meaning: 'tận cùng /p/ -> đọc /s/' }
        ]
      },
      {
        type: 'choice',
        question: 'Từ nào sau đây có đuôi -s đọc là /s/?',
        options: [
          { text: 'cups (những chiếc cốc)', isCorrect: true },
          { text: 'dogs (những chú chó)', isCorrect: false },
          { text: 'pens (những chiếc bút)', isCorrect: false }
        ],
        explanation: '"cup" tận cùng bằng âm /p/ (thuộc thần chú Th-P-K-F-T) nên đuôi s đọc là /s/.'
      },
      {
        type: 'choice',
        question: 'Từ "watches" (những chiếc đồng hồ) phát âm đuôi là gì?',
        options: [
          { text: '/ɪz/ (vì tận cùng là âm ch xì xào)', isCorrect: true },
          { text: '/s/ (âm xì nhẹ)', isCorrect: false },
          { text: '/z/ (âm rung cổ)', isCorrect: false }
        ],
        explanation: 'Quy tắc "Sóng gió chẳng sợ gì zui zẻ" (ch, sh, s, x, z) thì đuôi -es phát âm là /ɪz/!'
      }
    ]
  },

  4: {
    id: 4,
    title: 'Bài 4: Thần chú đuôi ed "Tiền Đô"',
    stageId: 1,
    steps: [
      {
        type: 'theory',
        title: 'Thần Chú Đuôi -ed: "Tiền - Đô"',
        rule: 'Chỉ khi từ gốc kết thúc bằng /t/ hoặc /d/ thì đuôi -ed mới đọc thành /ɪd/ (như "tịt", "địt"). Các từ khác tuyệt đối KHÔNG đọc là "đựt"!',
        examples: [
          { word: 'wanted', ipa: '/ˈwɒn.tɪd/', meaning: 'tận cùng /t/ -> đọc /ɪd/' },
          { word: 'needed', ipa: '/ˈniː.dɪd/', meaning: 'tận cùng /d/ -> đọc /ɪd/' },
          { word: 'stopped', ipa: '/stɒpt/', meaning: 'tận cùng /p/ -> đọc bật gió /t/' }
        ]
      },
      {
        type: 'choice',
        question: 'Từ "decided" (đã quyết định) phát âm đuôi -ed là gì?',
        options: [
          { text: '/ɪd/ (vì decide tận cùng là âm /d/)', isCorrect: true },
          { text: '/t/ (bật nhẹ)', isCorrect: false },
          { text: '/d/ (rung cổ)', isCorrect: false }
        ],
        explanation: 'Chính xác! "decide" tận cùng là /d/ (Đô), nên khi thêm -ed sẽ đọc là /ɪd/.'
      },
      {
        type: 'choice',
        question: 'Người Việt hay đọc sai "played" thành "play-đựt". Cách đọc chuẩn là:',
        options: [
          { text: '/pleɪd/ (ngân âm êm tai, chỉ rung nhẹ âm /d/)', isCorrect: true },
          { text: '/pleɪ.ɪd/ (thêm hẳn một âm tiết mới)', isCorrect: false },
          { text: '/pleɪt/ (bật âm gió /t/)', isCorrect: false }
        ],
        explanation: '"play" tận cùng là nguyên âm (không phải T hay D), nên đuôi -ed đọc rung nhẹ là /d/, từ vẫn chỉ có 1 âm tiết!'
      }
    ]
  },

  5: {
    id: 5,
    title: 'Bài 5: Luyện tai cặp âm /s/ vs /ʃ/',
    stageId: 1,
    steps: [
      {
        type: 'theory',
        title: 'Phân Biệt S Nhẹ (Cười) vs S Nặng (Chu Môi)',
        rule: 'Âm /s/: Hai hàm răng khép hờ, khóe miệng cười nhẹ, xì hơi qua kẽ răng.\nÂm /ʃ/: Chu tròn môi về phía trước như ra hiệu im lặng "suỵt!", đẩy luồng hơi dày.',
        examples: [
          { word: 'see', ipa: '/siː/', meaning: 'nhìn thấy (/s/ nhẹ)' },
          { word: 'she', ipa: '/ʃiː/', meaning: 'cô ấy (/ʃ/ chu môi)' }
        ]
      },
      {
        type: 'choice',
        question: 'Nghe và chọn từ: Người đọc đang chu tròn môi hay cười nhẹ?',
        audioWord: 'she',
        options: [
          { text: 'she /ʃiː/ (cô ấy)', isCorrect: true },
          { text: 'see /siː/ (nhìn)', isCorrect: false }
        ],
        explanation: 'Âm /ʃ/ chu môi rất rõ nét. Nhớ chu môi khi phát âm "she", "shoe", "shop" nhé!'
      },
      {
        type: 'puzzle',
        question: 'Sắp xếp câu chuẩn: "Cô ấy nhìn thấy con tàu."',
        words: ['She', 'sees', 'the', 'ship'],
        correctSentence: 'She sees the ship',
        explanation: '"She" (/ʃ/ chu môi) + "sees" (/s/ cười) + "the ship" (/ʃ/ chu môi).'
      }
    ]
  },

  6: {
    id: 6,
    title: 'Bài 6: Bí quyết nối âm tự nhiên',
    stageId: 1,
    steps: [
      {
        type: 'theory',
        title: 'Quy Tắc Vàng: Phụ Âm Đuôi + Nguyên Âm Đầu',
        rule: 'Khi từ trước kết thúc bằng phụ âm và từ sau bắt đầu bằng nguyên âm (u, e, o, a, i - uể oải), hãy nối liền thành 1 khối âm!',
        examples: [
          { word: 'hold on', ipa: 'hol-don', meaning: 'đợi một chút' },
          { word: 'come in', ipa: 'cơ-min', meaning: 'mời vào' },
          { word: 'pick it up', ipa: 'pi-ki-tắp', meaning: 'nhặt nó lên' }
        ]
      },
      {
        type: 'choice',
        question: 'Cụm từ "look at" sẽ được người bản xứ nói nhanh thành:',
        audioWord: 'look at',
        options: [
          { text: '"loo-kæt" (âm /k/ nối vào "at")', isCorrect: true },
          { text: '"lúc... át" (ngắt quãng 2 từ riêng biệt)', isCorrect: false }
        ],
        explanation: 'Nối âm giúp bạn nói trôi chảy và nghe người Tây nói không còn bị "nuốt chữ"!'
      },
      {
        type: 'puzzle',
        question: 'Ghép câu nối âm: "Đợi tôi một phút."',
        words: ['Hold', 'on', 'a', 'minute'],
        correctSentence: 'Hold on a minute',
        explanation: '"Hold on a" đọc lướt nối âm thành "hol-do-nơ" cực kỳ tự nhiên.'
      }
    ]
  },

  7: {
    id: 7,
    title: 'Bài 7: Vạch Đích Chặng 1 — Kiểm tra & Nhận Chứng Chỉ',
    stageId: 1,
    isMilestone: true,
    steps: [
      {
        type: 'choice',
        question: 'Câu 1/3: Khi nói từ "cats", âm kết thúc chuẩn là:',
        options: [
          { text: '/s/ (áp dụng thần chú Thời phong kiến)', isCorrect: true },
          { text: '/z/ (rung họng)', isCorrect: false },
          { text: '/ɪz/ (đọc thành cát-xịt)', isCorrect: false }
        ],
        explanation: 'Xuất sắc! /t/ là âm vô thanh nên đuôi -s đọc là /s/.'
      },
      {
        type: 'choice',
        question: 'Câu 2/3: Từ "stopped" phát âm đuôi -ed chuẩn là:',
        options: [
          { text: '/t/ (bật nhẹ gió đầu lưỡi)', isCorrect: true },
          { text: '/ɪd/ (đọc là stop-địt)', isCorrect: false },
          { text: '/d/ (rung cổ)', isCorrect: false }
        ],
        explanation: 'Chính xác! Chỉ khi tận cùng là T hoặc D mới đọc là /ɪd/.'
      },
      {
        type: 'choice',
        question: 'Câu 3/3: Khẩu hình chuẩn khi đọc từ "she" (cô ấy) là gì?',
        options: [
          { text: 'Chu môi tròn về phía trước như ra hiệu "suỵt"', isCorrect: true },
          { text: 'Cười tươi sang 2 bên như âm /s/', isCorrect: false }
        ],
        explanation: 'Chúc mừng bạn! Bạn đã hoàn thành xuất sắc toàn bộ kiến thức Chặng 1!'
      }
    ]
  },

  // ==========================================
  // CHẶNG 2: XƯƠNG SỐNG CÂU & NGỮ PHÁP SINH TỒN
  // ==========================================
  8: {
    id: 8,
    title: 'Bài 8: Trận chiến kinh điển: To Be vs Động từ Thường',
    stageId: 2,
    steps: [
      {
        type: 'theory',
        title: 'Cấm Kỵ: "Một Nước Không Thể Có Hai Vua"',
        rule: 'Trong câu đơn tiếng Anh, To Be (am/is/are) và Động từ thường (go, like, agree) KHÔNG BAO GIỜ đứng cạnh nhau ở thì đơn!\n❌ Sai bẫy dịch từng chữ: "I am agree with you" (Tôi thì đồng ý với bạn)\n✅ Đúng: "I agree with you."',
        examples: [
          { word: 'I agree', ipa: '/aɪ əˈɡriː/', meaning: 'Tôi đồng ý (không có am)' },
          { word: 'She is a doctor', ipa: '/ʃiː ɪz ə ˈdɒk.tər/', meaning: 'Cô ấy là bác sĩ (To be chỉ nghề)' }
        ]
      },
      {
        type: 'choice',
        question: 'Chọn câu diễn đạt CHUẨN:',
        options: [
          { text: 'I agree with your idea.', isCorrect: true },
          { text: 'I am agree with your idea.', isCorrect: false }
        ],
        explanation: '"Agree" đã là một động từ chỉ quan điểm. Tuyệt đối không thêm "am" vào trước!'
      },
      {
        type: 'puzzle',
        question: 'Sắp xếp câu: "Tôi sống ở Hà Nội."',
        words: ['I', 'live', 'in', 'Hanoi'],
        correctSentence: 'I live in Hanoi',
        explanation: 'Chỉ có "I live", không có "I am live"!'
      }
    ]
  },

  9: {
    id: 9,
    title: 'Bài 9: Trật tự ngược: Tính từ đứng trước Danh từ',
    stageId: 2,
    steps: [
      {
        type: 'theory',
        title: 'Tư Duy Ngược: Tính Từ Luôn Làm "Hộ Vệ" Đi Trước',
        rule: 'Tiếng Việt nói: Danh từ + Tính từ ("Quả táo ĐỎ", "Cô gái ĐẸP").\nTiếng Anh NGƯỢC LẠI: Tính từ + Danh từ ("A RED apple", "A BEAUTIFUL girl").',
        examples: [
          { word: 'a red car', ipa: '/ə red kɑːr/', meaning: 'một chiếc xe màu đỏ' },
          { word: 'hot coffee', ipa: '/hɒt ˈkɒf.i/', meaning: 'cà phê nóng' }
        ]
      },
      {
        type: 'choice',
        question: 'Chọn cách diễn đạt chuẩn: "Một chiếc áo màu xanh."',
        options: [
          { text: 'a blue shirt', isCorrect: true },
          { text: 'a shirt blue', isCorrect: false }
        ],
        explanation: 'Màu sắc (tính từ) phải đứng trước đồ vật (danh từ): "a blue shirt".'
      },
      {
        type: 'puzzle',
        question: 'Ghép câu: "Anh ấy có một chú mèo dễ thương."',
        words: ['He', 'has', 'a', 'cute', 'cat'],
        correctSentence: 'He has a cute cat',
        explanation: '"cute cat" (dễ thương + con mèo), trật tự ngược so với tiếng Việt.'
      }
    ]
  },

  10: {
    id: 10,
    title: 'Bài 10: Phễu thời gian & địa điểm In - On - At',
    stageId: 2,
    steps: [
      {
        type: 'theory',
        title: 'Mẹo Chiếc Phễu: To → Vừa → Nhỏ',
        rule: '• IN (Rộng nhất): Năm, mùa, tháng, quốc gia, thành phố (in 2026, in Hanoi)\n• ON (Vừa vừa): Thứ trong tuần, ngày cụ thể, tên đường (on Monday, on May 5th)\n• AT (Chính xác nhất): Giờ giấc cụ thể, số nhà, địa điểm cụ thể (at 7:00 AM, at home)',
        examples: [
          { word: 'in May', ipa: '/ɪn meɪ/', meaning: 'vào tháng Năm (thời gian rộng)' },
          { word: 'on Friday', ipa: '/ɒn ˈfraɪ.deɪ/', meaning: 'vào thứ Sáu (ngày cụ thể)' },
          { word: 'at 8 PM', ipa: '/æt eɪt piː em/', meaning: 'vào lúc 8 giờ tối (giờ chính xác)' }
        ]
      },
      {
        type: 'choice',
        question: 'Điền vào chỗ trống: "The meeting starts _____ 9:00 AM."',
        options: [
          { text: 'at', isCorrect: true },
          { text: 'on', isCorrect: false },
          { text: 'in', isCorrect: false }
        ],
        explanation: 'Chỉ giờ giấc chính xác trong ngày luôn dùng giới từ "at".'
      },
      {
        type: 'puzzle',
        question: 'Ghép câu: "Tôi sinh ra vào tháng Mười."',
        words: ['I', 'was', 'born', 'in', 'October'],
        correctSentence: 'I was born in October',
        explanation: 'Tháng trong năm là khoảng thời gian rộng nên dùng "in October".'
      }
    ]
  },

  11: {
    id: 11,
    title: 'Bài 11: 3 Thì sinh tồn: Hiện tại - Quá khứ - Tương lai',
    stageId: 2,
    steps: [
      {
        type: 'theory',
        title: '3 Thì Cốt Lõi Chiếm 90% Giao Tiếp Hàng Ngày',
        rule: '1. Hiện tại đơn: Thói quen/Sự thật ("I work every day")\n2. Quá khứ đơn: Đã xong rồi, dùng V2/ed ("Yesterday I worked")\n3. Tương lai đơn: Sẽ xảy ra, dùng will + V ("Tomorrow I will work")',
        examples: [
          { word: 'I go', ipa: '/aɪ ɡəʊ/', meaning: 'tôi đi (thường xuyên)' },
          { word: 'I went', ipa: '/aɪ went/', meaning: 'tôi đã đi (hôm qua)' },
          { word: 'I will go', ipa: '/aɪ wɪl ɡəʊ/', meaning: 'tôi sẽ đi (ngày mai)' }
        ]
      },
      {
        type: 'choice',
        question: 'Điền vào chỗ trống: "Yesterday, I _____ my keys."',
        options: [
          { text: 'lost (quá khứ của lose)', isCorrect: true },
          { text: 'lose (hiện tại)', isCorrect: false },
          { text: 'will lose (tương lai)', isCorrect: false }
        ],
        explanation: 'Có dấu hiệu "Yesterday" (hôm qua) bắt buộc dùng động từ thì quá khứ đơn.'
      },
      {
        type: 'puzzle',
        question: 'Ghép câu: "Ngày mai tôi sẽ gọi cho bạn."',
        words: ['I', 'will', 'call', 'you', 'tomorrow'],
        correctSentence: 'I will call you tomorrow',
        explanation: 'Hành động tương lai: "will" + động từ nguyên mẫu "call".'
      }
    ]
  },

  12: {
    id: 12,
    title: 'Bài 12: Đặt câu hỏi sinh tồn: Where, What, How much',
    stageId: 2,
    steps: [
      {
        type: 'theory',
        title: 'Bộ 3 Câu Hỏi Bất Ly Thân Khi Ra Ngoài',
        rule: '• Hỏi giá: "How much is this?" (Cái này bao nhiêu tiền?)\n• Hỏi chỗ: "Where is the...?" (Chỗ... ở đâu vậy?)\n• Hỏi cái gì: "What is your name / What time is it?"',
        examples: [
          { word: 'How much is it?', ipa: '/haʊ mʌtʃ ɪz ɪt/', meaning: 'Cái này bao nhiêu tiền?' },
          { word: 'Where is the restroom?', ipa: '/weər ɪz ðə ˈrest.ruːm/', meaning: 'Nhà vệ sinh ở đâu?' }
        ]
      },
      {
        type: 'choice',
        question: 'Khi muốn hỏi nhà vệ sinh ở đâu một cách lịch sự, bạn hỏi:',
        options: [
          { text: 'Excuse me, where is the restroom?', isCorrect: true },
          { text: 'What is the restroom?', isCorrect: false },
          { text: 'How much is the restroom?', isCorrect: false }
        ],
        explanation: '"Where is..." dùng để hỏi địa điểm. Thêm "Excuse me" ở đầu rất lịch sự.'
      },
      {
        type: 'puzzle',
        question: 'Ghép câu hỏi giá tiền: "Cái này giá bao nhiêu?"',
        words: ['How', 'much', 'is', 'this', '?'],
        correctSentence: 'How much is this ?',
        explanation: 'Cấu trúc chuẩn sinh tồn: "How much is this?"'
      }
    ]
  },

  13: {
    id: 13,
    title: 'Bài 13: Vạch Đích Chặng 2 — Kiểm tra & Nhận Chứng Chỉ',
    stageId: 2,
    isMilestone: true,
    steps: [
      {
        type: 'choice',
        question: 'Câu 1/3: Sửa câu sai: "She is want a hot coffee."',
        options: [
          { text: 'She wants a hot coffee.', isCorrect: true },
          { text: 'She want a coffee hot.', isCorrect: false }
        ],
        explanation: 'Không ghép To Be với động từ thường, và tính từ "hot" phải đứng trước "coffee"!'
      },
      {
        type: 'choice',
        question: 'Câu 2/3: Chọn giới từ đúng: "We will meet _____ Sunday."',
        options: [
          { text: 'on (thứ trong tuần)', isCorrect: true },
          { text: 'in', isCorrect: false },
          { text: 'at', isCorrect: false }
        ],
        explanation: 'Thứ trong tuần luôn đi với giới từ "on".'
      },
      {
        type: 'choice',
        question: 'Câu 3/3: "Last night, they _____ dinner together."',
        options: [
          { text: 'had (quá khứ của have)', isCorrect: true },
          { text: 'have', isCorrect: false },
          { text: 'will have', isCorrect: false }
        ],
        explanation: 'Xuất sắc! "Last night" là quá khứ nên dùng "had". Bạn đã làm chủ Chặng 2!'
      }
    ]
  },

  // ==========================================
  // CHẶNG 3: PHẢN XẠ CỤM TỪ & GIAO TIẾP SINH TỒN
  // ==========================================
  14: {
    id: 14,
    title: 'Bài 14: 10 cụm động từ thường ngày với Take, Make, Give',
    stageId: 3,
    steps: [
      {
        type: 'theory',
        title: 'Học Theo Cụm (Chunks) — Đừng Học Từ Đơn Lẻ',
        rule: 'Khi ghép thành cụm, nghĩa của từ sẽ thay đổi hoàn toàn:\n• Give up: từ bỏ\n• Take off: cởi áo / cất cánh (máy bay)\n• Make a decision: đưa ra quyết định (đi với make, không đi với do)',
        examples: [
          { word: 'give up', ipa: '/ɡɪv ʌp/', meaning: 'bỏ cuộc, từ bỏ' },
          { word: 'take off', ipa: '/teɪk ɒf/', meaning: 'cất cánh / cởi đồ' },
          { word: 'make a decision', ipa: '/meɪk ə dɪˈsɪʒ.ən/', meaning: 'ra quyết định' }
        ]
      },
      {
        type: 'choice',
        question: 'Điền cụm từ phù hợp: "Never _____ your dream!"',
        options: [
          { text: 'give up (từ bỏ)', isCorrect: true },
          { text: 'take off', isCorrect: false },
          { text: 'look after', isCorrect: false }
        ],
        explanation: '"Never give up" là cụm từ kinh điển: Đừng bao giờ từ bỏ ước mơ của bạn!'
      },
      {
        type: 'puzzle',
        question: 'Ghép câu: "Máy bay sẽ cất cánh sớm thôi."',
        words: ['The', 'plane', 'will', 'take', 'off', 'soon'],
        correctSentence: 'The plane will take off soon',
        explanation: '"take off" nghĩa là cất cánh khi nói về máy bay.'
      }
    ]
  },

  15: {
    id: 15,
    title: 'Bài 15: Tình huống 1: Gọi cà phê & Đồ ăn trưa',
    stageId: 3,
    steps: [
      {
        type: 'theory',
        title: 'Mẫu Câu Gọi Đồ Văn Minh: "Can I get...?"',
        rule: 'Đừng dùng "I want" (nghe cộc cằn và đòi hỏi). Người bản xứ luôn dùng:\n"Can I get a [món], please?" (Làm ơn cho tôi một...)',
        examples: [
          { word: 'Can I get an iced latte, please?', ipa: '', meaning: 'Cho tôi một ly latte đá được không ạ?' },
          { word: 'For here or to go?', ipa: '', meaning: 'Dùng tại đây hay mang về?' }
        ]
      },
      {
        type: 'dialogue',
        question: 'Tình huống tại quầy gọi nước:',
        speaker: 'Barista (Nhân viên pha chế)',
        line: 'Hi there! What can I get for you today?',
        options: [
          { text: 'Can I get a black coffee, please?', isCorrect: true },
          { text: 'I want coffee now!', isCorrect: false },
          { text: 'Where is coffee?', isCorrect: false }
        ],
        explanation: '"Can I get..., please?" là câu thần chú lịch sự số 1 ở mọi quán cà phê!'
      },
      {
        type: 'puzzle',
        question: 'Ghép câu trả lời: "Mang về, làm ơn."',
        words: ['To', 'go', ',', 'please'],
        correctSentence: 'To go , please',
        explanation: '"For here" là dùng tại quán; "To go" (hoặc "Take away") là mang về.'
      }
    ]
  },

  16: {
    id: 16,
    title: 'Bài 16: Tình huống 2: Check-in sân bay & Khách sạn',
    stageId: 3,
    steps: [
      {
        type: 'theory',
        title: 'Thủ Tục Đặt Chỗ: "I have a reservation"',
        rule: 'Khi đến quầy lễ tân khách sạn, câu mở đầu vàng là:\n"Hi, I have a reservation under [Tên của bạn]."\n(Xin chào, tôi có đặt phòng trước dưới tên...)',
        examples: [
          { word: 'I have a reservation', ipa: '', meaning: 'Tôi đã đặt chỗ trước' },
          { word: 'Here is my passport', ipa: '', meaning: 'Hộ chiếu của tôi đây' }
        ]
      },
      {
        type: 'dialogue',
        question: 'Tại quầy lễ tân khách sạn:',
        speaker: 'Receptionist (Lễ tân)',
        line: 'Good afternoon, may I help you?',
        options: [
          { text: "I'd like to check in, please.", isCorrect: true },
          { text: 'I want to sleep.', isCorrect: false },
          { text: 'Where is my room?', isCorrect: false }
        ],
        explanation: '"I would like to check in, please" thể hiện phong thái giao tiếp tự tin và lịch sự.'
      },
      {
        type: 'puzzle',
        question: 'Ghép câu đưa giấy tờ: "Hộ chiếu của tôi đây."',
        words: ['Here', 'is', 'my', 'passport'],
        correctSentence: 'Here is my passport',
        explanation: '"Here is..." (đây là...) dùng khi trao đồ vật tận tay cho người đối diện.'
      }
    ]
  },

  17: {
    id: 17,
    title: 'Bài 17: Tình huống 3: Hỏi đường & Mua sắm',
    stageId: 3,
    steps: [
      {
        type: 'theory',
        title: 'Hỏi Đường & Mua Sắm Không Sợ Lạc',
        rule: '• Hỏi đường: "Excuse me, how can I get to [địa điểm]?"\n• Chỉ dẫn thường gặp: Turn left (rẽ trái), Turn right (rẽ phải), Go straight (đi thẳng)\n• Thanh toán: "Do you take credit cards?" (Có quẹt thẻ không?)',
        examples: [
          { word: 'turn left', ipa: '/tɜːn left/', meaning: 'rẽ trái' },
          { word: 'go straight', ipa: '/ɡəʊ streɪt/', meaning: 'đi thẳng' }
        ]
      },
      {
        type: 'dialogue',
        question: 'Bạn muốn hỏi xem cửa hàng có thanh toán bằng thẻ không:',
        speaker: 'Cashier (Thu ngân)',
        line: 'Your total is $25.',
        options: [
          { text: 'Do you accept credit cards?', isCorrect: true },
          { text: 'How much money card?', isCorrect: false },
          { text: 'No money cash.', isCorrect: false }
        ],
        explanation: '"Do you accept credit cards?" là câu hỏi thanh toán chuẩn mực quốc tế.'
      },
      {
        type: 'puzzle',
        question: 'Ghép câu chỉ đường: "Rẽ phải ở góc tiếp theo."',
        words: ['Turn', 'right', 'at', 'the', 'corner'],
        correctSentence: 'Turn right at the corner',
        explanation: 'Cấu trúc chỉ hướng đi chuẩn: "Turn right / left at the corner".'
      }
    ]
  },

  18: {
    id: 18,
    title: 'Bài 18: Tốt Nghiệp Khóa Xóa Mất Gốc CatY English',
    stageId: 3,
    isGraduation: true,
    steps: [
      {
        type: 'choice',
        question: 'Câu 1/3: Khi gọi món tại quầy, cách nói nào LỊCH SỰ nhất?',
        options: [
          { text: 'Can I get a cappuccino, please?', isCorrect: true },
          { text: 'I want a cappuccino.', isCorrect: false }
        ],
        explanation: 'Chính xác! Luôn dùng "Can I get..., please?".'
      },
      {
        type: 'choice',
        question: 'Câu 2/3: "Look after" có nghĩa là gì?',
        options: [
          { text: 'Chăm sóc, trông nom (khác với look là nhìn)', isCorrect: true },
          { text: 'Nhìn về phía sau', isCorrect: false }
        ],
        explanation: 'Chính xác! Cụm động từ thay đổi nghĩa gốc của từ.'
      },
      {
        type: 'choice',
        question: 'Câu 3/3: Khi nói "Tôi có đặt phòng trước", bạn nói:',
        options: [
          { text: 'I have a reservation.', isCorrect: true },
          { text: 'I have a room book.', isCorrect: false }
        ],
        explanation: 'VÔ CÙNG XUẤT SẮC! Bạn đã chính thức xóa tan nỗi sợ tiếng Anh và tốt nghiệp lộ trình cốt lõi!'
      }
    ]
  },

  // ==========================================
  // CHẶNG 4: DAILY FLUENCY & THỬ THÁCH 100 NGÀY
  // ==========================================
  19: {
    id: 19,
    title: 'Nhiệm vụ hàng ngày: Ôn 10 thẻ SRS đến hạn',
    stageId: 4,
    steps: [
      {
        type: 'theory',
        title: 'Bảo Toàn Trí Nhớ Dài Hạn Với Hệ Thống Leitner',
        rule: 'Bộ não sẽ quên đi 80% từ vựng sau 48 giờ nếu không được kích hoạt ngắt quãng. Hãy ôn đều đặn để đưa từ vựng vào Hộp 5 (Khắc sâu vĩnh viễn)!',
        examples: [
          { word: 'run out of', ipa: '/rʌn aʊt əv/', meaning: 'cạn kiệt, hết (xăng, tiền, giờ)' },
          { word: 'get along with', ipa: '/ɡet əˈlɒŋ wɪð/', meaning: 'hòa thuận, hợp cạ với ai' }
        ]
      },
      {
        type: 'choice',
        question: 'Cụm từ "run out of" có nghĩa là:',
        options: [
          { text: 'Hết, cạn kiệt (tiền bạc, thời gian, nhiên liệu)', isCorrect: true },
          { text: 'Chạy ra khỏi nhà', isCorrect: false }
        ],
        explanation: 'Ví dụ: "We are running out of time" (Chúng ta sắp hết thời gian rồi)!'
      },
      {
        type: 'puzzle',
        question: 'Ghép câu: "Tôi hòa thuận với đồng nghiệp."',
        words: ['I', 'get', 'along', 'with', 'my', 'team'],
        correctSentence: 'I get along with my team',
        explanation: '"get along with" = hòa thuận, ăn ý với ai.'
      }
    ]
  },

  20: {
    id: 20,
    title: 'Thử thách Audio Mirror: Đọc 1 câu thời sự ngắn',
    stageId: 4,
    steps: [
      {
        type: 'theory',
        title: 'Thử Thách Đọc To Đạt Chuẩn Âm Đuôi',
        rule: 'Đọc to câu dưới đây, chú ý bật nhẹ âm đuôi /s/, /t/, /d/ và nối âm tự nhiên:\n"Every day, I practice English speaking with confidence."',
        examples: [
          { word: 'practice', ipa: '/ˈpræk.tɪs/', meaning: 'âm đuôi /s/ bật nhẹ' },
          { word: 'confidence', ipa: '/ˈkɒn.fɪ.dəns/', meaning: 'âm đuôi /s/' }
        ]
      },
      {
        type: 'choice',
        question: 'Từ "practice" kết thúc bằng âm gì?',
        options: [
          { text: '/s/ (chữ ce đọc là s nhẹ)', isCorrect: true },
          { text: '/k/ (đọc là thực-tích)', isCorrect: false }
        ],
        explanation: 'Rất tốt! Chữ "ce" ở cuối từ tiếng Anh luôn phát âm là /s/.'
      },
      {
        type: 'puzzle',
        question: 'Ghép câu tuyên ngôn: "Tôi tự tin nói tiếng Anh mỗi ngày."',
        words: ['I', 'speak', 'English', 'with', 'confidence'],
        correctSentence: 'I speak English with confidence',
        explanation: 'Xin chúc mừng! Bạn đã hoàn thành thử thách hàng ngày và duy trì chuỗi Streak rực rỡ!'
      }
    ]
  }
};

/**
 * Lấy nội dung chi tiết bài học theo ID
 * Có cơ chế thoái lui an toàn nếu bài học chưa định nghĩa
 */
export function getLessonContent(lessonId) {
  if (LESSONS_CONTENT[lessonId]) {
    return LESSONS_CONTENT[lessonId];
  }

  // Fallback an toàn cho bài học tương lai
  return {
    id: lessonId,
    title: `Bài Học ${lessonId}`,
    steps: [
      {
        type: 'theory',
        title: 'Bài Học Đang Được Cập Nhật',
        rule: 'Nội dung thực hành phản xạ cho bài học này đang được bổ sung. Hãy ôn tập từ vựng trong Hộp SRS nhé!',
        examples: []
      }
    ]
  };
}
