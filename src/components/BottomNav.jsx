import React from 'react';
import { Compass, Swords, Mic, Layers, Award, Lock } from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';
import { useSRSStore } from '../stores/useSRSStore';
import { useMotivationStore } from '../stores/useMotivationStore';

export const BottomNav = () => {
  const { activeTab, setActiveTab } = useUserStore();
  const { getDueItems } = useSRSStore();
  const { activeContract } = useMotivationStore();
  const dueCount = getDueItems().length;

  const navTabs = [
    { id: 'journey', label: 'Hành Trình', icon: Compass },
    { id: 'sparring', label: 'Đối Luyện', icon: Swords },
    { id: 'soundlab', label: 'Luyện Âm', icon: Mic },
    { id: 'srs', label: 'Hộp SRS', icon: Layers, badge: dueCount },
    { id: 'vault', label: 'Hũ Kỷ Luật', icon: Lock, badge: activeContract ? '🔥' : null, isSpecial: true },
    { id: 'profile', label: 'Thành Tựu', icon: Award }
  ];

  return (
    <nav className="glass-panel" style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 'var(--bottom-nav-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderTop: '1px solid var(--border-subtle)',
      zIndex: 50,
      padding: '0 8px'
    }}>
      {navTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: isActive ? 'var(--color-primary-light)' : 'var(--text-muted)',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              padding: '8px 0'
            }}
          >
            <div style={{
              position: 'relative',
              transform: isActive ? 'translateY(-2px)' : 'none',
              transition: 'transform 0.2s ease'
            }}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />

              {/* Badge thông báo số lượng từ đến hạn trong Hộp SRS */}
              {tab.badge > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-10px',
                  background: 'var(--color-danger)',
                  color: '#FFFFFF',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  borderRadius: '9999px',
                  minWidth: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                  boxShadow: '0 2px 6px rgba(239, 68, 68, 0.5)'
                }}>
                  {tab.badge}
                </span>
              )}
            </div>

            <span style={{
              fontSize: '0.68rem',
              fontWeight: isActive ? 800 : 500,
              letterSpacing: '-0.01em'
            }}>
              {tab.label}
            </span>

            {/* Active Indicator Dot */}
            {isActive && (
              <div style={{
                position: 'absolute',
                bottom: '4px',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--color-primary-light)',
                boxShadow: '0 0 8px var(--color-primary-light)'
              }} />
            )}
          </button>
        );
      })}
    </nav>
  );
};
