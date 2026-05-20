import { useState } from 'react'
import Navbar       from './components/Navbar'
import SubjectForm  from './components/SubjectForm'
import SubjectTable from './components/SubjectTable'
import CGPACard     from './components/CGPACard'
import Toast        from './components/Toast'
import { calcStats, uid } from './utils/calculations'
import { useToast } from './hooks/useToast'

export default function App() {
  const [subjects,    setSubjects]    = useState([])
  const [showForm,    setShowForm]    = useState(false)
  const [editing,     setEditing]     = useState(null)
  const [prevCGPA,    setPrevCGPA]    = useState('')
  const [prevCredits, setPrevCredits] = useState('')
  const { toasts, toast }             = useToast()

  /* ── Handlers ── */
  const handleSubmit = (data) => {
    if (editing) {
      setSubjects(s => s.map(x => (x.id === editing.id ? { ...data, id: x.id } : x)))
      toast('Subject updated!')
      setEditing(null)
    } else {
      setSubjects(s => [{ ...data, id: uid() }, ...s])
      toast('Subject added!')
    }
    setShowForm(false)
  }

  const handleEdit = (s) => {
    setEditing(s)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id) => {
    if (!confirm('Delete this subject?')) return
    setSubjects(s => s.filter(x => x.id !== id))
    toast('Subject deleted.', 'error')
  }

  const stats = calcStats(subjects)

  /* ── Render ── */
  return (
    <>
      <Navbar />

      <main
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '28px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 22,
                color: '#f1f5f9',
              }}
            >
              My Subjects
            </h2>
            <p style={{ color: '#64748b', fontSize: 13, marginTop: 2 }}>
              Track courses and calculate CGPA in real time
            </p>
          </div>

          {!showForm && (
            <button
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              onClick={() => { setEditing(null); setShowForm(true) }}
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Add Subject
            </button>
          )}
        </div>

        {/* Stats + Previous / Final CGPA */}
        <CGPACard
          {...stats}
          subjectCount={subjects.length}
          prevCGPA={prevCGPA}
          setPrevCGPA={setPrevCGPA}
          prevCredits={prevCredits}
          setPrevCredits={setPrevCredits}
        />

        {/* Add / Edit form */}
        {showForm && (
          <SubjectForm
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditing(null) }}
            initialData={editing}
          />
        )}

        {/* Subject list grouped by semester */}
        <SubjectTable subjects={subjects} onEdit={handleEdit} onDelete={handleDelete} />
      </main>

      <Toast toasts={toasts} />
    </>
  )
}
