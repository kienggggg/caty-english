/**
 * CatY Linguistic Diagnostic & Native Polishing Engine
 * Phân tích lỗi ngữ pháp, dùng từ gượng gạo và gợi ý cách diễn đạt chuẩn người bản xứ.
 */

// Danh sách các mẫu lỗi kinh điển của người học (đặc biệt người Việt học tiếng Anh)
const COMMON_ERROR_RULES = [
  {
    regex: /\bi\s+(?:am\s+)?very\s+like\b/i,
    originalText: 'very like',
    fixText: 'really like / love',
    rule: "Trong tiếng Anh, 'very' không bổ nghĩa trực tiếp cho động từ 'like'.",
    tip: "Dùng 'I really like...' hoặc 'I'm a big fan of...' thay vì 'I very like'."
  },
  {
    regex: /\bi\s+am\s+agree\b/i,
    originalText: 'I am agree',
    fixText: 'I agree / I completely agree',
    rule: "'Agree' là một động từ thường, không dùng với động từ to-be 'am'.",
    tip: "Nói 'I agree with you' hoặc 'I couldn't agree more'."
  },
  {
    regex: /\bopen\s+(?:the\s+)?(?:light|fan|air\s*conditioner|ac|tv)\b/i,
    originalText: 'open [thiết bị điện]',
    fixText: 'turn on / switch on',
    rule: "'Open' dùng cho cửa sổ/hộp; với thiết bị điện phải dùng 'turn on' hoặc 'switch on'.",
    tip: "Ví dụ: 'Could you please turn on the light / AC?'"
  },
  {
    regex: /\bclose\s+(?:the\s+)?(?:light|fan|air\s*conditioner|ac|tv)\b/i,
    originalText: 'close [thiết bị điện]',
    fixText: 'turn off / switch off',
    rule: "'Close' dùng cho cửa/mắt; với thiết bị điện phải dùng 'turn off'.",
    tip: "Ví dụ: 'Don't forget to turn off the light.'"
  },
  {
    regex: /\bmarry\s+with\b/i,
    originalText: 'marry with',
    fixText: 'marry / get married to',
    rule: "Động từ 'marry' là ngoại động từ trực tiếp (marry somebody), không đi với 'with'.",
    tip: "Nói 'She married John' hoặc 'She is married to John'."
  },
  {
    regex: /\bexplain\s+me\b/i,
    originalText: 'explain me',
    fixText: 'explain to me',
    rule: "'Explain' cần giới từ 'to' khi chỉ người nhận giải thích.",
    tip: "Ví dụ: 'Can you explain this to me?'"
  },
  {
    regex: /\bmust\s+to\s+([a-z]+)\b/i,
    originalText: 'must to',
    fixText: 'must + V (nguyên thể)',
    rule: "Động từ khuyết thiếu 'must' đi trực tiếp với động từ nguyên thể không 'to'.",
    tip: "Ví dụ: 'I must go now' thay vì 'I must to go'."
  },
  {
    regex: /\bcan\s+to\s+([a-z]+)\b/i,
    originalText: 'can to',
    fixText: 'can + V (nguyên thể)',
    rule: "Động từ khiếm khuyết 'can' không đi kèm 'to'.",
    tip: "Ví dụ: 'I can speak English' thay vì 'I can to speak'."
  },
  {
    regex: /\blook\s+forward\s+to\s+([a-z]+)(?<!ing)\b/i,
    originalText: 'look forward to + V nguyên thể',
    fixText: 'look forward to + V-ing',
    rule: "Cụm 'look forward to' thì 'to' là giới từ, bắt buộc theo sau bởi danh từ hoặc V-ing.",
    tip: "Ví dụ: 'I look forward to hearing from you.'"
  },
  {
    regex: /\bhow\s+to\s+say\s+this\b/i,
    originalText: 'how to say this?',
    fixText: 'how do you say this?',
    rule: "'How to say' chỉ là cụm danh từ/ngữ, trong câu hỏi giao tiếp cần trợ động từ.",
    tip: "Nói: 'How do you say this in English?'"
  },
  {
    regex: /\balmost\s+(?:people|students|workers)\b/i,
    originalText: 'almost people',
    fixText: 'most people / almost all people',
    rule: "'Almost' là trạng từ (gần như), không bổ nghĩa trực tiếp cho danh từ đếm được số nhiều.",
    tip: "Dùng: 'Most people' hoặc 'Almost all people'."
  },
  {
    regex: /\bno\s+have\b/i,
    originalText: 'no have',
    fixText: "don't have / there is no",
    rule: "Không dịch nguyên văn tiếng Việt 'không có' thành 'no have'.",
    tip: "Dùng 'I don't have...' hoặc 'There is no...'"
  },
  {
    regex: /\bgive\s+me\s+one\s+([a-z]+)\b/i,
    originalText: 'give me one ...',
    fixText: 'Could I get / I would like ...',
    rule: "'Give me...' nghe khá cộc lốc trong giao tiếp mua sắm hoặc nhà hàng.",
    tip: "Người bản xứ thường nói lịch sự: 'Could I please get a/an...' hoặc 'I would like...'"
  },
  {
    regex: /\bi\s+(?:go|come)\s+to\s+home\b/i,
    originalText: 'go to home',
    fixText: 'go home',
    rule: "'Home' ở đây đóng vai trò là trạng từ chỉ nơi chốn, không dùng giới từ 'to'.",
    tip: "Nói: 'I'm going home' thay vì 'going to home'."
  },
  {
    regex: /\bhe\s+don't\b/i,
    originalText: "he don't",
    fixText: "he doesn't",
    rule: "Chủ ngữ ngôi thứ 3 số ít (He/She/It) đi với trợ động từ phủ định 'doesn't'.",
    tip: "Sửa thành: 'He doesn't...'"
  },
  {
    regex: /\bshe\s+don't\b/i,
    originalText: "she don't",
    fixText: "she doesn't",
    rule: "Chủ ngữ 'she' đi với 'doesn't'.",
    tip: "Sửa thành: 'She doesn't...'"
  },
  {
    regex: /\beverybody\s+are\b/i,
    originalText: 'everybody are',
    fixText: 'everybody is',
    rule: "'Everybody / Everyone' là đại từ bất định, ngữ pháp tiếng Anh chia động từ số ít.",
    tip: "Ví dụ: 'Everybody is ready.'"
  }
];

