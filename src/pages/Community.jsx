import { useEffect, useState } from 'react';
import { Crown, Heart, Loader2, MessageCircle, Send, Sparkles, Trophy, Users } from 'lucide-react';
import { api } from '../api';
import { useApp } from '../appContext';
import { cx, LANG_NAMES, relativeDay } from '../utils';

const TAGS = ['学习打卡', '学习方法', '口语打卡', '提问求助', '学习故事'];

export default function Community() {
  const { user, refreshKey, refresh, showToast } = useApp();
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState(['全部']);
  const [activeTag, setActiveTag] = useState('全部');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('学习打卡');
  const [posting, setPosting] = useState(false);
  const [board, setBoard] = useState(null);
  const [openComments, setOpenComments] = useState({});
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    let alive = true;
    api.posts(activeTag === '全部' ? {} : { tag: activeTag })
      .then((res) => { if (alive) { setPosts(res.posts); if (res.tags?.length) setTags(res.tags); } })
      .catch(() => {});
    return () => { alive = false; };
  }, [activeTag, refreshKey]);

  useEffect(() => {
    api.leaderboard().then(setBoard).catch(() => {});
  }, [refreshKey]);

  async function handlePost() {
    if (!content.trim() || posting) return;
    setPosting(true);
    try {
      await api.createPost({ content, tag });
      setContent('');
      showToast('动态发布成功，学习被看见');
      refresh();
      if (activeTag !== '全部' && activeTag !== tag) setActiveTag('全部');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setPosting(false);
    }
  }

  async function toggleLike(postId) {
    try {
      const res = await api.likePost(postId);
      setPosts((prev) => prev.map((post) => post.id === postId
        ? { ...post, liked: res.liked, likeCount: res.likeCount }
        : post));
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  async function submitComment(postId) {
    const text = (commentText[postId] || '').trim();
    if (!text) return;
    try {
      const res = await api.commentPost(postId, text);
      setPosts((prev) => prev.map((post) => post.id === postId
        ? { ...post, comments: [...post.comments, { ...res.comment, author: { name: user.name } }] }
        : post));
      setCommentText((prev) => ({ ...prev, [postId]: '' }));
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  return (
    <div className="page community-page">
      <div className="page-head">
        <div>
          <span className="page-eyebrow">社区广场</span>
          <h1>和同路人一起成长</h1>
          <p className="page-sub">分享学习故事、方法与打卡，让坚持被看见。</p>
        </div>
        <div className="head-pills">
          <span className="pill"><Users size={15} /> 298,000+ 学习者</span>
        </div>
      </div>

      <div className="community-layout">
        <div className="community-main">
          <section className="panel composer">
            <div className="composer-top">
              <div className="avatar">{user.name?.slice(0, 1)}</div>
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="今天学到了什么？分享你的学习瞬间…"
                rows={3}
                maxLength={500}
              />
            </div>
            <div className="composer-bottom">
              <div className="composer-tags">
                {TAGS.map((item) => (
                  <button type="button" key={item} className={cx('tag-chip', tag === item && 'active')} onClick={() => setTag(item)}>
                    #{item}
                  </button>
                ))}
              </div>
              <button type="button" className="primary-btn sm" disabled={posting || !content.trim()} onClick={handlePost}>
                {posting ? <Loader2 size={15} className="spin" /> : <Send size={15} />} 发布
              </button>
            </div>
          </section>

          <div className="filter-row">
            {tags.map((item) => (
              <button type="button" key={item} className={cx('filter-chip', activeTag === item && 'active')} onClick={() => setActiveTag(item)}>
                {item}
              </button>
            ))}
          </div>

          <div className="post-feed">
            {posts.length === 0 && <div className="empty-state"><p>这个分类下还没有动态，来发布第一条吧。</p></div>}
            {posts.map((post) => (
              <article key={post.id} className="panel post-card">
                <div className="post-head">
                  <div className="avatar" style={{ background: `${post.author.accent}22`, color: post.author.accent }}>
                    {post.author.name?.slice(0, 1)}
                  </div>
                  <div className="post-author">
                    <strong>{post.author.name}</strong>
                    <span>{LANG_NAMES[post.lang] || '多语学习'}学习者 · {relativeDay(post.createdAt)}</span>
                  </div>
                  <span className="post-tag">#{post.tag}</span>
                </div>
                <p className="post-content">{post.content}</p>
                <div className="post-actions">
                  <button type="button" className={cx('post-action', post.liked && 'liked')} onClick={() => toggleLike(post.id)}>
                    <Heart size={16} fill={post.liked ? 'currentColor' : 'none'} /> {post.likeCount}
                  </button>
                  <button type="button" className="post-action" onClick={() => setOpenComments((prev) => ({ ...prev, [post.id]: !prev[post.id] }))}>
                    <MessageCircle size={16} /> {post.comments.length}
                  </button>
                  <span className="post-xp"><Sparkles size={14} /> +学习能量</span>
                </div>

                {(openComments[post.id] || post.comments.length > 0) && (
                  <div className="post-comments">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="comment-row">
                        <strong>{comment.author.name}</strong>
                        <p>{comment.content}</p>
                      </div>
                    ))}
                    {openComments[post.id] && (
                      <div className="comment-input">
                        <input
                          value={commentText[post.id] || ''}
                          onChange={(event) => setCommentText((prev) => ({ ...prev, [post.id]: event.target.value }))}
                          onKeyDown={(event) => { if (event.key === 'Enter') submitComment(post.id); }}
                          placeholder="写下你的回应…"
                          maxLength={200}
                        />
                        <button type="button" className="icon-btn" onClick={() => submitComment(post.id)} aria-label="发送评论">
                          <Send size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        <aside className="community-side">
          <section className="panel rank-panel">
            <div className="panel-head">
              <h3><Trophy size={18} /> 本周学习榜</h3>
              {board?.myRank && <span className="mini-tag">我的排名 #{board.myRank}</span>}
            </div>
            <div className="rank-list">
              {(board?.rows || []).map((row) => (
                <div key={row.userId} className={cx('rank-row', row.isCurrent && 'me')}>
                  <span className={cx('rank-num', row.rank <= 3 && 'top')}>
                    {row.rank <= 3 ? <Crown size={14} /> : row.rank}
                  </span>
                  <div className="rank-avatar">{row.name.slice(0, 1)}</div>
                  <div className="rank-name">
                    <strong>{row.name}{row.isCurrent && <em>（我）</em>}</strong>
                    <span>{LANG_NAMES[row.targetLang] || '多语'} · 连续 {row.streak} 天</span>
                  </div>
                  <span className="rank-xp">{row.weeklyXp} XP</span>
                </div>
              ))}
            </div>
          </section>

          <section className="panel rules-panel">
            <h3>社区公约</h3>
            <ul>
              <li>分享真实的学习经历与方法，拒绝广告与灌水。</li>
              <li>尊重每一种语言与文化，保持友善交流。</li>
              <li>每周排行榜按最近 7 天获得的 XP 统计。</li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
