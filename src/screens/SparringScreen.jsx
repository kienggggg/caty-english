import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Send, Volume2, Sparkles, AlertCircle, CheckCircle2, 
  BookmarkPlus, BookmarkCheck, ArrowRight, RotateCcw, ChevronDown, 
  ChevronUp, Zap, HelpCircle, Trophy, MessageSquareQuote
} from 'lucide-react';
import { SPARRING_SCENARIOS } from '../data/sparringData';
import { useSparringStore } from '../stores/useSparringStore';
import { useUserStore } from '../stores/useUserStore';

export const SparringScreen = () => {
  const { 
    activeScenarioId, selectScenario, messages, sendMessage, 
    saveCorrectionToSRS, resetScenario, speakText, isSpeaking, stats, savedMistakes 
  } = useSparringStore();
  const { accent } = useUserStore();

  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [savedSuccessMap, setSavedSuccessMap] = useState({});
  const [showScenarioDetails, setShowScenarioDetails] = useState(false);
  const [showSavedMistakesModal, setShowSavedMistakesModal] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const currentScenario = SPARRING_SCENARIOS.find(s => s.id === activeScenarioId) || SPARRING_SCENARIOS[0];

  // Cuộn tự động xuống tin nhắn mới nhất
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Khởi tạo Speech Recognition nếu trình duyệt hỗ trợ
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = accent === 'UK' ? 'en-GB' : 'en-US';

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputText(transcript);
      };
      recognition.onerror = (e) => {
        console.warn('Speech recognition error:', e);
        setIsRecording(false);
      };
      recognition.onend = () => setIsRecording(false);

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [accent]);

  // Bật/tắt micro
  const toggleRecording = () => {
    if (!speechSupported) {
      alert('Trình duyệt hiện tại chưa hỗ trợ Web Speech API. Bạn có thể gõ văn bản để đối luyện cùng CatY nhé!');
      return;
    }
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.warn('Recognition start error:', err);
      }
    }
  };

  // Gửi câu trả lời
  const handleSend = (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    if (isRecording) {
      recognitionRef.current?.stop();
    }

    sendMessage(text);
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Lưu thẻ sửa lỗi vào SRS
  const handleSaveToSRS = (msgId, original, polish, tip) => {
    saveCorrectionToSRS(original, polish, tip);
    setSavedSuccessMap(prev => ({ ...prev, [msgId]: true }));
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--bg-app)',
      position: 'relative'
    }}>
      {/* 1. Header Chọn Tình Huống Đối Luyện */}
      <div style={{
        padding: '12px 16px 8px 16px',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface-elevated)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.25rem' }}>⚔️</span>
            <div>
              <h2 style={{ fontSize: '0.98rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
                Võ Đài Đối Luyện AI
              </h2>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>
                Áp dụng kiến thức thực chiến & Bắt lỗi sai tức thì
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={() => setShowSavedMistakesModal(true)}
              title="Xem các câu lỗi đã lưu"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                background: 'rgba(99, 102, 241, 0.12)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--color-primary-light)',
                fontSize: '0.68rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <BookmarkCheck size={13} />
              <span>{savedMistakes.length} câu đã lưu</span>
            </button>

            <button
              onClick={resetScenario}
              title="Làm mới hội thoại tình huống này"
              style={{
                padding: '5px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* Thanh cuộn danh sách kịch bản (Horizontal Pills) */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {SPARRING_SCENARIOS.map((sc) => {
            const isSelected = sc.id === activeScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => selectScenario(sc.id)}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1.5px solid var(--color-primary)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'var(--color-primary)' : 'var(--bg-card)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                  fontSize: '0.74rem',
                  fontWeight: isSelected ? 800 : 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 3px 10px rgba(99, 102, 241, 0.35)' : 'none'
                }}
              >
                <span>{sc.icon}</span>
                <span>{sc.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Banner Thông Tin Bối Cảnh (Collapsible) */}
      <div style={{
        background: 'rgba(245, 158, 11, 0.08)',
        borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
        padding: '8px 16px',
        fontSize: '0.74rem'
      }}>
        <div 
          onClick={() => setShowScenarioDetails(!showScenarioDetails)}
          style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            cursor: 'pointer',
            fontWeight: 700,
            color: 'var(--color-streak)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>{currentScenario.partnerAvatar}</span>
            <span>Đối tác: {currentScenario.partnerName} ({currentScenario.partnerRole})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem' }}>
            <span>Bối cảnh</span>
            {showScenarioDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
        </div>

        {showScenarioDetails && (
          <div style={{ marginTop: '8px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            <p style={{ margin: '0 0 6px 0' }}>{currentScenario.situation}</p>
            {currentScenario.targetVocab && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Từ vựng gợi ý:</span>
                {currentScenario.targetVocab.map((v, idx) => (
                  <span key={idx} style={{
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.68rem',
                    color: 'var(--color-primary-light)'
                  }}>
                    {v}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Khung Tin Nhắn Hội Thoại & Phản Hồi Bắt Lỗi */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const feedback = msg.feedback;

          return (
            <div key={msg.id} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: isUser ? 'flex-end' : 'flex-start',
              width: '100%'
            }}>
              {/* Tên & Avatar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '4px',
                fontSize: '0.68rem',
                color: 'var(--text-muted)'
              }}>
                <span>{msg.avatar}</span>
                <span style={{ fontWeight: 700 }}>{msg.author}</span>
                <span>• {msg.timestamp}</span>
              </div>

              {/* Bong bóng tin nhắn */}
              <div style={{
                maxWidth: '85%',
                padding: '10px 14px',
                borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: isUser ? 'var(--color-primary)' : 'var(--bg-card)',
                color: isUser ? '#FFFFFF' : 'var(--text-primary)',
                border: isUser ? 'none' : '1px solid var(--border-subtle)',
                fontSize: '0.88rem',
                lineHeight: 1.45,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                  <span>{msg.text}</span>
                  {!isUser && (
                    <button
                      onClick={() => speakText(msg.text)}
                      title="Nghe phát âm chuẩn"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: isSpeaking ? 'var(--color-primary-light)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Volume2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* CATY DIAGNOSTIC FEEDBACK BOX (Chỉ hiện dưới câu của User) */}
              {isUser && feedback && (
                <div style={{
                  maxWidth: '90%',
                  marginTop: '8px',
                  background: 'var(--bg-surface-elevated)',
                  border: feedback.hasMistake ? '1px solid rgba(239, 68, 68, 0.35)' : '1px solid rgba(16, 185, 129, 0.35)',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  fontSize: '0.78rem'
                }}>
                  {/* Header Phân Tích */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {feedback.hasMistake ? (
                        <>
                          <AlertCircle size={15} color="#EF4444" />
                          <span style={{ fontWeight: 800, color: '#EF4444' }}>CatY Bắt Lỗi & Chữa Bài</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={15} color="#10B981" />
                          <span style={{ fontWeight: 800, color: '#10B981' }}>Chuẩn Tự Nhiên (Fluency: {feedback.fluencyScore}%)</span>
                        </>
                      )}
                    </div>

                    {/* Nút lưu vào Hộp SRS */}
                    <button
                      onClick={() => handleSaveToSRS(
                        msg.id, 
                        msg.text, 
                        feedback.nativePolish || msg.text, 
                        feedback.mistakes.length > 0 ? feedback.mistakes[0].rule : 'Diễn đạt tự nhiên'
                      )}
                      disabled={savedSuccessMap[msg.id]}
                      style={{
                        background: savedSuccessMap[msg.id] ? 'rgba(16, 185, 129, 0.15)' : 'rgba(99, 102, 241, 0.12)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        padding: '2px 8px',
                        color: savedSuccessMap[msg.id] ? '#10B981' : 'var(--color-primary-light)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        cursor: savedSuccessMap[msg.id] ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {savedSuccessMap[msg.id] ? (
                        <>
                          <BookmarkCheck size={12} />
                          <span>Đã lưu vào SRS!</span>
                        </>
                      ) : (
                        <>
                          <BookmarkPlus size={12} />
                          <span>Lưu vào SRS</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Chi tiết lỗi */}
                  {feedback.hasMistake && feedback.mistakes.map((m, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(239, 68, 68, 0.08)',
                      padding: '6px 8px',
                      borderRadius: '6px',
                      marginBottom: '6px'
                    }}>
                      <div style={{ color: '#EF4444', fontWeight: 700 }}>
                        ❌ Cần sửa: <span style={{ textDecoration: 'line-through' }}>{m.original}</span> ➔ <span style={{ color: '#10B981', textDecoration: 'none' }}>{m.fix}</span>
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', marginTop: '2px' }}>
                        {m.rule}
                      </div>
                    </div>
                  ))}

                  {/* Cách nói bản xứ tự nhiên hơn (Native Polish) */}
                  {feedback.nativePolish && (
                    <div style={{
                      background: 'rgba(16, 185, 129, 0.08)',
                      padding: '6px 8px',
                      borderRadius: '6px',
                      marginTop: '4px'
                    }}>
                      <div style={{ color: '#10B981', fontWeight: 800 }}>
                        ✨ Diễn đạt chuẩn Pro: "{feedback.nativePolish}"
                      </div>
                      {feedback.vocabularyNugget && (
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '2px' }}>
                          💡 {feedback.vocabularyNugget}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Lời động viên CatY */}
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
                    {feedback.encouragement}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* 4. Gợi Ý Câu Nói Nhanh (Quick Replies) */}
      {currentScenario.suggestedResponses && (
        <div style={{
          padding: '4px 16px 8px 16px',
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {currentScenario.suggestedResponses.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(suggestion)}
              style={{
                flexShrink: 0,
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-card)',
                color: 'var(--text-secondary)',
                fontSize: '0.7rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Sparkles size={11} color="var(--color-primary-light)" />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}

      {/* 5. Khung Điều Khiển Nhập Liệu Đa Phương Thức (Voice & Text) */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface-elevated)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {/* Nút Micro Thu Âm Thực Chiến */}
        <button
          onClick={toggleRecording}
          title={isRecording ? 'Đang lắng nghe... Bấm để dừng' : 'Bấm micro để nói tiếng Anh'}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: isRecording ? '2px solid #EF4444' : '1px solid var(--border-subtle)',
            background: isRecording ? '#EF4444' : 'var(--bg-card)',
            color: isRecording ? '#FFFFFF' : 'var(--color-primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            animation: isRecording ? 'pulse 1.2s infinite' : 'none',
            boxShadow: isRecording ? '0 0 14px rgba(239, 68, 68, 0.6)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        {/* Ô Gõ Chữ */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)',
          padding: '0 12px'
        }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isRecording ? 'CatY đang nghe bạn nói...' : 'Nói hoặc gõ câu trả lời bằng tiếng Anh...'}
            style={{
              width: '100%',
              padding: '10px 0',
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '0.84rem',
              color: 'var(--text-primary)'
            }}
          />
        </div>

        {/* Nút Gửi */}
        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim()}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            border: 'none',
            background: inputText.trim() ? 'var(--color-primary)' : 'var(--bg-card)',
            color: inputText.trim() ? '#FFFFFF' : 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: inputText.trim() ? 'pointer' : 'not-allowed',
            flexShrink: 0,
            boxShadow: inputText.trim() ? '0 3px 10px rgba(99, 102, 241, 0.35)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <Send size={18} />
        </button>
      </div>

      {/* 6. Modal Danh Sách Các Lỗi Đã Lưu Cho SRS */}
      {showSavedMistakesModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '460px',
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{
              padding: '16px',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookmarkCheck size={20} color="var(--color-primary-light)" />
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>
                  Thẻ Sửa Lỗi Đã Lưu ({savedMistakes.length})
                </h3>
              </div>
              <button
                onClick={() => setShowSavedMistakesModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  color: 'var(--text-muted)'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {savedMistakes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)' }}>
                  <p>Bạn chưa lưu câu sửa lỗi nào.</p>
                  <p style={{ fontSize: '0.75rem' }}>Trong lúc đối luyện, nhấn "Lưu vào SRS" để ôn lại những lỗi sai thường gặp nhé!</p>
                </div>
              ) : (
                savedMistakes.map((card) => (
                  <div key={card.id} style={{
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '12px'
                  }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--color-streak)', fontWeight: 700, marginBottom: '4px' }}>
                      {card.scenarioTitle} • {card.date}
                    </div>
                    <div style={{ color: '#EF4444', fontSize: '0.8rem', textDecoration: 'line-through' }}>
                      {card.originalText}
                    </div>
                    <div style={{ color: '#10B981', fontWeight: 800, fontSize: '0.85rem', marginTop: '2px' }}>
                      ➔ {card.nativePolish}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      💡 {card.ruleTip}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-subtle)', textAlign: 'right' }}>
              <button
                onClick={() => setShowSavedMistakesModal(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: 'var(--color-primary)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
