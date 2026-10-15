import { describe, it, expect, beforeEach } from 'vitest';
import { useMotivationStore } from '../src/stores/useMotivationStore';
import { storageStrategy } from '../src/services/storageStrategy';

describe('CatY Motivation Vault (Tài Khoản Động Lực & Ký Quỹ Kỷ Luật)', () => {
  beforeEach(() => {
    localStorage.clear();
    useMotivationStore.setState({
      walletBalance: 500000,
      activeContract: null,
      contractHistory: [],
      streakShields: 1,
      stats: {
        totalStaked: 0,
        totalRefunded: 0,
        totalBonusEarned: 0,
        totalForfeited: 0,
        successfulChallenges: 0
      },
      communityPoolAmount: 12500000
    });
  });

  it('1. Khởi tạo hợp đồng ký quỹ cam kết thành công và trừ tiền ví', () => {
    const store = useMotivationStore.getState();
    const res = store.createCommitment({
      amount: 200000,
      targetDays: 14,
      milestoneType: 'ALL_OR_NOTHING',
      targetGoal: 'Thử thách 14 ngày xóa mất gốc'
    });

    expect(res.success).toBe(true);
    expect(res.contract.amount).toBe(200000);
    expect(res.contract.status).toBe('ACTIVE');

    const updated = useMotivationStore.getState();
    expect(updated.walletBalance).toBe(300000); // 500k - 200k
    expect(updated.activeContract).not.toBeNull();
    expect(updated.activeContract.amount).toBe(200000);
  });

  it('2. Ngăn chặn tạo thêm hợp đồng khi đang có hợp đồng hoạt động', () => {
    const store = useMotivationStore.getState();
    store.createCommitment({ amount: 100000, targetDays: 7 });

    const secondTry = store.createCommitment({ amount: 50000, targetDays: 7 });
    expect(secondTry.success).toBe(false);
    expect(secondTry.error).toContain('đang kích hoạt');
  });

  it('3. Điểm danh giữ chuỗi tăng ngày trong hợp đồng', () => {
    const store = useMotivationStore.getState();
    store.createCommitment({ amount: 100000, targetDays: 7 });

    const checkinRes = store.checkinDailyStreak();
    expect(checkinRes.status).toBe('STREAK_UPDATED');
    expect(checkinRes.contract.currentStreakInContract).toBe(1);

    // Điểm danh lần 2 trong cùng ngày -> báo đã điểm danh
    const checkinAgain = store.checkinDailyStreak();
    expect(checkinAgain.status).toBe('ALREADY_CHECKED_IN');
  });

  it('4. Hoàn thành toàn bộ số ngày -> Nhận lại 100% tiền cọc + Thưởng 10% CatY Pool', () => {
    const store = useMotivationStore.getState();
    store.createCommitment({ amount: 200000, targetDays: 2, milestoneType: 'ALL_OR_NOTHING' });

    // Ngày 1
    useMotivationStore.setState(s => ({
      activeContract: { ...s.activeContract, currentStreakInContract: 1, lastCheckinDate: 'yesterday' }
    }));

    // Ngày 2 (hoàn thành)
    const res = useMotivationStore.getState().checkinDailyStreak();
    expect(res.status).toBe('COMPLETED');

    const updated = useMotivationStore.getState();
    expect(updated.activeContract).toBeNull();
    // Tiền ví: Ban đầu 500k - 200k = 300k. Hoàn 200k + thưởng 10% (20k) = 520k!
    expect(updated.walletBalance).toBe(520000);
    expect(updated.stats.successfulChallenges).toBe(1);
    expect(updated.stats.totalBonusEarned).toBe(20000);
    expect(updated.contractHistory.length).toBe(1);
    expect(updated.contractHistory[0].status).toBe('COMPLETED');
  });

  it('5. Chế độ hoàn theo chặng (STAGED): hoàn trước 30% khi đạt nửa chặng', () => {
    const store = useMotivationStore.getState();
    store.createCommitment({ amount: 200000, targetDays: 4, milestoneType: 'STAGED' });

    // Đạt ngày 2 (nửa chặng của 4 ngày)
    useMotivationStore.setState(s => ({
      activeContract: { ...s.activeContract, currentStreakInContract: 1, lastCheckinDate: 'yesterday' }
    }));

    const res = useMotivationStore.getState().checkinDailyStreak();
    expect(res.contract.currentStreakInContract).toBe(2);
    expect(res.contract.refundedAmount).toBe(60000); // 30% của 200k
  });

  it('6. Đứt chuỗi khi có Khiên Vuốt Mèo -> Được cứu và không mất cọc tiền', () => {
    const store = useMotivationStore.getState();
    store.createCommitment({ amount: 200000, targetDays: 14 });
    expect(useMotivationStore.getState().streakShields).toBe(1);

    const forfeitRes = store.forfeitContract('Bận việc đột xuất');
    expect(forfeitRes.rescuedByShield).toBe(true);
    expect(forfeitRes.remainingShields).toBe(0);

    // Hợp đồng vẫn còn hoạt động
    expect(useMotivationStore.getState().activeContract).not.toBeNull();
    expect(useMotivationStore.getState().activeContract.status).toBe('ACTIVE');
  });

  it('7. Đứt chuỗi khi hết khiên -> MẤT TRẮNG tiền cọc và chuyển vào Quỹ CatY Pool', () => {
    const store = useMotivationStore.getState();
    useMotivationStore.setState({ streakShields: 0 }); // Không còn khiên
    store.createCommitment({ amount: 200000, targetDays: 14 });

    const forfeitRes = store.forfeitContract('Bỏ cuộc');
    expect(forfeitRes.rescuedByShield).toBe(false);
    expect(forfeitRes.lostAmount).toBe(200000);

    const updated = useMotivationStore.getState();
    expect(updated.activeContract).toBeNull();
    expect(updated.stats.totalForfeited).toBe(200000);
    expect(updated.communityPoolAmount).toBe(12500000 + 200000); // Cộng vào quỹ chung
    expect(updated.contractHistory[0].status).toBe('FORFEITED');
  });

  it('8. Mua thêm khiên vuốt mèo và nạp thêm tiền thử thách', () => {
    const store = useMotivationStore.getState();
    store.buyStreakShieldWithXp(300);
    expect(useMotivationStore.getState().streakShields).toBe(2);

    store.topUpWallet(100000);
    expect(useMotivationStore.getState().walletBalance).toBe(600000);
  });
});
