import { getCGPAMeta, calcFinalCGPA } from '../utils/calculations'

export default function CGPACard({
  cgpa,
  totalCredits,
  earnedPoints,
  subjectCount,
  prevCGPA,
  prevCredits,
  setPrevCGPA,
  setPrevCredits,
}) {
  const { color, label } = getCGPAMeta(cgpa)

  const pCGPA = parseFloat(prevCGPA) || 0
  const pCr   = parseFloat(prevCredits) || 0
  const finalCGPA = calcFinalCGPA(pCGPA, pCr, cgpa, totalCredits)
  const { color: fc } = getCGPAMeta(finalCGPA)
  const showFinal = cgpa > 0 || (pCGPA > 0 && pCr > 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* ── Stat cards ── */}
      <div className="stats-grid">
        {/* CGPA */}
        <div className="stat-card" style={{ borderColor: `${color}28` }}>
          <p className="stat-label">Current CGPA</p>
          <p className="stat-val" style={{ color, fontSize: '2.2rem' }}>
            {cgpa > 0 ? cgpa.toFixed(2) : '—'}
          </p>
          <p className="stat-sub" style={{ color, opacity: 0.9, fontWeight: 600 }}>{label}</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Total Credits</p>
          <p className="stat-val">{totalCredits || '—'}</p>
          <p className="stat-sub">enrolled</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Grade Points</p>
          <p className="stat-val">{earnedPoints || '—'}</p>
          <p className="stat-sub">weighted sum</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Subjects</p>
          <p className="stat-val">{subjectCount || '—'}</p>
          <p className="stat-sub">added</p>
        </div>
      </div>

      {/* ── Previous CGPA section ── */}
      <div
        className="card"
        style={{ padding: '18px 20px' }}
      >
        <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 14 }}>
          Cumulative CGPA (combine with previous semesters)
        </p>
        <div className="prev-cgpa-row">
          <div>
            <label className="label">Previous CGPA</label>
            <input
              className="inp"
              type="number"
              placeholder="e.g. 8.50"
              value={prevCGPA}
              onChange={e => setPrevCGPA(e.target.value)}
              min="0"
              max="10"
              step="0.01"
            />
          </div>

          <div>
            <label className="label">Previous Credits</label>
            <input
              className="inp"
              type="number"
              placeholder="e.g. 60"
              value={prevCredits}
              onChange={e => setPrevCredits(e.target.value)}
              min="0"
              step="1"
            />
          </div>

          <div className="stat-card final-cgpa-card" style={{ borderColor: `${fc}30`, padding: '14px 16px' }}>
            <p className="stat-label">Final CGPA</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 800, color: fc, letterSpacing: '-0.03em', lineHeight: 1 }}>
              {showFinal ? finalCGPA.toFixed(2) : '—'}
            </p>
            <p className="stat-sub">combined</p>
          </div>
        </div>
      </div>

    </div>
  )
}
