import { useApp } from '../appContext';
import Logo from './Logo';
import Dashboard from '../pages/Dashboard';
import Courses from '../pages/Courses';
import LearningPath from '../pages/LearningPath';
import Community from '../pages/Community';
import Achievements from '../pages/Achievements';
import { Flame, LayoutDashboard, LibraryBig, LogOut, MessagesSquare, Route, Trophy, Zap } from 'lucide-react';

const NAV = [
  { key: 'home', label: '学习首页', icon: LayoutDashboard },
  { key: 'courses', label: '课程中心', icon: LibraryBig },
  { key: 'path', label: '学习路径', icon: Route },
  { key: 'community', label: '社区广场', icon: MessagesSquare },
  { key: 'achievements', label: '成就殿堂', icon: Trophy }
];

export default function Shell() {
  const { user, page, setPage, logout } = useApp();
  const stats = user?.stats || {};
  const level = user?.levelInfo || { level: 1, name: '语言新手', percent: 0, totalXp: 0, nextAt: 120 };

  const pageView = {
    home: <Dashboard />,
    courses: <Courses />,
    path: <LearningPath />,
    community: <Community />,
    achievements: <Achievements />
  }[page] || <Dashboard />;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-top">
          <Logo />
        </div>

        <nav className="side-nav">
          {NAV.map((item) => (
            <button
              type="button"
              key={item.key}
              className={page === item.key ? 'active' : ''}
              onClick={() => setPage(item.key)}
            >
              <item.icon size={19} />
              <span>{item.label}</span>
              {page === item.key && <i className="nav-dot" />}
            </button>
          ))}
        </nav>

        <div className="side-level">
          <div className="side-level-head">
            <span>Lv.{level.level} {level.name}</span>
            <strong>{level.totalXp} XP</strong>
          </div>
          <div className="progress-track sm"><i style={{ width: `${level.percent}%` }} /></div>
          <p>{level.nextAt ? `距离 ${level.nextName} 还需 ${level.nextAt - level.totalXp} XP` : '已达到最高等级'}</p>
        </div>

        <div className="side-user">
          <div className="avatar">{user.name?.slice(0, 1)}</div>
          <div className="side-user-info">
            <strong>{user.name}</strong>
            <span>今日 {stats.todayXp || 0} XP · 连续 {stats.streak || 0} 天</span>
          </div>
          <button type="button" className="icon-btn" onClick={logout} title="退出登录" aria-label="退出登录">
            <LogOut size={17} />
          </button>
        </div>
      </aside>

      <div className="main-area">
        <header className="mobile-topbar">
          <Logo compact />
          <div className="topbar-pills">
            <span className="pill"><Flame size={14} /> {stats.streak || 0}</span>
            <span className="pill"><Zap size={14} /> {stats.totalXp || 0}</span>
            <div className="avatar sm">{user.name?.slice(0, 1)}</div>
          </div>
        </header>

        <main className="page-container" key={page}>
          {pageView}
        </main>
      </div>

      <nav className="bottom-nav">
        {NAV.map((item) => (
          <button
            type="button"
            key={item.key}
            className={page === item.key ? 'active' : ''}
            onClick={() => setPage(item.key)}
          >
            <item.icon size={20} />
            <span>{item.label.replace('学习', '').replace('广场', '').replace('殿堂', '')}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
