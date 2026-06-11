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
  // Colors reference CSS variables so they adapt to both light and dark themes.
  if (cgpa >= 9) return { color: 'var(--cgpa-outstanding)',  label: 'Outstanding'  }
  if (cgpa >= 8) return { color: 'var(--cgpa-excellent)',    label: 'Excellent'    }
  if (cgpa >= 7) return { color: 'var(--cgpa-verygood)',     label: 'Very Good'    }
  if (cgpa >= 6) return { color: 'var(--cgpa-good)',         label: 'Good'         }
  if (cgpa > 0)  return { color: 'var(--cgpa-satisfactory)', label: 'Satisfactory' }
  return               { color: 'var(--cgpa-nodata)',        label: 'No data yet'  }
}

/** Simple incrementing UID */
let _id = 1
export const uid = () => String(_id++)
