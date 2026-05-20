import { GRADE_POINTS } from './constants'

/**
 * Calculate CGPA stats from a list of subjects.
 */
export function calcStats(subjects) {
  if (!subjects.length) return { cgpa: 0, totalCredits: 0, earnedPoints: 0 }
  const totalCredits = subjects.reduce((s, x) => s + x.credit, 0)
  const weightedSum  = subjects.reduce((s, x) => s + x.credit * (GRADE_POINTS[x.grade] ?? 0), 0)
  const cgpa = totalCredits > 0 ? weightedSum / totalCredits : 0
  return { cgpa, totalCredits, earnedPoints: weightedSum }
}

/**
 * Combine previous record with current semester for a final CGPA.
 */
export function calcFinalCGPA(prevCGPA, prevCredits, newCGPA, newCredits) {
  const totalCr = prevCredits + newCredits
  if (totalCr === 0) return 0
  return (prevCGPA * prevCredits + newCGPA * newCredits) / totalCr
}

/**
 * Return colour + label based on CGPA value.
 */
export function getCGPAMeta(cgpa) {
  if (cgpa >= 9) return { color: '#34d399', label: 'Outstanding'  }
  if (cgpa >= 8) return { color: '#818cf8', label: 'Excellent'    }
  if (cgpa >= 7) return { color: '#38bdf8', label: 'Very Good'    }
  if (cgpa >= 6) return { color: '#facc15', label: 'Good'         }
  if (cgpa > 0)  return { color: '#fb923c', label: 'Satisfactory' }
  return               { color: '#64748b', label: 'No data yet'   }
}

/** Simple incrementing UID */
let _id = 1
export const uid = () => String(_id++)
