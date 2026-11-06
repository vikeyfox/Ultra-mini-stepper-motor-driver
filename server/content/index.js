import { enLevels } from './en.js';
import { jaLevels } from './ja.js';
import { koLevels } from './ko.js';

export const LANGUAGES = [
  {
    code: 'en',
    name: '英语',
    nativeName: 'English',
    phrase: 'Hello!',
    phraseCn: '你好！',
    flagText: 'EN',
    accent: '#4f8cff',
    accentSoft: 'rgba(79, 140, 255, .16)',
    tagline: '连接世界的通用语言',
    description: '从地道寒暄到职场表达，用真实场景打通听说读写。',
    learners: '128,000+',
    levels: enLevels
  },
  {
    code: 'ja',
    name: '日语',
    nativeName: '日本語',
    phrase: 'はじめまして',
    phraseCn: '初次见面',
    flagText: 'JA',
    accent: '#ff6b9d',
    accentSoft: 'rgba(255, 107, 157, .16)',
    tagline: '走进细腻的日式表达',
    description: '从五十音到商务敬语，在动漫与生活的语感中自然开口。',
    learners: '96,000+',
    levels: jaLevels
  },
  {
    code: 'ko',
    name: '韩语',
    nativeName: '한국어',
    phrase: '안녕하세요',
    phraseCn: '你好',
    flagText: 'KO',
    accent: '#a78bfa',
    accentSoft: 'rgba(167, 139, 250, .16)',
    tagline: '听见潮流背后的语言',
    description: '从问候到职场协作，跟着真实对话掌握韩语语序与敬语。',
    learners: '74,000+',
    levels: koLevels
  }
];

export const LEVEL_META = {
  A1: { label: 'A1 · 入门', desc: '建立语感与基础表达' },
  A2: { label: 'A2 · 进阶', desc: '应对日常生活场景' },
  B1: { label: 'B1 · 流利', desc: '完成观点与职场表达' }
};

// 构建“语言 → 关卡 → 单元 → 课程”的索引，并为每节课附加顺序信息
const lessonIndex = new Map();
const languageLessonOrder = {};

for (const lang of LANGUAGES) {
  const order = [];
  for (const level of lang.levels) {
    for (const unit of level.units) {
      for (const lesson of unit.lessons) {
        const entry = {
          ...lesson,
          lang: lang.code,
          langName: lang.name,
          levelId: level.id,
          levelCode: level.code,
          levelTitle: level.title,
          unitId: unit.id,
          unitTitle: unit.title,
          vocabCount: lesson.vocab.length
        };
        lessonIndex.set(lesson.id, entry);
        order.push(lesson.id);
      }
    }
  }
  languageLessonOrder[lang.code] = order;
}

export function getLesson(id) {
  return lessonIndex.get(id) || null;
}

export function getLessonOrder(langCode) {
  return languageLessonOrder[langCode] || [];
}

export function getAllLessons() {
  return [...lessonIndex.values()];
}

export function getCourse(langCode) {
  return LANGUAGES.find((item) => item.code === langCode) || null;
}

export function getLanguageStats() {
  return LANGUAGES.map((lang) => ({
    code: lang.code,
    name: lang.name,
    nativeName: lang.nativeName,
    phrase: lang.phrase,
    phraseCn: lang.phraseCn,
    flagText: lang.flagText,
    accent: lang.accent,
    accentSoft: lang.accentSoft,
    tagline: lang.tagline,
    description: lang.description,
    learners: lang.learners,
    lessonCount: languageLessonOrder[lang.code].length,
    levelCount: lang.levels.length,
    levels: lang.levels.map((level) => ({
      id: level.id,
      code: level.code,
      title: level.title,
      subtitle: level.subtitle,
      lessonCount: level.units.reduce((sum, unit) => sum + unit.lessons.length, 0)
    }))
  }));
}

export function getUnitsFlat() {
  const result = [];
  for (const lang of LANGUAGES) {
    for (const level of lang.levels) {
      for (const unit of level.units) {
        result.push({
          lang: lang.code,
          levelCode: level.code,
          unitId: unit.id,
          title: unit.title,
          desc: unit.desc,
          lessons: unit.lessons.map((lesson) => lesson.id)
        });
      }
    }
  }
  return result;
}
