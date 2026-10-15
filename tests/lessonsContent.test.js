import { describe, it, expect } from 'vitest';
import { LESSONS_CONTENT, getLessonContent } from '../src/data/lessonsContentData';
import { ROADMAP_STAGES } from '../src/data/roadmapData';

describe('lessonsContentData — Đảm bảo 100% bài học trên lộ trình có nội dung', () => {
  const allRoadmapLessons = ROADMAP_STAGES.flatMap(stage => stage.lessons);

  it('toàn bộ 20 bài học trong lộ trình đều có dữ liệu tương tác', () => {
    expect(allRoadmapLessons.length).toBe(20);

    allRoadmapLessons.forEach(lesson => {
      const content = LESSONS_CONTENT[lesson.id];
      expect(content, `Bài ${lesson.id} (${lesson.title}) chưa có nội dung`).toBeDefined();
      expect(content.steps.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('các câu hỏi trắc nghiệm đều có ít nhất 1 đáp án đúng', () => {
    Object.values(LESSONS_CONTENT).forEach(lesson => {
      lesson.steps.forEach((step, sIdx) => {
        if (step.type === 'choice' || step.type === 'dialogue') {
          const hasCorrect = step.options.some(opt => opt.isCorrect === true);
          expect(hasCorrect, `Bài ${lesson.id} bước ${sIdx} thiếu đáp án đúng`).toBe(true);
        } else if (step.type === 'puzzle') {
          expect(step.correctSentence, `Bài ${lesson.id} bước ${sIdx} thiếu correctSentence`).toBeDefined();
          expect(step.words.length, `Bài ${lesson.id} bước ${sIdx} thiếu words`).toBeGreaterThan(1);
        } else if (step.type === 'theory') {
          expect(step.rule, `Bài ${lesson.id} bước ${sIdx} thiếu rule`).toBeDefined();
        }
      });
    });
  });

  it('getLessonContent trả về nội dung đúng ID và fallback an toàn khi ID lạ', () => {
    const l1 = getLessonContent(1);
    expect(l1.id).toBe(1);
    expect(l1.steps.length).toBeGreaterThan(0);

    const lUnknown = getLessonContent(9999);
    expect(lUnknown.id).toBe(9999);
    expect(lUnknown.steps.length).toBeGreaterThan(0);
  });
});
