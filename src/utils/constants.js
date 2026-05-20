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
  O:    { background: 'rgba(6,78,59,0.4)',    color: '#6ee7b7', borderColor: 'rgba(6,95,70,0.5)'     },
  'A+': { background: 'rgba(67,56,202,0.3)',  color: '#a5b4fc', borderColor: 'rgba(99,102,241,0.5)'  },
  A:    { background: 'rgba(12,74,110,0.4)',  color: '#7dd3fc', borderColor: 'rgba(14,116,144,0.5)'  },
  'B+': { background: 'rgba(30,58,138,0.4)',  color: '#93c5fd', borderColor: 'rgba(59,130,246,0.4)'  },
  B:    { background: 'rgba(113,63,18,0.4)',  color: '#fde68a', borderColor: 'rgba(202,138,4,0.4)'   },
  C:    { background: 'rgba(154,52,18,0.4)',  color: '#fdba74', borderColor: 'rgba(234,88,12,0.4)'   },
  F:    { background: 'rgba(127,29,29,0.4)',  color: '#fca5a5', borderColor: 'rgba(220,38,38,0.4)'   },
}
