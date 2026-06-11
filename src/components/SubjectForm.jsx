import { useState, useEffect } from 'react'
import { GRADES, GRADE_POINTS } from '../utils/constants'

export default function SubjectForm({ onSubmit, onCancel, initialData }) {
  const isEditing = !!initialData
  const [form, setForm] = useState({ name: '', credit: '', grade: 'A', semester: '1' })
  const [error, setError] = useState('')

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

  const set = (key) => (e) => {
    setForm(f => ({ ...f, [key]: e.target.value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) { setError('Subject name is required.'); return }
    if (!form.credit || parseFloat(form.credit) <= 0) { setError('Enter a valid credit value.'); return }
    onSubmit({
      name:     form.name.trim(),
      credit:   parseFloat(form.credit),
      grade:    form.grade,
      semester: parseInt(form.semester),
    })
  }

  const pts   = GRADE_POINTS[form.grade]
  const cr    = parseFloat(form.credit)
  const total = !isNaN(cr) && cr > 0 ? (cr * pts).toFixed(1) : null

  return (
    <div className="form-card">
      <p className="form-title">
        <span style={{ fontSize: 18 }}>{isEditing ? '✏️' : '➕'}</span>
        {isEditing ? 'Edit Subject' : 'Add New Subject'}
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          {/* Name */}
          <div className="form-name" style={{ gridColumn: '1 / -1' }}>
            <label className="label">Subject Name</label>
            <input
              className="inp"
              type="text"
              placeholder="e.g. Data Structures"
              value={form.name}
              onChange={set('name')}
              autoFocus={!isEditing}
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
            />
          </div>

          <div>
            <label className="label">Grade</label>
            <select className="inp" value={form.grade} onChange={set('grade')}>
              {GRADES.map(g => (
                <option key={g} value={g}>{g} ({GRADE_POINTS[g]} pts)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Semester</label>
            <select className="inp" value={form.semester} onChange={set('semester')}>
              {Array.from({ length: 8 }, (_, i) => i + 1).map(s => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grade point preview */}
        {total && (
          <div className="grade-preview">
            <span>Grade points earned</span>
            <span className="grade-preview-val">
              {cr} cr × {pts} pts = {total}
            </span>
          </div>
        )}

        {/* Validation error */}
        {error && (
          <p style={{ marginTop: 10, fontSize: 12, color: '#f87171', fontWeight: 500 }}>
            ⚠ {error}
          </p>
        )}

        <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
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
