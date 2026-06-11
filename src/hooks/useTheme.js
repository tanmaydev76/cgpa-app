import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'cgpa-theme'
const TRANSITION_CLASS = 'theme-transitioning'
const TRANSITION_DURATION = 300 // ms — matches CSS transition

function getInitialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch (_) {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  // Keep <html data-theme> in sync whenever theme changes
  useEffect(() => {
    const root = document.documentElement

    // Add transition class so every property animates
    root.classList.add(TRANSITION_CLASS)
    root.setAttribute('data-theme', theme)

    try { localStorage.setItem(STORAGE_KEY, theme) } catch (_) {}

    const timer = setTimeout(() => root.classList.remove(TRANSITION_CLASS), TRANSITION_DURATION)
    return () => clearTimeout(timer)
  }, [theme])

  // Listen for OS-level preference changes (only when user hasn't manually chosen)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) {
          setTheme(e.matches ? 'dark' : 'light')
        }
      } catch (_) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggle = useCallback(() => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'))
  }, [])

  return { theme, toggle }
}
