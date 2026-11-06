import express from 'express';
import crypto from 'node:crypto';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadDb, saveDb, saveDbNow, hashPassword, todayKey } from './store.js';
import { LANGUAGES, getLesson, getLessonOrder, getLanguageStats } from './content/index.js';
import {
  buildDashboard,
  buildLearningPath,
  buildCourseForUser,
  buildLeaderboard,
  achievementsForUser,
  evaluateNewAchievements,
  computeStats,
  levelInfoFor,
  SKILL_LABELS
} from './logic.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const app = express();
const db = loadDb();

app.use(express.json({ limit: '1mb' }));

// ---------- 认证 ----------
function signToken(userId) {
  const payload = Buffer.from(JSON.stringify({
    uid: userId,
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000
  })).toString('base64url');
  const sig = crypto.createHmac('sha256', db.meta.secret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = crypto.createHmac('sha256', db.meta.secret).update(payload).digest('base64url');
  if (sig !== expected) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (!data.exp || data.exp < Date.now()) return null;
    return db.users.find((user) => user.id === data.uid) || null;
  } catch {
    return null;
  }
}

function authRequired(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const user = verifyToken(token);
  if (!user) return res.status(401).json({ error: '登录状态已失效，请重新登录' });
  req.user = user;
  next();
}

function publicUser(user) {
  const stats = computeStats(db, user);
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    targetLang: user.targetLang,
    dailyGoal: user.dailyGoal,
    createdAt: user.createdAt,
    levelInfo: levelInfoFor(stats.totalXp),
    stats: {
      totalXp: stats.totalXp,
      weeklyXp: stats.weeklyXp,
      todayXp: stats.todayXp,
      streak: stats.streak,
      completedCount: stats.completedCount
    }
  };
}

const emailOk = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

app.post('/api/auth/register', (req, res) => {
  const { email, password, name, targetLang } = req.body || {};
  if (!emailOk(email || '')) return res.status(400).json({ error: '请输入有效的邮箱地址' });
  if (!password || password.length < 6) return res.status(400).json({ error: '密码至少需要 6 位' });
  if (!name || name.trim().length < 1) return res.status(400).json({ error: '请输入昵称' });
  const normalizedEmail = email.trim().toLowerCase();
  if (db.users.some((user) => user.email === normalizedEmail)) {
    return res.status(409).json({ error: '该邮箱已注册，请直接登录' });
  }
  const lang = LANGUAGES.some((item) => item.code === targetLang) ? targetLang : 'en';
  const { salt, hash } = hashPassword(password);
  const user = {
    id: `u_${crypto.randomBytes(6).toString('hex')}`,
    email: normalizedEmail,
    name: name.trim().slice(0, 20),
    passwordSalt: salt,
    passwordHash: hash,
    targetLang: lang,
    dailyGoal: 60,
    createdAt: todayKey(),
    progress: {},
    activity: {},
    achievements: {}
  };
  db.users.push(user);
  saveDb();
  res.json({ token: signToken(user.id), user: publicUser(user) });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  const normalizedEmail = (email || '').trim().toLowerCase();
  const user = db.users.find((item) => item.email === normalizedEmail);
  if (!user || user.passwordHash === 'seed') {
    return res.status(401).json({ error: '邮箱或密码不正确' });
  }
  const { hash } = hashPassword(password || '', user.passwordSalt);
  const a = Buffer.from(hash, 'hex');
  const b = Buffer.from(user.passwordHash, 'hex');
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return res.status(401).json({ error: '邮箱或密码不正确' });
  }
  res.json({ token: signToken(user.id), user: publicUser(user) });
});

