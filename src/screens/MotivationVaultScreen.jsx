import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Flame, 
  Coins, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Gift, 
  ArrowUpRight, 
  Sparkles, 
  ShieldAlert, 
  Clock, 
  HelpCircle,
  PlusCircle,
  Award,
  Zap,
  TrendingUp,
  XCircle
} from 'lucide-react';
import { useMotivationStore } from '../stores/useMotivationStore';
import { useUserStore } from '../stores/useUserStore';

export const MotivationVaultScreen = () => {
  const {
    walletBalance,
    activeContract,
    contractHistory,
    streakShields,
    stats,
    communityPoolAmount,
    createCommitment,
    checkinDailyStreak,
    forfeitContract,
    buyStreakShieldWithXp,
    topUpWallet
  } = useMotivationStore();

  const { xp, addXp, setActiveTab } = useUserStore();

  // Form states khi tạo cam kết mới
  const [selectedAmount, setSelectedAmount] = useState(200000);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedDays, setSelectedDays] = useState(14);
  const [milestoneType, setMilestoneType] = useState('ALL_OR_NOTHING');
  const [targetGoal, setTargetGoal] = useState('Xóa mất gốc phát âm & 300 từ sinh tồn');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [messageToast, setMessageToast] = useState(null);

  const showToast = (text, type = 'success') => {
    setMessageToast({ text, type });
    setTimeout(() => setMessageToast(null), 3500);
  };

  const finalStakeAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handleStartCommitment = () => {
    if (finalStakeAmount > walletBalance) {
      showToast('Số dư ví không đủ! Hãy nạp thêm vào ví thử thách.', 'error');
      return;
    }

    const res = createCommitment({
      amount: finalStakeAmount,
      targetDays: selectedDays,
      milestoneType,
      targetGoal
    });

    if (res.success) {
      showToast(`🎉 Đã khóa quỹ ${finalStakeAmount.toLocaleString()}đ vào thử thách ${selectedDays} ngày!`, 'success');
      setShowConfirmModal(false);
    } else {
      showToast(res.error, 'error');
    }
  };

  const handleCheckinNow = () => {
    const res = checkinDailyStreak();
    if (res.status === 'COMPLETED') {
      showToast('🏆 Chúc mừng! Bạn đã hoàn thành xuất sắc thử thách và nhận lại tiền + 10% thưởng!', 'success');
    } else if (res.status === 'STREAK_UPDATED') {
      showToast('🔥 Điểm danh thành công! Chuỗi ngày của bạn đã tăng lên.', 'success');
    } else if (res.status === 'ALREADY_CHECKED_IN') {
      showToast('Hôm nay bạn đã điểm danh rồi, hãy quay lại vào ngày mai nhé!', 'info');
    }
  };

  const handleForfeitClick = () => {
    if (window.confirm('⚠️ CẢNH BÁO: Bạn có chắc chắn muốn bỏ cuộc? Toàn bộ số tiền cọc chưa hoàn lại sẽ bị MẤT TRẮNG và chuyển vào Quỹ Thưởng CatY Pool!')) {
      const res = forfeitContract('Người dùng chủ động bỏ cuộc');
      if (res && res.rescuedByShield) {
        showToast('🛡️ May quá! Khiên Vuốt Mèo đã tự động bảo vệ tiền cọc của bạn!', 'info');
      } else {
        showToast('😿 Thử thách đã kết thúc. Bạn đã mất trắng số tiền cọc.', 'error');
      }
    }
  };

  const handleBuyShield = () => {
    if (xp < 300) {
      showToast('Bạn cần ít nhất 300 XP để đổi 1 Khiên Vuốt Mèo!', 'error');
      return;
    }
    useUserStore.getState().addXp(-300);
    buyStreakShieldWithXp(300);
    showToast('🛡️ Đã đổi thành công 1 Khiên Vuốt Mèo (Tốn 300 XP)!', 'success');
  };

  const handleTopUp = () => {
    topUpWallet(200000);
    showToast('Đã nạp thêm +200,000đ vào ví thử thách!', 'success');
  };

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Toast Alert */}
      {messageToast && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: messageToast.type === 'error' ? 'var(--color-danger)' : (messageToast.type === 'info' ? 'var(--color-primary)' : '#10B981'),
          color: '#FFFFFF',
          padding: '10px 18px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.82rem',
          fontWeight: 700,
          zIndex: 9999,
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={16} />
          {messageToast.text}
        </div>
      )}

      {/* 1. Header Mèo CatY & Linh Vật Động Lực */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        borderRadius: 'var(--radius-lg)',
        padding: '18px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          fontSize: '2.5rem',
          lineHeight: 1,
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '8px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {activeContract ? (activeContract.lastCheckinDate === new Date().toDateString() ? '😻' : '😿') : '🐱'}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Hũ Kỷ Luật CatY (Motivation Vault)
            </h3>
            <span style={{
              fontSize: '0.62rem',
              fontWeight: 800,
              padding: '2px 6px',
              borderRadius: '9999px',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10B981'
            }}>
              Cam Kết 100%
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.35 }}>
            {activeContract 
              ? (activeContract.lastCheckinDate === new Date().toDateString() 
                ? 'Meo meo! Hôm nay bạn đã an toàn giữ vững chuỗi cọc tiền! Tiếp tục duy trì nào!' 
                : '⚠️ Báo động meo meo! Bạn chưa học bài hôm nay! Mau hoàn thành 1 bài để cứu cọc tiền!')
              : 'Tự nguyện khóa quỹ tiền cọc. Hoàn thành mục tiêu để nhận lại 100% + Thưởng 10% từ Quỹ CatY. Bỏ cuộc = Mất trắng!'}
          </p>
        </div>
      </div>

      {/* 2. Cụm Thống Kê Tài Khoản Kỷ Luật */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {/* Số dư ví */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Ví Thử Thách</span>
            <button
              onClick={handleTopUp}
              title="Nạp thêm 200,000đ vào ví thử thách"
              style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: 'none',
                color: '#10B981',
                borderRadius: 'var(--radius-full)',
                padding: '2px 8px',
                fontSize: '0.65rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }}
            >
              + Nạp 200k
            </button>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
            {walletBalance.toLocaleString()} <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>đ</span>
          </div>
        </div>

        {/* Tiền đang ký quỹ / khóa */}
        <div style={{
          background: activeContract ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-surface)',
          border: `1px solid ${activeContract ? 'rgba(245, 158, 11, 0.4)' : 'var(--border-subtle)'}`,
          borderRadius: 'var(--radius-md)',
          padding: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: activeContract ? 'var(--color-streak)' : 'var(--text-muted)', fontWeight: 600 }}>
              Tiền Đang Khóa
            </span>
            <Lock size={14} color={activeContract ? 'var(--color-streak)' : 'var(--text-muted)'} />
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: activeContract ? 'var(--color-streak)' : 'var(--text-muted)', marginTop: '4px' }}>
            {activeContract ? activeContract.amount.toLocaleString() : '0'} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>đ</span>
          </div>
        </div>

        {/* Đã giải cứu thành công */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Tiền Đã Lấy Lại</span>
            <ShieldCheck size={14} color="#10B981" />
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>
            +{stats.totalRefunded.toLocaleString()} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>đ</span>
          </div>
        </div>

        {/* Quỹ thưởng CatY Pool */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Quỹ Thưởng CatY Pool</span>
            <Gift size={14} color="#6366F1" />
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-light)', marginTop: '4px' }}>
            {communityPoolAmount.toLocaleString()} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>đ</span>
          </div>
        </div>
      </div>

      {/* 3. KHU VỰC HỢP ĐỒNG ĐANG HOẠT ĐỘNG (NẾU CÓ) */}
      {activeContract ? (
        <div style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-streak)',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: '0 8px 24px rgba(245, 158, 11, 0.15)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: 'var(--color-streak)',
                background: 'rgba(245, 158, 11, 0.15)',
                padding: '3px 8px',
                borderRadius: '9999px',
                letterSpacing: '0.04em'
              }}>
                HỢP ĐỒNG KỶ LUẬT ĐANG CHẠY 🔥
              </span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '6px' }}>
                {activeContract.targetGoal}
              </h4>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Cọc Ký Quỹ</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-streak)' }}>
                {activeContract.amount.toLocaleString()}đ
              </div>
            </div>
          </div>

          {/* Tiến độ chuỗi ngày */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>
                Chuỗi Cam Kết: <strong style={{ color: 'var(--text-primary)' }}>{activeContract.currentStreakInContract} / {activeContract.targetDays} Ngày</strong>
              </span>
              <span style={{ color: '#10B981' }}>
                Thưởng Về Đích: +{(activeContract.amount * activeContract.bonusRate).toLocaleString()}đ
              </span>
            </div>

            {/* Thanh Progress */}
            <div style={{
              width: '100%',
              height: '10px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '9999px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${Math.min(100, Math.round((activeContract.currentStreakInContract / activeContract.targetDays) * 100))}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #F59E0B, #10B981)',
                borderRadius: '9999px',
                transition: 'width 0.4s ease'
              }} />
            </div>
          </div>

          {/* Trạng thái hôm nay & Khiên bảo vệ */}
          <div style={{
            background: 'var(--bg-surface-elevated)',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {activeContract.lastCheckinDate === new Date().toDateString() ? (
                <>
                  <CheckCircle2 size={18} color="#10B981" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#10B981' }}>
                    Hôm nay đã hoàn thành nhiệm vụ!
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle size={18} color="var(--color-streak)" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-streak)' }}>
                    Chưa học hôm nay! Hãy học ngay trước 23:59
                  </span>
                </>
              )}
            </div>

            {/* Khiên cứu chuỗi */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Khiên: <strong>{streakShields}</strong>
              </span>
              <button
                onClick={handleBuyShield}
                title="Đổi 1 Khiên Vuốt Mèo Cứu Chuỗi bằng 300 XP"
                style={{
                  background: 'rgba(99, 102, 241, 0.15)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  color: 'var(--color-primary-light)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                + Đổi Khiên (300 XP)
              </button>
            </div>
          </div>

          {/* Các nút hành động */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('journey')}
              className="btn btn-primary"
              style={{
                flex: 2,
                padding: '11px',
                background: 'linear-gradient(135deg, #F59E0B, #10B981)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Zap size={16} />
              Vào Học Ngay Để Bảo Vệ Tiền Cọc
            </button>

            <button
              onClick={handleCheckinNow}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '11px', fontSize: '0.75rem' }}
            >
              Điểm Danh
            </button>
          </div>

          {/* Nút chấp nhận bỏ cuộc mất trắng */}
          <div style={{ textAlign: 'center', marginTop: '4px' }}>
            <button
              onClick={handleForfeitClick}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.7rem',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Tôi chấp nhận bỏ cuộc & mất trắng tiền cọc
            </button>
          </div>
        </div>
      ) : (
        /* 4. KHU VỰC TẠO HỢP ĐỒNG MỚI (NẾU CHƯA CÓ) */
        <div style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div>
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: 'var(--color-accent-light)',
              letterSpacing: '0.04em'
            }}>
              KHỞI TẠO CAM KẾT MỚI
            </span>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
              Khóa Quỹ Động Lực - Quyết Tâm Không Bỏ Cuộc
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Đưa tiền cọc tự nguyện. Hoàn thành mục tiêu nhận lại 100% tiền + Thưởng 10% từ Quỹ CatY.
            </p>
          </div>

          {/* Chọn số tiền cọc */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              1. Chọn Số Tiền Cọc Ký Quỹ
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {[50000, 100000, 200000, 500000].map((amt) => {
                const isSelected = selectedAmount === amt && !customAmount;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount('');
                    }}
                    style={{
                      background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-surface-elevated)',
                      border: `1.5px solid ${isSelected ? 'var(--color-streak)' : 'var(--border-subtle)'}`,
                      color: isSelected ? 'var(--color-streak)' : 'var(--text-primary)',
                      padding: '10px 4px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {(amt / 1000).toLocaleString()}k
                  </button>
                );
              })}
            </div>
            {/* Input tùy chỉnh số tiền */}
            <input
              type="number"
              placeholder="Hoặc nhập số tiền tùy chọn (VD: 300000)..."
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="form-input"
              style={{ marginTop: '8px', padding: '8px 12px', fontSize: '0.8rem' }}
            />
          </div>

          {/* Chọn số ngày cam kết */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              2. Số Ngày Giữ Chuỗi Liên Tục
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { days: 7, label: '7 Ngày', sub: 'Thử Thách Tuần' },
                { days: 14, label: '14 Ngày', sub: 'Tạo Thói Quen' },
                { days: 30, label: '30 Ngày', sub: 'Xóa Mất Gốc' }
              ].map((item) => {
                const isSelected = selectedDays === item.days;
                return (
                  <button
                    key={item.days}
                    type="button"
                    onClick={() => setSelectedDays(item.days)}
                    style={{
                      background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-surface-elevated)',
                      border: `1.5px solid ${isSelected ? 'var(--color-primary-light)' : 'var(--border-subtle)'}`,
                      color: isSelected ? 'var(--color-primary-light)' : 'var(--text-primary)',
                      padding: '10px 8px',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>{item.label}</div>
                    <div style={{ fontSize: '0.65rem', color: isSelected ? 'var(--color-primary-light)' : 'var(--text-muted)' }}>
                      {item.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chọn cơ chế hoàn tiền */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              3. Cơ Chế Hoàn Tiền & Rủi Ro
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                onClick={() => setMilestoneType('ALL_OR_NOTHING')}
                style={{
                  background: milestoneType === 'ALL_OR_NOTHING' ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-surface-elevated)',
                  border: `1.5px solid ${milestoneType === 'ALL_OR_NOTHING' ? 'var(--color-danger)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    🔥 Chế Độ Thép (All-or-Nothing)
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Hoàn 100% + Thưởng 10% khi đủ chuỗi. Đứt chuỗi không có khiên = Mất trắng 100%!
                  </div>
                </div>
                {milestoneType === 'ALL_OR_NOTHING' && <CheckCircle2 size={16} color="var(--color-danger)" />}
              </div>

              <div
                onClick={() => setMilestoneType('STAGED')}
                style={{
                  background: milestoneType === 'STAGED' ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-surface-elevated)',
                  border: `1.5px solid ${milestoneType === 'STAGED' ? '#10B981' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    🛡️ Chế Độ Bậc Thang (Milestone 30/70)
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Hoàn trước 30% khi đạt nửa chặng. 70% còn lại + Thưởng 10% khi về đích.
                  </div>
                </div>
                {milestoneType === 'STAGED' && <CheckCircle2 size={16} color="#10B981" />}
              </div>
            </div>
          </div>

          {/* Nút Kích Hoạt */}
          <button
            onClick={() => setShowConfirmModal(true)}
            className="btn btn-primary"
            style={{
              padding: '14px',
              background: 'linear-gradient(135deg, #F59E0B, #10B981)',
              fontWeight: 800,
              fontSize: '0.92rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)'
            }}
          >
            <Lock size={18} />
            Khóa Quỹ {finalStakeAmount.toLocaleString()}đ & Bắt Đầu Cam Kết
          </button>
        </div>
      )}

      {/* 5. Lịch Sử & Bảng Danh Dự Kỷ Luật */}
      <div style={{
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        padding: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Lịch Sử Thử Thách Kỷ Luật
          </h4>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            Thành công: {stats.successfulChallenges} lần
          </span>
        </div>

        {contractHistory.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-dim)', fontSize: '0.78rem' }}>
            Chưa có thử thách nào hoàn thành. Hãy khóa quỹ cam kết đầu tiên để rèn luyện kỷ luật!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {contractHistory.slice(0, 5).map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {item.targetGoal}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    {item.targetDays} ngày • {new Date(item.startDate).toLocaleDateString('vi-VN')}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  {item.status === 'COMPLETED' ? (
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: '#10B981',
                      background: 'rgba(16, 185, 129, 0.15)',
                      padding: '2px 8px',
                      borderRadius: '9999px'
                    }}>
                      +{(item.amount + (item.bonusEarned || 0)).toLocaleString()}đ
                    </span>
                  ) : (
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: 'var(--color-danger)',
                      background: 'rgba(239, 68, 68, 0.15)',
                      padding: '2px 8px',
                      borderRadius: '9999px'
                    }}>
                      -{(item.lossAmount || item.amount).toLocaleString()}đ (Mất trắng)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Xác Nhận Ký Quỹ */}
      {showConfirmModal && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '16px'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '400px',
            width: '100%',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🐱🔒</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Xác Nhận Khóa Quỹ Kỷ Luật
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Bạn sắp trích <strong>{finalStakeAmount.toLocaleString()}đ</strong> vào thử thách <strong>{selectedDays} ngày</strong>.
              </p>
            </div>

            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              fontSize: '0.75rem',
              color: 'var(--text-primary)',
              lineHeight: 1.4
            }}>
              ⚠️ <strong>Quy tắc cam kết:</strong> Mỗi ngày bạn phải vào học để duy trì chuỗi. Nếu bỏ lỡ mà không có Khiên Vuốt Mèo bảo vệ, số tiền này sẽ <strong>MẤT TRẮNG</strong> và chuyển vào Quỹ CatY Pool!
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="btn btn-secondary"
                style={{ flex: 1, padding: '10px' }}
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleStartCommitment}
                className="btn btn-primary"
                style={{ flex: 1.5, padding: '10px', background: 'linear-gradient(135deg, #F59E0B, #10B981)' }}
              >
                Tôi Cam Kết!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
