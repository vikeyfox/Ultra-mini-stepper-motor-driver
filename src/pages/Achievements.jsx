import { useEffect, useState } from 'react';
import { Award, BookOpen, Flame, Lock, Sparkles, Target, Trophy, Zap } from 'lucide-react';
import { api } from '../api';
import { useApp } from '../appContext';
import { cx } from '../utils';
import AchievementIcon from '../components/AchievementIcon';

const TIER_LABEL = { bronze: '青铜', silver: '白银', gold: '黄金' };

export default function Achievements() {
  const { refreshKey } = useApp();
  const [data, setData] = useState(null);

  useEffect(() => {
    let alive = true;
    api.achievements().then((res) => { if (alive) setData(res); }).catch(() => {});
    return () => { alive = false; };
  }, [refreshKey]);

  if (!data) {
    return <div className="page-loading"><div className="skeleton tall" /><div className="skeleton-grid"><div className="skeleton" /><div className="skeleton" /><div className="skeleton" /></div></div>;
  }

  const { achievements, unlockedCount, total, levelInfo, stats } = data;
  const percent = Math.round((unlockedCount / total) * 100);

  return (
    <div className="page achievements-page">
      <div className="page-head">
        <div>
          <span className="page-eyebrow">成就殿堂</span>
          <h1>记录每一个学习里程碑</h1>
          <p className="page-sub">完成课程、坚持打卡、参与社区，点亮属于你的徽章。</p>
        </div>
        <div className="head-pills">
          <span className="pill"><Award size={15} /> {unlockedCount}/{total} 已解锁</span>
        </div>
      </div>

      <div className="achieve-layout">
        <section className="panel level-hero">
          <div className="level-hero-copy">
            <span className="overview-tag">当前等级</span>
            <h2>Lv.{levelInfo.level} · {levelInfo.name}</h2>
            <p>累计获得 {levelInfo.totalXp} XP{levelInfo.nextAt ? `，距离「${levelInfo.nextName}」还需 ${levelInfo.nextAt - levelInfo.totalXp} XP` : '，已达到最高等级'}。</p>
            <div className="progress-track"><i style={{ width: `${levelInfo.percent}%` }} /></div>
            <div className="level-hero-meta">
              <span><Zap size={15} /> 本周 {stats.weeklyXp} XP</span>
              <span><Flame size={15} /> 连续 {stats.streak} 天</span>
              <span><BookOpen size={15} /> {stats.completedCount} 节课程</span>
            </div>
          </div>
          <div className="overview-ring" style={{ '--percent': percent }}>
            <div><strong>{percent}%</strong><span>徽章收集</span></div>
          </div>
        </section>

        <section className="panel browse-panel">
          <div className="panel-head">
            <h3><Target size={18} /> 学习数据</h3>
          </div>
          <div className="mini-stat-grid">
            <div><strong>{stats.wordsLearned}</strong><span>累计词汇</span></div>
            <div><strong>{stats.maxScore}</strong><span>单课最高分</span></div>
            <div><strong>{stats.languageCount}</strong><span>学习语种</span></div>
            <div><strong>{stats.postCount}</strong><span>社区动态</span></div>
          </div>
          <div className="skill-mini">
            {Object.entries(stats.skillProfile).map(([key, value]) => (
              <div key={key} className="skill-mini-row">
                <span>{({ vocab: '词汇', grammar: '语法', listening: '听力', speaking: '口语' })[key]}</span>
                <div className="progress-track sm"><i style={{ width: `${value}%` }} /></div>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="badge-wall">
        <div className="badge-wall-head">
          <h2><Sparkles size={20} /> 全部徽章</h2>
          <p>已解锁 {unlockedCount} / {total}，继续保持节奏点亮更多成就。</p>
        </div>
        <div className="badge-grid">
          {achievements.map((badge) => (
            <div key={badge.id} className={cx('badge-card', badge.unlocked ? 'unlocked' : 'locked', badge.tier)}>
              <div className="badge-glow" />
              <span className="badge-orb large"><AchievementIcon name={badge.icon} size={26} /></span>
              <div className="badge-copy">
                <span className="badge-tier">{TIER_LABEL[badge.tier]}</span>
                <h4>{badge.name}</h4>
                <p>{badge.desc}</p>
              </div>
              <span className="badge-state">
                {badge.unlocked ? <><Trophy size={14} /> 已解锁</> : <><Lock size={14} /> 未解锁</>}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
