import { useEffect, useState } from 'react';
import { AppContext } from './appContext';
import { api, getToken, setToken } from './api';
import Landing from './components/Landing';
import Shell from './components/Shell';
import LessonPlayer from './pages/LessonPlayer';
import { X } from 'lucide-react';

export default function App() {
  const [booting, setBooting] = useState(true);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('home');
  const [lessonId, setLessonId] = useState(null);
  const [toast, setToast] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [authMode, setAuthMode] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const meta = await api.meta();
        if (!alive) return;
        if (getToken()) {
          const data = await api.me();
          if (alive) setUser(data.user);
        }
        window.__meta = meta;
      } catch {
        // ignore bootstrap errors
      } finally {
        if (alive) setBooting(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!refreshKey || !getToken()) return;
    api.me().then((data) => setUser(data.user)).catch(() => {});
  }, [refreshKey]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  function showToast(message, type = 'success') {
    setToast({ message, type, id: Date.now() });
  }

  function handleAuthed(data) {
    setToken(data.token);
    setUser(data.user);
    setAuthMode(null);
    setPage('home');
    setRefreshKey((key) => key + 1);
    showToast(`欢迎回来，${data.user.name}`);
  }

  function handleLogout() {
    setToken(null);
    setUser(null);
    setPage('home');
    setLessonId(null);
  }

  function startLesson(id) {
    setLessonId(id);
  }

  function finishLesson() {
    setLessonId(null);
    setRefreshKey((key) => key + 1);
  }

  if (booting) {
    return (
      <div className="boot-screen">
        <div className="boot-orb" />
        <p>正在进入 LinguaSphere…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Landing authMode={authMode} setAuthMode={setAuthMode} onAuthed={handleAuthed} onToast={showToast} />
        {toast && (
          <div className={`toast ${toast.type}`}>
            {toast.message}
            <button type="button" onClick={() => setToast(null)} aria-label="关闭提示">
              <X size={14} />
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <AppContext.Provider
      value={{ user, setUser, page, setPage, startLesson, refreshKey, refresh: () => setRefreshKey((key) => key + 1), showToast, logout: handleLogout }}
    >
      <Shell />
      {lessonId && (
        <LessonPlayer
          key={lessonId}
          lessonId={lessonId}
          onClose={finishLesson}
          onNavigate={(nextId) => { setLessonId(nextId); setRefreshKey((key) => key + 1); }}
        />
      )}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
          <button type="button" onClick={() => setToast(null)} aria-label="关闭提示">
            <X size={14} />
          </button>
        </div>
      )}
    </AppContext.Provider>
  );
}
