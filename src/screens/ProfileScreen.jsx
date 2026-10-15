import React, { useState } from 'react';
import { Award, Flame, Star, Mic, RotateCcw, Volume2, Sparkles, Share2, Play, Calendar, CheckCircle2, Sliders, Lock, Coins } from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';
import { useSRSStore } from '../stores/useSRSStore';
import { useMotivationStore } from '../stores/useMotivationStore';
import { CertificateModal } from '../components/CertificateModal';
import { CustomRoadmapModal } from '../components/CustomRoadmapModal';
import { webSpeech } from '../services/webSpeechService';

export const ProfileScreen = () => {
  const { name, xp, streakDays, accent, setAccent, finishPlacementTest, setActiveTab, learningStyle, dailyGoalMinutes } = useUserStore();
  const { items } = useSRSStore();
  const { activeContract, walletBalance, stats } = useMotivationStore();
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);

  // Phát mẫu âm thanh 3 mốc thời gian (Thử Thách 30 Ngày Đổi Giọng)
  const playSampleDay1 = () => {
    // Ngày 1: Chưa có âm đuôi, phát âm ngọng tiếng Việt
    webSpeech.speak('I lie eng-lit cat', { rate: 0.7 });
  };

  const playSampleDay15 = () => {
    // Ngày 15: Bắt đầu có âm đuôi nhưng còn hơi gượng
    webSpeech.speak('I like.. English.. cats', { accent, rate: 0.75 });
  };

  const playSampleDay30 = () => {
    // Ngày 30: Trôi chảy, tự nhiên, bật hơi chuẩn
    webSpeech.speak('I like English cats very much!', { accent, rate: 0.88 });
  };

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Thẻ Hồ Sơ Người Học */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366F1, #10B981)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontSize: '1.4rem',
          fontWeight: 800,
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
        }}>
          {name.charAt(0)}
        </div>

        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {name}
          </h3>
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <span className="badge badge-amber">🔥 {streakDays} Ngày Chuỗi</span>
            <span className="badge badge-indigo">⭐ {xp} XP</span>
          </div>
        </div>
      </div>

      {/* Thẻ Lộ Trình & Cách Học Cá Nhân Hóa */}
      <div style={{
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sliders size={16} color="var(--color-primary-light)" />
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Cách Học & Lộ Trình Của Bạn
            </h4>
          </div>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {learningStyle === 'audio_mirror' ? '🎙️ Audio Mirror & Phát âm' : (learningStyle === 'srs_vocab' ? '🧠 Ghi Nhớ Vĩnh Cửu (SRS)' : (learningStyle === 'survival_comm' ? '⚡ Giao Tiếp Sinh Tồn' : '⚖️ Cân Bằng Toàn Diện'))} • {dailyGoalMinutes}p/ngày
          </p>
        </div>

        <button
          onClick={() => setCustomModalOpen(true)}
          className="btn btn-secondary btn-sm"
          style={{ padding: '6px 12px', fontSize: '0.74rem', whiteSpace: 'nowrap' }}
        >
          Tùy Chỉnh
        </button>
      </div>

      {/* Thẻ Hũ Kỷ Luật CatY (Motivation Vault) */}
      <div style={{
        background: activeContract ? 'rgba(245, 158, 11, 0.08)' : 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        border: `1px solid ${activeContract ? 'rgba(245, 158, 11, 0.3)' : 'var(--border-subtle)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '1.2rem' }}>🐱💰</span>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Hũ Kỷ Luật CatY
            </h4>
            {activeContract && (
              <span className="badge badge-amber" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                Đang cọc {activeContract.amount.toLocaleString()}đ
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {activeContract 
              ? `Chuỗi cam kết: ${activeContract.currentStreakInContract}/${activeContract.targetDays} ngày (Thưởng: +${(activeContract.amount * activeContract.bonusRate).toLocaleString()}đ)`
              : `Khóa quỹ cọc kỷ luật tự nguyện: Giữ chuỗi hoàn 100% tiền + Thưởng 10%.`}
          </p>
        </div>

        <button
          onClick={() => setActiveTab('vault')}
          className="btn btn-primary btn-sm"
          style={{ padding: '6px 12px', fontSize: '0.74rem', whiteSpace: 'nowrap', background: 'linear-gradient(135deg, #F59E0B, #10B981)' }}
        >
          {activeContract ? 'Xem Hũ' : 'Ký Quỹ'}
        </button>
      </div>

      {/* 2. Thử Thách 30 Ngày Đổi Giọng (Voice Transformation Challenge) */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} color="var(--color-primary-light)" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Thử Thách 30 Ngày Đổi Giọng
            </h4>
          </div>
          <span className="badge badge-emerald">Killer Feature</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          Tai nghe mắt thấy sự lột xác của bạn qua 3 mốc thời gian: Ngày 1 → Ngày 15 → Ngày 30.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {/* Mốc Ngày 1 */}
          <div style={{
            background: 'var(--bg-surface-elevated)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 8px',
            border: '1px solid var(--border-subtle)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-danger)' }}>
              🔴 NGÀY 1
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              Mất âm đuôi
            </span>
            <button
              onClick={playSampleDay1}
              className="btn-3d btn-3d-subtle"
              style={{ padding: '6px', fontSize: '0.72rem', marginTop: 'auto' }}
            >
              <Play size={12} fill="currentColor" />
            </button>
          </div>

          {/* Mốc Ngày 15 */}
          <div style={{
            background: 'rgba(245, 158, 11, 0.08)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 8px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-streak)' }}>
              🟡 NGÀY 15
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              Đã có âm gió
            </span>
            <button
              onClick={playSampleDay15}
              className="btn-3d btn-3d-subtle"
              style={{ padding: '6px', fontSize: '0.72rem', marginTop: 'auto' }}
            >
              <Play size={12} fill="currentColor" />
            </button>
          </div>

          {/* Mốc Ngày 30 */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 8px',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-accent-light)' }}>
              🟢 NGÀY 30
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-primary)' }}>
              Bản ngữ chuẩn
            </span>
            <button
              onClick={playSampleDay30}
              className="btn-3d btn-3d-accent"
              style={{ padding: '6px', fontSize: '0.72rem', marginTop: 'auto' }}
            >
              <Play size={12} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Chứng Chỉ Thành Tựu Cột Mốc */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} color="#F59E0B" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Chứng Chỉ Cột Mốc Đạt Được
            </h4>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-surface-elevated)',
          borderRadius: 'var(--radius-md)',
          padding: '14px',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Chứng Chỉ Chặng 1: Thợ Săn Âm Đuôi
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Đã mở khóa 44 âm IPA và quy tắc s/es/ed
            </div>
          </div>

          <button
            onClick={() => setCertModalOpen(true)}
            className="btn-3d btn-3d-primary"
            style={{ padding: '8px 14px', fontSize: '0.78rem', gap: '6px' }}
          >
            <Share2 size={14} />
            <span>Xem & Chia Sẻ</span>
          </button>
        </div>
      </div>

      {/* 4. Cài Đặt Ứng Dụng & Làm Lại Bài Test */}
      <div style={{
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Cài Đặt & Tuỳ Chọn
        </h4>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Giọng Đọc Bản Ngữ:</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setAccent('US')}
              className={`btn-3d ${accent === 'US' ? 'btn-3d-primary' : 'btn-3d-subtle'}`}
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            >
              US (Mỹ)
            </button>
            <button
              onClick={() => setAccent('UK')}
              className={`btn-3d ${accent === 'UK' ? 'btn-3d-primary' : 'btn-3d-subtle'}`}
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            >
              UK (Anh)
            </button>
          </div>
        </div>

        <button
          onClick={() => finishPlacementTest({ level: 'beginner' })}
          className="btn-3d btn-3d-subtle"
          style={{ width: '100%', padding: '10px', fontSize: '0.8rem', gap: '6px', marginTop: '6px' }}
        >
          <RotateCcw size={14} />
          <span>Đặt Lại / Làm Lại Bài Kiểm Tra Đầu Vào</span>
        </button>
      </div>

      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        stageTitle="Chặng 1: Thợ Săn Âm Đuôi"
      />

      <CustomRoadmapModal
        isOpen={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
      />
    </div>
  );
};
