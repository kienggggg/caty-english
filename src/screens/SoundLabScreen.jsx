import React, { useState } from 'react';
import { Volume2, Mic, BookOpen, Check, Sparkles, HelpCircle, Layers } from 'lucide-react';
import { AudioMirror } from '../components/AudioMirror';
import { ENDING_SOUNDS_RULES, CORE_IPA_SOUNDS } from '../data/ipaData';
import { MINIMAL_PAIRS } from '../data/minimalPairsData';
import { webSpeech } from '../services/webSpeechService';
import { useUserStore } from '../stores/useUserStore';

export const SoundLabScreen = () => {
  const { accent, addXp } = useUserStore();
  const [subTab, setSubTab] = useState('mirror'); // 'mirror' | 'rules' | 'pairs' | 'ipa'
  const [selectedWordIndex, setSelectedWordIndex] = useState(0);
  const [activeIpaSound, setActiveIpaSound] = useState(null);

  // Danh sách từ mẫu để soi gương âm thanh
  const practiceWords = [
    { word: 'cats', ipa: '/kæts/', endingSound: '/s/', meaning: 'những con mèo (quy tắc 1: thời phong kiến)' },
    { word: 'watches', ipa: '/ˈwɒtʃ.ɪz/', endingSound: '/ɪz/', meaning: 'đồng hồ (quy tắc 2: sóng gió)' },
    { word: 'dogs', ipa: '/dɒɡz/', endingSound: '/z/', meaning: 'những chú chó (quy tắc 3: âm rung)' },
    { word: 'stopped', ipa: '/stɒpt/', endingSound: '/t/', meaning: 'đã dừng lại (đuôi ed: chính phủ)' },
    { word: 'wanted', ipa: '/ˈwɒn.tɪd/', endingSound: '/ɪd/', meaning: 'đã muốn (đuôi ed: tiền đô)' },
    { word: 'think', ipa: '/θɪŋk/', endingSound: '/k/', meaning: 'suy nghĩ (âm thè lưỡi /θ/)' }
  ];

  const currentWord = practiceWords[selectedWordIndex];

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Sub-tab Navigation */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-md)',
        padding: '4px',
        border: '1px solid var(--border-subtle)',
        gap: '4px'
      }}>
        <button
          onClick={() => setSubTab('mirror')}
          style={{
            padding: '8px 2px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: subTab === 'mirror' ? 'var(--color-primary)' : 'transparent',
            color: subTab === 'mirror' ? '#FFFFFF' : 'var(--text-secondary)',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          🎙️ Mirror
        </button>
        <button
          onClick={() => setSubTab('rules')}
          style={{
            padding: '8px 2px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: subTab === 'rules' ? 'var(--color-primary)' : 'transparent',
            color: subTab === 'rules' ? '#FFFFFF' : 'var(--text-secondary)',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          📜 Thần Chú
        </button>
        <button
          onClick={() => setSubTab('pairs')}
          style={{
            padding: '8px 2px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: subTab === 'pairs' ? 'var(--color-primary)' : 'transparent',
            color: subTab === 'pairs' ? '#FFFFFF' : 'var(--text-secondary)',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          ⚖️ Cặp Âm
        </button>
        <button
          onClick={() => setSubTab('ipa')}
          style={{
            padding: '8px 2px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: subTab === 'ipa' ? 'var(--color-primary)' : 'transparent',
            color: subTab === 'ipa' ? '#FFFFFF' : 'var(--text-secondary)',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          🗣️ Bảng IPA
        </button>
      </div>

      {/* 1. MÀN HÌNH AUDIO MIRROR */}
      {subTab === 'mirror' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Chọn từ thực hành */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {practiceWords.map((item, idx) => (
              <button
                key={item.word}
                onClick={() => setSelectedWordIndex(idx)}
                className={`btn-3d ${selectedWordIndex === idx ? 'btn-3d-primary' : 'btn-3d-subtle'}`}
                style={{ padding: '6px 12px', fontSize: '0.8rem', flexShrink: 0 }}
              >
                {item.word}
              </button>
            ))}
          </div>

          {/* Component Audio Mirror */}
          <AudioMirror
            key={currentWord.word}
            targetWord={currentWord.word}
            ipa={currentWord.ipa}
            endingSound={currentWord.endingSound}
            meaning={currentWord.meaning}
          />

          <div style={{
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.4
          }}>
            💡 <strong>Bí quyết người mới:</strong> Người bản xứ nghe hiểu 80% từ vựng là nhờ bạn bật đúng <strong>âm đuôi</strong>. Nhìn vào sóng âm để kiểm tra xem bạn có bị nuốt mất âm cuối không nhé!
          </div>
        </div>
      )}

      {/* 2. MÀN HÌNH THẦN CHÚ ĐUÔI S/ES & ED */}
      {subTab === 'rules' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Nhóm Đuôi s/es */}
          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="#F59E0B" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {ENDING_SOUNDS_RULES.s_es.title}
              </h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {ENDING_SOUNDS_RULES.s_es.summary}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {ENDING_SOUNDS_RULES.s_es.rules.map((r, i) => (
                <div key={i} style={{
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-accent-light)' }}>
                      Đọc là {r.sound}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Tận cùng: {r.endingSounds}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-streak)', margin: '4px 0' }}>
                    {r.mnemonic}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                    {r.examples.map(ex => (
                      <button
                        key={ex.word}
                        onClick={() => webSpeech.speak(ex.word, { accent })}
                        className="btn-3d btn-3d-subtle"
                        style={{ padding: '4px 8px', fontSize: '0.75rem', gap: '4px' }}
                      >
                        <Volume2 size={12} />
                        <span>{ex.word} {ex.ipa}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nhóm Đuôi ed */}
          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="#10B981" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {ENDING_SOUNDS_RULES.ed.title}
              </h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {ENDING_SOUNDS_RULES.ed.summary}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {ENDING_SOUNDS_RULES.ed.rules.map((r, i) => (
                <div key={i} style={{
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-primary-light)' }}>
                      Đọc là {r.sound}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {r.endingSounds}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-streak)', margin: '4px 0' }}>
                    {r.mnemonic}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                    {r.examples.map(ex => (
                      <button
                        key={ex.word}
                        onClick={() => webSpeech.speak(ex.word, { accent })}
                        className="btn-3d btn-3d-subtle"
                        style={{ padding: '4px 8px', fontSize: '0.75rem', gap: '4px' }}
                      >
                        <Volume2 size={12} />
                        <span>{ex.word} {ex.ipa}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. MÀN HÌNH CẶP ÂM DỄ NHẦM LẪN (MINIMAL PAIRS) */}
      {subTab === 'pairs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Nghe và so sánh 2 từ phát âm gần giống nhau để rèn luyện thính giác phân biệt âm:
          </div>

          {MINIMAL_PAIRS.map((pair) => (
            <div
              key={pair.id}
              style={{
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {pair.pairTitle}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  onClick={() => webSpeech.speak(pair.wordA.word, { accent })}
                  className="btn-3d btn-3d-subtle"
                  style={{ flexDirection: 'column', padding: '10px', gap: '2px' }}
                >
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-accent-light)' }}>
                    {pair.wordA.word}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {pair.wordA.ipa} • {pair.wordA.meaning}
                  </span>
                </button>

                <button
                  onClick={() => webSpeech.speak(pair.wordB.word, { accent })}
                  className="btn-3d btn-3d-subtle"
                  style={{ flexDirection: 'column', padding: '10px', gap: '2px' }}
                >
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary-light)' }}>
                    {pair.wordB.word}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {pair.wordB.ipa} • {pair.wordB.meaning}
                  </span>
                </button>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                💡 {pair.tip}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. MÀN HÌNH BẢNG ÂM IPA */}
      {subTab === 'ipa' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Sparkles size={16} color="var(--color-accent-light)" />
              Bảng Âm IPA Trực Quan (Nguyên Âm & Phụ Âm)
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
              Nhấp vào từng âm để nghe phát âm từ ví dụ chuẩn bản xứ, đọc mẹo mở khẩu hình và ghi nhớ nhanh trong 30 giây.
            </p>
          </div>

          {/* Nhóm Nguyên Âm */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-accent-light)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
              🌟 Nguyên Âm (Vowels)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {CORE_IPA_SOUNDS.filter(s => s.type === 'vowel').map(sound => (
                <div
                  key={sound.sound}
                  onClick={() => {
                    setActiveIpaSound(sound.sound);
                    webSpeech.speak(sound.example, { accent, rate: 0.85 });
                    addXp(5);
                  }}
                  style={{
                    background: activeIpaSound === sound.sound ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-surface)',
                    border: activeIpaSound === sound.sound ? '1px solid var(--color-primary)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-light)' }}>
                      {sound.sound}
                    </span>
                    <button
                      className="btn-3d btn-3d-subtle"
                      style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                      title="Nghe phát âm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIpaSound(sound.sound);
                        webSpeech.speak(sound.example, { accent, rate: 0.85 });
                      }}
                    >
                      <Volume2 size={12} />
                    </button>
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {sound.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    👉 {sound.example} ({sound.meaning})
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '2px' }}>
                    💡 {sound.tip}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nhóm Phụ Âm */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary-light)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
              ⚡ Phụ Âm Hay Nhầm Lẫn (Consonants)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {CORE_IPA_SOUNDS.filter(s => s.type === 'consonant').map(sound => (
                <div
                  key={sound.sound}
                  onClick={() => {
                    setActiveIpaSound(sound.sound);
                    webSpeech.speak(sound.example, { accent, rate: 0.85 });
                    addXp(5);
                  }}
                  style={{
                    background: activeIpaSound === sound.sound ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-surface)',
                    border: activeIpaSound === sound.sound ? '1px solid var(--color-accent)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-accent-light)' }}>
                      {sound.sound}
                    </span>
                    <button
                      className="btn-3d btn-3d-subtle"
                      style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                      title="Nghe phát âm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIpaSound(sound.sound);
                        webSpeech.speak(sound.example, { accent, rate: 0.85 });
                      }}
                    >
                      <Volume2 size={12} />
                    </button>
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {sound.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    👉 {sound.example} ({sound.meaning})
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '2px' }}>
                    💡 {sound.tip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
