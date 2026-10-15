import React, { useState } from 'react';
import { X, Sparkles, Sliders, Clock, Target, Check, Compass, BookOpen, Volume2, Mic, Flame } from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';

export const CustomRoadmapModal = ({ isOpen, onClose }) => {
  const {
    learningStyle,
    dailyGoalMinutes,
    roadmapPace,
    focusTopics,
    updateLearningCustomization
  } = useUserStore();

  const [selectedStyle, setSelectedStyle] = useState(learningStyle || 'balanced');
  const [selectedPace, setSelectedPace] = useState(dailyGoalMinutes || 15);
  const [selectedRoadmap, setSelectedRoadmap] = useState(roadmapPace || 'accelerated_30');
  const [topics, setTopics] = useState(focusTopics || ['daily', 'pronunciation', 'survival']);

  if (!isOpen) return null;

  const toggleTopic = (topicKey) => {
    if (topics.includes(topicKey)) {
      if (topics.length > 1) {
        setTopics(topics.filter(t => t !== topicKey));
      }
    } else {
      setTopics([...topics, topicKey]);
    }
  };

  const handleSave = () => {
    updateLearningCustomization({
      learningStyle: selectedStyle,
      dailyGoalMinutes: selectedPace,
      roadmapPace: selectedRoadmap,
      focusTopics: topics
    });
    onClose();
  };

  const stylesList = [
    {
      id: 'audio_mirror',
      name: 'Audio Mirror & Luyện Âm',
      icon: Mic,
      desc: 'Tập trung phát âm chuẩn IPA, sửa lỗi ngọng âm đuôi s/es/ed, ngữ điệu tự nhiên.',
      color: '#10B981',
      badge: 'Bật Âm Nhanh'
    },
    {
      id: 'srs_vocab',
      name: 'Ghi Nhớ Vĩnh Cửu (SRS)',
      icon: BookOpen,
      desc: 'Tập trung nạp 300+ cụm từ sinh tồn qua 5 hộp lặp lại ngắt quãng Leitner.',
      color: '#6366F1',
      badge: 'Nhớ Lâu'
    },
    {
      id: 'survival_comm',
      name: 'Giao Tiếp Sinh Tồn',
      icon: Volume2,
      desc: 'Tập trung mẫu câu tình huống đời sống, du lịch, ứng biến và phản xạ nhanh.',
      color: '#F59E0B',
      badge: 'Thực Chiến'
    },
    {
      id: 'balanced',
      name: 'Cân Bằng Toàn Diện',
      icon: Sparkles,
      desc: 'Kết hợp hài hòa cả 4 kỹ năng: Phát âm + Từ vựng + Mẫu câu + Phản xạ.',
      color: '#8B5CF6',
      badge: 'Khuyên Dùng'
    }
  ];

  const paceOptions = [
    { minutes: 5, label: 'Mèo Dạo Chơi', sub: '5 phút / ngày (1 bài + 5 thẻ SRS)' },
    { minutes: 15, label: 'Mèo Chăm Chỉ', sub: '15 phút / ngày (2 bài + 15 thẻ SRS)', recommended: true },
    { minutes: 30, label: 'Mèo Bứt Phá', sub: '30 phút / ngày (3 bài + luyện âm chuyên sâu)' }
  ];

  const roadmapGoals = [
    {
      id: 'accelerated_30',
      title: 'Xóa Mất Gốc Cấp Tốc (30 Ngày)',
      desc: 'Phát âm chuẩn IPA + 300 từ cốt lõi, tự tin nói câu ngắn.',
      tag: '30 Ngày'
    },
    {
      id: 'standard_60',
      title: 'Tự Tin Giao Tiếp & Công Sở (60 Ngày)',
      desc: 'Đàm thoại tự nhiên, phỏng vấn, viết email và du lịch.',
      tag: '60 Ngày'
    },
    {
      id: 'mastery_90',
      title: 'Thành Thạo Đời Sống & Phản Xạ (90 Ngày)',
      desc: 'Bắn chữ tự nhiên không cần dịch nhẩm trong đầu.',
      tag: '90 Ngày'
    }
  ];

  const availableTopics = [
    { id: 'pronunciation', label: '🗣️ Phát âm & Âm đuôi' },
    { id: 'survival', label: '🆘 Tiếng Anh sinh tồn' },
    { id: 'daily', label: '☕ Đời sống hàng ngày' },
    { id: 'travel', label: '✈️ Du lịch & Khách sạn' },
    { id: 'work', label: '💼 Công sở & Phỏng vấn' }
  ];

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '16px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '460px',
        maxHeight: '90vh',
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        overflow: 'hidden'
      }}>
        {/* Header Modal */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #10B981, #6366F1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sliders size={18} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Tùy Chỉnh Cách Học & Lộ Trình
              </h3>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Cá nhân hóa theo mục tiêu riêng của bạn
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nội dung cuộn */}
        <div style={{
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Mục 1: Chọn trường phái học */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Compass size={15} color="var(--color-primary-light)" />
              1. Trường Phái Học Ưu Tiên
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {stylesList.map((style) => {
                const Icon = style.icon;
                const isSelected = selectedStyle === style.id;
                return (
                  <div
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    style={{
                      background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-surface-elevated)',
                      border: `1.5px solid ${isSelected ? style.color : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--radius-md)',
                      padding: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ color: style.color }}>
                        <Icon size={20} />
                      </div>
                      <span style={{
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '9999px',
                        background: `${style.color}20`,
                        color: style.color
                      }}>
                        {style.badge}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {style.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                      {style.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mục 2: Cường độ học mỗi ngày */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Clock size={15} color="var(--color-streak)" />
              2. Cường Độ Học Mỗi Ngày
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {paceOptions.map((opt) => {
                const isSelected = selectedPace === opt.minutes;
                return (
                  <div
                    key={opt.minutes}
                    onClick={() => setSelectedPace(opt.minutes)}
                    style={{
                      background: isSelected ? 'rgba(245, 158, 11, 0.12)' : 'var(--bg-surface-elevated)',
                      border: `1.5px solid ${isSelected ? 'var(--color-streak)' : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--radius-md)',
                      padding: '10px 14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {opt.label}
                        </span>
                        {opt.recommended && (
                          <span style={{
                            fontSize: '0.62rem',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: '9999px',
                            background: 'rgba(16, 185, 129, 0.15)',
                            color: '#10B981'
                          }}>
                            Khuyên dùng
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {opt.sub}
                      </div>
                    </div>
                    {isSelected && <Check size={18} color="var(--color-streak)" strokeWidth={3} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mục 3: Mục tiêu chặng lộ trình */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Target size={15} color="var(--color-accent-light)" />
              3. Mục Tiêu Lộ Trình Hướng Đến
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {roadmapGoals.map((goal) => {
                const isSelected = selectedRoadmap === goal.id;
                return (
                  <div
                    key={goal.id}
                    onClick={() => setSelectedRoadmap(goal.id)}
                    style={{
                      background: isSelected ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-surface-elevated)',
                      border: `1.5px solid ${isSelected ? '#10B981' : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--radius-md)',
                      padding: '12px 14px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {goal.title}
                        </span>
                        <span style={{
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '9999px',
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#10B981'
                        }}>
                          {goal.tag}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {goal.desc}
                      </div>
                    </div>
                    {isSelected && <Check size={18} color="#10B981" strokeWidth={3} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mục 4: Chọn chủ đề ưu tiên */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Flame size={15} color="#EC4899" />
              4. Chủ Đề Quan Tâm Ưu Tiên
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {availableTopics.map((top) => {
                const isChecked = topics.includes(top.id);
                return (
                  <button
                    key={top.id}
                    type="button"
                    onClick={() => toggleTopic(top.id)}
                    style={{
                      background: isChecked ? 'rgba(236, 72, 153, 0.15)' : 'var(--bg-surface-elevated)',
                      border: `1px solid ${isChecked ? '#EC4899' : 'var(--border-subtle)'}`,
                      color: isChecked ? '#F472B6' : 'var(--text-secondary)',
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {top.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '12px',
          background: 'var(--bg-surface-elevated)'
        }}>
          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{ flex: 1, padding: '10px' }}
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="btn btn-primary"
            style={{ flex: 2, padding: '10px', background: 'linear-gradient(135deg, #10B981, #6366F1)' }}
          >
            Lưu & Cập Nhật Lộ Trình
          </button>
        </div>
      </div>
    </div>
  );
};
