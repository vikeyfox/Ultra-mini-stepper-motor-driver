import { useState } from 'react';
import { ArrowRight, Loader2, Sparkles, X } from 'lucide-react';
import { api } from '../api';

const LANGS = [
  { code: 'en', label: '英语', native: 'English', color: '#4f8cff' },
  { code: 'ja', label: '日语', native: '日本語', color: '#ff6b9d' },
  { code: 'ko', label: '韩语', native: '한국어', color: '#a78bfa' }
];

export default function AuthModal({ initialMode = 'login', onClose, onAuthed }) {
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: '', email: '', password: '', targetLang: 'en' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(payload, isDemo = false) {
    setError('');
    setLoading(true);
    try {
      const data = isDemo ? await api.login({ email: 'demo@lingua.com', password: 'demo123' }) : payload;
      onAuthed(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (mode === 'register') {
      submit(api.register(form));
    } else {
      submit(api.login({ email: form.email, password: form.password }));
    }
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="auth-modal">
        <button type="button" className="icon-btn modal-close" onClick={onClose} aria-label="关闭">
          <X size={20} />
        </button>
        <div className="auth-head">
          <span className="eyebrow"><Sparkles size={14} /> 开启沉浸式学习</span>
          <h2>{mode === 'login' ? '欢迎回来' : '创建你的学习空间'}</h2>
          <p>{mode === 'login' ? '登录后继续你的语言旅程' : '选择目标语言，定制专属学习路径'}</p>
        </div>

        <div className="auth-tabs">
          <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>登录</button>
          <button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>注册</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <label className="field">
              <span>昵称</span>
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="例如：林夏"
                maxLength={20}
                required
              />
            </label>
          )}
          <label className="field">
            <span>邮箱</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="field">
            <span>密码</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder={mode === 'register' ? '至少 6 位字符' : '输入密码'}
              minLength={mode === 'register' ? 6 : 1}
              required
            />
          </label>

          {mode === 'register' && (
            <div className="field">
              <span>我想学习</span>
              <div className="lang-picker">
                {LANGS.map((lang) => (
                  <button
                    type="button"
                    key={lang.code}
                    className={form.targetLang === lang.code ? 'selected' : ''}
                    style={{ '--lang-color': lang.color }}
                    onClick={() => setForm({ ...form, targetLang: lang.code })}
                  >
                    <strong>{lang.label}</strong>
                    <small>{lang.native}</small>
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="primary-btn full" disabled={loading}>
            {loading ? <Loader2 size={18} className="spin" /> : null}
            {mode === 'login' ? '登录并继续' : '创建账号'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="auth-divider"><span>或</span></div>
        <button type="button" className="ghost-btn full demo-btn" disabled={loading} onClick={() => submit(null, true)}>
          使用演示账号快速体验
        </button>
        <p className="auth-note">演示账号 demo@lingua.com · 密码 demo123</p>
      </div>
    </div>
  );
}
