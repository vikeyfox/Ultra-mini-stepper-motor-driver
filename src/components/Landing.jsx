import { useEffect, useState } from 'react';
import {
  ArrowRight, BookOpen, ChartNoAxesColumnIncreasing, Headphones, Layers,
  Mic, Route, Sparkles, Trophy, Users, Volume2, Wand2, Check
} from 'lucide-react';
import Logo from './Logo';
import AuthModal from './AuthModal';
import { api } from '../api';

const FEATURES = [
  { icon: Layers, title: '分级课程体系', desc: 'A1 到 B1 三段进阶，单元化拆解真实语言场景。' },
  { icon: Wand2, title: '互动式学习', desc: '单词闪卡、语法闯关、听力训练、口语跟读四合一。' },
  { icon: ChartNoAxesColumnIncreasing, title: '进度追踪', desc: 'XP、连续天数、技能雷达与每周学习曲线一目了然。' },
  { icon: Route, title: '个性化路径', desc: '依据弱项与目标语言，自动生成每日与每周学习计划。' },
  { icon: Users, title: '社区交流', desc: '与同路人分享学习方法、打卡记录与真实使用故事。' },
  { icon: Trophy, title: '成就激励', desc: '12 枚成就徽章与实时排行榜，让坚持被看见。' }
];

const MODULES = [
  { icon: BookOpen, name: '单词记忆', desc: '翻转闪卡 + 例句语境', color: '#4f8cff' },
  { icon: Sparkles, name: '语法练习', desc: '即时解析的闯关题', color: '#a78bfa' },
  { icon: Headphones, name: '听力训练', desc: '母语者语音与对照', color: '#22d3ee' },
  { icon: Mic, name: '口语跟读', desc: '语音识别 + 发音打分', color: '#ff6b9d' }
];

