import { LANG_SPEECH } from './api';

export function cx(...values) {
  return values.filter(Boolean).join(' ');
}

export function speak(text, lang = 'en', rate = 0.92) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = LANG_SPEECH[lang] || 'en-US';
  utterance.rate = rate;
  const voices = window.speechSynthesis.getVoices();
  const exact = voices.find((voice) => voice.lang === utterance.lang);
  const loose = voices.find((voice) => voice.lang?.startsWith(lang));
  if (exact) utterance.voice = exact;
  else if (loose) utterance.voice = loose;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  return true;
}

export function formatDay(dateString) {
  if (!dateString) return '';
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;
  return `${date.getMonth() + 1} 月 ${date.getDate()} 日`;
}

export function relativeDay(dateString) {
  if (!dateString) return '';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${dateString}T00:00:00`);
  const diff = Math.round((today - target) / 86400000);
  if (diff <= 0) return '今天';
  if (diff === 1) return '昨天';
  if (diff < 7) return `${diff} 天前`;
  return formatDay(dateString);
}

export function greeting() {
  const hour = new Date().getHours();
  if (hour < 6) return '夜深了';
  if (hour < 11) return '早上好';
  if (hour < 14) return '中午好';
  if (hour < 18) return '下午好';
  return '晚上好';
}

export function similarity(a, b) {
  if (!a || !b) return 0;
  const clean = (value) => value.replace(/[\s，。！？、,.!?;；:：]/g, '').toLowerCase();
  const source = clean(a);
  const target = clean(b);
  if (!source || !target) return 0;
  if (source === target) return 1;
  let matches = 0;
  const sourceChars = [...source];
  const targetChars = [...target];
  for (let i = 0; i < Math.min(sourceChars.length, targetChars.length); i += 1) {
    if (sourceChars[i] === targetChars[i]) matches += 1;
  }
  return matches / Math.max(sourceChars.length, targetChars.length);
}

export const LANG_NAMES = { en: '英语', ja: '日语', ko: '韩语' };
