import { LANGUAGES, getLesson, getLessonOrder, getLanguageStats } from './content/index.js';
import { todayKey } from './store.js';

const LEVEL_TIERS = [
  { min: 0, name: '语言新手' },
  { min: 120, name: '词汇探险家' },
  { min: 300, name: '语法构筑者' },
  { min: 600, name: '流利表达者' },
  { min: 1000, name: '多语领航者' }
];

export const SKILL_LABELS = {
  vocab: '词汇记忆',
  grammar: '语法应用',
  listening: '听力理解',
  speaking: '口语跟读'
};

const WEAK_TIPS = {
  vocab: '建议先用闪卡把词义与例句绑定，再进入课程练习。',
  grammar: '建议重做语法专项，并整理错题规律。',
  listening: '建议使用「盲听—对照—再盲听」三轮法。',
  speaking: '建议开启跟读模式，注意语调与连读节奏。'
};

function dateOffsetKey(offset) {
  return todayKey(offset);
}

function dayLabel(offset) {
  if (offset === 0) return '今天';
  if (offset === 1) return '昨天';
  return `${offset} 天前`;
}

export function computeStreak(activity) {
  const today = dateOffsetKey(0);
  const yesterday = dateOffsetKey(1);
  let cursor = 0;
  if (!activity[today] || activity[today] <= 0) {
    if (!activity[yesterday] || activity[yesterday] <= 0) return 0;
    cursor = 1;
  }
  let streak = 0;
  while (activity[dateOffsetKey(cursor)] > 0) {
    streak += 1;
    cursor += 1;
    if (cursor > 365) break;
  }
  return streak;
}

export function levelInfoFor(totalXp) {
  let tierIndex = 0;
  for (let i = 0; i < LEVEL_TIERS.length; i += 1) {
    if (totalXp >= LEVEL_TIERS[i].min) tierIndex = i;
  }
  const current = LEVEL_TIERS[tierIndex];
  const next = LEVEL_TIERS[tierIndex + 1];
  const span = next ? next.min - current.min : 1;
  const progressed = next ? totalXp - current.min : 1;
  const percent = next ? Math.min(100, Math.round((progressed / span) * 100)) : 100;
  return {
    level: tierIndex + 1,
    name: current.name,
    totalXp,
    nextAt: next ? next.min : null,
    nextName: next ? next.name : null,
    percent
  };
}

export function computeStats(db, user) {
  const progress = user.progress || {};
  const entries = Object.entries(progress);
  const totalXp = entries.reduce((sum, [, p]) => sum + (p.xp || 0), 0);
  const activity = user.activity || {};
  const weekly = [];
  for (let i = 6; i >= 0; i -= 1) {
    const key = dateOffsetKey(i);
    weekly.push({ date: key, label: dayLabel(i), xp: activity[key] || 0, active: (activity[key] || 0) > 0 });
  }
  const todayXp = activity[dateOffsetKey(0)] || 0;
  const weeklyXp = weekly.reduce((sum, item) => sum + item.xp, 0);
  const skills = { vocab: [], grammar: [], listening: [], speaking: [] };
  let maxScore = 0;
  let wordsLearned = 0;
  const languages = new Set();
  let b1Completed = false;
  let lastLesson = null;

  for (const [lessonId, p] of entries) {
    const lesson = getLesson(lessonId);
    if (p.bestScore > maxScore) maxScore = p.bestScore;
    for (const key of Object.keys(skills)) {
      if (typeof p.skills?.[key] === 'number') skills[key].push(p.skills[key]);
    }
    if (lesson) {
      wordsLearned += lesson.vocabCount;
      languages.add(lesson.lang);
      if (lesson.levelCode === 'B1') b1Completed = true;
      if (!lastLesson || p.completedAt > lastLesson.completedAt) {
        lastLesson = { ...lesson, ...p };
      }
    }
  }

  const avg = (arr) => (arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0);
  const skillProfile = {
    vocab: avg(skills.vocab),
    grammar: avg(skills.grammar),
    listening: avg(skills.listening),
    speaking: avg(skills.speaking)
  };

  const postCount = (db.posts || []).filter((post) => post.userId === user.id).length;
  const completedCount = entries.length;

  return {
    completedCount,
    totalXp,
    weeklyXp,
    todayXp,
    streak: computeStreak(activity),
    maxScore,
    wordsLearned,
    languageCount: languages.size,
    b1Completed,
    postCount,
    skillProfile,
    weekly,
    lastLesson,
    dailyGoal: user.dailyGoal || 60
  };
}

