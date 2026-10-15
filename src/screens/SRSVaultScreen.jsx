import React, { useState } from 'react';
import { Volume2, RotateCw, Check, X, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { useSRSStore } from '../stores/useSRSStore';
import { useUserStore } from '../stores/useUserStore';
import { webSpeech } from '../services/webSpeechService';

export const SRSVaultScreen = () => {
  const { accent, addXp } = useUserStore();
  const { items, getDueItems, getBoxCounts, reviewWord } = useSRSStore();
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [practiceAll, setPracticeAll] = useState(false);

  const dueItems = practiceAll ? items : getDueItems();
  const boxCounts = getBoxCounts();
  const currentCard = dueItems[currentQueueIndex] || null;

  // Xử lý khi người dùng bấm Đã Nhớ hoặc Chưa Thuộc
  const handleReviewAnswer = (isCorrect) => {
    if (!currentCard) return;

    if (isCorrect) {
      webSpeech.playCorrectSound();
      addXp(15);
    } else {
      webSpeech.playWrongSound();
    }

    reviewWord(currentCard.id, isCorrect);
    setIsFlipped(false);

    // Chuyển sang thẻ tiếp theo
    if (currentQueueIndex < dueItems.length - 1) {
      setCurrentQueueIndex(currentQueueIndex + 1);
    } else {
      setCurrentQueueIndex(0);
    }
  };

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 1. Trực quan hóa 5 Hộp Leitner */}
      <div style={{
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={18} color="var(--color-primary-light)" />
            <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Két Sắt SRS (5 Hộp Leitner)
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Tổng: {items.length} cụm
          </span>
        </div>

        {/* 5 Hộp phân bổ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
          {[1, 2, 3, 4, 5].map((boxNum) => {
            const count = boxCounts[boxNum] || 0;
            const daysMap = { 1: '1d', 2: '3d', 3: '7d', 4: '14d', 5: '30d' };
            const isMasterBox = boxNum === 5;

            return (
              <div
                key={boxNum}
                style={{
                  background: isMasterBox ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-surface-elevated)',
                  border: isMasterBox ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '8px 4px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px'
                }}
              >
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Hộp {boxNum}
                </span>
                <span style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: isMasterBox ? 'var(--color-accent-light)' : 'var(--text-primary)'
                }}>
                  {count}
                </span>
                <span style={{ fontSize: '0.62rem', color: isMasterBox ? 'var(--color-accent-light)' : 'var(--color-primary-light)', fontWeight: 600 }}>
                  {daysMap[boxNum]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Thẻ Ôn Tập Flashcard 3D */}
      {currentCard ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{practiceAll ? 'Thẻ ôn tự do:' : 'Thẻ đến hạn:'} {currentQueueIndex + 1} / {dueItems.length}</span>
              {practiceAll && (
                <button
                  onClick={() => { setPracticeAll(false); setCurrentQueueIndex(0); }}
                  style={{ background: 'none', border: 'none', color: 'var(--color-primary-light)', fontSize: '0.72rem', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Quay lại mặc định
                </button>
              )}
            </div>
            <span className="badge badge-indigo">Hộp {currentCard.box || 1}</span>
          </div>

          {/* Vùng lật thẻ 3D */}
          <div
            className="flip-card-perspective"
            style={{ width: '100%', height: '270px' }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
              {/* MẶT TRƯỚC (Từ gốc + Âm thanh) */}
              <div className="flip-card-front glass-panel" style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                padding: '24px',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      webSpeech.speak(currentCard.word, { accent });
                    }}
                    className="btn-3d btn-3d-subtle"
                    style={{ padding: '6px 10px', fontSize: '0.75rem', gap: '4px' }}
                  >
                    <Volume2 size={14} />
                    <span>Phát âm</span>
                  </button>
                </div>

                <div style={{ margin: 'auto 0' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {currentCard.word}
                  </div>
                  <div style={{ fontSize: '1.15rem', color: 'var(--color-primary-light)', fontWeight: 600, marginTop: '4px' }}>
                    {currentCard.ipa}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    Nghĩa gốc: {currentCard.rootMeaning}
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <RotateCw size={12} />
                  <span>Chạm vào thẻ để xem cụm từ và câu ví dụ</span>
                </div>
              </div>

              {/* MẶT SAU (Cụm từ + Đổi nghĩa khi vào câu + Ví dụ) */}
              <div className="flip-card-back glass-panel" style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-active)',
                padding: '20px',
                textAlign: 'left'
              }}>
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-streak)', textTransform: 'uppercase' }}>
                    KHI GHÉP THÀNH CỤM (CHUNK):
                  </span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {currentCard.chunk}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-accent-light)', fontWeight: 600, marginTop: '2px' }}>
                    {currentCard.chunkMeaning}
                  </div>
                </div>

                <div style={{
                  background: 'var(--bg-tint)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px',
                  margin: 'auto 0',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    "{currentCard.exampleEn}"
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {currentCard.exampleVi}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      webSpeech.speak(currentCard.exampleEn, { accent, rate: 0.85 });
                    }}
                    className="btn-3d btn-3d-subtle"
                    style={{ padding: '6px 10px', fontSize: '0.72rem', gap: '4px' }}
                  >
                    <Volume2 size={13} />
                    <span>Nghe cả câu</span>
                  </button>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Chạm để lật lại</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2 Nút Đánh Giá Kết Quả Leitner */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button
              onClick={() => handleReviewAnswer(false)}
              className="btn-3d"
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                color: 'var(--color-danger)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                gap: '8px',
                padding: '14px'
              }}
            >
              <X size={18} />
              <span>Chưa Thuộc (Về Hộp 1)</span>
            </button>

            <button
              onClick={() => handleReviewAnswer(true)}
              className="btn-3d btn-3d-accent"
              style={{ gap: '8px', padding: '14px' }}
            >
              <Check size={18} />
              <span>Đã Nhớ (+15 XP)</span>
            </button>
          </div>
        </div>
      ) : (
        /* Khi đã ôn hết hàng chờ hôm nay */
        <div style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          padding: '36px 20px',
          textAlign: 'center',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-accent-light)'
          }}>
            <Sparkles size={28} />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Tuyệt Vời! Đã Hoàn Thành Ôn Tập Hôm Nay
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '300px', lineHeight: 1.4 }}>
            Toàn bộ các từ đến hạn đã được thăng cấp vào các hộp trí nhớ dài hạn. Hẹn gặp lại bạn vào ngày mai!
          </p>
          <button
            onClick={() => {
              setPracticeAll(true);
              setCurrentQueueIndex(0);
            }}
            className="btn-3d btn-3d-primary"
            style={{ marginTop: '8px', padding: '12px 20px', gap: '8px', display: 'flex', alignItems: 'center' }}
          >
            <RotateCw size={16} />
            <span>Ôn Tập Toàn Bộ Vốn Từ ({items.length} cụm)</span>
          </button>
        </div>
      )}
    </div>
  );
};
