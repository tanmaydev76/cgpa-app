export const GRADES = ['O', 'A+', 'A', 'B+', 'B', 'C', 'F']

export const GRADE_POINTS = {
  O: 10,
  'A+': 9,
  A: 8,
  'B+': 7,
  B: 6,
  C: 5,
  F: 0,
}

export const GRADE_COLORS = {
  O:    'bg-emerald-900/40 text-emerald-300 border-emerald-700/50',
  'A+': 'bg-indigo-900/40  text-indigo-300  border-indigo-700/50',
  A:    'bg-sky-900/40     text-sky-300     border-sky-700/50',
  'B+': 'bg-blue-900/40    text-blue-300    border-blue-700/50',
  B:    'bg-yellow-900/40  text-yellow-300  border-yellow-700/50',
  C:    'bg-orange-900/40  text-orange-300  border-orange-700/50',
  F:    'bg-red-900/40     text-red-300     border-red-700/50',
}

export const GRADE_STYLES = {
  O:    { background: 'var(--grade-O-bg)',     color: 'var(--grade-O-fg)'     },
  'A+': { background: 'var(--grade-Aplus-bg)', color: 'var(--grade-Aplus-fg)' },
  A:    { background: 'var(--grade-A-bg)',     color: 'var(--grade-A-fg)'     },
  'B+': { background: 'var(--grade-Bplus-bg)', color: 'var(--grade-Bplus-fg)' },
  B:    { background: 'var(--grade-B-bg)',     color: 'var(--grade-B-fg)'     },
  C:    { background: 'var(--grade-C-bg)',     color: 'var(--grade-C-fg)'     },
  F:    { background: 'var(--grade-F-bg)',     color: 'var(--grade-F-fg)'     },
}