app.get('/api/auth/me', authRequired, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

app.patch('/api/users/me', authRequired, (req, res) => {
  const { targetLang, dailyGoal } = req.body || {};
  if (targetLang && LANGUAGES.some((item) => item.code === targetLang)) {
    req.user.targetLang = targetLang;
  }
  if (typeof dailyGoal === 'number' && dailyGoal >= 20 && dailyGoal <= 200) {
    req.user.dailyGoal = Math.round(dailyGoal);
  }
  saveDb();
  res.json({ user: publicUser(req.user) });
});

// ---------- 公开内容 ----------
app.get('/api/meta', (req, res) => {
  res.json({
    languages: getLanguageStats(),
    stats: {
      learners: '298,000+',
      lessons: getLanguageStats().reduce((sum, item) => sum + item.lessonCount, 0),
      languages: LANGUAGES.length
    }
  });
});

// ---------- 课程 ----------
app.get('/api/courses', authRequired, (req, res) => {
  res.json(buildCourseForUser(req.user));
});

app.get('/api/courses/:lang', authRequired, (req, res) => {
  const course = buildCourseForUser(req.user);
  const lang = course.languages.find((item) => item.code === req.params.lang);
  if (!lang) return res.status(404).json({ error: '未找到该语言课程' });
  res.json({ language: lang });
});

app.get('/api/lessons/:id', authRequired, (req, res) => {
  const lesson = getLesson(req.params.id);
  if (!lesson) return res.status(404).json({ error: '课程不存在' });
  const progress = req.user.progress || {};
  const order = getLessonOrder(lesson.lang);
  const idx = order.indexOf(lesson.id);
  const previousId = idx > 0 ? order[idx - 1] : null;
  const unlocked = idx === 0 || !!progress[lesson.id] || (previousId ? !!progress[previousId] : false);
  if (!unlocked) return res.status(403).json({ error: '请先完成前一节课以解锁本课' });
  res.json({
    lesson,
    record: progress[lesson.id] || null,
    position: { index: idx + 1, total: order.length },
    language: LANGUAGES.find((item) => item.code === lesson.lang)
  });
});

app.post('/api/lessons/:id/complete', authRequired, (req, res) => {
  const lesson = getLesson(req.params.id);
  if (!lesson) return res.status(404).json({ error: '课程不存在' });
  const { score, skills, durationSec } = req.body || {};
  const safeScore = Math.max(0, Math.min(100, Math.round(Number(score) || 0)));
  const progress = req.user.progress || (req.user.progress = {});
  const order = getLessonOrder(lesson.lang);
  const idx = order.indexOf(lesson.id);
  const previousId = idx > 0 ? order[idx - 1] : null;
  const unlocked = idx === 0 || !!progress[lesson.id] || (previousId ? !!progress[previousId] : false);
  if (!unlocked) return res.status(403).json({ error: '课程尚未解锁' });

  const record = progress[lesson.id];
  const firstTime = !record;
  const baseXp = Math.max(5, Math.round(lesson.xp * safeScore / 100));
  const xpEarned = firstTime ? baseXp + (safeScore === 100 ? 10 : 0) : Math.max(3, Math.round(baseXp * 0.3));

  const now = todayKey();
  const normalizedSkills = {};
  for (const key of ['vocab', 'grammar', 'listening', 'speaking']) {
    const value = Number(skills?.[key]);
    normalizedSkills[key] = Number.isFinite(value) ? Math.max(0, Math.min(100, Math.round(value))) : safeScore;
  }

  progress[lesson.id] = {
    completedAt: now,
    bestScore: Math.max(record?.bestScore || 0, safeScore),
    attempts: (record?.attempts || 0) + 1,
    skills: record?.skills
      ? Object.fromEntries(Object.entries(normalizedSkills).map(([key, value]) => [key, Math.max(record.skills[key] || 0, value)]))
      : normalizedSkills,
    xp: (record?.xp || 0) + xpEarned,
    lastDurationSec: Number(durationSec) || 0
  };

  req.user.activity = req.user.activity || {};
  req.user.activity[now] = (req.user.activity[now] || 0) + xpEarned;

  const newAchievements = evaluateNewAchievements(db, req.user);
  const stats = computeStats(db, req.user);
  const next = nextLessonInfo(req.user, lesson.lang);
  saveDb();

  res.json({
    xpEarned,
    firstTime,
    score: safeScore,
    newAchievements,
    stats: {
      totalXp: stats.totalXp,
      todayXp: stats.todayXp,
      streak: stats.streak,
      levelInfo: levelInfoFor(stats.totalXp)
    },
    nextLesson: next
  });
});

function nextLessonInfo(user, langCode) {
  const order = getLessonOrder(langCode);
  const progress = user.progress || {};
  const idx = order.findIndex((id) => !progress[id]);
  if (idx === -1) return null;
  const lesson = getLesson(order[idx]);
  return { id: lesson.id, title: lesson.title, levelCode: lesson.levelCode, xp: lesson.xp, minutes: lesson.minutes };
}

// ---------- 学习数据 ----------
app.get('/api/dashboard', authRequired, (req, res) => {
  res.json(buildDashboard(db, req.user));
});

app.get('/api/path', authRequired, (req, res) => {
  res.json(buildLearningPath(db, req.user));
});

app.get('/api/achievements', authRequired, (req, res) => {
  const list = achievementsForUser(db, req.user);
  const stats = computeStats(db, req.user);
  res.json({
    achievements: list,
    unlockedCount: list.filter((item) => item.unlocked).length,
    total: list.length,
    levelInfo: levelInfoFor(stats.totalXp),
    stats
  });
});

app.get('/api/leaderboard', authRequired, (req, res) => {
  res.json(buildLeaderboard(db, req.user));
});

// ---------- 社区 ----------
function accentFor(userId) {
  const author = db.users.find((item) => item.id === userId);
  const lang = LANGUAGES.find((item) => item.code === author?.targetLang);
  return lang?.accent || '#4f8cff';
}

function serializePost(post, user) {
  return {
    id: post.id,
    content: post.content,
    tag: post.tag,
    lang: post.lang,
    createdAt: post.createdAt,
    author: {
      id: post.userId,
      name: post.author,
      accent: accentFor(post.userId)
    },
    likeCount: post.likes.length,
    liked: post.likes.includes(user.id),
    comments: post.comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      author: { name: comment.author, id: comment.userId },
      createdAt: comment.createdAt
    }))
  };
}

