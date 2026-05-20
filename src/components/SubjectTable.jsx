import { GRADE_POINTS, GRADE_STYLES } from '../utils/constants'

/**
 * SubjectTable — renders subjects grouped by semester with per-semester SGPA.
 * Props:
 *   subjects  — array of subject objects
 *   onEdit(s) — called when Edit is clicked
 *   onDelete(id) — called when Delete is clicked
 */
export default function SubjectTable({ subjects, onEdit, onDelete }) {
  if (!subjects.length) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>📚</div>
        <p style={{ color: '#cbd5e1', fontWeight: 700, fontSize: 15 }}>No subjects yet</p>
        <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>
          Add your first subject to start tracking your CGPA
        </p>
      </div>
    )
  }

  /* Group by semester */
  const bySem = subjects.reduce((acc, s) => {
    const k = s.semester || 1
    if (!acc[k]) acc[k] = []
    acc[k].push(s)
    return acc
  }, {})

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {Object.entries(bySem)
        .sort(([a], [b]) => +a - +b)
        .map(([sem, subs]) => {
          const cr   = subs.reduce((s, x) => s + x.credit, 0)
          const pts  = subs.reduce((s, x) => s + x.credit * (GRADE_POINTS[x.grade] ?? 0), 0)
          const sgpa = cr > 0 ? (pts / cr).toFixed(2) : '–'

          return (
            <div key={sem} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Semester header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 20px',
                  borderBottom: '1px solid rgba(51,65,85,0.6)',
                  background: 'rgba(30,41,59,0.5)',
                }}
              >
                <span style={{ color: '#cbd5e1', fontWeight: 700, fontSize: 13 }}>
                  Semester {sem}
                </span>
                <span style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>
                  SGPA:{' '}
                  <span style={{ color: '#818cf8', fontWeight: 700 }}>{sgpa}</span>
                  {' · '}
                  {cr} credits
                </span>
              </div>

              {/* Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr
                    style={{
                      color: '#64748b',
                      fontSize: 11,
                      textTransform: 'uppercase',
                      letterSpacing: '.05em',
                      borderBottom: '1px solid rgba(51,65,85,0.5)',
                    }}
                  >
                    <th style={{ padding: '8px 20px', textAlign: 'left',   fontWeight: 500 }}>Subject</th>
                    <th style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 500 }}>Credits</th>
                    <th style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 500 }}>Grade</th>
                    <th style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 500 }}>Pts × Cr</th>
                    <th style={{ padding: '8px 20px', textAlign: 'right',  fontWeight: 500 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subs.map(s => (
                    <tr
                      key={s.id}
                      style={{ borderBottom: '1px solid rgba(15,23,42,0.6)' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(30,41,59,0.5)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '10px 20px', color: '#e2e8f0', fontWeight: 600 }}>
                        {s.name}
                      </td>
                      <td
                        style={{
                          padding: '10px 12px',
                          textAlign: 'center',
                          fontFamily: 'monospace',
                          color: '#cbd5e1',
                        }}
                      >
                        {s.credit}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            fontSize: 11,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            border: '1px solid',
                            ...(GRADE_STYLES[s.grade] || {}),
                          }}
                        >
                          {s.grade}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: '10px 12px',
                          textAlign: 'center',
                          fontFamily: 'monospace',
                          color: '#94a3b8',
                          fontSize: 12,
                        }}
                      >
                        {s.credit} × {GRADE_POINTS[s.grade]} ={' '}
                        <span style={{ color: '#cbd5e1', fontWeight: 600 }}>
                          {(s.credit * (GRADE_POINTS[s.grade] ?? 0)).toFixed(1)}
                        </span>
                      </td>
                      <td style={{ padding: '10px 20px', textAlign: 'right' }}>
                        <button
                          onClick={() => onEdit(s)}
                          style={actionBtn('#818cf8', 'rgba(79,70,229,0.15)')}
                        >
                          Edit
                        </button>{' '}
                        <button
                          onClick={() => onDelete(s.id)}
                          style={actionBtn('#f87171', 'rgba(127,29,29,0.3)')}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        })}
    </div>
  )
}

function actionBtn(color, bg) {
  return {
    fontSize: 12,
    color,
    background: bg,
    border: 'none',
    borderRadius: 6,
    padding: '3px 10px',
    cursor: 'pointer',
    fontWeight: 500,
  }
}
