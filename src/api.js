const TOKEN_KEY = 'lingua_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(path, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.error || '请求失败');
    error.status = res.status;
    throw error;
  }
  return data;
}

export const api = {
  meta: () => request('/api/meta'),
  register: (payload) => request('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  me: () => request('/api/auth/me'),
  updateMe: (payload) => request('/api/users/me', { method: 'PATCH', body: JSON.stringify(payload) }),
  dashboard: () => request('/api/dashboard'),
  courses: () => request('/api/courses'),
  lesson: (id) => request(`/api/lessons/${id}`),
  completeLesson: (id, payload) => request(`/api/lessons/${id}/complete`, { method: 'POST', body: JSON.stringify(payload) }),
  path: () => request('/api/path'),
  achievements: () => request('/api/achievements'),
  leaderboard: () => request('/api/leaderboard'),
  posts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/api/community/posts${query ? `?${query}` : ''}`);
  },
  createPost: (payload) => request('/api/community/posts', { method: 'POST', body: JSON.stringify(payload) }),
  likePost: (id) => request(`/api/community/posts/${id}/like`, { method: 'POST' }),
  commentPost: (id, content) => request(`/api/community/posts/${id}/comments`, { method: 'POST', body: JSON.stringify({ content }) })
};

export const LANG_SPEECH = { en: 'en-US', ja: 'ja-JP', ko: 'ko-KR' };