app.get('/api/community/posts', authRequired, (req, res) => {
  const { tag, lang } = req.query;
  let posts = [...db.posts].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  if (tag && tag !== '全部') posts = posts.filter((post) => post.tag === tag);
  if (lang) posts = posts.filter((post) => post.lang === lang);
  const tags = ['全部', ...new Set(db.posts.map((post) => post.tag))];
  res.json({ posts: posts.map((post) => serializePost(post, req.user)), tags });
});

app.post('/api/community/posts', authRequired, (req, res) => {
  const { content, tag } = req.body || {};
  if (!content || !content.trim()) return res.status(400).json({ error: '动态内容不能为空' });
  if (content.length > 500) return res.status(400).json({ error: '内容不能超过 500 字' });
  const post = {
    id: `p_${crypto.randomBytes(5).toString('hex')}`,
    userId: req.user.id,
    author: req.user.name,
    authorLang: req.user.targetLang,
    content: content.trim(),
    tag: (tag || '学习打卡').slice(0, 12),
    lang: req.user.targetLang,
    createdAt: todayKey(),
    likes: [],
    comments: []
  };
  db.posts.unshift(post);
  const newAchievements = evaluateNewAchievements(db, req.user);
  saveDb();
  res.json({ post: serializePost(post, req.user), newAchievements });
});

app.post('/api/community/posts/:id/like', authRequired, (req, res) => {
  const post = db.posts.find((item) => item.id === req.params.id);
  if (!post) return res.status(404).json({ error: '动态不存在' });
  const idx = post.likes.indexOf(req.user.id);
  if (idx === -1) post.likes.push(req.user.id);
  else post.likes.splice(idx, 1);
  saveDb();
  res.json({ liked: idx === -1, likeCount: post.likes.length });
});

app.post('/api/community/posts/:id/comments', authRequired, (req, res) => {
  const post = db.posts.find((item) => item.id === req.params.id);
  if (!post) return res.status(404).json({ error: '动态不存在' });
  const { content } = req.body || {};
  if (!content || !content.trim()) return res.status(400).json({ error: '评论内容不能为空' });
  const comment = {
    id: `c_${crypto.randomBytes(5).toString('hex')}`,
    userId: req.user.id,
    author: req.user.name,
    content: content.trim().slice(0, 200),
    createdAt: todayKey()
  };
  post.comments.push(comment);
  saveDb();
  res.json({ comment });
});

// ---------- 静态资源 ----------
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: '服务器开小差了，请稍后再试' });
});

process.on('SIGINT', () => {
  saveDbNow();
  process.exit(0);
});
process.on('SIGTERM', () => {
  saveDbNow();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`LinguaSphere server running on http://localhost:${PORT}`);
});
