import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Mic, Square, Play, CheckCircle2, RefreshCw, Sparkles } from 'lucide-react';
import { webSpeech } from '../services/webSpeechService';
import { audioRecorder } from '../services/audioRecorder';
import { storageStrategy } from '../services/storageStrategy';
import { useUserStore } from '../stores/useUserStore';

export const AudioMirror = ({ targetWord = 'cats', ipa = '/kæts/', endingSound = '/s/', meaning = 'những con mèo' }) => {
  const { accent, addXp } = useUserStore();
  const [isRecording, setIsRecording] = useState(false);
  const [userAudioUrl, setUserAudioUrl] = useState(null);
  const [userAudioBlob, setUserAudioBlob] = useState(null);
  const [isPlayingUser, setIsPlayingUser] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [assessment, setAssessment] = useState({ hasEndingSound: false, hasGoodRhythm: false });
  const [hasEvaluated, setHasEvaluated] = useState(false);

  const canvasRef = useRef(null);
  const waveDataRef = useRef([]);

  // Phát âm mẫu native
  const playNativeSample = (rate = 0.8) => {
    webSpeech.speak(targetWord, { accent, rate });
  };

  // Bắt đầu thu âm giọng nói người học và vẽ sóng âm Canvas
  const handleStartRecording = async () => {
    try {
      setUserAudioUrl(null);
      setUserAudioBlob(null);
      setHasEvaluated(false);
      setAssessment({ hasEndingSound: false, hasGoodRhythm: false });

      await audioRecorder.startRecording((waveData) => {
        waveDataRef.current = waveData;
        drawWaveform(waveData);
      });
      setIsRecording(true);
    } catch (err) {
      alert('Vui lòng cấp quyền Micro trên trình duyệt để sử dụng tính năng Audio Mirror!');
    }
  };

  // Dừng thu âm
  const handleStopRecording = async () => {
    const result = await audioRecorder.stopRecording();
    setIsRecording(false);
    if (result) {
      setUserAudioUrl(result.audioUrl);
      setUserAudioBlob(result.audioBlob);
    }
  };

  // Vẽ biểu đồ sóng âm thời gian thực trên Canvas
  const drawWaveform = (dataArray) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#090D16';
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 2.5;
    ctx.strokeStyle = 'var(--color-primary-light)';
    ctx.beginPath();

    const sliceWidth = width / dataArray.length;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * height) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }

    ctx.lineTo(width, height / 2);
    ctx.stroke();
  };

  // Phát lại âm thanh của người học
  const playUserVoice = () => {
    if (!userAudioUrl) return;
    const audio = new Audio(userAudioUrl);
    setIsPlayingUser(true);
    audio.onended = () => setIsPlayingUser(false);
    audio.play();
  };

  // Nghe đối chiếu A/B (Mẫu trước -> Sau đó đến Giọng bạn)
  const playCompareAB = () => {
    if (!userAudioUrl) return;
    setIsComparing(true);
    // Bước 1: Phát âm mẫu
    playNativeSample(0.85);

    // Bước 2: Sau 1 giây phát âm của người học
    setTimeout(() => {
      const audio = new Audio(userAudioUrl);
      audio.onended = () => setIsComparing(false);
      audio.play();
    }, 1200);
  };

  // Lưu bản thu âm vào IndexedDB và cộng XP
  const handleConfirmAssessment = async () => {
    if (userAudioBlob) {
      await storageStrategy.saveAudioRecording(`sample_${targetWord}_${Date.now()}`, userAudioBlob, {
        word: targetWord,
        ipa,
        assessment
      });
    }
    addXp(25);
    webSpeech.playCorrectSound();
    setHasEvaluated(true);
  };

  return (
    <div style={{
      background: 'var(--bg-surface)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Header từ mục tiêu */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {targetWord}
            </span>
            <span style={{ fontSize: '1.05rem', color: 'var(--color-primary-light)', fontWeight: 600 }}>
              {ipa}
            </span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Nghĩa: {meaning}
          </div>
        </div>

        <div className="badge badge-emerald">
          Âm đuôi: {endingSound}
        </div>
      </div>

      {/* Box Sóng Âm (Waveform Visualizer) */}
      <div className="waveform-box">
        <canvas
          ref={canvasRef}
          width={340}
          height={65}
          style={{ width: '100%', height: '65px', display: 'block' }}
        />
        {isRecording && (
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            color: 'var(--color-danger)',
            fontWeight: 700
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--color-danger)',
              display: 'inline-block'
            }} className="recording-pulse" />
            Đang ghi âm...
          </div>
        )}
      </div>

      {/* Điều khiển Nghe Mẫu & Thu Âm */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {/* Nút Nghe Mẫu */}
        <button
          onClick={() => playNativeSample(0.8)}
          className="btn-3d btn-3d-subtle"
          style={{ gap: '8px' }}
        >
          <Volume2 size={18} color="var(--color-accent-light)" />
          <span>Nghe Mẫu</span>
        </button>

        {/* Nút Bấm Nói / Dừng */}
        {!isRecording ? (
          <button
            onClick={handleStartRecording}
            className="btn-3d btn-3d-primary"
            style={{ gap: '8px' }}
          >
            <Mic size={18} />
            <span>Bấm Để Nói</span>
          </button>
        ) : (
          <button
            onClick={handleStopRecording}
            className="btn-3d btn-3d-accent"
            style={{ gap: '8px', background: 'var(--color-danger)' }}
          >
            <Square size={18} fill="#FFFFFF" />
            <span>Dừng Lại</span>
          </button>
        )}
      </div>

      {/* Khu vực Đối Chiếu A/B (Hiện khi đã có bản thu) */}
      {userAudioUrl && (
        <div style={{
          background: 'var(--bg-surface-elevated)',
          borderRadius: 'var(--radius-md)',
          padding: '14px',
          border: '1px solid var(--border-active)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              🎧 Gương Âm Thanh (Audio Mirror)
            </span>
            <button
              onClick={playCompareAB}
              disabled={isComparing}
              className="btn-3d btn-3d-accent"
              style={{ padding: '6px 12px', fontSize: '0.8rem', gap: '6px' }}
            >
              <RefreshCw size={14} className={isComparing ? 'recording-pulse' : ''} />
              {isComparing ? 'Đang so sánh...' : 'So Sánh A/B'}
            </button>
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            Bấm <strong>"So Sánh A/B"</strong> để nghe giọng bản ngữ và giọng bạn nói liên tiếp. Tự tai nhận ra âm đuôi!
          </p>

          {/* Checklist Tự Soi Âm Đuôi (Self-Assessment 2.0) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={assessment.hasEndingSound}
                onChange={(e) => setAssessment({ ...assessment, hasEndingSound: e.target.checked })}
                style={{ accentColor: 'var(--color-accent)', width: '16px', height: '16px' }}
              />
              <span>Tôi nghe thấy âm đuôi <strong>{endingSound}</strong> bật rõ ở cuối từ.</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={assessment.hasGoodRhythm}
                onChange={(e) => setAssessment({ ...assessment, hasGoodRhythm: e.target.checked })}
                style={{ accentColor: 'var(--color-accent)', width: '16px', height: '16px' }}
              />
              <span>Tốc độ và độ dài âm của tôi tương đương giọng mẫu.</span>
            </label>
          </div>

          {!hasEvaluated ? (
            <button
              onClick={handleConfirmAssessment}
              disabled={!assessment.hasEndingSound}
              className="btn-3d btn-3d-primary"
              style={{
                marginTop: '4px',
                padding: '10px',
                opacity: assessment.hasEndingSound ? 1 : 0.5,
                cursor: assessment.hasEndingSound ? 'pointer' : 'not-allowed'
              }}
            >
              <Sparkles size={16} style={{ marginRight: '6px' }} />
              Xác Nhận Đạt (+25 XP)
            </button>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              color: 'var(--color-accent-light)',
              fontWeight: 700,
              fontSize: '0.85rem',
              padding: '8px'
            }}>
              <CheckCircle2 size={18} />
              Đã ghi vào sổ tay tiến bộ! (+25 XP)
            </div>
          )}
        </div>
      )}
    </div>
  );
};
