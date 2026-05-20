/**
 * Toast — fixed bottom-right notification stack.
 * Props: toasts → [{ id, msg, type }]
 */
export default function Toast({ toasts }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {toasts.map(t => (
        <div
          key={t.id}
          style={{
            background: t.type === 'success' ? '#166534' : '#7f1d1d',
            border: `1px solid ${t.type === 'success' ? '#16a34a' : '#dc2626'}`,
            color: '#f1f5f9',
            padding: '10px 16px',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 500,
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            animation: 'slideIn 0.25s ease',
          }}
        >
          {t.msg}
        </div>
      ))}
    </div>
  )
}
