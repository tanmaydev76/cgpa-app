export default function Toast({ toasts }) {
  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span className="toast-icon" aria-hidden="true">
            {t.type === 'success' ? '✓' : '✕'}
          </span>
          {t.msg}
        </div>
      ))}
    </div>
  )
}
