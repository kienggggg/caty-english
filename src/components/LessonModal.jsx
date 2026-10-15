import React, { useState, useEffect } from 'react';
import { X, Volume2, CheckCircle2, AlertCircle, Sparkles, ArrowRight, RotateCcw, Trophy, Award, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getLessonContent } from '../data/lessonsContentData';
import { webSpeech } from '../services/webSpeechService';
import { useUserStore } from '../stores/useUserStore';

export const LessonModal = ({ lesson, isOpen, onClose, onComplete, onOpenCertificate }) => {
  const { accent, addXp } = useUserStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [puzzleSelectedWords, setPuzzleSelectedWords] = useState([]);
  const [puzzleAvailableWords, setPuzzleAvailableWords] = useState([]);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);

  const lessonData = lesson ? getLessonContent(lesson.id) : null;
  const currentStep = lessonData?.steps?.[currentStepIndex] || null;
  const totalSteps = lessonData?.steps?.length || 1;
  const progressPercent = Math.round(((currentStepIndex) / totalSteps) * 100);

  // Khởi tạo bài học và bước câu hỏi
  useEffect(() => {
    if (isOpen && lesson) {
      setCurrentStepIndex(0);
      setIsLessonCompleted(false);
      resetStepState(0);
    }
  }, [isOpen, lesson]);

  // Reset trạng thái khi chuyển câu hỏi
  const resetStepState = (stepIdx) => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);

    const step = lessonData?.steps?.[stepIdx];
    if (step && step.type === 'puzzle') {
      // Xáo trộn nhẹ các từ để người học ghép
      const words = [...(step.words || [])].sort(() => Math.random() - 0.5);
      setPuzzleAvailableWords(words);
      setPuzzleSelectedWords([]);
    }
  };

  if (!isOpen || !lesson || !lessonData) return null;

  // Xử lý chọn từ trong dạng Puzzle (Word Builder)
  const handleSelectPuzzleWord = (word, index) => {
    if (isAnswerChecked) return;
    webSpeech.speak(word, { accent, rate: 0.9 });
    const newAvailable = [...puzzleAvailableWords];
    newAvailable.splice(index, 1);
    setPuzzleAvailableWords(newAvailable);
    setPuzzleSelectedWords([...puzzleSelectedWords, word]);
  };

  // Trả từ từ khay ghép về lại ngân hàng từ
  const handleRemovePuzzleWord = (word, index) => {
    if (isAnswerChecked) return;
    const newSelected = [...puzzleSelectedWords];
    newSelected.splice(index, 1);
    setPuzzleSelectedWords(newSelected);
    setPuzzleAvailableWords([...puzzleAvailableWords, word]);
  };

  // Kiểm tra đáp án
  const handleCheckAnswer = () => {
    if (currentStep.type === 'theory') {
      handleNextStep();
      return;
    }

    let correct = false;

    if (currentStep.type === 'choice' || currentStep.type === 'dialogue') {
      if (selectedOption === null) return;
      correct = currentStep.options[selectedOption]?.isCorrect || false;
    } else if (currentStep.type === 'puzzle') {
      const builtSentence = puzzleSelectedWords.join(' ').trim();
      correct = builtSentence.toLowerCase() === currentStep.correctSentence.trim().toLowerCase();
    }

    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      webSpeech.playCorrectSound();
    } else {
      webSpeech.playWrongSound();
    }
  };

  // Chuyển sang bước tiếp theo
  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      resetStepState(nextIdx);
    } else {
      // Hoàn thành toàn bộ bài học!
      setIsLessonCompleted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  // Xác nhận kết thúc và nhận XP
  const handleFinishLesson = () => {
    addXp(lesson.xp || 25);
    onComplete(lesson.id);
    onClose();

    // Nếu là bài cột mốc/tốt nghiệp, mở modal chứng chỉ
    if (lesson.isMilestone || lesson.isGraduation || lesson.type === 'milestone' || lesson.type === 'graduation') {
      if (onOpenCertificate) onOpenCertificate();
    }
  };

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
      zIndex: 120,
      padding: '12px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '430px',
        width: '100%',
        maxHeight: '94vh',
        height: '100%',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid var(--border-active)',
        boxShadow: 'var(--shadow-md)',
        background: 'var(--bg-surface)',
        position: 'relative'
      }}>
        {/* HEADER: Nút thoát & Thanh tiến độ bài học */}
        <div style={{
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface)'
        }}>
          <button
            onClick={() => {
              if (window.confirm('Bạn có chắc muốn thoát bài học đang dở không?')) {
                onClose();
              }
            }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px'
            }}
            title="Thoát bài học"
          >
            <X size={20} />
          </button>

          {/* Thanh Tiến Độ */}
          <div style={{
            flex: 1,
            height: '10px',
            background: 'var(--border-subtle)',
            borderRadius: '9999px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              width: `${isLessonCompleted ? 100 : progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--color-accent), var(--color-primary))',
              borderRadius: '9999px',
              transition: 'width 0.3s ease'
            }} />
          </div>

          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary-light)' }}>
            {isLessonCompleted ? '100%' : `${currentStepIndex + 1}/${totalSteps}`}
          </span>
        </div>

        {/* NỘI DUNG CHÍNH (SCROLLABLE BODY) */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          {!isLessonCompleted ? (
            <>
              {/* Tiêu đề câu hỏi / loại bài */}
              <div>
                <span className="badge badge-indigo" style={{ marginBottom: '6px' }}>
                  {lesson.title}
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px', lineHeight: 1.35 }}>
                  {currentStep.title || currentStep.question}
                </h3>
              </div>

              {/* DẠNG 1: LÝ THUYẾT 30S (THEORY) */}
              {currentStep.type === 'theory' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    fontSize: '0.9rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.55,
                    whiteSpace: 'pre-line'
                  }}>
                    💡 {currentStep.rule}
                  </div>

                  {currentStep.examples && currentStep.examples.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Ví Dụ Thực Hành (Bấm để nghe):
                      </span>
                      {currentStep.examples.map((ex, idx) => (
                        <div
                          key={idx}
                          onClick={() => webSpeech.speak(ex.word, { accent })}
                          style={{
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-md)',
                            padding: '12px 14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-accent-light)' }}>
                                {ex.word}
                              </span>
                              {ex.ipa && (
                                <span style={{ fontSize: '0.82rem', color: 'var(--color-primary-light)' }}>
                                  {ex.ipa}
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                              {ex.meaning}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn-3d btn-3d-subtle"
                            style={{ padding: '8px', borderRadius: '50%' }}
                          >
                            <Volume2 size={16} color="var(--color-accent-light)" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* DẠNG 2: TRẮC NGHIỆM LỰA CHỌN (CHOICE) */}
              {currentStep.type === 'choice' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {currentStep.audioWord && (
                    <div style={{ textAlign: 'center', margin: '4px 0' }}>
                      <button
                        onClick={() => webSpeech.speak(currentStep.audioWord, { accent })}
                        className="btn-3d btn-3d-primary"
                        style={{ padding: '12px 24px', gap: '8px', fontSize: '0.95rem' }}
                      >
                        <Volume2 size={20} />
                        <span>Nghe Phát Âm Mẫu</span>
                      </button>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {currentStep.options.map((opt, idx) => {
                      const isSelected = selectedOption === idx;
                      let btnStyle = {
                        padding: '14px 16px',
                        textAlign: 'left',
                        justifyContent: 'flex-start',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        lineHeight: 1.4
                      };

                      if (isAnswerChecked) {
                        if (opt.isCorrect) {
                          btnStyle.background = 'rgba(16, 185, 129, 0.2)';
                          btnStyle.border = '1px solid var(--color-accent)';
                          btnStyle.color = 'var(--color-accent-light)';
                        } else if (isSelected && !opt.isCorrect) {
                          btnStyle.background = 'rgba(239, 68, 68, 0.2)';
                          btnStyle.border = '1px solid var(--color-danger)';
                          btnStyle.color = 'var(--color-danger)';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswerChecked}
                          onClick={() => {
                            setSelectedOption(idx);
                            if (opt.text) webSpeech.speak(opt.text.split('(')[0], { accent });
                          }}
                          className={`btn-3d ${isSelected && !isAnswerChecked ? 'btn-3d-primary' : 'btn-3d-subtle'}`}
                          style={btnStyle}
                        >
                          <span style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: isSelected ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            marginRight: '12px',
                            flexShrink: 0
                          }}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* DẠNG 3: GHÉP CÂU / XẾP TỪ THÀNH CÂU CHUẨN S-V-O (PUZZLE) */}
              {currentStep.type === 'puzzle' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Ô chứa câu đang ghép */}
                  <div style={{
                    minHeight: '80px',
                    border: '2px dashed var(--border-active)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                    background: 'var(--bg-surface-elevated)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    alignItems: 'center',
                    alignContent: 'flex-start'
                  }}>
                    {puzzleSelectedWords.length === 0 ? (
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: 'auto' }}>
                        Chạm vào các từ bên dưới để đưa vào câu...
                      </span>
                    ) : (
                      puzzleSelectedWords.map((word, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRemovePuzzleWord(word, idx)}
                          className="btn-3d btn-3d-primary"
                          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                        >
                          {word}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Ngân hàng từ có sẵn để chọn */}
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Kho Thẻ Từ Có Sẵn:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                      {puzzleAvailableWords.map((word, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectPuzzleWord(word, idx)}
                          className="btn-3d btn-3d-subtle"
                          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* DẠNG 4: HỘI THOẠI ĐÓNG VAI TÌNH HUỐNG (DIALOGUE) */}
              {currentStep.type === 'dialogue' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Bong bóng lời thoại của nhân vật */}
                  <div style={{
                    background: 'var(--bg-surface-elevated)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    padding: '14px',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      flexShrink: 0
                    }}>
                      <MessageSquare size={18} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary-light)' }}>
                        {currentStep.speaker || 'Đối tác giao tiếp'}
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                        "{currentStep.line}"
                      </div>
                    </div>
                    <button
                      onClick={() => webSpeech.speak(currentStep.line, { accent })}
                      className="btn-3d btn-3d-subtle"
                      style={{ padding: '6px', borderRadius: '50%' }}
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>

                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    Phản xạ của bạn là gì?
                  </span>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {currentStep.options.map((opt, idx) => {
                      const isSelected = selectedOption === idx;
                      let btnStyle = {
                        padding: '12px 14px',
                        textAlign: 'left',
                        justifyContent: 'flex-start',
                        fontSize: '0.85rem'
                      };

                      if (isAnswerChecked) {
                        if (opt.isCorrect) {
                          btnStyle.background = 'rgba(16, 185, 129, 0.2)';
                          btnStyle.border = '1px solid var(--color-accent)';
                          btnStyle.color = 'var(--color-accent-light)';
                        } else if (isSelected && !opt.isCorrect) {
                          btnStyle.background = 'rgba(239, 68, 68, 0.2)';
                          btnStyle.border = '1px solid var(--color-danger)';
                          btnStyle.color = 'var(--color-danger)';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswerChecked}
                          onClick={() => {
                            setSelectedOption(idx);
                            webSpeech.speak(opt.text, { accent });
                          }}
                          className={`btn-3d ${isSelected && !isAnswerChecked ? 'btn-3d-primary' : 'btn-3d-subtle'}`}
                          style={btnStyle}
                        >
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* MÀN HÌNH CHÚC MỪNG HOÀN THÀNH BÀI HỌC */
            <div style={{
              margin: 'auto 0',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F59E0B, #10B981)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4)'
              }} className="floating-element">
                <Trophy size={42} />
              </div>

              <div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Xuất Sắc! Hoàn Thành Bài Học
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  Bạn vừa tích lũy thêm kiến thức thực chiến và tiến gần hơn tới vạch đích!
                </p>
              </div>

              <div style={{
                background: 'var(--bg-surface-elevated)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 24px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                gap: '24px',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Điểm Thưởng</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary-light)' }}>
                    +{lesson.xp || 25} XP
                  </div>
                </div>
                <div style={{ width: '1px', height: '30px', background: 'var(--border-subtle)' }} />
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Trạng Thái</div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-accent-light)' }}>
                    Đã Thuộc
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER: THANH KIỂM TRA ĐÁP ÁN & TIẾP TỤC */}
        <div style={{
          padding: '14px 18px',
          borderTop: '1px solid var(--border-subtle)',
          background: isAnswerChecked
            ? isCorrect
              ? 'rgba(16, 185, 129, 0.12)'
              : 'rgba(239, 68, 68, 0.12)'
            : 'var(--bg-surface)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {isAnswerChecked && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              {isCorrect ? (
                <CheckCircle2 size={20} color="var(--color-accent-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
              ) : (
                <AlertCircle size={20} color="var(--color-danger)" style={{ flexShrink: 0, marginTop: '2px' }} />
              )}
              <div style={{ fontSize: '0.82rem', lineHeight: 1.4 }}>
                <span style={{ fontWeight: 800, color: isCorrect ? 'var(--color-accent-light)' : 'var(--color-danger)' }}>
                  {isCorrect ? 'Chính xác! Rất tuyệt vời.' : 'Chưa chuẩn xác!'}
                </span>
                {currentStep.explanation && (
                  <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {currentStep.explanation}
                  </div>
                )}
              </div>
            </div>
          )}

          {!isLessonCompleted ? (
            !isAnswerChecked ? (
              <button
                onClick={handleCheckAnswer}
                disabled={
                  (currentStep.type === 'choice' || currentStep.type === 'dialogue') && selectedOption === null
                    ? true
                    : currentStep.type === 'puzzle' && puzzleSelectedWords.length === 0
                    ? true
                    : false
                }
                className="btn-3d btn-3d-primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  opacity:
                    ((currentStep.type === 'choice' || currentStep.type === 'dialogue') && selectedOption === null) ||
                    (currentStep.type === 'puzzle' && puzzleSelectedWords.length === 0)
                      ? 0.5
                      : 1
                }}
              >
                <span>{currentStep.type === 'theory' ? 'Đã Hiểu, Tiếp Tục' : 'Kiểm Tra Đáp Án'}</span>
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                className={`btn-3d ${isCorrect ? 'btn-3d-accent' : 'btn-3d-primary'}`}
                style={{ width: '100%', padding: '14px', gap: '6px' }}
              >
                <span>Tiếp Tục</span>
                <ArrowRight size={18} />
              </button>
            )
          ) : (
            <button
              onClick={handleFinishLesson}
              className="btn-3d btn-3d-accent"
              style={{ width: '100%', padding: '14px', gap: '6px' }}
            >
              <span>Nhận Thưởng & Về Lộ Trình</span>
              <Sparkles size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