export const ACHIEVEMENTS = [
  {
    id: 'first_step', name: '启程第一步', desc: '完成第一节课，开启语言之旅', icon: 'rocket', tier: 'bronze',
    check: (s) => s.completedCount >= 1
  },
  {
    id: 'streak3', name: '三日不辍', desc: '连续学习 3 天', icon: 'flame', tier: 'silver',
    check: (s) => s.streak >= 3
  },
  {
    id: 'streak7', name: '七日之约', desc: '连续学习 7 天', icon: 'calendar', tier: 'gold',
    check: (s) => s.streak >= 7
  },
  {
    id: 'xp100', name: '百点能量', desc: '累计获得 100 XP', icon: 'zap', tier: 'bronze',
    check: (s) => s.totalXp >= 100
  },
  {
    id: 'xp500', name: '能量满格', desc: '累计获得 500 XP', icon: 'trophy', tier: 'gold',
    check: (s) => s.totalXp >= 500
  },
  {
    id: 'polyglot', name: '多语行者', desc: '在 2 种语言中完成课程', icon: 'globe', tier: 'silver',
    check: (s) => s.languageCount >= 2
  },
  {
    id: 'perfect', name: '满分时刻', desc: '任意一节课程获得 100 分', icon: 'target', tier: 'gold',
    check: (s) => s.maxScore >= 100
  },
  {
    id: 'social', name: '社区新声', desc: '在社区发布第一条学习动态', icon: 'message', tier: 'bronze',
    check: (s) => s.postCount >= 1
  },
  {
    id: 'word50', name: '词海拾贝', desc: '累计掌握 50 个单词', icon: 'book', tier: 'silver',
    check: (s) => s.wordsLearned >= 50
  },
  {
    id: 'ears', name: '顺风耳', desc: '完成 3 节课且听力平均分达到 85', icon: 'headphones', tier: 'silver',
    check: (s) => s.completedCount >= 3 && s.skillProfile.listening >= 85
  },
  {
    id: 'growth', name: '向上生长', desc: '完成一节 B1 级别课程', icon: 'mountain', tier: 'gold',
    check: (s) => s.b1Completed
  },
  {
    id: 'focus', name: '专注之心', desc: '单日学习达到 60 XP', icon: 'clock', tier: 'bronze',
    check: (s) => s.todayXp >= 60
  }
];

export function achievementsForUser(db, user) {
  const stats = computeStats(db, user);
  const earned = user.achievements || {};
  return ACHIEVEMENTS.map((item) => {
    const unlocked = item.check(stats);
    return {
      id: item.id,
      name: item.name,
      desc: item.desc,
      icon: item.icon,
      tier: item.tier,
      unlocked,
      unlockedAt: unlocked ? (earned[item.id] || null) : null
    };
  });
}

export function evaluateNewAchievements(db, user) {
  const stats = computeStats(db, user);
  user.achievements = user.achievements || {};
  const newly = [];
  for (const item of ACHIEVEMENTS) {
    if (!user.achievements[item.id] && item.check(stats)) {
      user.achievements[item.id] = new Date().toISOString().slice(0, 10);
      newly.push({ id: item.id, name: item.name, desc: item.desc, icon: item.icon, tier: item.tier });
    }
  }
  return newly;
}

export function buildCourseForUser(user) {
  const progress = user.progress || {};
  return {
    languages: LANGUAGES.map((lang) => {
      const order = getLessonOrder(lang.code);
      const firstIncomplete = order.findIndex((id) => !progress[id]);
      return {
        code: lang.code,
        name: lang.name,
        nativeName: lang.nativeName,
        accent: lang.accent,
        accentSoft: lang.accentSoft,
        flagText: lang.flagText,
        phrase: lang.phrase,
        phraseCn: lang.phraseCn,
        tagline: lang.tagline,
        description: lang.description,
        lessonCount: order.length,
        completedCount: order.filter((id) => progress[id]).length,
        levels: lang.levels.map((level) => ({
          id: level.id,
          code: level.code,
          title: level.title,
          subtitle: level.subtitle,
          units: level.units.map((unit) => ({
            id: unit.id,
            title: unit.title,
            desc: unit.desc,
            lessons: unit.lessons.map((lesson) => {
              const idx = order.indexOf(lesson.id);
              const record = progress[lesson.id];
              const previousId = idx > 0 ? order[idx - 1] : null;
              const unlocked = idx === 0 || !!record || (previousId ? !!progress[previousId] : false);
              return {
                id: lesson.id,
                title: lesson.title,
                subtitle: lesson.subtitle,
                minutes: lesson.minutes,
                xp: lesson.xp,
                vocabCount: lesson.vocab.length,
                completed: !!record,
                score: record?.bestScore || 0,
                unlocked,
                isNext: firstIncomplete === idx
              };
            })
          }))
        }))
      };
    })
  };
}

