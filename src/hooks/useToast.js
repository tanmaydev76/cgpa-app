import { useState } from 'react'
import { uid } from '../utils/calculations'

/**
 * useToast — manages a list of toast notifications.
 * Returns { toasts, toast } where toast(msg, type) adds a new one.
 */
export function useToast() {
  const [toasts, setToasts] = useState([])

  const toast = (msg, type = 'success') => {
    const id = uid()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2800)
  }

  return { toasts, toast }
}
