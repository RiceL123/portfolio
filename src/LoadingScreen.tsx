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
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center gap-6"
      style={{
        transition: `opacity ${FADE_OUT_MS}ms ease-out`,
        opacity: fading ? 0 : 1,
      }}
    >
      <span className="text-sm text-white/70 font-sans tracking-wide">
        Loading…
      </span>
      <div className="w-[180px] h-0.5 bg-white/10 rounded-sm overflow-hidden">
        <div
          className="h-full bg-white/60 rounded-sm transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs text-white/35 font-sans tracking-wide mt-1">
        Eric L's portfolio
      </span>
    </div>
  )
}
