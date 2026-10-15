/**
 * Dữ liệu các kịch bản đối luyện thực tế (Real-world Sparring Scenarios)
 */

export const SPARRING_SCENARIOS = [
  {
    id: 'coffee_order',
    title: 'Gọi Cà Phê & Tùy Chỉnh',
    englishTitle: 'Coffee Shop Ordering',
    icon: '☕',
    badge: 'Đời Sống Hàng Ngày',
    difficulty: 'Cơ Bản (A1 - A2)',
    partnerName: 'Barista Alex',
    partnerAvatar: '☕',
    partnerRole: 'Nhân viên pha chế thân thiện tại New York',
    situation: 'Bạn vừa bước vào một quán cà phê đông khách. Bạn muốn gọi 1 ly latte đá sữa yến mạch, ít đường, ít đá và hỏi pass Wi-Fi.',
    starterBotMessage: "Hi there! Welcome to Central Brew. What can I get started for you today?",
    suggestedResponses: [
      "Could I please get an iced latte with oat milk?",
      "Can I have a hot cappuccino and the Wi-Fi password?",
      "Do you have any pastries or croissants today?"
    ],
    targetVocab: ['iced latte', 'oat milk', 'light ice', 'half sweet', 'to-go / for here'],
    dialogueTree: {
      defaultBotResponses: [
        "Sure thing! Would you like that for here or to go?",
        "Got it! What size can I make that for you — Small, Medium, or Large?",
        "Awesome! Would you like any extra flavor shots or syrup with that?",
        "Perfect! That comes out to $5.25. How would you like to pay — card or cash?",
        "Here is your receipt and your drink will be right up at the pick-up counter! Enjoy your day!"
      ]
    }
  },
  {
    id: 'job_interview',
    title: 'Phỏng Vấn Xin Việc',
    englishTitle: 'Tech Job Interview',
    icon: '💼',
    badge: 'Công Sở & Sự Nghiệp',
    difficulty: 'Trung Cấp (B1 - B2)',
    partnerName: 'Sarah - HR Manager',
    partnerAvatar: '💼',
    partnerRole: 'Trưởng phòng nhân sự công ty quốc tế',
    situation: 'Bạn đang tham gia vòng phỏng vấn 1-1 bằng tiếng Anh. Hãy tự tin giới thiệu bản thân, chia sẻ kinh nghiệm và cách bạn xử lý khó khăn.',
    starterBotMessage: "Good morning! Thanks for joining us today. To kick things off, could you please tell me a little bit about yourself and your background?",
    suggestedResponses: [
      "I have over 3 years of experience in software development and teamwork.",
      "I graduated with a degree in Computer Science and love building user-friendly products.",
      "In my previous role, I led several agile projects with cross-functional teams."
    ],
    targetVocab: ['track record', 'passionate about', 'problem-solving', 'cross-functional', 'collaborate'],
    dialogueTree: {
      defaultBotResponses: [
        "That's very impressive! Could you describe a challenging situation at work and how you handled it?",
        "Great insights! How do you typically resolve disagreements with your teammates or stakeholders?",
        "Where do you see yourself professionally in the next 3 to 5 years?",
        "Thank you so much for sharing! Do you have any questions for me about our team culture?"
      ]
    }
  },
  {
    id: 'airport_travel',
    title: 'Hải Quan & Thất Lạc Hành Lý',
    englishTitle: 'Airport Customs & Lost Luggage',
    icon: '✈️',
    badge: 'Du Lịch & Xuất Ngoại',
    difficulty: 'Thực Chiến (A2 - B1)',
    partnerName: 'Officer Miller',
    partnerAvatar: '🛂',
    partnerRole: 'Cán bộ hải quan & Kiểm soát biên giới',
    situation: 'Bạn vừa hạ cánh xuống sân bay quốc tế. Cán bộ hải quan hỏi về mục đích chuyến đi, nơi lưu trú và bạn cần hỗ trợ tìm hành lý ký gửi.',
    starterBotMessage: "Next in line, please. Passports and boarding passes ready. What is the primary purpose of your visit today?",
    suggestedResponses: [
      "I'm here for tourism and traveling for about two weeks.",
      "I'm visiting friends and attending a conference.",
      "I have a hotel booking in downtown."
    ],
    targetVocab: ['purpose of visit', 'baggage claim', 'carousel', 'lost luggage report', 'duration of stay'],
    dialogueTree: {
      defaultBotResponses: [
        "How long do you plan to stay in the country, and where will you be staying?",
        "Are you carrying any fresh food, plants, or currency exceeding $10,000?",
        "All stamps are set! Welcome. Did your luggage arrive at Carousel 4 okay?",
        "If your bag is missing, head right over to the Baggage Service Desk to fill out a Property Irregularity Report."
      ]
    }
  },
  {
    id: 'hotel_negotiation',
    title: 'Khiếu Nại & Đổi Phòng Khách Sạn',
    englishTitle: 'Hotel Front Desk Request',
    icon: '🏨',
    badge: 'Xử Lý Tình Huống',
    difficulty: 'Thực Tế (A2 - B1)',
    partnerName: 'David - Concierge',
    partnerAvatar: '🛎️',
    partnerRole: 'Lễ tân khách sạn 4 sao',
    situation: 'Điều hòa phòng bạn không mát và phòng bên cạnh gây ồn lúc đêm khuya. Hãy lịch sự phản ánh và đề nghị chuyển sang phòng yên tĩnh hơn.',
    starterBotMessage: "Good evening, welcome to the Front Desk. How may I assist you this evening, sir/madam?",
    suggestedResponses: [
      "I'm calling from Room 402. The air conditioner seems to be broken.",
      "The room next door is playing very loud music. Could you please help?",
      "Could we possibly request a room change to a quieter floor?"
    ],
    targetVocab: ['room change', 'air conditioner malfunction', 'disturbing noise', 'quieter room', 'apologize for inconvenience'],
    dialogueTree: {
      defaultBotResponses: [
        "Oh, I am terribly sorry to hear that! Let me check our system right away for available rooms.",
        "We have a quiet executive room on the 7th floor. Would you like our bellboy to assist with your luggage?",
        "I have updated your keycards. Here is a complimentary breakfast voucher for the inconvenience. Sleep well!"
      ]
    }
  },
  {
    id: 'free_talk',
    title: 'Tán Gẫu Tự Do Cùng CatY 🐱',
    englishTitle: 'Free Talk with CatY',
    icon: '🐱',
    badge: 'Luyện Phản Xạ 1-1',
    difficulty: 'Mọi Trình Độ',
    partnerName: 'CatY AI Coach',
    partnerAvatar: '🐱',
    partnerRole: 'Mèo gia sư tiếng Anh thông minh & kiên nhẫn',
    situation: 'Trò chuyện bất cứ chủ đề gì bạn thích: ẩm thực, phim ảnh, sở thích, kế hoạch cuối tuần. CatY sẽ vừa trò chuyện vừa bắt lỗi giúp bạn sửa từng câu.',
    starterBotMessage: "Meow! 🐱 I'm your CatY sparring buddy! Tell me, how was your day today, or what's on your mind?",
    suggestedResponses: [
      "I had a pretty busy day at work, but now I'm relaxing.",
      "I'm planning to travel to Da Nang next month!",
      "I watched an amazing movie yesterday called Inception."
    ],
    targetVocab: ['chitchat', 'unwind', 'hobbies', 'daily routine', 'sound natural'],
    dialogueTree: {
      defaultBotResponses: [
        "That sounds super interesting! What was the highlight of your day?",
        "Ooh tell me more! Why did that stand out so much to you?",
        "Haha I love that! If you could do anything this upcoming weekend, what would it be?",
        "You're doing fantastic! Keep sharing your thoughts with me in English!"
      ]
    }
  },
  {
    id: 'speed_drill',
    title: 'Thử Thách Phản Xạ 60 Giây ⚡',
    englishTitle: '60s Rapid Fire Drill',
    icon: '⚡',
    badge: 'Phản Xạ Bắn Tốc Độ',
    difficulty: 'Thử Thách Nhanh',
    partnerName: 'Drill Master CatY',
    partnerAvatar: '⚡',
    partnerRole: 'Huấn luyện viên phản xạ ngôn ngữ tức thì',
    situation: 'CatY sẽ đưa ra các câu hỏi hoặc tình huống đột xuất. Bạn cần phản xạ trả lời trong 1 câu duy nhất càng nhanh càng tốt mà không cần dịch nhẩm!',
    starterBotMessage: "⚡ Round 1: Someone accidentally bumps into you at the station and says 'Oh, I am so sorry!' — What do you say back immediately?",
    suggestedResponses: [
      "No worries at all! / That's totally fine!",
      "Don't worry about it, you're good!",
      "It's all right, no harm done!"
    ],
    targetVocab: ['no worries', 'it happens', 'all good', 'my pleasure', 'excuse me'],
    dialogueTree: {
      defaultBotResponses: [
        "⚡ Round 2: A friend asks: 'Do you mind if I borrow your pen for a second?' — Answer politely without confusing 'Yes' and 'No'!",
        "⚡ Round 3: A waiter asks: 'Would you like some dessert or just the check?' — How do you ask for the bill politely?",
        "⚡ Round 4: Your boss invites you for dinner tonight, but you already have plans. How do you decline gracefully?",
        "🎉 Hoàn thành xuất sắc vòng phản xạ nhanh! Tốc độ phản xạ của bạn đã tăng đáng kể!"
      ]
    }
  }
];
