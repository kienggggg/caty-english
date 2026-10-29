import React from 'react';
import { Flame, Star, Volume2, Sparkles, Sun, Moon, Lock, Smartphone } from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';
import { useSRSStore } from '../stores/useSRSStore';
import { useMotivationStore } from '../stores/useMotivationStore';

export const MobileHeader = () => {
  const { streakDays, xp, accent, setAccent, currentStage, theme, toggleTheme, setActiveTab } = useUserStore();
  const { getDueItems } = useSRSStore();
  const { activeContract } = useMotivationStore();
  const dueCount = getDueItems().length;

  const toggleAccent = () => {
    setAccent(accent === 'US' ? 'UK' : 'US');
  };

  return (
    <header className="glass-panel" style={{
      padding: '14px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Brand & Stage */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #F59E0B, #6366F1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)',
          fontSize: '1.2rem',
          userSelect: 'none'
        }}>
          🐱
        </div>
        <div>
          <div style={{ fontSize: '1.05rem', fontWeight: 900, letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #F59E0B, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'flex', alignItems: 'center', gap: '4px' }}>
            CatY
            <span style={{ fontSize: '0.6rem', fontWeight: 800, padding: '1px 5px', borderRadius: '4px', background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
              ENGLISH
            </span>
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--color-primary-light)', fontWeight: 600 }}>
            Chặng {currentStage} / 4
          </div>
        </div>
      </div>

      {/* Stats Cluster */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Nút Tải APK Android */}
        <a
          href="./CatY_English.apk"
          download="CatY_English.apk"
          title="Tải ứng dụng Android (.APK 8.96MB)"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            padding: '4px 8px',
            borderRadius: 'var(--radius-full)',
            color: '#10B981',
            textDecoration: 'none',
            fontSize: '0.72rem',
            fontWeight: 800,
            transition: 'all 0.15s ease'
          }}
        >
          <Smartphone size={13} color="#10B981" />
          <span>APK</span>
        </a>
        {/* Motivation Stake Pill */}
        {activeContract && (
          <div
            onClick={() => setActiveTab('vault')}
            title="Đang khóa quỹ kỷ luật - Nhấn để xem chi tiết"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              padding: '4px 8px',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer'
            }}
          >
            <Lock size={12} color="var(--color-streak)" />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-streak)' }}>
              {(activeContract.amount / 1000).toLocaleString()}k
            </span>
          </div>
        )}
        {/* Streak */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)'
        }}>
          <Flame size={16} color="#F59E0B" fill="#F59E0B" />
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-streak)' }}>
            {streakDays}d
          </span>
        </div>

        {/* XP */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)'
        }}>
          <Star size={15} color="var(--color-primary-light)" fill="var(--color-primary-light)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-primary-light)' }}>
            {xp}
          </span>
        </div>

        {/* Accent Toggle US/UK */}
        <button
          onClick={toggleAccent}
          title={`Đổi giọng đọc (Hiện tại: ${accent})`}
          style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)',
            fontSize: '0.72rem',
            fontWeight: 800,
            padding: '4px 8px',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.15s ease'
          }}
        >
          <Volume2 size={13} color="var(--color-accent)" />
          {accent}
        </button>

        {/* Đổi nền Sáng/Tối */}
        <button
          onClick={toggleTheme}
          title={theme === 'light' ? 'Chuyển sang nền tối' : 'Chuyển sang nền sáng'}
          aria-label={theme === 'light' ? 'Chuyển sang nền tối' : 'Chuyển sang nền sáng'}
          style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)',
            padding: '5px 8px',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.15s ease'
          }}
        >
          {theme === 'light'
            ? <Moon size={14} color="var(--text-secondary)" />
            : <Sun size={14} color="var(--color-streak)" />}
        </button>
      </div>
    </header>
  );
};
