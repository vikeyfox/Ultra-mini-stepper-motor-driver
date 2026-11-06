import { useEffect, useState } from 'react';
import { Check, ChevronDown, Clock, Lock, Play, RotateCcw, Sparkles, Zap } from 'lucide-react';
import { api } from '../api';
import { useApp } from '../appContext';
import { cx } from '../utils';

export default function Courses() {
  const { user, refreshKey, startLesson } = useApp();
  const [data, setData] = useState(null);
  const [activeLang, setActiveLang] = useState(user.targetLang || 'en');
  const [collapsed, setCollapsed] = useState({});

  useEffect(() => {
    let alive = true;
    api.courses().then((res) => { if (alive) setData(res); }).catch(() => {});
    return () => { alive = false; };
  }, [refreshKey]);

  if (!data) {
    return <div className="page-loading"><div className="skeleton tall" /><div className="skeleton" /></div>;
  }

  const language = data.languages.find((item) => item.code === activeLang) || data.languages[0];
  const totalCompleted = language.levels.reduce(
    (sum, level) => sum + level.units.reduce(
      (inner, unit) => inner + unit.lessons.filter((lesson) => lesson.completed).length, 0
    ), 0
  );
  const totalLessons = language.levels.reduce(
    (sum, level) => sum + level.units.reduce((inner, unit) => inner + unit.lessons.length, 0), 0
  );
  const percent = Math.round((totalCompleted / totalLessons) * 100);

  function toggleLevel(levelId) {
    setCollapsed((prev) => ({ ...prev, [levelId]: !prev[levelId] }));
  }

  return (
    <div className="page courses-page">
      <div className="page-head">
        <div>
          <span className="page-eyebrow">课程中心</span>
          <h1>分级课程体系</h1>
          <p className="page-sub">A1 → A2 → B1，逐课解锁，构建完整的语言能力。</p>
        </div>
        <div className="head-pills">
          <span className="pill"><Sparkles size={15} /> 已掌握 {totalCompleted} 节</span>
        </div>
      </div>

      <div className="lang-tabs">
        {data.languages.map((lang) => {
          const completed = lang.levels.reduce(
            (sum, level) => sum + level.units.reduce(
              (inner, unit) => inner + unit.lessons.filter((lesson) => lesson.completed).length, 0
            ), 0
          );
          return (
            <button
              type="button"
              key={lang.code}
              className={cx('lang-tab', activeLang === lang.code && 'active')}
              style={{ '--accent': lang.accent, '--soft': lang.accentSoft }}
              onClick={() => setActiveLang(lang.code)}
            >
              <span className="lang-tab-flag">{lang.flagText}</span>
              <span className="lang-tab-copy">
                <strong>{lang.name}<small>{lang.nativeName}</small></strong>
                <span>{completed}/{lang.lessonCount} 节课完成</span>
              </span>
              {activeLang === lang.code && <i className="tab-indicator" />}
            </button>
          );
        })}
      </div>

      <section className="course-overview" style={{ '--accent': language.accent }}>
        <div>
          <span className="overview-tag">{language.flagText} · {language.nativeName}</span>
          <h2>{language.description}</h2>
          <p>{language.levels.length} 个级别 · {totalLessons} 节场景课程 · 预计 4–6 周完成</p>
        </div>
        <div className="overview-progress">
          <div className="overview-ring" style={{ '--percent': percent }}>
            <div><strong>{percent}%</strong><span>完成度</span></div>
          </div>
        </div>
      </section>

      <div className="level-list">
        {language.levels.map((level) => {
          const lessonsAll = level.units.flatMap((unit) => unit.lessons);
          const done = lessonsAll.filter((lesson) => lesson.completed).length;
          const levelPercent = Math.round((done / lessonsAll.length) * 100);
          const isCollapsed = collapsed[level.id];
          return (
            <section key={level.id} className="level-section" style={{ '--accent': language.accent }}>
              <button type="button" className="level-head" onClick={() => toggleLevel(level.id)}>
                <span className="level-chip">{level.code}</span>
                <div className="level-head-copy">
                  <h3>{level.title}</h3>
                  <p>{level.subtitle}</p>
                </div>
                <div className="level-head-progress">
                  <span>{done}/{lessonsAll.length} 课 · {levelPercent}%</span>
                  <div className="progress-track sm"><i style={{ width: `${levelPercent}%` }} /></div>
                </div>
                <ChevronDown size={18} className={cx('level-chevron', isCollapsed && 'closed')} />
              </button>

              {!isCollapsed && (
                <div className="unit-list">
                  {level.units.map((unit) => (
                    <div key={unit.id} className="unit-block">
                      <div className="unit-head">
                        <h4>{unit.title}</h4>
                        <span>{unit.desc}</span>
                      </div>
                      <div className="lesson-list">
                        {unit.lessons.map((lesson, index) => (
                          <div key={lesson.id} className={cx('lesson-row', lesson.completed && 'completed', lesson.isNext && 'is-next', !lesson.unlocked && 'locked')}>
                            <div className="lesson-status">
                              {lesson.completed ? <Check size={16} /> : lesson.unlocked ? <span>{index + 1}</span> : <Lock size={14} />}
                            </div>
                            <div className="lesson-main">
                              <div className="lesson-title-line">
                                <strong>{lesson.title}</strong>
                                <span>{lesson.subtitle}</span>
                                {lesson.isNext && <span className="next-tag">下一课</span>}
                              </div>
                              <div className="lesson-meta">
                                <span><Clock size={13} /> {lesson.minutes} 分钟</span>
                                <span><Zap size={13} /> +{lesson.xp} XP</span>
                                <span>{lesson.vocabCount} 个词汇</span>
                                {lesson.completed && <span className="lesson-score">最高 {lesson.score} 分</span>}
                              </div>
                            </div>
                            <div className="lesson-action">
                              {lesson.unlocked ? (
                                <button type="button" className={cx('small-btn', lesson.completed ? 'outline' : 'primary')} onClick={() => startLesson(lesson.id)}>
                                  {lesson.completed ? <><RotateCcw size={14} /> 复习</> : <><Play size={14} /> 开始</>}
                                </button>
                              ) : (
                                <span className="lock-text"><Lock size={13} /> 完成上一课解锁</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
