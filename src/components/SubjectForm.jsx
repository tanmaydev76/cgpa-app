import { useState, useEffect } from 'react'
import { GRADES, GRADE_POINTS } from '../utils/constants'

/**
 * SubjectForm — add or edit a subject.
 * Props:
 *   onSubmit(data)  — called with { name, credit, grade, semester }
 *   onCancel()      — called when user clicks Cancel
 *   initialData     — subject object when editing, null when adding
 */
export default function SubjectForm({ onSubmit, onCancel, initialData }) {
  const isEditing = !!initialData
  const [form, setForm] = useState({ name: '', credit: '', grade: 'A', semester: '1' })

  useEffect(() => {
    if (initialData) {
      setForm({
        name:     initialData.name,
        credit:   String(initialData.credit),
        grade:    initialData.grade,
        semester: String(initialData.semester),
      })
    }
  }, [initialData])

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.credit) return
    onSubmit({
      name:     form.name.trim(),
      credit:   parseFloat(form.credit),
      grade:    form.grade,
      semester: parseInt(form.semester),
    })
  }

  return (
    <div
      className="card"
      style={{ border: '1px solid rgba(99,102,241,0.25)', animation: 'fadeUp 0.3s ease forwards' }}
    >
      <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 15, marginBottom: 20 }}>
        {isEditing ? '✏️ Edit Subject' : '➕ Add New Subject'}
      </h3>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 12,
          }}
        >
          {/* Name – spans two columns */}
          <div style={{ gridColumn: 'span 2' }}>
            <label className="label">Subject Name</label>
            <input
              className="inp"
              type="text"
              placeholder="e.g. Data Structures"
              value={form.name}
              onChange={set('name')}
              required
            />
          </div>

          <div>
            <label className="label">Credits</label>
            <input
              className="inp"
              type="number"
              placeholder="e.g. 4"
              value={form.credit}
              onChange={set('credit')}
              min="0.5"
              max="6"
              step="0.5"
              required
            />
          </div>

          <div>
            <label className="label">Grade</label>
            <select className="inp" value={form.grade} onChange={set('grade')}>
              {GRADES.map(g => (
                <option key={g} value={g}>
                  {g} ({GRADE_POINTS[g]} pts)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Semester</label>
            <select className="inp" value={form.semester} onChange={set('semester')}>
              {Array.from({ length: 8 }, (_, i) => i + 1).map(s => (
                <option key={s} value={s}>
                  Sem {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grade point preview */}
        <div style={{ marginTop: 12, fontSize: 13, color: '#94a3b8' }}>
          Grade Points:&nbsp;
          <span style={{ color: '#818cf8', fontFamily: 'monospace', fontWeight: 700 }}>
            {form.credit || '?'} × {GRADE_POINTS[form.grade]} ={' '}
            {form.credit
              ? (parseFloat(form.credit) * GRADE_POINTS[form.grade]).toFixed(1)
              : '?'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button type="submit" className="btn-primary">
            {isEditing ? 'Save Changes' : 'Add Subject'}
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
