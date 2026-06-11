import { useState } from 'react'
import Navbar       from './components/Navbar'
import SubjectForm  from './components/SubjectForm'
import SubjectTable from './components/SubjectTable'
import CGPACard     from './components/CGPACard'
import Toast        from './components/Toast'
import { calcStats, uid } from './utils/calculations'
import { useToast } from './hooks/useToast'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const [subjects,    setSubjects]    = useState([])
  const [showForm,    setShowForm]    = useState(false)
  const [editing,     setEditing]     = useState(null)
  const [prevCGPA,    setPrevCGPA]    = useState('')
  const [prevCredits, setPrevCredits] = useState('')
  const { toasts, toast }             = useToast()
  const { theme, toggle: toggleTheme } = useTheme()

  const handleSubmit = (data) => {
    if (editing) {
      setSubjects(s => s.map(x => x.id === editing.id ? { ...data, id: x.id } : x))
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

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main className="page-main">
        {/* Header */}
        <div className="page-header">
          <div className="page-header-text">
            <h2>My Subjects</h2>
            <p>Track courses and calculate your CGPA in real time</p>
          </div>
          {!showForm && (
            <button
              className="btn-primary"
              onClick={() => { setEditing(null); setShowForm(true) }}
            >
              <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
              Add Subject
            </button>
          )}
        </div>

        {/* Stats */}
        <CGPACard
          {...stats}
          subjectCount={subjects.length}
          prevCGPA={prevCGPA}
          setPrevCGPA={setPrevCGPA}
          prevCredits={prevCredits}
          setPrevCredits={setPrevCredits}
        />

        {/* Form */}
        {showForm && (
          <SubjectForm
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditing(null) }}
            initialData={editing}
          />
        )}

        {/* Table */}
        <SubjectTable subjects={subjects} onEdit={handleEdit} onDelete={handleDelete} />
      </main>

      <Toast toasts={toasts} />
    </>
  )
}
