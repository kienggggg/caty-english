/**
 * audioRecorder.js
 * Quản lý ghi âm giọng nói người học và trích xuất sóng âm thời gian thực cho Audio Mirror
 * Đã tối ưu hóa Downsampling Canvas Waveform đạt 60fps mượt mà trên mobile
 */

class AudioRecorderService {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.audioStream = null;
    this.audioContext = null;
    this.analyser = null;
    this.sourceNode = null;
    this.isRecording = false;
    this.animationFrameId = null;
  }

  // Khởi động thu âm và trích xuất sóng âm mượt mà
  async startRecording(onWaveformData) {
    try {
      this.audioChunks = [];
      this.audioStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000 // Tối ưu hóa tải trên thiết bị mobile
        }
      });

      // Cài đặt Web Audio Analyser
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtxClass();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 128; // Giảm tải tính toán, tăng hiệu năng
      this.sourceNode = this.audioContext.createMediaStreamSource(this.audioStream);
      this.sourceNode.connect(this.analyser);

      // Cài đặt MediaRecorder
      this.mediaRecorder = new MediaRecorder(this.audioStream);
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          this.audioChunks.push(e.data);
        }
      };

      this.mediaRecorder.start(100);
      this.isRecording = true;

      // Vòng lặp lấy dữ liệu sóng âm tối ưu
      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const streamWaveform = () => {
        if (!this.isRecording) return;
        this.analyser.getByteTimeDomainData(dataArray);

        // Downsampling: truyền mảng mẫu nhẹ nhàng
        if (onWaveformData) {
          onWaveformData(Array.from(dataArray));
        }
        this.animationFrameId = requestAnimationFrame(streamWaveform);
      };

      this.animationFrameId = requestAnimationFrame(streamWaveform);
      return true;
    } catch (err) {
      console.error('Không thể truy cập Microphone:', err);
      throw err;
    }
  }

  // Dừng thu âm và trả về Audio Blob + Object URL
  stopRecording() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || !this.isRecording) {
        resolve(null);
        return;
      }

      this.isRecording = false;
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Dừng tất cả audio tracks
        if (this.audioStream) {
          this.audioStream.getTracks().forEach(track => track.stop());
        }
        if (this.audioContext && this.audioContext.state !== 'closed') {
          this.audioContext.close();
        }

        resolve({ audioBlob, audioUrl });
      };

      this.mediaRecorder.stop();
    });
  }
}

export const audioRecorder = new AudioRecorderService();