// Bản nâng cấp câu nói tự nhiên hơn theo ngữ cảnh
const NATIVE_POLISH_PATTERNS = [
  {
    match: /i\s+want\s+to\s+buy/i,
    polished: "I'm looking to get...",
    vocabTip: "Dùng 'I'm looking for / I'd like to pick up' giúp ngữ điệu tự nhiên hơn 'I want to buy'."
  },
  {
    match: /what\s+do\s+you\s+think/i,
    polished: "What's your take on this?",
    vocabTip: "'What's your take on...?' là cách hỏi ý kiến cực kỳ thông dụng của người bản xứ."
  },
  {
    match: /i\s+think\s+so/i,
    polished: "I totally feel the same way! / Definitely.",
    vocabTip: "Thay đổi đa dạng giữa 'Definitely', 'Absolutely' và 'I couldn't agree more'."
  },
  {
    match: /it\s+is\s+very\s+hot/i,
    polished: "It's boiling out here! / It's scorching hot.",
    vocabTip: "Nâng cấp từ vựng: 'boiling' hoặc 'scorching' để diễn tả nóng nực sống động hơn."
  },
  {
    match: /i\s+am\s+very\s+tired/i,
    polished: "I'm completely exhausted / wiped out.",
    vocabTip: "'Exhausted' hoặc 'wiped out' diễn tả sự mệt mỏi chuẩn người bản xứ."
  }
];

