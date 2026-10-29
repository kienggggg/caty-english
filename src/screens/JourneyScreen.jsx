import React, { useState } from 'react';
import { CheckCircle2, Lock, Play, Award, Sparkles, Compass, ChevronRight, Sliders, Flame, ShieldCheck } from 'lucide-react';
import { ROADMAP_STAGES } from '../data/roadmapData';
import { useUserStore } from '../stores/useUserStore';
import { useSRSStore } from '../stores/useSRSStore';
import { useMotivationStore } from '../stores/useMotivationStore';
import { CertificateModal } from '../components/CertificateModal';
import { LessonModal } from '../components/LessonModal';
import { CustomRoadmapModal } from '../components/CustomRoadmapModal';
import { computeStageProgress } from '../services/progress';

export const JourneyScreen = () => {
  const { currentStage, completedLessons, completeLesson, setActiveTab, learningStyle, dailyGoalMinutes, roadmapPace } = useUserStore();
  const { items } = useSRSStore();
  const { activeContract } = useMotivationStore();
  const [selectedStageId, setSelectedStageId] = useState(currentStage);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);

  const activeStage = ROADMAP_STAGES.find(s => s.id === selectedStageId) || ROADMAP_STAGES[0];
  const stageLessons = activeStage.lessons;

  // Tính toán % hoàn thành của chặng — xem services/progress.js
  const { completed: completedInStage, percent: progressPercent } =
    computeStageProgress(stageLessons, completedLessons);

  const handleLessonClick = (lesson) => {
    setActiveLesson(lesson);
  };

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Banner Heo Đất Vốn Từ & Định Vị Cột Mốc */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-accent-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              VỐN TỪ TÍCH LŨY CỦA BẠN
            </span>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {items.length} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>/ 300 Cụm Sinh Tồn</span>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            textAlign: 'right'
          }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Vạch Đích Chặng</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--color-streak)' }}>
              {activeStage.duration}
            </div>
          </div>
        </div>

        {/* Thanh tiến độ % chạm vạch đích */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Tiến Độ Chặng {selectedStageId}</span>
            <span style={{ color: 'var(--color-accent-light)' }}>{progressPercent}% Hoàn Thành</span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '9999px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #10B981, #6366F1)',
              borderRadius: '9999px',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>
      </div>

      {/* Banner Hũ Kỷ Luật CatY */}
      {activeContract ? (
        <div
          onClick={() => setActiveTab('vault')}
          style={{
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(245, 158, 11, 0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.4rem' }}>🐱🔥</span>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Hũ Kỷ Luật: Cọc {activeContract.amount.toLocaleString()}đ đang được bảo vệ!
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Chuỗi: {activeContract.currentStreakInContract} / {activeContract.targetDays} ngày • Thưởng về đích: +{(activeContract.amount * activeContract.bonusRate).toLocaleString()}đ
              </div>
            </div>
          </div>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-streak)' }}>
            Xem Hũ ➔
          </span>
        </div>
      ) : (
        <div
          onClick={() => setActiveTab('vault')}
          style={{
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px dashed rgba(99, 102, 241, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>🐱💰</span>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
              Khóa quỹ cọc kỷ luật CatY: Hoàn 100% tiền + Thưởng 10% khi đủ chuỗi?
            </span>
          </div>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>
            Khám Phá ➔
          </span>
        </div>
      )}

      {/* Banner Võ Đài Đối Luyện AI (Interactive Sparring Partner) */}
      <div
        onClick={() => setActiveTab('sparring')}
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(16, 185, 129, 0.12))',
          border: '1px solid rgba(99, 102, 241, 0.35)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.15)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.5rem' }}>⚔️</span>
          <div>
            <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Võ Đài Đối Luyện AI Thực Chiến
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Trò chuyện 1-1 theo tình huống, bắt lỗi sai & gợi ý câu chuẩn Pro!
            </div>
          </div>
        </div>
        <span style={{
          fontSize: '0.72rem',
          fontWeight: 800,
          color: '#FFFFFF',
          background: 'var(--color-primary)',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 2px 8px rgba(99, 102, 241, 0.4)'
        }}>
          Đối Luyện ➔
        </span>
      </div>

      {/* Banner Tải App Android APK */}
      <a
        href="./CatY_English.apk"
        download="CatY_English.apk"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.12))',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textDecoration: 'none',
          boxShadow: '0 2px 10px rgba(16, 185, 129, 0.1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.4rem' }}>📱</span>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Cài Đặt App Cho Điện Thoại Android
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
              Bản APK chính thức (4.73 MB) • Học mượt mà mọi lúc mọi nơi
            </div>
          </div>
        </div>
        <span style={{
          fontSize: '0.72rem',
          fontWeight: 800,
          color: '#FFFFFF',
          background: '#10B981',
          padding: '5px 12px',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          Tải APK ⇩
        </span>
      </a>

      {/* Quick Bar Tùy Chỉnh Lộ Trình & Cách Học */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>CÁCH HỌC:</span>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            color: 'var(--color-primary-light)',
            background: 'rgba(99, 102, 241, 0.12)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(99, 102, 241, 0.3)'
          }}>
            {learningStyle === 'audio_mirror' ? '🎙️ Audio Mirror' : (learningStyle === 'srs_vocab' ? '🧠 SRS Leitner' : (learningStyle === 'survival_comm' ? '⚡ Giao Tiếp' : '⚖️ Toàn Diện'))} • {dailyGoalMinutes}p/ngày
          </span>
        </div>

        <button
          onClick={() => setCustomModalOpen(true)}
          style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            fontSize: '0.74rem',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <Sliders size={13} color="var(--color-accent-light)" />
          Tùy Chỉnh
        </button>
      </div>

      {/* Bộ Chọn 4 Chặng Lộ Trình */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {ROADMAP_STAGES.map((stage) => {
          const isSelected = stage.id === selectedStageId;
          return (
            <button
              key={stage.id}
              onClick={() => setSelectedStageId(stage.id)}
              style={{
                flexShrink: 0,
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                background: isSelected ? 'var(--color-primary)' : 'var(--bg-surface)',
                color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                border: isSelected ? '1px solid var(--color-primary-light)' : '1px solid var(--border-subtle)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
            >
              <span>Chặng {stage.id}</span>
              {stage.id === 1 && <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '4px' }}>7d</span>}
            </button>
          );
        })}
      </div>

      {/* Thông tin Chi Tiết Chặng Đang Chọn */}
      <div style={{
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          {activeStage.title}
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          {activeStage.subtitle}
        </div>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          marginTop: '6px',
          fontSize: '0.75rem',
          color: 'var(--color-primary-light)',
          fontWeight: 700
        }}>
          🎯 Đích đến: {activeStage.target}
        </div>
      </div>

      {/* Danh Sách Bài Học Dạng Con Đường Cột Mốc (Milestone Level Path) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {stageLessons.map((lesson, index) => {
          const isDone = completedLessons.includes(lesson.id);
          const isMilestone = lesson.type === 'milestone' || lesson.type === 'graduation';

          return (
            <div
              key={lesson.id}
              onClick={() => handleLessonClick(lesson)}
              style={{
                background: isMilestone
                  ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(99, 102, 241, 0.15))'
                  : 'var(--bg-surface)',
                border: isMilestone
                  ? '1px solid rgba(245, 158, 11, 0.4)'
                  : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: isMilestone ? '0 4px 16px rgba(245, 158, 11, 0.15)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Icon trạng thái */}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: isDone
                    ? 'rgba(16, 185, 129, 0.2)'
                    : isMilestone
                    ? 'rgba(245, 158, 11, 0.2)'
                    : 'var(--bg-surface-elevated)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDone ? 'var(--color-accent-light)' : isMilestone ? 'var(--color-streak)' : 'var(--text-muted)'
                }}>
                  {isDone ? (
                    <CheckCircle2 size={20} />
                  ) : isMilestone ? (
                    <Award size={20} />
                  ) : (
                    <Play size={16} fill="currentColor" />
                  )}
                </div>

                <div>
                  <div style={{
                    fontSize: '0.88rem',
                    fontWeight: isMilestone ? 800 : 700,
                    color: isDone ? 'var(--text-primary)' : isMilestone ? 'var(--color-streak)' : 'var(--text-primary)'
                  }}>
                    {lesson.title}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    +{lesson.xp} XP • {isMilestone ? 'Nhận Chứng Chỉ Chặng' : 'Bài học 3 phút'}
                  </div>
                </div>
              </div>

              <ChevronRight size={18} color="var(--text-muted)" />
            </div>
          );
        })}
      </div>

      {/* Modal Bài Học Tương Tác */}
      <LessonModal
        lesson={activeLesson}
        isOpen={!!activeLesson}
        onClose={() => setActiveLesson(null)}
        onComplete={(lessonId) => {
          completeLesson(lessonId);
        }}
        onOpenCertificate={() => setCertModalOpen(true)}
      />

      {/* Modal Chứng Chỉ */}
      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        stageTitle={activeStage.title}
      />

      {/* Modal Tùy Chỉnh Cách Học & Lộ Trình */}
      <CustomRoadmapModal
        isOpen={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
      />
    </div>
  );
};
