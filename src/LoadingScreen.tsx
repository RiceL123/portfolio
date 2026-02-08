import { useState, useEffect } from 'react'

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const hide = () => setVisible(false)
    const onLoad = () => {
      window.removeEventListener('load', onLoad)
      hide()
    }
    window.addEventListener('load', onLoad)
    const fallback = setTimeout(hide, 5000)
    return () => {
      window.removeEventListener('load', onLoad)
      clearTimeout(fallback)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        transition: 'opacity 0.3s ease',
      }}
    >
      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'system-ui, sans-serif', letterSpacing: '0.02em' }}>
        Loading…
      </span>
      <div
        style={{
          width: 180,
          height: 3,
          background: 'rgba(255,255,255,0.12)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: 0,
            background: 'rgba(255,255,255,0.6)',
            borderRadius: 2,
            animation: 'loadingFillUp 2s ease-out infinite',
          }}
        />
      </div>
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'system-ui, sans-serif', letterSpacing: '0.02em', marginTop: 4 }}>
        Eric L's portfolio — clean and minimalist
      </span>
      <style>{`
        @keyframes loadingFillUp {
          0% { width: 0; }
          70% { width: 100%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}