export default function Landing({ authMode, setAuthMode, onAuthed, onToast }) {
  const [languages, setLanguages] = useState(window.__meta?.languages || []);

  useEffect(() => {
    if (languages.length) return;
    api.meta().then((data) => setLanguages(data.languages)).catch(() => {});
  }, [languages.length]);

  return (
    <div className="landing">
      <div className="landing-bg">
        <div className="glow glow-a" />
        <div className="glow glow-b" />
        <div className="grid-overlay" />
      </div>

      <header className="landing-nav">
        <Logo />
        <nav className="landing-links">
          <a href="#courses">课程体系</a>
          <a href="#modules">互动课堂</a>
          <a href="#features">学习路径</a>
          <a href="#community">社区</a>
        </nav>
        <div className="landing-actions">
          <button type="button" className="ghost-btn" onClick={() => setAuthMode('login')}>登录</button>
          <button type="button" className="primary-btn" onClick={() => setAuthMode('register')}>
            免费开始 <ArrowRight size={16} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={15} /> 沉浸式多语种学习平台</span>
            <h1>让每一种语言<br />都成为你的<span className="grad-text">第二母语</span></h1>
            <p>
              英语、日语、韩语三语并行，A1–B1 分级课程配合单词、语法、听力、口语四大互动模块，
              为你的每一步学习生成专属路径。
            </p>
            <div className="hero-actions">
              <button type="button" className="primary-btn large" onClick={() => setAuthMode('register')}>
                开启学习之旅 <ArrowRight size={18} />
              </button>
              <button type="button" className="ghost-btn large" onClick={() => setAuthMode('login')}>
                体验演示账号
              </button>
            </div>
            <div className="hero-stats">
              <div><strong>3</strong><span>主流语种</span></div>
              <div><strong>36</strong><span>场景课程</span></div>
              <div><strong>12</strong><span>成就徽章</span></div>
              <div><strong>24h</strong><span>随时沉浸</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orbit-ring ring-one" />
            <div className="orbit-ring ring-two" />
            {languages.map((lang, index) => (
              <div key={lang.code} className={`lang-card lang-card-${index}`} style={{ '--accent': lang.accent, '--soft': lang.accentSoft }}>
                <div className="lang-card-top">
                  <span className="lang-flag">{lang.flagText}</span>
                  <span className="lang-learners">{lang.learners} 学习者</span>
                </div>
                <div className="lang-phrase">{lang.phrase}</div>
                <div className="lang-phrase-cn">{lang.phraseCn}</div>
                <div className="lang-meta">
                  <span>{lang.name} · {lang.nativeName}</span>
                  <span>{lang.lessonCount} 节课</span>
                </div>
                <div className="lang-progress"><i style={{ width: `${28 + index * 22}%` }} /></div>
              </div>
            ))}
            <div className="floating-chip chip-a"><Volume2 size={14} /> 实时发音纠音</div>
            <div className="floating-chip chip-b"><Check size={14} /> 每日目标达成</div>
          </div>
        </section>

        <section className="module-strip" id="modules">
          <div className="module-strip-head">
            <h2>四种交互，一套沉浸式学习闭环</h2>
            <p>每一节课都由四个紧凑环节组成，学完即练、练完即评。</p>
          </div>
          <div className="module-grid">
            {MODULES.map((item) => (
              <div key={item.name} className="module-card" style={{ '--accent': item.color }}>
                <div className="module-icon"><item.icon size={20} /></div>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
                <span className="module-tag">课堂模块</span>
              </div>
            ))}
          </div>
        </section>

        <section className="course-section" id="courses">
          <div className="section-heading">
            <span className="eyebrow">分级课程体系</span>
            <h2>从第一句问候，到流利表达</h2>
            <p>每个语种覆盖 A1、A2、B1 三个级别，逐单元解锁，稳步进阶。</p>
          </div>
          <div className="course-cards">
            {languages.map((lang) => (
              <article key={lang.code} className="course-card" style={{ '--accent': lang.accent, '--soft': lang.accentSoft }}>
                <div className="course-card-head">
                  <span className="lang-flag large">{lang.flagText}</span>
                  <div>
                    <h3>{lang.name} <small>{lang.nativeName}</small></h3>
                    <p>{lang.tagline}</p>
                  </div>
                </div>
                <p className="course-desc">{lang.description}</p>
                <div className="course-levels">
                  {lang.levels.map((level) => (
                    <div key={level.id} className="level-row">
                      <span className="level-code">{level.code}</span>
                      <span className="level-title">{level.title}</span>
                      <span className="level-count">{level.lessonCount} 课</span>
                    </div>
                  ))}
                </div>
                <button type="button" className="soft-btn" onClick={() => setAuthMode('register')}>
                  开始学习 {lang.name} <ArrowRight size={16} />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="features" id="features">
          <div className="section-heading">
            <span className="eyebrow">平台能力</span>
            <h2>为长期坚持而设计的每一个细节</h2>
          </div>
          <div className="feature-grid">
            {FEATURES.map((item) => (
              <div key={item.title} className="feature-card">
                <div className="feature-icon"><item.icon size={22} /></div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="community-band" id="community">
          <div>
            <span className="eyebrow">社区与激励</span>
            <h2>一个人学习，一群人成长</h2>
            <p>分享你的学习故事，参与每周排行，用成就徽章记录每一个里程碑。</p>
            <button type="button" className="primary-btn large" onClick={() => setAuthMode('register')}>
              加入 LinguaSphere <ArrowRight size={18} />
            </button>
          </div>
          <div className="community-preview">
            <div className="preview-post">
              <div className="preview-avatar" style={{ background: '#ff6b9d22', color: '#ff6b9d' }}>苏</div>
              <div>
                <strong>苏樱 · 日语 A1</strong>
                <p>「はじめまして」这一课读到 90 分，影子跟读三遍后语调自然多了。</p>
              </div>
              <span className="preview-like">♥ 12</span>
            </div>
            <div className="preview-post">
              <div className="preview-avatar" style={{ background: '#4f8cff22', color: '#4f8cff' }}>陈</div>
              <div>
                <strong>陈屿 · 英语 B1</strong>
                <p>听力三轮法：盲听抓关键词 → 对照原文 → 只听不看，效率翻倍。</p>
              </div>
              <span className="preview-like">♥ 21</span>
            </div>
            <div className="preview-badges">
              <span><Trophy size={15} /> 连续 12 天</span>
              <span><Sparkles size={15} /> 本周 + 480 XP</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <Logo compact />
        <p>LinguaSphere · 用沉浸式体验，让语言真正被使用。</p>
        <span>© 2026 LinguaSphere</span>
      </footer>

      {authMode && (
        <AuthModal initialMode={authMode} onClose={() => setAuthMode(null)} onAuthed={onAuthed} />
      )}
    </div>
  );
}
