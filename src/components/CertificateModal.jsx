import React, { useRef, useEffect } from 'react';
import { Download, Share2, X, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useUserStore } from '../stores/useUserStore';

export const CertificateModal = ({ isOpen, onClose, stageTitle = 'Chặng 1: Thợ Săn Âm Đuôi' }) => {
  const { name, xp, streakDays } = useUserStore();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Bắn pháo hoa ăn mừng thành tựu cột mốc
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      // Vẽ chứng chỉ lên Canvas
      renderCertificate();
    }
  }, [isOpen]);

  const renderCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Canvas kích thước 800x560 (Tỷ lệ chứng chỉ nằm ngang chuẩn)
    canvas.width = 800;
    canvas.height = 560;

    // 1. Nền sang trọng (Dark Slate Gradient)
    const bgGradient = ctx.createLinearGradient(0, 0, 800, 560);
    bgGradient.addColorStop(0, '#0B0F19');
    bgGradient.addColorStop(0.5, '#131B2E');
    bgGradient.addColorStop(1, '#0B0F19');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 800, 560);

    // 2. Viền Vàng Hoàng Gia (Gold Double Border)
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 760, 520);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(28, 28, 744, 504);

    // 3. Tiêu đề thương hiệu CatY
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CATY ENGLISH ACADEMY — CERTIFICATE OF ACHIEVEMENT', 400, 80);

    // 4. Dòng chữ Chứng nhận
    ctx.fillStyle = '#94A3B8';
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('CHỨNG CHỈ CÔNG NHẬN THÀNH TỰU HOÀN THÀNH CỘT MỐC', 400, 125);

    // 5. Tên người học
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(name || 'Học Viên Xuất Sắc', 400, 185);

    // 6. Gạch chân trang trí
    ctx.strokeStyle = '#6366F1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(250, 205);
    ctx.lineTo(550, 205);
    ctx.stroke();

    // 7. Nội dung thành tựu
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Đã xuất sắc hoàn thành: ${stageTitle}`, 400, 255);

    // 8. Huy hiệu số liệu
    ctx.fillStyle = '#FBBF24';
    ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`🔥 Chuỗi ${streakDays} Ngày Kiên Trì   •   ⭐ ${xp} XP Tích Lũy   •   🎯 Làm Chủ 100% Âm Đuôi`, 400, 310);

    // 9. Lời nhắn động viên
    ctx.fillStyle = '#64748B';
    ctx.font = 'italic 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('"Mỗi ngày một viên gạch, bạn đã chính thức bước qua nỗi sợ tiếng Anh."', 400, 375);

    // 10. Watermark & Ngày cấp
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '13px "Plus Jakarta Sans", sans-serif';
    const issueDate = new Date().toLocaleDateString('vi-VN');
    ctx.fillText(`Ngày cấp: ${issueDate}   |   Mã xác thực: CY-${Date.now().toString(36).toUpperCase()}`, 400, 480);
    ctx.fillText('Được bảo chứng bởi CatY English — Học Tiếng Anh Cùng Mèo Kỷ Luật', 400, 502);
  };

  // Tải ảnh chứng chỉ về máy
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `CatY_ChungChi_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Chia sẻ lên mạng xã hội (Web Share API)
  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (navigator.share && canvas.toBlob) {
      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'caty_certificate.png', { type: 'image/png' });
        try {
          await navigator.share({
            title: 'Chứng Chỉ CatY English của Tôi!',
            text: `Tôi vừa hoàn thành xuất sắc ${stageTitle} trên ứng dụng CatY English!`,
            files: [file]
          });
        } catch (e) {}
      });
    } else {
      handleDownload();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg-overlay)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 110,
      padding: '16px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '440px',
        width: '100%',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        border: '1px solid var(--border-active)',
        position: 'relative'
      }}>
        {/* Nút đóng */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-secondary)'
          }}
        >
          <X size={18} />
        </button>

        {/* Tiêu đề Modal */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={24} color="#F59E0B" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Chứng Chỉ Thành Tựu Của Bạn
          </h3>
        </div>

        {/* Canvas Preview */}
        <div style={{
          width: '100%',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
        }}>
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Hành động Tải về & Chia sẻ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            onClick={handleDownload}
            className="btn-3d btn-3d-subtle"
            style={{ gap: '8px', padding: '12px' }}
          >
            <Download size={16} />
            <span>Tải Ảnh PNG</span>
          </button>
          <button
            onClick={handleShare}
            className="btn-3d btn-3d-primary"
            style={{ gap: '8px', padding: '12px' }}
          >
            <Share2 size={16} />
            <span>Chia Sẻ Khoe Bạn</span>
          </button>
        </div>
      </div>
    </div>
  );
};
