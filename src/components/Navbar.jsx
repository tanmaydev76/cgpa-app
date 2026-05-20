/**
 * Navbar — sticky top bar with logo and "no login" badge.
 */
export default function Navbar() {
  return (
    <nav
      style={{
        borderBottom: '1px solid rgba(51,65,85,0.5)',
        background: 'rgba(2,6,23,0.85)',
        backdropFilter: 'blur(16px)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>🎓</span>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 18,
              color: '#f1f5f9',
            }}
          >
            CGPA Calc
          </span>
        </div>
        <span style={{ fontSize: 12, color: '#475569' }}>No login required</span>
      </div>
    </nav>
  )
}
