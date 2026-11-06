import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

export function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { salt, hash };
}

function makeDemoUser() {
  const { salt, hash } = hashPassword('demo123');
  const progress = {
    'en-a1-u1-l1': { completedAt: daysAgo(9), bestScore: 92, attempts: 1, skills: { vocab: 96, grammar: 88, listening: 90, speaking: 94 }, xp: 30 },
    'en-a1-u1-l2': { completedAt: daysAgo(8), bestScore: 86, attempts: 1, skills: { vocab: 90, grammar: 82, listening: 84, speaking: 88 }, xp: 30 },
    'en-a1-u2-l1': { completedAt: daysAgo(6), bestScore: 78, attempts: 1, skills: { vocab: 86, grammar: 70, listening: 74, speaking: 82 }, xp: 35 },
    'en-a1-u2-l2': { completedAt: daysAgo(4), bestScore: 95, attempts: 1, skills: { vocab: 98, grammar: 92, listening: 94, speaking: 96 }, xp: 35 },
    'ja-a1-u1-l1': { completedAt: daysAgo(3), bestScore: 88, attempts: 1, skills: { vocab: 92, grammar: 84, listening: 86, speaking: 90 }, xp: 30 }
  };
  return {
    id: 'u_demo',
    email: 'demo@lingua.com',
    name: '林夏',
    passwordSalt: salt,
    passwordHash: hash,
    targetLang: 'en',
    dailyGoal: 60,
    createdAt: daysAgo(30),
    progress,
    activity: {
      [daysAgo(9)]: 30,
      [daysAgo(8)]: 30,
      [daysAgo(6)]: 35,
      [daysAgo(4)]: 45,
      [daysAgo(3)]: 30,
      [daysAgo(2)]: 60,
      [daysAgo(1)]: 45,
      [daysAgo(0)]: 25
    }
  };
}

const SEED_USERS = [
  makeDemoUser(),
  {
    id: 'u_01', email: 'chenyu@lingua.com', name: '陈屿', targetLang: 'en',
    passwordSalt: 'seed', passwordHash: 'seed', createdAt: daysAgo(60),
    progress: {}, activity: { [daysAgo(1)]: 120, [daysAgo(2)]: 90, [daysAgo(0)]: 110, [daysAgo(3)]: 150, [daysAgo(4)]: 80, [daysAgo(5)]: 140, [daysAgo(6)]: 100 }
  },
  {
    id: 'u_02', email: 'sakura@lingua.com', name: '苏樱', targetLang: 'ja',
    passwordSalt: 'seed', passwordHash: 'seed', createdAt: daysAgo(50),
    progress: {}, activity: { [daysAgo(1)]: 100, [daysAgo(2)]: 120, [daysAgo(0)]: 90, [daysAgo(3)]: 60, [daysAgo(4)]: 110, [daysAgo(5)]: 70, [daysAgo(6)]: 95 }
  },
  {
    id: 'u_03', email: 'moon@lingua.com', name: '文浩', targetLang: 'ko',
    passwordSalt: 'seed', passwordHash: 'seed', createdAt: daysAgo(40),
    progress: {}, activity: { [daysAgo(1)]: 80, [daysAgo(2)]: 70, [daysAgo(0)]: 130, [daysAgo(3)]: 100, [daysAgo(4)]: 90 }
  },
  {
    id: 'u_04', email: 'jiangli@lingua.com', name: '江黎', targetLang: 'en',
    passwordSalt: 'seed', passwordHash: 'seed', createdAt: daysAgo(70),
    progress: {}, activity: { [daysAgo(0)]: 60, [daysAgo(2)]: 55, [daysAgo(4)]: 65, [daysAgo(6)]: 50 }
  },
  {
    id: 'u_05', email: 'hanyu@lingua.com', name: '韩雨', targetLang: 'ja',
    passwordSalt: 'seed', passwordHash: 'seed', createdAt: daysAgo(25),
    progress: {}, activity: { [daysAgo(0)]: 40, [daysAgo(1)]: 35, [daysAgo(3)]: 45, [daysAgo(5)]: 40 }
  },
  {
    id: 'u_06', email: 'luming@lingua.com', name: '陆明', targetLang: 'ko',
    passwordSalt: 'seed', passwordHash: 'seed', createdAt: daysAgo(15),
    progress: {}, activity: { [daysAgo(0)]: 30, [daysAgo(2)]: 25, [daysAgo(4)]: 35 }
  }
];

const SEED_POSTS = [
  {
    id: 'p_01',
    userId: 'u_02',
    author: '苏樱',
    authorLang: 'ja',
    content: '今天终于把「はじめまして」这一课读到 90 分！跟着音频影子跟读三遍之后，日语语调明显自然了很多。有人也在练日语口语吗？',
    tag: '口语打卡',
    lang: 'ja',
    createdAt: daysAgo(1),
    likes: ['u_demo', 'u_05', 'u_01'],
    comments: [
      { id: 'c_01', userId: 'u_05', author: '韩雨', content: '同练！影子跟读真的有效，我一般会录下来回放对比。', createdAt: daysAgo(1) }
    ]
  },
  {
    id: 'p_02',
    userId: 'u_01',
    author: '陈屿',
    authorLang: 'en',
    content: '分享一个小技巧：听力训练先盲听一遍抓住关键词，再看原文对照，最后只听不看。三轮下来，B1 面试那课的听力我已经能跟上 90% 了。',
    tag: '学习方法',
    lang: 'en',
    createdAt: daysAgo(2),
    likes: ['u_demo', 'u_03', 'u_04', 'u_02'],
    comments: [
      { id: 'c_02', userId: 'u_demo', author: '林夏', content: '受教了，今晚就用这个方法复盘。', createdAt: daysAgo(2) },
      { id: 'c_03', userId: 'u_03', author: '文浩', content: '三段式听力法确实好用，韩语也同样适用。', createdAt: daysAgo(1) }
    ]
  },
  {
    id: 'p_03',
    userId: 'u_03',
    author: '文浩',
    authorLang: 'ko',
    content: '连续学习第 12 天。把「예약하기」的场景对话背下来后，上周真的在首尔用上了，店员还夸我发音不错！',
    tag: '学习故事',
    lang: 'ko',
    createdAt: daysAgo(3),
    likes: ['u_demo', 'u_06', 'u_05'],
    comments: []
  },
  {
    id: 'p_04',
    userId: 'u_04',
    author: '江黎',
    authorLang: 'en',
    content: '今日目标 60 XP 完成。复习时发现语法错题集中在现在完成时，准备明天专门再刷一遍 Unit 5 的语法练习。',
    tag: '每日目标',
    lang: 'en',
    createdAt: daysAgo(0),
    likes: ['u_01', 'u_02'],
    comments: []
  }
];

function createSeed() {
  return {
    meta: {
      secret: crypto.randomBytes(32).toString('hex'),
      version: 1
    },
    users: SEED_USERS,
    posts: SEED_POSTS
  };
}

let db = null;
let saveTimer = null;

export function loadDb() {
  if (db) return db;
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (fs.existsSync(DB_FILE)) {
    try {
      db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    } catch {
      db = createSeed();
    }
  } else {
    db = createSeed();
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  }
  if (!db.meta?.secret) {
    db.meta = { ...db.meta, secret: crypto.randomBytes(32).toString('hex') };
  }
  return db;
}

export function saveDb() {
  if (!db) return;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
    saveTimer = null;
  }, 120);
}

export function saveDbNow() {
  if (!db) return;
  if (saveTimer) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

export function todayKey(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  return d.toISOString().slice(0, 10);
}
