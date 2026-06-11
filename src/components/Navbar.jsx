/* Sun and Moon icons are inline SVG — no icon-library dep needed. */

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2"  x2="12" y2="5"  />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22"  x2="6.34" y2="6.34"  />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2"  y1="12" x2="5"  y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <a href="/" className="navbar-logo" aria-label="CGPA Calc home">
          <div className="navbar-logo-icon" aria-hidden="true">🎓</div>
          <span className="navbar-logo-text">CGPA Calc</span>
        </a>

        {/* Right controls */}
        <div className="navbar-right">
          {/* Live badge */}
          <span className="navbar-badge">
            <span className="navbar-badge-dot" aria-hidden="true" />
            <span className="navbar-badge-text">No login required</span>
          </span>

          {/* Theme toggle */}
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  )
}
