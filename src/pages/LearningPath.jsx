import { useEffect, useState } from 'react';
import { ArrowRight, BrainCircuit, CalendarCheck2, Compass, Flame, Lightbulb, Play, Sparkles, Target, TrendingUp } from 'lucide-react';
import { api } from '../api';
import { useApp } from '../appContext';
import { cx } from '../utils';

const SKILL_META = [
  { key: 'vocab', label: '词汇记忆' },
  { key: 'grammar', label: '语法应用' },
  { key: 'listening', label: '听力理解' },
  { key: 'speaking', label: '口语跟读' }
];

export default function LearningPath() {
  const { refreshKey, startLesson, setPage } = useApp();
  const [data, setData] = useState(null);

  useEffect(() => {
    let alive = true;
    api.path().then((res) => { if (alive) setData(res); }).catch(() => {});
    return () => { alive = false; };
  }, [refreshKey]);

  if (!data) {
    return <div className="page-loading"><div className="skeleton tall" /><div className="skeleton-grid"><div className="skeleton" /><div className="skeleton" /></div></div>;
  }

  const { focusLanguage, overall, weakSkillLabel, weakTip, skillProfile, recommendations, plan, nextLesson } = data;

  return (
    <div className="page path-page">
      <div className="page-head">
        <div>
          <span className="page-eyebrow">个性化学习路径</span>
          <h1>为你生成的下一步</h1>
          <p className="page-sub">根据目标语言、学习进度与技能弱项动态调整，让每一次学习都有的放矢。</p>
        </div>
        <div className="head-pills">
          <span className="pill"><Compass size={15} /> 目标 {focusLanguage.name}</span>
          <span className="pill"><Flame size={15} /> 已完成 {overall.percent}%</span>
        </div>
      </div>

      <div className="path-layout">
        <section className="path-hero" style={{ '--accent': focusLanguage.accent }}>
          <div className="path-hero-copy">
            <span className="overview-tag">{focusLanguage.flagText} · {focusLanguage.nativeName}</span>
            <h2>当前路径：{focusLanguage.name}能力进阶</h2>
            <p>已经完成 {overall.completed} / {overall.total} 节课程，保持每日 30 分钟，约 {Math.max(1, Math.ceil((overall.total - overall.completed) / 2))} 周可完成当前级别。</p>
            {nextLesson && (
              <button type="button" className="primary-btn" onClick={() => startLesson(nextLesson.id)}>
                <Play size={16} /> 继续 {nextLesson.title}
              </button>
            )}
          </div>
          <div className="path-ring-wrap">
            <div className="overview-ring lg" style={{ '--percent': overall.percent }}>
              <div><strong>{overall.percent}%</strong><span>路径完成度</span></div>
            </div>
          </div>
        </section>

        <section className="panel weak-panel">
          <div className="panel-head">
            <h3><BrainCircuit size={18} /> 技能诊断</h3>
            <span className="mini-tag accent">{weakSkillLabel}待加强</span>
          </div>
          <div className="skill-bars">
            {SKILL_META.map((skill) => (
              <div key={skill.key} className={cx('skill-bar-row', skill.label === weakSkillLabel && 'weak')}>
                <div className="skill-bar-head">
                  <span>{skill.label}</span>
                  <strong>{skillProfile[skill.key] || 0}</strong>
                </div>
                <div className="progress-track sm"><i style={{ width: `${skillProfile[skill.key] || 0}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="weak-tip">
            <Lightbulb size={16} />
            <p>{weakTip}</p>
          </div>
        </section>
      </div>

      <div className="path-columns">
        <section className="panel recommend-panel">
          <div className="panel-head">
            <h3><Sparkles size={18} /> 智能推荐</h3>
            <span className="mini-tag">基于你的学习画像</span>
          </div>
          <div className="recommend-list">
            {recommendations.map((item) => (
              <div key={`${item.lessonId}-${item.tag}`} className="recommend-card">
                <div className="recommend-top">
                  <span className="level-badge">{item.levelCode}</span>
                  <span className="recommend-tag">{item.tag}</span>
                </div>
                <h4>{item.title}</h4>
                <p className="recommend-sub">{item.subtitle} · {item.unitTitle}</p>
                <p className="recommend-reason"><Target size={14} /> {item.reason}</p>
                <div className="recommend-bottom">
                  <span>{item.minutes} 分钟 · +{item.xp} XP</span>
                  <button type="button" className="small-btn primary" onClick={() => startLesson(item.lessonId)}>
                    {item.tag === '弱项复习' ? '复习' : '开始'} <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="text-btn" onClick={() => setPage('courses')}>
            浏览完整课程体系 <ArrowRight size={15} />
          </button>
        </section>

        <section className="panel plan-panel">
          <div className="panel-head">
            <h3><CalendarCheck2 size={18} /> 本周学习计划</h3>
            <span className="mini-tag">7 天</span>
          </div>
          <div className="plan-list">
            {plan.map((item) => (
              <div key={item.day} className={cx('plan-row', item.day === 0 && 'today')}>
                <div className="plan-marker">
                  <span>{item.label}</span>
                  <i />
                </div>
                <div className="plan-content">
                  <div className="plan-top">
                    <strong>{item.title}</strong>
                    <span className={cx('plan-type', item.type)}>{item.type}</span>
                  </div>
                  <div className="plan-meta">
                    <span>{item.minutes} 分钟</span>
                    <span>+{item.xp} XP</span>
                  </div>
                </div>
                {item.lessonId && (
                  <button type="button" className="icon-btn" title="开始学习" onClick={() => startLesson(item.lessonId)}>
                    <Play size={15} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="plan-foot">
            <TrendingUp size={16} />
            <span>按计划推进，本周预计可获得 {plan.reduce((sum, item) => sum + item.xp, 0)} XP</span>
          </div>
        </section>
      </div>
    </div>
  );
}
