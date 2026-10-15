import { create } from 'zustand';
import { storageStrategy } from '../services/storageStrategy';

const defaultVaultState = {
  // Số dư ví ảo học viên (VNĐ giả lập hoặc nạp thực tế)
  walletBalance: 500000, 
  // Hợp đồng cam kết hiện tại: null hoặc object
  activeContract: null,
  // Lịch sử các hợp đồng cam kết
  contractHistory: [],
  // Khiên vuốt mèo cứu chuỗi (Cat Paw Streak Shield)
  streakShields: 1,
  // Thống kê thành tựu kỷ luật
  stats: {
    totalStaked: 0,
    totalRefunded: 0,
    totalBonusEarned: 0,
    totalForfeited: 0,
    successfulChallenges: 0
  },
  // Quỹ thưởng cộng đồng CatY Pool
  communityPoolAmount: 12500000
};

const savedVault = storageStrategy.getPreference('caty_motivation_vault', defaultVaultState);

export const useMotivationStore = create((set, get) => ({
  ...savedVault,

  // 1. Tạo hợp đồng ký quỹ cam kết mới
  createCommitment: ({ amount, targetDays = 14, milestoneType = 'ALL_OR_NOTHING', targetGoal = 'Hoàn thành chặng xóa mất gốc' }) => {
    const state = get();
    const stakeAmount = Number(amount);

    if (isNaN(stakeAmount) || stakeAmount <= 0) {
      return { success: false, error: 'Số tiền ký quỹ không hợp lệ' };
    }

    if (state.activeContract && state.activeContract.status === 'ACTIVE') {
      return { success: false, error: 'Bạn đang có một hợp đồng cam kết đang kích hoạt!' };
    }

    const now = new Date();
    const endDate = new Date(now.getTime() + targetDays * 24 * 60 * 60 * 1000);

    const newContract = {
      id: `contract_${Date.now()}`,
      amount: stakeAmount,
      targetDays,
      currentStreakInContract: 0,
      milestoneType, // 'ALL_OR_NOTHING' hoặc 'STAGED' (trả theo chặng 25% - 50% - 100%)
      targetGoal,
      status: 'ACTIVE', // 'ACTIVE', 'COMPLETED', 'FORFEITED'
      startDate: now.toISOString(),
      endDate: endDate.toISOString(),
      lastCheckinDate: null,
      missedDaysCount: 0,
      refundedAmount: 0,
      bonusEarned: 0,
      bonusRate: 0.10 // Thưởng thêm 10% từ Quỹ CatY Pool khi hoàn thành
    };

    const nextState = {
      ...state,
      activeContract: newContract,
      walletBalance: Math.max(0, state.walletBalance - stakeAmount),
      stats: {
        ...state.stats,
        totalStaked: state.stats.totalStaked + stakeAmount
      }
    };

    set(nextState);
    storageStrategy.setPreference('caty_motivation_vault', nextState);
    return { success: true, contract: newContract };
  },

  // 2. Điểm danh / Duy trì chuỗi trong hợp đồng khi hoàn thành bài học
  checkinDailyStreak: () => {
    const state = get();
    const contract = state.activeContract;
    if (!contract || contract.status !== 'ACTIVE') return { status: 'NO_ACTIVE_CONTRACT' };

    const todayStr = new Date().toDateString();
    if (contract.lastCheckinDate === todayStr) {
      return { status: 'ALREADY_CHECKED_IN', contract };
    }

    const nextStreak = contract.currentStreakInContract + 1;
    let nextRefunded = contract.refundedAmount;
    let isCompleted = nextStreak >= contract.targetDays;

    // Nếu chọn hoàn tiền theo chặng (STAGED)
    if (contract.milestoneType === 'STAGED') {
      const halfDays = Math.floor(contract.targetDays / 2);
      if (nextStreak === halfDays && nextRefunded === 0) {
        // Trả trước 30% cọc
        const stage1 = Math.round(contract.amount * 0.3);
        nextRefunded += stage1;
      }
    }

    let updatedContract = {
      ...contract,
      currentStreakInContract: nextStreak,
      lastCheckinDate: todayStr,
      refundedAmount: nextRefunded
    };

    let nextWallet = state.walletBalance;
    let nextStats = { ...state.stats };

    // Nếu đã hoàn thành toàn bộ ngày mục tiêu!
    if (isCompleted) {
      const bonus = Math.round(contract.amount * contract.bonusRate);
      const finalRefund = contract.amount - nextRefunded + bonus;

      updatedContract = {
        ...updatedContract,
        status: 'COMPLETED',
        refundedAmount: contract.amount,
        bonusEarned: bonus,
        completedDate: new Date().toISOString()
      };

      nextWallet += finalRefund;
      nextStats.totalRefunded += contract.amount;
      nextStats.totalBonusEarned += bonus;
      nextStats.successfulChallenges += 1;
    }

    const nextState = {
      ...state,
      activeContract: isCompleted ? null : updatedContract,
      contractHistory: isCompleted ? [updatedContract, ...state.contractHistory] : state.contractHistory,
      walletBalance: nextWallet,
      stats: nextStats
    };

    set(nextState);
    storageStrategy.setPreference('caty_motivation_vault', nextState);
    return { status: isCompleted ? 'COMPLETED' : 'STREAK_UPDATED', contract: updatedContract };
  },

  // 3. Xử lý khi bị đứt chuỗi / bỏ cuộc (Forfeit Penalty)
  forfeitContract: (reason = 'Đứt chuỗi học tập quá số ngày quy định') => {
    const state = get();
    const contract = state.activeContract;
    if (!contract || contract.status !== 'ACTIVE') return false;

    // Kiểm tra nếu có Khiên Vuốt Mèo (Streak Shield) để tự động cứu
    if (state.streakShields > 0) {
      const nextState = {
        ...state,
        streakShields: state.streakShields - 1
      };
      set(nextState);
      storageStrategy.setPreference('caty_motivation_vault', nextState);
      return { rescuedByShield: true, remainingShields: state.streakShields - 1 };
    }

    // Không còn khiên -> MẤT TRẮNG số tiền còn lại!
    const unrefundedLoss = contract.amount - (contract.refundedAmount || 0);

    const forfeitedContract = {
      ...contract,
      status: 'FORFEITED',
      forfeitReason: reason,
      lossAmount: unrefundedLoss,
      forfeitDate: new Date().toISOString()
    };

    const nextState = {
      ...state,
      activeContract: null,
      contractHistory: [forfeitedContract, ...state.contractHistory],
      communityPoolAmount: state.communityPoolAmount + unrefundedLoss,
      stats: {
        ...state.stats,
        totalForfeited: state.stats.totalForfeited + unrefundedLoss
      }
    };

    set(nextState);
    storageStrategy.setPreference('caty_motivation_vault', nextState);
    return { rescuedByShield: false, lostAmount: unrefundedLoss };
  },

  // 4. Mua / Đổi Khiên Vuốt Mèo Cứu Chuỗi bằng XP
  buyStreakShieldWithXp: (xpCost = 300) => {
    const state = get();
    const nextState = {
      ...state,
      streakShields: state.streakShields + 1
    };
    set(nextState);
    storageStrategy.setPreference('caty_motivation_vault', nextState);
    return true;
  },

  // 5. Nạp thêm tiền thử thách vào ví
  topUpWallet: (amount = 200000) => {
    const state = get();
    const nextState = {
      ...state,
      walletBalance: state.walletBalance + amount
    };
    set(nextState);
    storageStrategy.setPreference('caty_motivation_vault', nextState);
    return nextState.walletBalance;
  }
}));
