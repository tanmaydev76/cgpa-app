import { getCGPAMeta, calcFinalCGPA } from '../utils/calculations'

/**
 * CGPACard — shows stats (CGPA, credits, points, subjects) plus
 * Previous CGPA / Previous Credits inputs and Final CGPA output.
 */
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

  const finalCGPA = calcFinalCGPA(
    parseFloat(prevCGPA) || 0,
    parseFloat(prevCredits) || 0,
    cgpa,
    totalCredits
  )
  const { color: fc } = getCGPAMeta(finalCGPA)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Stats row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: 12,
        }}
      >
        {/* Current CGPA */}
        <div className="stat-card" style={{ border: `1px solid ${color}33` }}>
          <p className="stat-label">Current CGPA</p>
          <p className="stat-val" style={{ color, fontSize: '2.4rem' }}>
            {cgpa > 0 ? cgpa.toFixed(2) : '–'}
          </p>
          <p style={{ fontSize: 11, color, fontWeight: 600 }}>{label}</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Total Credits</p>
          <p className="stat-val">{totalCredits}</p>
          <p style={{ fontSize: 11, color: '#64748b' }}>enrolled</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Grade Points</p>
          <p className="stat-val">{earnedPoints}</p>
          <p style={{ fontSize: 11, color: '#64748b' }}>pts × credits</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Subjects</p>
          <p className="stat-val">{subjectCount}</p>
          <p style={{ fontSize: 11, color: '#64748b' }}>added</p>
        </div>
      </div>

      {/* Previous CGPA / Final CGPA row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 12,
          alignItems: 'end',
        }}
      >
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

        <div className="stat-card" style={{ border: `1px solid ${fc}44`, padding: '12px 16px' }}>
          <p className="stat-label">Final CGPA</p>
          <p
            style={{
              fontSize: '1.8rem',
              fontWeight: 800,
              color: fc,
              fontFamily: "'Syne', sans-serif",
              lineHeight: 1,
            }}
          >
            {parseFloat(prevCGPA) || parseFloat(prevCredits) || cgpa > 0
              ? finalCGPA.toFixed(2)
              : '–'}
          </p>
          <p style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>combined</p>
        </div>
      </div>
    </div>
  )
}