export function nextLessonFor(user, langCode) {
  const order = getLessonOrder(langCode);
  const progress = user.progress || {};
  const idx = order.findIndex((id) => !progress[id]);
  if (idx === -1) return { lesson: null, index: -1, order };
  return { lesson: getLesson(order[idx]), index: idx, order };
}

function buildPlan(user, langCode) {
  const { lesson, index, order } = nextLessonFor(user, langCode);
  const progress = user.progress || {};
  const plan = [];
  const weakSkill = weakestSkill(user);
  const reviewLesson = Object.entries(progress)
    .map(([id]) => getLesson(id))
    .filter(Boolean)
    .sort((a, b) => (progress[a.id].completedAt < progress[b.id].completedAt ? 1 : -1))[0];

  for (let i = 0; i < 7; i += 1) {
    const target = order[index + i] ? getLesson(order[index + i]) : reviewLesson;
    if (!target) {
      plan.push({ day: i, label: dayLabel(-i), type: '自由练习', title: '自由对话练习', minutes: 15, xp: 20, lessonId: null });
      continue;
    }
    let type = '课程学习';
    let title = target.title;
    let minutes = target.minutes;
    if (i === 2 && reviewLesson) {
      type = '弱项复习';
      title = `${SKILL_LABELS[weakSkill]} · ${reviewLesson.title}`;
      minutes = 10;
    } else if (i === 4) {
      type = '口语跟读';
      title = `跟读练习 · ${target.speaking[0].text.slice(0, 18)}`;
      minutes = 8;
    } else if (i === 6) {
      type = '阶段测评';
      title = '本周学习回顾与自测';
      minutes = 12;
    }
    plan.push({
      day: i,
      label: dayItemLabel(i),
      type,
      title,
      minutes,
      xp: i === 2 ? 15 : target.xp,
      lessonId: i === 2 && reviewLesson ? reviewLesson.id : target.id
    });
  }
  return { plan, nextLesson: lesson, weakSkill, reviewLesson };
}

function dayItemLabel(offset) {
  if (offset === 0) return '今天';
  if (offset === 1) return '明天';
  return `第 ${offset + 1} 天`;
}

function weakestSkill(user) {
  const stats = computeStats({ posts: [] }, user);
  const sorted = Object.entries(stats.skillProfile).sort((a, b) => a[1] - b[1]);
  const [skill, value] = sorted[0];
  return value === 0 ? 'vocab' : skill;
}

export function buildLearningPath(db, user) {
  const langCode = user.targetLang || 'en';
  const lang = LANGUAGES.find((item) => item.code === langCode) || LANGUAGES[0];
  const stats = computeStats(db, user);
  const { plan, nextLesson, weakSkill, reviewLesson } = buildPlan(user, lang.code);
  const progress = user.progress || {};
  const order = getLessonOrder(lang.code);
  const index = order.findIndex((id) => !progress[id]);
  const startIdx = index === -1 ? 0 : index;

  const recommendations = [];
  for (let i = 0; i < 3; i += 1) {
    const id = order[startIdx + i];
    if (!id) break;
    const lesson = getLesson(id);
    const reason = i === 0
      ? `衔接你当前的学习进度，${SKILL_LABELS[weakSkill]}是本周重点`
      : i === 1
        ? `延续「${lesson.unitTitle.split('·').pop().trim()}」主题，巩固场景表达`
        : `冲刺 ${lesson.levelCode} 级别，用真实任务检验学习成果`;
    recommendations.push({
      lessonId: lesson.id,
      title: lesson.title,
      subtitle: lesson.subtitle,
      minutes: lesson.minutes,
      xp: lesson.xp,
      levelCode: lesson.levelCode,
      unitTitle: lesson.unitTitle,
      reason,
      tag: i === 0 ? '今日重点' : '推荐课程'
    });
  }

  if (reviewLesson && !recommendations.some((item) => item.lessonId === reviewLesson.id)) {
    recommendations.push({
      lessonId: reviewLesson.id,
      title: reviewLesson.title,
      subtitle: '错题与弱项复习',
      minutes: 8,
      xp: 15,
      levelCode: reviewLesson.levelCode,
      unitTitle: reviewLesson.unitTitle,
      reason: `最近一次学习中，${SKILL_LABELS[weakSkill]}得分偏低，建议回顾`,
      tag: '弱项复习'
    });
  }

  const overallTotal = getLessonOrder(lang.code).length;
  const overallCompleted = order.filter((id) => progress[id]).length;
  return {
    focusLanguage: {
      code: lang.code,
      name: lang.name,
      nativeName: lang.nativeName,
      accent: lang.accent,
      flagText: lang.flagText
    },
    weakSkill,
    weakSkillLabel: SKILL_LABELS[weakSkill],
    weakTip: WEAK_TIPS[weakSkill],
    skillProfile: stats.skillProfile,
    overall: {
      completed: overallCompleted,
      total: overallTotal,
      percent: Math.round((overallCompleted / overallTotal) * 100)
    },
    nextLesson: nextLesson
      ? {
          id: nextLesson.id,
          title: nextLesson.title,
          subtitle: nextLesson.subtitle,
          levelCode: nextLesson.levelCode,
          unitTitle: nextLesson.unitTitle,
          minutes: nextLesson.minutes,
          xp: nextLesson.xp
        }
      : null,
    recommendations,
    plan
  };
}

