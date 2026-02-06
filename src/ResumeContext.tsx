import { createContext } from 'react'

export type ResumeSectionId = 'experience' | 'skills' | 'education' | 'projects'

export type ResumeContextValue = {
  resumeOpen: boolean
  setResumeOpen: (open: boolean) => void
  scrollToSection: ResumeSectionId | null
  setScrollToSection: (id: ResumeSectionId | null) => void
  openResumeTo: (section: ResumeSectionId) => void
}

export const ResumeContext = createContext<ResumeContextValue | null>(null)
