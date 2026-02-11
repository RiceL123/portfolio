import { createContext, useState, useEffect, type ReactNode } from 'react'

export const PerformanceContext = createContext<{ isMobile: boolean }>({ isMobile: false })

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const set = () => setIsMobile(mq.matches)
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])
  return (
    <PerformanceContext.Provider value={{ isMobile }}>
      {children}
    </PerformanceContext.Provider>
  )
}
