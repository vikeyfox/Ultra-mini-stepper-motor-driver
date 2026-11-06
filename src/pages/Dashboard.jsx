import { useEffect, useState } from 'react';
import {
  ArrowRight, Award, BookOpen, ChevronRight, Flame, Play, Sparkles, Target, Zap
} from 'lucide-react';
import { api } from '../api';
import { useApp } from '../appContext';
import { cx, greeting, relativeDay } from '../utils';
import AchievementIcon from '../components/AchievementIcon';

export default function Dashboard() {
  const { user, refreshKey, startLesson, setPage } = useApp();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    api.dashboard()
      .then((res) => { if (alive) setData(res); })
      .catch((err) => { if (alive) setError(err.message); });
    return () => { alive = false; };
  }, [refreshKey]);

  if (error) {
    return <div className="empty-state"><p>{error}</p></div>;
  }

  if (!data) {
    return (
      <div className="page-loading">
        <div className="skeleton tall" />
        <div className="skeleton-grid">
          <div className="skeleton" /><div className="skeleton" /><div className="skeleton" /><div className="skeleton" />
        </div>
      </div>
    );
  }

  const { stats, levelInfo, nextLesson, weekly, languageProgress, achievements, today, goalText, focusLanguage } = data;
  const maxXp = Math.max(...weekly.map((day) => day.xp), 30);
  const todayDate = new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });

  return (
    <div className="page dashboard-page">
      <div className="page-head">
        <div>
          <span className="page-eyebrow">{greeting()}，{user.name} · {todayDate}</span>
          <h1>今天想用什么语言开口？</h1>
          <p className="page-sub">保持节奏，你的专属学习路径已经准备好了。</p>
        </div>
        <div className="head-pills">
          <span className="pill flame"><Flame size={15} /> 连续 {stats.streak} 天</span>
          <span className="pill"><Zap size={15} /> {stats.totalXp} XP</span>
        </div>
      </div>

      <div className="dash-layout">
        <div className="dash-main">
          <section className="daily-hero" style={{ '--accent': focusLanguage.accent }}>
            <div className="daily-copy">
              <span className="daily-label"><Target size={15} /> 今日学习目标</span>
              <h2>{today.done ? '今日目标已完成，太棒了' : goalText}</h2>
              <p>
                {focusLanguage.name} · {focusLanguage.nativeName}
                <span className="dot-sep">·</span>
                {stats.todayXp} / {today.goal} XP
              </p>
              <div className="daily-actions">
                {nextLesson ? (
                  <button type="button" className="primary-btn" onClick={() => startLesson(nextLesson.id)}>
                    <Play size={16} /> 继续学习 · {nextLesson.title}
                  </button>
                ) : (
                  <button type="button" className="primary-btn" onClick={() => setPage('courses')}>
                    浏览全部课程 <ArrowRight size={16} />
                  </button>
                )}
                <button type="button" className="ghost-btn" onClick={() => setPage('path')}>
                  查看学习路径
                </button>
              </div>
            </div>

            <div className="daily-ring-wrap">
              <div className="daily-ring" style={{ '--percent': today.percent }}>
                <div className="daily-ring-inner">
                  <strong>{today.percent}%</strong>
                  <span>今日完成度</span>
                </div>
              </div>
              <div className="ring-orbit" />
            </div>
          </section>

          <div className="stat-row">
            <div className="stat-card">
              <span className="stat-icon blue"><Zap size={17} /></span>
              <div><strong>{stats.totalXp}</strong><span>累计 XP</span></div>
            </div>
            <div className="stat-card">
              <span className="stat-icon amber"><Flame size={17} /></span>
              <div><strong>{stats.streak} 天</strong><span>连续学习</span></div>
            </div>
            <div className="stat-card">
              <span className="stat-icon violet"><BookOpen size={17} /></span>
              <div><strong>{stats.completedCount}</strong><span>完成课程</span></div>
            </div>
            <div className="stat-card">
              <span className="stat-icon green"><Award size={17} /></span>
              <div><strong>{achievements.unlockedCount}/{achievements.total}</strong><span>成就徽章</span></div>
            </div>
          </div>

          <section className="panel weekly-panel">
            <div className="panel-head">
              <div>
                <h3>本周学习曲线</h3>
                <p>共获得 {stats.weeklyXp} XP · 今天是第 {stats.streak} 天连续学习</p>
              </div>
              <span className="mini-tag">近 7 天</span>
            </div>
            <div className="bar-chart">
              {weekly.map((day, index) => (
                <div key={day.date} className={cx('bar-col', index === weekly.length - 1 && 'is-today')}>
                  <span className="bar-value">{day.xp > 0 ? day.xp : ''}</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ height: `${Math.max(8, (day.xp / maxXp) * 100)}%` }} />
                  </div>
                  <span className="bar-label">{day.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="panel recent-panel">
            <div className="panel-head">
              <h3>最近的学习记录</h3>
              <button type="button" className="text-btn" onClick={() => setPage('courses')}>
                全部课程 <ChevronRight size={15} />
              </button>
            </div>
            {data.recentLessons.length === 0 ? (
              <div className="empty-mini">还没有学习记录，从第一节课程开始吧。</div>
            ) : (
              <div className="recent-list">
                {data.recentLessons.map((lesson) => (
                  <div key={lesson.id} className="recent-row">
                    <span className="recent-flag">{lesson.lang.toUpperCase()}</span>
                    <div className="recent-info">
                      <strong>{lesson.title}</strong>
                      <span>{lesson.langName} · {relativeDay(lesson.completedAt)}</span>
                    </div>
                    <span className="score-badge">{lesson.score} 分</span>
                    <button type="button" className="icon-text-btn" onClick={() => startLesson(lesson.id)}>
                      重练
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="dash-side">
          <section className="panel next-panel">
            <div className="panel-head">
              <h3>继续学习</h3>
              <span className="mini-tag accent">推荐</span>
            </div>
            {nextLesson ? (
              <div className="next-card" style={{ '--accent': focusLanguage.accent }}>
                <div className="next-top">
                  <span className="level-badge">{nextLesson.levelCode}</span>
                  <span className="next-xp">+{nextLesson.xp} XP</span>
                </div>
                <h4>{nextLesson.title}</h4>
                <p>{nextLesson.subtitle}</p>
                <div className="next-meta">
                  <span>{nextLesson.unitTitle}</span>
                  <span>{nextLesson.minutes} 分钟</span>
                </div>
                <div className="progress-track">
                  <i style={{ width: `${Math.round(((nextLesson.progressIndex + 1) / nextLesson.totalLessons) * 100)}%` }} />
                </div>
                <button type="button" className="primary-btn full" onClick={() => startLesson(nextLesson.id)}>
                  进入课堂 <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <div className="empty-mini">当前语种课程已全部完成，去课程中心挑战新语种吧。</div>
            )}
          </section>

          <section className="panel lang-panel">
            <div className="panel-head"><h3>语言进度</h3></div>
            <div className="lang-progress-list">
              {languageProgress.map((lang) => (
                <div key={lang.code} className="lang-progress-item" style={{ '--accent': lang.accent }}>
                  <div className="lang-progress-head">
                    <span>{lang.name}<small>{lang.nativeName}</small></span>
                    <strong>{lang.completed}/{lang.total}</strong>
                  </div>
                  <div className="progress-track"><i style={{ width: `${lang.percent}%` }} /></div>
                </div>
              ))}
            </div>
            <button type="button" className="text-btn" onClick={() => setPage('courses')}>
              查看课程体系 <ChevronRight size={15} />
            </button>
          </section>

          <section className="panel badge-panel">
            <div className="panel-head">
              <h3>成就进展</h3>
              <button type="button" className="text-btn" onClick={() => setPage('achievements')}>全部</button>
            </div>
            <div className="mini-badges">
              {achievements.recent.map((badge) => (
                <div key={badge.id} className="mini-badge">
                  <span className={`badge-orb ${badge.tier}`}><AchievementIcon name={badge.icon} size={18} /></span>
                  <span>{badge.name}</span>
                </div>
              ))}
              {achievements.recent.length === 0 && (
                <div className="empty-mini">完成第一节课即可点亮首个成就。</div>
              )}
            </div>
            <div className="level-mini">
              <div className="level-mini-head">
                <span><Sparkles size={14} /> Lv.{levelInfo.level} {levelInfo.name}</span>
                <span>{levelInfo.totalXp} XP</span>
              </div>
              <div className="progress-track sm"><i style={{ width: `${levelInfo.percent}%` }} /></div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