/**
 * Phân tích câu của người dùng, trả về chẩn đoán chi tiết và giải pháp nâng cấp.
 */
export function evaluateUserSpeech(text, scenarioContext = {}) {
  const trimmed = (text || '').trim();
  if (!trimmed) {
    return {
      hasMistake: false,
      mistakes: [],
      nativePolish: '',
      fluencyScore: 0,
      vocabularyNugget: null,
      encouragement: 'Hãy thử cất lời hoặc gõ một câu để CatY cùng bạn đối luyện nhé!'
    };
  }

  const mistakesFound = [];

  // 1. Quét các quy tắc lỗi ngữ pháp & diễn đạt
  for (const rule of COMMON_ERROR_RULES) {
    if (rule.regex.test(trimmed)) {
      mistakesFound.push({
        original: rule.originalText,
        fix: rule.fixText,
        rule: rule.rule,
        tip: rule.tip
      });
    }
  }

  // 2. Tìm gợi ý nói tự nhiên hơn (Native Polish)
  let nativePolish = '';
  let vocabNugget = null;

  for (const polish of NATIVE_POLISH_PATTERNS) {
    if (polish.match.test(trimmed)) {
      nativePolish = trimmed.replace(polish.match, polish.polished);
      vocabNugget = polish.vocabTip;
      break;
    }
  }

  // Nếu không khớp pattern cụ thể, tạo phiên bản tinh chỉnh nhẹ nếu có lỗi
  if (!nativePolish && mistakesFound.length > 0) {
    let corrected = trimmed;
    mistakesFound.forEach(m => {
      if (m.original === 'I am agree') corrected = corrected.replace(/i\s+am\s+agree/gi, 'I agree');
      if (m.original === 'very like') corrected = corrected.replace(/very\s+like/gi, 'really like');
      if (m.original === 'he don\'t') corrected = corrected.replace(/he\s+don't/gi, "he doesn't");
      if (m.original === 'she don\'t') corrected = corrected.replace(/she\s+don't/gi, "she doesn't");
      if (m.original === 'give me one ...') corrected = corrected.replace(/give\s+me\s+one/gi, 'Could I please get a');
      if (m.original === 'go to home') corrected = corrected.replace(/go\s+to\s+home/gi, 'go home');
      if (m.original === 'everybody are') corrected = corrected.replace(/everybody\s+are/gi, 'everybody is');
    });
    nativePolish = corrected !== trimmed ? corrected : null;
  }

  // 3. Tính điểm độ mượt mà (Fluency Score)
  const wordCount = trimmed.split(/\s+/).length;
  let fluencyScore = Math.min(100, Math.max(50, wordCount * 12));
  if (mistakesFound.length > 0) {
    fluencyScore = Math.max(45, fluencyScore - mistakesFound.length * 20);
  } else if (wordCount >= 5) {
    fluencyScore = Math.min(100, fluencyScore + 15);
  }

  // 4. Lời khuyên & Động viên từ CatY
  let encouragement = '';
  if (mistakesFound.length === 0) {
    encouragement = wordCount >= 6 
      ? '😻 Xuất sắc! Câu nói rất trôi chảy, đúng ngữ pháp và tự nhiên!'
      : '😺 Tốt lắm! Câu đúng cấu trúc, hãy thử mở rộng thêm chi tiết nhé!';
  } else {
    encouragement = '🐱 CatY đã bắt được vài điểm có thể hoàn thiện hơn ở trên! Xem mẹo và lưu lại nhé!';
  }

  return {
    hasMistake: mistakesFound.length > 0,
    mistakes: mistakesFound,
    nativePolish: nativePolish || (mistakesFound.length === 0 ? 'Câu của bạn đã rất tự nhiên!' : null),
    fluencyScore,
    vocabularyNugget: vocabNugget || (scenarioContext.suggestedVocab ? `Mẹo ngữ cảnh: Thử vận dụng cụm "${scenarioContext.suggestedVocab}" xem sao!` : null),
    encouragement
  };
}