export function buildDashboard(db, user) {
  const stats = computeStats(db, user);
  const langCode = user.targetLang || 'en';
  const lang = LANGUAGES.find((item) => item.code === langCode) || LANGUAGES[0];
  const next = nextLessonFor(user, langCode);
  const levelInfo = levelInfoFor(stats.totalXp);
  const achievements = achievementsForUser(db, user);
  const unlocked = achievements.filter((item) => item.unlocked);
  const recentLessons = Object.entries(user.progress || {})
    .map(([id, record]) => {
      const lesson = getLesson(id);
      return lesson ? { id, title: lesson.title, lang: lesson.lang, langName: lesson.langName, score: record.bestScore, completedAt: record.completedAt } : null;
    })
    .filter(Boolean)
    .sort((a, b) => (a.completedAt < b.completedAt ? 1 : -1))
    .slice(0, 4);

  const languageProgress = LANGUAGES.map((item) => {
    const order = getLessonOrder(item.code);
    const done = order.filter((id) => (user.progress || {})[id]).length;
    return {
      code: item.code,
      name: item.name,
      nativeName: item.nativeName,
      accent: item.accent,
      completed: done,
      total: order.length,
      percent: Math.round((done / order.length) * 100)
    };
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      targetLang: langCode,
      dailyGoal: user.dailyGoal || 60
    },
    stats,
    levelInfo,
    focusLanguage: {
      code: lang.code,
      name: lang.name,
      nativeName: lang.nativeName,
      accent: lang.accent,
      accentSoft: lang.accentSoft,
      phrase: lang.phrase,
      phraseCn: lang.phraseCn
    },
    today: {
      xp: stats.todayXp,
      goal: stats.dailyGoal,
      percent: Math.min(100, Math.round((stats.todayXp / stats.dailyGoal) * 100)),
      done: stats.todayXp >= stats.dailyGoal
    },
    streak: stats.streak,
    weekly: stats.weekly,
    nextLesson: next.lesson
      ? {
          id: next.lesson.id,
          title: next.lesson.title,
          subtitle: next.lesson.subtitle,
          minutes: next.lesson.minutes,
          xp: next.lesson.xp,
          levelCode: next.lesson.levelCode,
          unitTitle: next.lesson.unitTitle,
          langName: next.lesson.langName,
          progressIndex: next.index,
          totalLessons: next.order.length
        }
      : null,
    recentLessons,
    languageProgress,
    achievements: {
      unlockedCount: unlocked.length,
      total: achievements.length,
      recent: unlocked.slice(-3).reverse()
    },
    goalText: stats.todayXp >= stats.dailyGoal ? '今日目标已达成，保持节奏！' : `再获得 ${stats.dailyGoal - stats.todayXp} XP 即可完成今日目标`
  };
}

export function buildLeaderboard(db, currentUser) {
  const rows = db.users
    .filter((user) => (user.progress && Object.keys(user.progress).length > 0) || user.id.startsWith('u_0') || user.id === currentUser.id)
    .map((user) => {
      const stats = computeStats(db, user);
      return {
        userId: user.id,
        name: user.name,
        targetLang: user.targetLang,
        weeklyXp: stats.weeklyXp,
        totalXp: stats.totalXp,
        streak: stats.streak,
        isCurrent: user.id === currentUser.id
      };
    })
    .sort((a, b) => b.weeklyXp - a.weeklyXp);
  const rank = rows.findIndex((row) => row.isCurrent) + 1;
  return {
    rows: rows.slice(0, 10).map((row, idx) => ({ ...row, rank: idx + 1 })),
    myRank: rank || null,
    myWeeklyXp: rows.find((row) => row.isCurrent)?.weeklyXp || 0
  };
}

export function languageMetaFor(code) {
  return getLanguageStats().find((item) => item.code === code) || null;
}
