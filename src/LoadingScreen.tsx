import { useState, useEffect, useRef } from 'react'

const MIN_SHOW_MS = 1800
const FADE_OUT_MS = 500
const HIDE_AFTER_FADE_MS = 400

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)
  const rafRef = useRef<number | null>(null)
  const mountedAtRef = useRef(Date.now())

  useEffect(() => {
    const setFromReadyState = () => {
      const { readyState } = document
      if (readyState === 'complete') {
        setProgress(100)
      } else if (readyState === 'interactive') {
        setProgress((p) => Math.max(p, 65))
      }
    }

    const onLoad = () => {
      setProgress(100)
    }

    setFromReadyState()
    document.addEventListener('readystatechange', setFromReadyState)
    window.addEventListener('load', onLoad)

    const tick = () => {
      setProgress((p) => {
        if (p >= 100) return 100
        if (document.readyState === 'complete') return Math.min(p + 3, 100)
        if (document.readyState === 'interactive') return Math.min(p + 1.5, 95)
        return Math.min(p + 0.6, 50)
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('readystatechange', setFromReadyState)
      window.removeEventListener('load', onLoad)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    if (progress < 100) return
    const elapsed = Date.now() - mountedAtRef.current
    const wait = Math.max(0, MIN_SHOW_MS - elapsed)
    const t1 = setTimeout(() => {
      setFading(true)
    }, wait)
    const t2 = setTimeout(() => setVisible(false), wait + FADE_OUT_MS + HIDE_AFTER_FADE_MS)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [progress])

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
        transition: `opacity ${FADE_OUT_MS}ms ease-out`,
        opacity: fading ? 0 : 1,
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
            width: `${progress}%`,
            background: 'rgba(255,255,255,0.6)',
            borderRadius: 2,
            transition: 'width 0.12s ease-out',
          }}
        />
      </div>
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'system-ui, sans-serif', letterSpacing: '0.02em', marginTop: 4 }}>
        Eric L's portfolio
      </span>
    </div>
  )
}
