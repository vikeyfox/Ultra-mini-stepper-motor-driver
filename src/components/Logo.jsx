export default function Logo({ compact = false }) {
  return (
    <div className={`logo ${compact ? 'compact' : ''}`}>
      <svg viewBox="0 0 48 48" width="38" height="38" aria-hidden="true">
        <defs>
          <linearGradient id="logoGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#5b9dff" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="19" fill="none" stroke="url(#logoGrad)" strokeWidth="2" />
        <ellipse cx="24" cy="24" rx="9" ry="19" fill="none" stroke="url(#logoGrad)" strokeWidth="1.4" opacity=".7" />
        <ellipse cx="24" cy="24" rx="19" ry="7" fill="none" stroke="url(#logoGrad)" strokeWidth="1.4" opacity=".5" transform="rotate(24 24 24)" />
        <circle cx="38" cy="15" r="3.2" fill="#8ab4ff" />
        <circle cx="12" cy="33" r="2.2" fill="#c4b5fd" />
      </svg>
      {!compact && (
        <div className="logo-text">
          <strong>LinguaSphere</strong>
          <span>灵语 · 沉浸式语言学堂</span>
        </div>
      )}
    </div>
  );
}
