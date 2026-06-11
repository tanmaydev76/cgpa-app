import { GRADE_POINTS, GRADE_STYLES } from '../utils/constants'

export default function SubjectTable({ subjects, onEdit, onDelete }) {
  if (!subjects.length) {
    return (
      <div className="empty-state">
        <span className="empty-icon">📚</span>
        <p className="empty-title">No subjects yet</p>
        <p className="empty-sub">Add your first subject above to start tracking your CGPA</p>
      </div>
    )
  }

  const bySem = subjects.reduce((acc, s) => {
    const k = s.semester || 1
    if (!acc[k]) acc[k] = []
    acc[k].push(s)
    return acc
  }, {})

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {Object.entries(bySem)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([sem, subs]) => {
          const cr   = subs.reduce((s, x) => s + x.credit, 0)
          const pts  = subs.reduce((s, x) => s + x.credit * (GRADE_POINTS[x.grade] ?? 0), 0)
          const sgpa = cr > 0 ? (pts / cr).toFixed(2) : '—'

          return (
            <div key={sem} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Semester header */}
              <div className="sem-header">
                <span className="sem-title">Semester {sem}</span>
                <span className="sem-meta">
                  SGPA <span className="sem-sgpa">{sgpa}</span>
                  &ensp;·&ensp;{cr} credits
                </span>
              </div>

              {/* Table */}
              <div className="table-scroll">
                <table className="subject-table">
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left' }}>Subject</th>
                      <th style={{ textAlign: 'center' }}>Credits</th>
                      <th style={{ textAlign: 'center' }}>Grade</th>
                      <th className="col-pts" style={{ textAlign: 'center' }}>Pts × Cr</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subs.map(s => (
                      <tr key={s.id}>
                        <td>
                          <span className="subject-name">{s.name}</span>
                        </td>
                        <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                          {s.credit}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span
                            className="grade-badge"
                            style={GRADE_STYLES[s.grade] || {}}
                          >
                            {s.grade}
                          </span>
                        </td>
                        <td className="col-pts" style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: 12 }}>
                          {s.credit} × {GRADE_POINTS[s.grade]} ={' '}
                          <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                            {(s.credit * (GRADE_POINTS[s.grade] ?? 0)).toFixed(1)}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            className="action-btn action-btn-edit"
                            onClick={() => onEdit(s)}
                            aria-label={`Edit ${s.name}`}
                          >
                            Edit
                          </button>{' '}
                          <button
                            className="action-btn action-btn-delete"
                            onClick={() => onDelete(s.id)}
                            aria-label={`Delete ${s.name}`}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
    </div>
  )
}
