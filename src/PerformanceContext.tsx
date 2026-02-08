import { createContext, useState, useEffect, type ReactNode } from 'react'

export type PerformanceContextValue = { isMobile: boolean }

export const PerformanceContext = createContext<PerformanceContextValue>({ isMobile: false })

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const check = () => setIsMobile(mq.matches || 'ontouchstart' in window)
    check()
    mq.addEventListener('change', check)
    return () => mq.removeEventListener('change', check)
  }, [])
  return (
    <PerformanceContext.Provider value={{ isMobile }}>
      {children}
    </PerformanceContext.Provider>
  )
}
