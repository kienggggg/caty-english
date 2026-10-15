import { describe, it, expect } from 'vitest';
import { CORE_IPA_SOUNDS, ENDING_SOUNDS_RULES } from '../src/data/ipaData';
import { MINIMAL_PAIRS } from '../src/data/minimalPairsData';

describe('ipaData & minimalPairs — Kiểm tra tính toàn vẹn dữ liệu luyện âm', () => {
  it('CORE_IPA_SOUNDS chứa đầy đủ các nguyên âm và phụ âm chuẩn', () => {
    expect(CORE_IPA_SOUNDS.length).toBeGreaterThanOrEqual(10);

    const vowels = CORE_IPA_SOUNDS.filter(s => s.type === 'vowel');
    const consonants = CORE_IPA_SOUNDS.filter(s => s.type === 'consonant');

    expect(vowels.length).toBeGreaterThan(0);
    expect(consonants.length).toBeGreaterThan(0);

    CORE_IPA_SOUNDS.forEach(item => {
      expect(item.sound).toMatch(/^\/.*\/$/); // Format IPA /.../
      expect(item.name.length).toBeGreaterThan(1);
      expect(item.tip.length).toBeGreaterThan(5);
      expect(item.example.length).toBeGreaterThan(1);
      expect(item.meaning.length).toBeGreaterThan(1);
    });
  });

  it('ENDING_SOUNDS_RULES có đầy đủ quy tắc s/es và ed với câu thần chú dễ nhớ', () => {
    expect(ENDING_SOUNDS_RULES.s_es).toBeDefined();
    expect(ENDING_SOUNDS_RULES.s_es.rules.length).toBe(3); // /s/, /ɪz/, /z/

    expect(ENDING_SOUNDS_RULES.ed).toBeDefined();
    expect(ENDING_SOUNDS_RULES.ed.rules.length).toBe(3); // /ɪd/, /t/, /d/

    // Kiểm tra các ví dụ có đầy đủ ipa và nghĩa
    [...ENDING_SOUNDS_RULES.s_es.rules, ...ENDING_SOUNDS_RULES.ed.rules].forEach(r => {
      expect(r.mnemonic.length).toBeGreaterThan(5);
      expect(r.examples.length).toBeGreaterThanOrEqual(2);
      r.examples.forEach(ex => {
        expect(ex.word.length).toBeGreaterThan(1);
        expect(ex.ipa.length).toBeGreaterThan(1);
        expect(ex.meaning.length).toBeGreaterThan(1);
      });
    });
  });

  it('MINIMAL_PAIRS chứa các cặp từ đối lập chính xác để luyện tai', () => {
    expect(MINIMAL_PAIRS.length).toBeGreaterThanOrEqual(4);

    MINIMAL_PAIRS.forEach(pair => {
      expect(pair.pairTitle).toBeDefined();
      expect(pair.wordA.word).toBeDefined();
      expect(pair.wordA.ipa).toBeDefined();
      expect(pair.wordB.word).toBeDefined();
      expect(pair.wordB.ipa).toBeDefined();
      expect(pair.tip.length).toBeGreaterThan(5);
    });
  });
});
