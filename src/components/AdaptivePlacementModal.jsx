import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, BookOpen, Zap } from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';
import { webSpeech } from '../services/webSpeechService';

export const AdaptivePlacementModal = () => {
  const { isPlacementDone, finishPlacementTest } = useUserStore();
  const [step, setStep] = useState('welcome'); // 'welcome' | 'testing' | 'accent' | 'result'
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAccent, setSelectedAccent] = useState('US');
  const [selfConfidence, setSelfConfidence] = useState(30);

  if (isPlacementDone) return null;

  const placementQuestions = [
    {
      id: 1,
      question: 'Từ "cats" có âm đuôi phát âm là gì?',
      options: ['/s/ (bật hơi gió)', '/z/ (rung cổ họng)', '/ɪz/ (đọc thành kít-xịt)'],
      correctIndex: 0,
      hint: 'Áp dụng thần chú: Thời phong kiến fương tây!'
    },
    {
      id: 2,
      question: 'Chọn cách diễn đạt chuẩn trật tự tiếng Anh:',
      options: ['a red apple (quả táo đỏ)', 'an apple red (quả táo đỏ)'],
      correctIndex: 0,
      hint: 'Tính từ mô tả màu sắc đứng trước danh từ.'
    },
    {
      id: 3,
      question: 'Điền vào chỗ trống: "I ______ agree with you."',
      options: ['agree (không dùng am)', 'am agree (dịch từng chữ là Tôi thì đồng ý)'],
      correctIndex: 0,
      hint: 'Agree là động từ thường chỉ quan điểm, không ghép với am!'
    }
  ];

  // Người dùng chọn bắt đầu từ con số 0
  const handleStartFromZero = () => {
    finishPlacementTest({ level: 'beginner', accent: selectedAccent });
  };

  // Trả lời câu hỏi
  const handleSelectAnswer = (index) => {
    const isCorrect = index === placementQuestions[currentQIndex].correctIndex;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);

    if (isCorrect) {
      webSpeech.playCorrectSound();
    } else {
      webSpeech.playWrongSound();
    }

    if (currentQIndex < placementQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // Đã xong bài test
      const correctCount = newAnswers.filter(Boolean).length;
      const suggestedLevel = correctCount >= 2 && selfConfidence >= 50 ? 'elementary' : 'beginner';
      finishPlacementTest({ level: suggestedLevel, accent: selectedAccent });
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg-overlay)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '400px',
        width: '100%',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        border: '1px solid var(--border-active)',
        boxShadow: 'var(--shadow-md)'
      }}>
        {/* Bước 1: Welcome & Lựa chọn lộ trình */}
        {step === 'welcome' && (
          <>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #10B981, #6366F1)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)'
              }}>
                <Sparkles size={28} color="#FFFFFF" />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Chào Mừng Bạn Đến CatY! 🐱
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>
                Học tiếng Anh kỷ luật cùng chú mèo cam: Xoá tan nỗi sợ phát âm, đối luyện AI và cam kết hoàn thành mục tiêu.
              </p>
            </div>

            {/* Chọn Accent US / UK */}
            <div style={{
              background: 'var(--bg-surface-elevated)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                CHỌN GIỌNG PHÁT ÂM ƯA THÍCH:
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedAccent('US')}
                  className={`btn-3d ${selectedAccent === 'US' ? 'btn-3d-primary' : 'btn-3d-subtle'}`}
                  style={{ padding: '8px', fontSize: '0.85rem' }}
                >
                  🇺🇸 Giọng Mỹ (US)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAccent('UK')}
                  className={`btn-3d ${selectedAccent === 'UK' ? 'btn-3d-primary' : 'btn-3d-subtle'}`}
                  style={{ padding: '8px', fontSize: '0.85rem' }}
                >
                  🇬🇧 Giọng Anh (UK)
                </button>
              </div>
            </div>

            {/* 2 Lựa chọn Khởi Đầu */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={handleStartFromZero}
                className="btn-3d btn-3d-accent"
                style={{ padding: '14px', width: '100%', gap: '8px' }}
              >
                <BookOpen size={18} />
                <span>Tôi Bắt Đầu Từ Con Số 0 (Khuyến Nghị)</span>
              </button>

              <button
                onClick={() => setStep('testing')}
                className="btn-3d btn-3d-subtle"
                style={{ padding: '12px', width: '100%', gap: '8px' }}
              >
                <Zap size={16} color="var(--color-primary-light)" />
                <span>Kiểm Tra Nhanh Xếp Lớp (1 Phút)</span>
              </button>
            </div>
          </>
        )}

        {/* Bước 2: Adaptive Placement Test (3 câu ngắn) */}
        {step === 'testing' && (
          <>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                <span>Câu {currentQIndex + 1} / {placementQuestions.length}</span>
                <span>Kiểm Tra Đầu Vào</span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {placementQuestions[currentQIndex].question}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {placementQuestions[currentQIndex].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  className="btn-3d btn-3d-subtle"
                  style={{
                    padding: '12px 14px',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    fontSize: '0.85rem'
                  }}
                >
                  <span style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    marginRight: '10px'
                  }}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </button>
              ))}
            </div>

            <div style={{
              fontSize: '0.75rem',
              color: 'var(--color-streak)',
              background: 'rgba(245, 158, 11, 0.1)',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)'
            }}>
              💡 {placementQuestions[currentQIndex].hint}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
