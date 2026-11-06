import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, BookOpen, Check, ChevronLeft, ChevronRight, Clock, Headphones,
  Loader2, Lock, Mic, RotateCcw, Sparkles, Trophy, Volume2, X, Zap
} from 'lucide-react';
import { api } from '../api';
import { useApp } from '../appContext';
import { cx, speak, similarity } from '../utils';
import AchievementIcon from '../components/AchievementIcon';

const STAGES = [
  { key: 'vocab', label: '单词记忆', icon: BookOpen },
  { key: 'grammar', label: '语法练习', icon: Sparkles },
  { key: 'listening', label: '听力训练', icon: Headphones },
  { key: 'speaking', label: '口语跟读', icon: Mic }
];

export default function LessonPlayer({ lessonId, onClose, onNavigate }) {
  const { showToast, refresh } = useApp();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [stage, setStage] = useState('intro');

  const [vocabIndex, setVocabIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [vocabKnown, setVocabKnown] = useState([]);

  const [grammarIndex, setGrammarIndex] = useState(0);
  const [grammarChoice, setGrammarChoice] = useState(null);
  const [grammarChecked, setGrammarChecked] = useState(false);
  const [grammarCorrect, setGrammarCorrect] = useState([]);

  const [listeningIndex, setListeningIndex] = useState(0);
  const [listeningChoice, setListeningChoice] = useState(null);
  const [listeningChecked, setListeningChecked] = useState(false);
  const [listeningCorrect, setListeningCorrect] = useState([]);
  const [showScript, setShowScript] = useState(false);

  const [speakingIndex, setSpeakingIndex] = useState(0);
  const [speakingScores, setSpeakingScores] = useState([]);
  const [recState, setRecState] = useState('idle');
  const [transcript, setTranscript] = useState('');
  const [recognizedScore, setRecognizedScore] = useState(null);
  const [recognitionSupported, setRecognitionSupported] = useState(true);

  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const startTime = useRef(Date.now());
  const submittedRef = useRef(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    let alive = true;
    api.lesson(lessonId)
      .then((res) => { if (alive) setData(res); })
      .catch((err) => { if (alive) setError(err.message); });
    return () => {
      alive = false;
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch { /* noop */ }
      }
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [lessonId]);

  const lesson = data?.lesson;
  const lang = lesson?.lang || 'en';

  function play(text, rate = 0.92) {
    if (!speak(text, lang, rate)) showToast('当前浏览器不支持语音播放', 'error');
  }

  function stageIndex() {
    return STAGES.findIndex((item) => item.key === stage);
  }

  function goNextStage() {
    if (stage === 'vocab') { setStage('grammar'); return; }
    if (stage === 'grammar') { setStage('listening'); return; }
    if (stage === 'listening') { setStage('speaking'); return; }
    if (stage === 'speaking') { setStage('summary'); }
  }

  const vocabScore = lesson
    ? Math.round((vocabKnown.filter(Boolean).length / lesson.vocab.length) * 100)
    : 0;
  const grammarTotal = lesson?.grammar.questions.length || 1;
  const grammarScore = Math.round((grammarCorrect.filter(Boolean).length / grammarTotal) * 100);
  const listeningTotal = lesson?.listening.questions.length || 1;
  const listeningScore = Math.round((listeningCorrect.filter(Boolean).length / listeningTotal) * 100);
  const speakingScore = speakingScores.length
    ? Math.round(speakingScores.reduce((a, b) => a + b, 0) / speakingScores.length)
    : 0;
  const totalScore = Math.round(vocabScore * 0.25 + grammarScore * 0.3 + listeningScore * 0.25 + speakingScore * 0.2);

  useEffect(() => {
    if (stage !== 'summary' || !lesson || submittedRef.current) return;
    submittedRef.current = true;
    setSubmitting(true);
    api.completeLesson(lesson.id, {
      score: totalScore,
      skills: {
        vocab: vocabScore,
        grammar: grammarScore,
        listening: listeningScore,
        speaking: speakingScore
      },
      durationSec: Math.round((Date.now() - startTime.current) / 1000)
    })
      .then((res) => {
        setResult(res);
        if (res.newAchievements?.length) {
          showToast(`解锁新成就：${res.newAchievements.map((item) => item.name).join('、')}`);
        }
      })
      .catch((err) => {
        setSubmitError(err.message);
        showToast(err.message, 'error');
      })
      .finally(() => setSubmitting(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  function handleVocab(known) {
    const next = [...vocabKnown];
    next[vocabIndex] = known;
    setVocabKnown(next);
    if (vocabIndex + 1 < lesson.vocab.length) {
      setVocabIndex(vocabIndex + 1);
      setRevealed(false);
    } else {
      goNextStage();
    }
  }

  function checkGrammar() {
    if (grammarChoice === null) return;
    const correct = grammarChoice === lesson.grammar.questions[grammarIndex].answer;
    setGrammarChecked(true);
    const next = [...grammarCorrect];
    next[grammarIndex] = correct;
    setGrammarCorrect(next);
  }

  function nextGrammar() {
    if (grammarIndex + 1 < lesson.grammar.questions.length) {
      setGrammarIndex(grammarIndex + 1);
      setGrammarChoice(null);
      setGrammarChecked(false);
    } else {
      goNextStage();
    }
  }

  function checkListening() {
    if (listeningChoice === null) return;
    const correct = listeningChoice === lesson.listening.questions[listeningIndex].answer;
    setListeningChecked(true);
    const next = [...listeningCorrect];
    next[listeningIndex] = correct;
    setListeningCorrect(next);
  }

  function nextListening() {
    if (listeningIndex + 1 < lesson.listening.questions.length) {
      setListeningIndex(listeningIndex + 1);
      setListeningChoice(null);
      setListeningChecked(false);
      setShowScript(false);
    } else {
      goNextStage();
    }
  }

  function startRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setRecognitionSupported(false);
      return;
    }
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = { en: 'en-US', ja: 'ja-JP', ko: 'ko-KR' }[lang] || 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onstart = () => {
        setRecState('listening');
        setTranscript('');
        setRecognizedScore(null);
      };
      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        setRecognizedScore(Math.round(similarity(text, lesson.speaking[speakingIndex].text) * 100));
        setRecState('result');
      };
      recognition.onerror = () => {
        setRecState('error');
        setRecognitionSupported(false);
      };
      recognition.onend = () => {
        setRecState((prev) => (prev === 'listening' ? 'idle' : prev));
      };
      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setRecognitionSupported(false);
      setRecState('idle');
    }
  }

  function finishSpeaking(score) {
    const next = [...speakingScores, score];
    setSpeakingScores(next);
    setTranscript('');
    setRecognizedScore(null);
    setRecState('idle');
    if (speakingIndex + 1 < lesson.speaking.length) {
      setSpeakingIndex(speakingIndex + 1);
    } else {
      goNextStage();
    }
  }

  if (error) {
    return (
      <div className="lesson-overlay">
        <div className="lesson-error">
          <span className="badge-orb locked"><Lock size={22} /></span>
          <h2>暂时无法进入课堂</h2>
          <p>{error}</p>
          <button type="button" className="primary-btn" onClick={onClose}>返回课程中心</button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="lesson-overlay lesson-loading">
        <Loader2 className="spin" size={28} />
        <p>正在准备课堂…</p>
      </div>
    );
  }

  const progressStages = stage === 'intro' || stage === 'summary' ? [] : STAGES.map((item) => item.key);
  const currentIndex = stageIndex();

  return (
    <div className="lesson-overlay" style={{ '--accent': data.language?.accent || '#4f8cff' }}>
      <div className="lesson-shell">
        <header className="lesson-topbar">
          <button type="button" className="icon-btn" onClick={onClose} aria-label="退出课堂"><X size={20} /></button>
          <div className="lesson-progress-stages">
            {STAGES.map((item, index) => {
              const active = item.key === stage;
              const done = currentIndex > index && stage !== 'summary';
              return (
                <div key={item.key} className={cx('stage-step', active && 'active', done && 'done')}>
                  <span className="stage-icon">{done ? <Check size={13} /> : <item.icon size={14} />}</span>
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
          <div className="lesson-topmeta">
            <span className="level-badge">{lesson.levelCode}</span>
            <span className="lesson-xp"><Zap size={14} /> +{lesson.xp} XP</span>
          </div>
        </header>

        <div className="lesson-progress-line">
          <i style={{ width: `${stage === 'intro' ? 4 : stage === 'summary' ? 100 : ((currentIndex + 1) / STAGES.length) * 100}%` }} />
        </div>

        <div className="lesson-body">
          {stage === 'intro' && (
            <section className="lesson-intro">
              <span className="eyebrow"><Sparkles size={15} /> {lesson.langName} · {lesson.levelCode} · {lesson.unitTitle}</span>
              <h1>{lesson.title}</h1>
              <p className="intro-sub">{lesson.subtitle}</p>
              <div className="intro-meta">
                <span><Clock size={15} /> {lesson.minutes} 分钟</span>
                <span><BookOpen size={15} /> {lesson.vocab.length} 个词汇</span>
                <span><Zap size={15} /> {lesson.xp} XP</span>
              </div>
              <div className="intro-goals">
                <h3>本节课目标</h3>
                <ul>
                  {lesson.goals.map((goal) => <li key={goal}><Check size={15} /> {goal}</li>)}
                </ul>
              </div>
              <div className="intro-stages">
                {STAGES.map((item) => (
                  <div key={item.key} className="intro-stage-item">
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
              <button type="button" className="primary-btn large" onClick={() => setStage('vocab')}>
                开始课堂 <ArrowRight size={18} />
              </button>
            </section>
          )}

          {stage === 'vocab' && (
            <section className="vocab-stage">
              <div className="stage-heading">
                <span className="stage-kicker">单词记忆 · {vocabIndex + 1}/{lesson.vocab.length}</span>
                <h2>先认识，再记住</h2>
                <p>点击卡片翻转，查看释义与例句。</p>
              </div>

              <div className="flashcard-wrap">
                <div
                  className={cx('flashcard', revealed && 'flipped')}
                  onClick={() => setRevealed((prev) => !prev)}
                  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setRevealed((prev) => !prev); }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flashcard-inner">
                    <div className="flashcard-front">
                      <span className="word-pos">{lesson.vocab[vocabIndex].pos}</span>
                      <strong>{lesson.vocab[vocabIndex].term}</strong>
                      {lesson.vocab[vocabIndex].reading && <span className="word-reading">{lesson.vocab[vocabIndex].reading}</span>}
                      <button
                        type="button"
                        className="word-audio"
                        onClick={(event) => { event.stopPropagation(); play(lesson.vocab[vocabIndex].term, 0.85); }}
                        aria-label="播放发音"
                      >
                        <Volume2 size={16} />
                      </button>
                      <span className="flip-hint">点击卡片查看释义</span>
                    </div>
                    <div className="flashcard-back">
                      <span className="word-meaning">{lesson.vocab[vocabIndex].meaning}</span>
                      <p className="word-example">{lesson.vocab[vocabIndex].example}</p>
                      <p className="word-example-cn">{lesson.vocab[vocabIndex].exampleCn}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="vocab-actions">
                <button type="button" className="ghost-btn" onClick={() => handleVocab(false)}>
                  <RotateCcw size={16} /> 还不熟
                </button>
                <button type="button" className="primary-btn" onClick={() => handleVocab(true)}>
                  <Check size={16} /> 记住了
                </button>
              </div>
              <div className="dot-progress">
                {lesson.vocab.map((item, index) => (
                  <i key={item.term} className={cx(index < vocabIndex && (vocabKnown[index] ? 'known' : 'weak'), index === vocabIndex && 'current')} />
                ))}
              </div>
            </section>
          )}

          {stage === 'grammar' && (
            <section className="quiz-stage">
              <div className="stage-heading">
                <span className="stage-kicker">语法练习 · {grammarIndex + 1}/{lesson.grammar.questions.length}</span>
                <h2>{lesson.grammar.title}</h2>
              </div>
              <div className="grammar-points">
                {lesson.grammar.points.map((point) => (
                  <span key={point}><Sparkles size={14} /> {point}</span>
                ))}
              </div>

              <div className="quiz-card">
                <p className="quiz-prompt">{lesson.grammar.questions[grammarIndex].prompt}</p>
                <div className="option-list">
                  {lesson.grammar.questions[grammarIndex].options.map((option, index) => {
                    const isAnswer = index === lesson.grammar.questions[grammarIndex].answer;
                    const selected = grammarChoice === index;
                    return (
                      <button
                        type="button"
                        key={option}
                        className={cx('option-btn', selected && 'selected', grammarChecked && isAnswer && 'correct', grammarChecked && selected && !isAnswer && 'wrong')}
                        onClick={() => { if (!grammarChecked) setGrammarChoice(index); }}
                        disabled={grammarChecked}
                      >
                        <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                        <span>{option}</span>
                        {grammarChecked && isAnswer && <Check size={16} />}
                        {grammarChecked && selected && !isAnswer && <X size={16} />}
                      </button>
                    );
                  })}
                </div>

                {grammarChecked && (
                  <div className={cx('feedback', grammarChoice === lesson.grammar.questions[grammarIndex].answer ? 'ok' : 'bad')}>
                    <strong>{grammarChoice === lesson.grammar.questions[grammarIndex].answer ? '回答正确' : '再想想'}</strong>
                    <p>{lesson.grammar.questions[grammarIndex].explain}</p>
                  </div>
                )}

                <div className="quiz-actions">
                  {!grammarChecked ? (
                    <button type="button" className="primary-btn" disabled={grammarChoice === null} onClick={checkGrammar}>确认答案</button>
                  ) : (
                    <button type="button" className="primary-btn" onClick={nextGrammar}>
                      {grammarIndex + 1 === lesson.grammar.questions.length ? '进入听力训练' : '下一题'} <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </section>
          )}

          {stage === 'listening' && (
            <section className="quiz-stage listening-stage">
              <div className="stage-heading">
                <span className="stage-kicker">听力训练 · {listeningIndex + 1}/{lesson.listening.questions.length}</span>
                <h2>先听一遍，再作答</h2>
              </div>

              <div className="audio-card">
                <div className="audio-visual">
                  {Array.from({ length: 22 }).map((_, index) => (
                    <i key={index} style={{ height: `${18 + ((index * 7) % 26)}px` }} />
                  ))}
                </div>
                <div className="audio-actions">
                  <button type="button" className="play-btn" onClick={() => play(lesson.listening.script, 0.88)}>
                    <Volume2 size={20} />
                  </button>
                  <div>
                    <strong>母语者示范音频</strong>
                    <span>可反复收听，注意语调与连读</span>
                  </div>
                  <button type="button" className="ghost-btn sm" onClick={() => setShowScript((prev) => !prev)}>
                    {showScript ? '隐藏原文' : '查看原文'}
                  </button>
                </div>
                {showScript && (
                  <div className="audio-script">
                    <p>{lesson.listening.script}</p>
                    <span>{lesson.listening.translation}</span>
                  </div>
                )}
              </div>

              <div className="quiz-card">
                <p className="quiz-prompt">{lesson.listening.questions[listeningIndex].prompt}</p>
                <div className="option-list">
                  {lesson.listening.questions[listeningIndex].options.map((option, index) => {
                    const isAnswer = index === lesson.listening.questions[listeningIndex].answer;
                    const selected = listeningChoice === index;
                    return (
                      <button
                        type="button"
                        key={option}
                        className={cx('option-btn', selected && 'selected', listeningChecked && isAnswer && 'correct', listeningChecked && selected && !isAnswer && 'wrong')}
                        onClick={() => { if (!listeningChecked) setListeningChoice(index); }}
                        disabled={listeningChecked}
                      >
                        <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {listeningChecked && (
                  <div className={cx('feedback', listeningChoice === lesson.listening.questions[listeningIndex].answer ? 'ok' : 'bad')}>
                    <strong>{listeningChoice === lesson.listening.questions[listeningIndex].answer ? '听力不错' : '再听一遍试试'}</strong>
                    <p>{lesson.listening.questions[listeningIndex].explain}</p>
                  </div>
                )}

                <div className="quiz-actions">
                  {!listeningChecked ? (
                    <button type="button" className="primary-btn" disabled={listeningChoice === null} onClick={checkListening}>确认答案</button>
                  ) : (
                    <button type="button" className="primary-btn" onClick={nextListening}>
                      {listeningIndex + 1 === lesson.listening.questions.length ? '进入口语跟读' : '下一题'} <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </section>
          )}

          {stage === 'speaking' && (
            <section className="speaking-stage">
              <div className="stage-heading">
                <span className="stage-kicker">口语跟读 · {speakingIndex + 1}/{lesson.speaking.length}</span>
                <h2>跟着示范，开口说出来</h2>
                <p>{lesson.speaking[speakingIndex].tip}</p>
              </div>

              <div className="speaking-card">
                <div className="speaking-sentence">
                  <span className="quote-mark">“</span>
                  <p>{lesson.speaking[speakingIndex].text}</p>
                  <span className="speaking-cn">{lesson.speaking[speakingIndex].translation}</span>
                </div>
                <div className="speaking-toolbar">
                  <button type="button" className="ghost-btn" onClick={() => play(lesson.speaking[speakingIndex].text, 0.82)}>
                    <Volume2 size={16} /> 听示范
                  </button>
                  {recognitionSupported ? (
                    <button type="button" className={cx('primary-btn', recState === 'listening' && 'recording')} onClick={startRecognition} disabled={recState === 'listening'}>
                      <Mic size={16} /> {recState === 'listening' ? '正在聆听…' : '开始跟读'}
                    </button>
                  ) : (
                    <span className="rec-unsupported"><Mic size={15} /> 当前浏览器不支持语音识别，请自我评估</span>
                  )}
                </div>

                {recState === 'listening' && (
                  <div className="recording-wave">
                    {Array.from({ length: 16 }).map((_, index) => <i key={index} style={{ animationDelay: `${index * 60}ms` }} />)}
                    <span>请自然地说出这句话</span>
                  </div>
                )}

                {transcript && (
                  <div className="recognition-result">
                    <div className="recognition-head">
                      <span>识别结果</span>
                      <strong>{recognizedScore} 分</strong>
                    </div>
                    <p>“{transcript}”</p>
                    <div className="progress-track"><i style={{ width: `${recognizedScore}%` }} /></div>
                  </div>
                )}

                <div className="speaking-actions">
                  {transcript ? (
                    <>
                      <button type="button" className="ghost-btn" onClick={startRecognition}>再试一次</button>
                      <button type="button" className="primary-btn" onClick={() => finishSpeaking(recognizedScore)}>
                        {speakingIndex + 1 === lesson.speaking.length ? '完成跟读' : '下一句'} <ArrowRight size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" className="ghost-btn" onClick={() => finishSpeaking(72)}>还需练习</button>
                      <button type="button" className="primary-btn" onClick={() => finishSpeaking(96)}>
                        <Check size={16} /> 读得很顺
                      </button>
                    </>
                  )}
                </div>
              </div>
            </section>
          )}

          {stage === 'summary' && (
            <section className="summary-stage">
              {submitting && !result ? (
                <div className="summary-loading"><Loader2 className="spin" size={26} /><p>正在结算你的学习成果…</p></div>
              ) : submitError && !result ? (
                <div className="summary-loading">
                  <p>结算失败：{submitError}</p>
                  <button type="button" className="ghost-btn" onClick={onClose}>返回并稍后重试</button>
                </div>
              ) : result ? (
                <>
                  <div className="summary-hero">
                    <div className="score-orb" style={{ '--percent': result.score }}>
                      <div><strong>{result.score}</strong><span>综合得分</span></div>
                    </div>
                    <div className="summary-copy">
                      <span className="eyebrow"><Sparkles size={15} /> 课程完成</span>
                      <h1>{lesson.title}</h1>
                      <p>{result.score >= 90 ? '表现出色，语音与语法都掌握得很扎实！' : result.score >= 75 ? '完成得不错，复习薄弱环节会更稳。' : '完成比完美更重要，建议再练一次巩固。'}</p>
                      <div className="summary-xp"><Zap size={18} /> +{result.xpEarned} XP <span>· 今日 {result.stats.todayXp} XP</span></div>
                    </div>
                  </div>

                  <div className="skill-summary">
                    {[
                      ['词汇', vocabScore],
                      ['语法', grammarScore],
                      ['听力', listeningScore],
                      ['口语', speakingScore]
                    ].map(([label, value]) => (
                      <div key={label} className="skill-summary-item">
                        <span>{label}</span>
                        <strong>{value}</strong>
                        <div className="progress-track sm"><i style={{ width: `${value}%` }} /></div>
                      </div>
                    ))}
                  </div>

                  {result.newAchievements?.length > 0 && (
                    <div className="new-achievements">
                      <h3><Trophy size={18} /> 解锁新成就</h3>
                      <div className="new-badges">
                        {result.newAchievements.map((badge) => (
                          <div key={badge.id} className="new-badge">
                            <span className={`badge-orb ${badge.tier}`}><AchievementIcon name={badge.icon} size={20} /></span>
                            <div><strong>{badge.name}</strong><span>{badge.desc}</span></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="summary-actions">
                    {result.nextLesson ? (
                      <button
                        type="button"
                        className="primary-btn"
                        onClick={() => {
                          refresh();
                          onNavigate(result.nextLesson.id);
                        }}
                      >
                        下一课：{result.nextLesson.title} <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button type="button" className="primary-btn" onClick={onClose}>返回首页</button>
                    )}
                    <button type="button" className="ghost-btn" onClick={onClose}>稍后继续</button>
                  </div>
                </>
              ) : null}
            </section>
          )}
        </div>

        {stage !== 'intro' && stage !== 'summary' && (
          <footer className="lesson-footer">
            <button type="button" className="text-btn" onClick={onClose}>
              <ArrowLeft size={15} /> 退出课堂
            </button>
            <span className="footer-note">学习进度会自动保存 · 完成全部环节后结算 XP</span>
          </footer>
        )}
      </div>
    </div>
  );
}
