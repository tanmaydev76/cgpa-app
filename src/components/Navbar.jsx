export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a href="/" className="navbar-logo" aria-label="CGPA Calc">
          <div className="navbar-logo-icon" aria-hidden="true">🎓</div>
          <span className="navbar-logo-text">CGPA Calc</span>
        </a>

        <div className="navbar-right">
          <span className="navbar-badge">
            <span className="navbar-badge-dot" aria-hidden="true" />
            <span className="navbar-badge-text">No login required</span>
          </span>
        </div>
      </div>
    </nav>
  )
}
