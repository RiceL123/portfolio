import { useEffect, useRef, useContext } from 'react'
import { ResumeContext } from './ResumeContext'

const sectionStyles = {
  marginBottom: 28,
  padding: '16px 0',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
}
const headingStyles = {
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: 'rgba(255,255,255,0.5)',
  marginBottom: 12,
}
const bodyStyles = {
  fontSize: 14,
  lineHeight: 1.65,
  color: 'rgba(255,255,255,0.85)',
}
const jobTitleStyles = { fontWeight: 600, color: 'rgba(255,255,255,0.95)' }
const metaStyles = { fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }
const listItemStyles = { marginBottom: 6, paddingLeft: 4 }
const listStyles = { marginTop: 6, marginBottom: 0, paddingLeft: 20, listStyleType: 'disc' as const }
const projectSubheadingStyles = { fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4, marginBottom: 0 }
const linkStyles = { color: 'rgba(255,255,255,0.85)', textDecoration: 'underline' }

export function ResumeOverlay({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const resume = useContext(ResumeContext)

  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!resume?.scrollToSection || !containerRef.current || !scrollRef.current) return
    const el = containerRef.current.querySelector(`#${resume.scrollToSection}`) as HTMLElement | null
    if (el) {
      const container = scrollRef.current
      const elTop = el.offsetTop
      const maxScroll = container.scrollHeight - container.clientHeight
      const targetScroll = Math.min(Math.max(0, elTop - 24), maxScroll)
      container.scrollTo({ top: targetScroll, behavior: 'smooth' })
      resume.setScrollToSection(null)
    }
  }, [resume?.scrollToSection, resume?.setScrollToSection])

  return (
    <div
      ref={containerRef}
      data-resume-overlay
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        bottom: 20,
        width: '45%',
        minWidth: 320,
        maxWidth: 520,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.04) 100%)',
        backdropFilter: 'blur(28px) saturate(160%)',
        WebkitBackdropFilter: 'blur(28px) saturate(160%)',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: 16,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.25)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0,
          background: 'rgba(255,255,255,0.03)',
        }}
      >
        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'rgba(255,255,255,0.95)' }}>Eric Liao</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Resume</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: 'none',
            borderRadius: 8,
            width: 36,
            height: 36,
            color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            fontSize: '1.25rem',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ×
        </button>
      </header>
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflow: 'auto',
          padding: 24,
          paddingBottom: 120,
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <p style={{ ...bodyStyles, marginBottom: 20, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
          <a href="https://linkedin.com/in/-eric-liao" target="_blank" rel="noreferrer" style={linkStyles}>LinkedIn</a>
          {' · '}
          <a href="https://github.com/ricel123" target="_blank" rel="noreferrer" style={linkStyles}>GitHub</a>
        </p>
        <section id="experience" style={sectionStyles}>
          <h2 style={headingStyles}>Experience</h2>
          <div style={{ marginBottom: 20 }}>
            <div style={jobTitleStyles}>Intern — Frontend Infrastructure</div>
            <div style={metaStyles}>Freelancer.com · Sydney, NSW · Present</div>
            <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20, listStyleType: 'disc' }}>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Building and maintaining Angular frontend infrastructure and shared tooling</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Configuring and maintaining Jenkins CI/CD pipelines for frontend builds and deployments</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Contributing to an in-house Angular component library used across products</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Leading migrations from Angular 18 to Angular 19 across the codebase</li>
            </ul>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={jobTitleStyles}>Software Developer — AI Trainer</div>
            <div style={metaStyles}>DataAnnotation · Remote · Feb 2024 — Present</div>
            <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20, listStyleType: 'disc' }}>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Fine-tuning LLMs: testing, correcting and improving output for accuracy and performance</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Reviewed and corrected 500+ AI-generated code responses in React, JavaScript/TypeScript, Python, Java, Go, Rust, and SQL</li>
            </ul>
          </div>
          <div>
            <div style={jobTitleStyles}>Assistant Manager</div>
            <div style={metaStyles}>All Luggage Solutions · Brisbane, QLD · Feb 2020 — Jan 2022</div>
            <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20, listStyleType: 'disc' }}>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Automated manual entry of customer shipping information with JavaScript, reducing packaging times by 25%</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Increased product visibility on Amazon/eBay by optimizing listings for SEO</li>
            </ul>
          </div>
        </section>
        <section id="education" style={sectionStyles}>
          <h2 style={headingStyles}>Education</h2>
          <div style={jobTitleStyles}>University of New South Wales</div>
          <div style={metaStyles}>Sydney, NSW · Bachelor of Computer Science · WAM 80/100 (Distinction) · Graduated 2025</div>
          <ul style={{ marginTop: 10, marginBottom: 0, paddingLeft: 20, listStyleType: 'disc' }}>
            <li style={{ ...bodyStyles, ...listItemStyles }}>Web Front-End Programming — React, Cypress, Jest: 88</li>
            <li style={{ ...bodyStyles, ...listItemStyles }}>User Interface Design & Construction — usability testing, Figma, React Native: 89</li>
            <li style={{ ...bodyStyles, ...listItemStyles }}>Software Engineering Fundamentals — Node.js, Express, SQLite: 99</li>
          </ul>
        </section>
        <section id="projects" style={sectionStyles}>
          <h2 style={headingStyles}>Projects</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={jobTitleStyles}><a href="https://ricelang-playground.vercel.app/" target="_blank" rel="noreferrer" style={linkStyles}>RiceLang Playground</a></div>
            <div style={projectSubheadingStyles}>React, Java, Spring Boot, Wasm · Feb 2025 — Present</div>
            <ul style={listStyles}>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Compiler for custom C/Java-like language RiceLang targeting JVM bytecode. Next.js frontend with Shadcn, AST/output viz.</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Spring Boot backend for compilation/execution.</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>WASM JS transpiler ~95%+ perf improvement over backend.</li>
            </ul>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={jobTitleStyles}><a href="https://ricel123.vercel.app/" target="_blank" rel="noreferrer" style={linkStyles}>Personal Blog</a></div>
            <div style={projectSubheadingStyles}>Astro, libSQL, DrizzleORM, TailwindCSS · Oct–Nov 2024</div>
            <ul style={listStyles}>
              <li style={{ ...bodyStyles, ...listItemStyles }}>99+ Lighthouse score.</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>AstroDB + DrizzleORM for likes/comments with optimistic updates.</li>
            </ul>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={jobTitleStyles}><a href="https://dns-riceolver.vercel.app" target="_blank" rel="noreferrer" style={linkStyles}>Recursive DNS Resolver</a></div>
            <div style={projectSubheadingStyles}>Python, React, JavaScript, Docker · May 2023 — Jan 2024</div>
            <ul style={listStyles}>
              <li style={{ ...bodyStyles, ...listItemStyles }}>RFC-1035 compliant resolver, 500+ q/s.</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Express + React frontend with Cloudflare/Google/Quad9 options.</li>
            </ul>
          </div>
          <div>
            <div style={jobTitleStyles}><a href="https://ricel123-links.onrender.com/" target="_blank" rel="noreferrer" style={linkStyles}>Personal Links</a></div>
            <div style={projectSubheadingStyles}>Vue, JavaScript · Jan–Aug 2023</div>
            <ul style={listStyles}>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Landing page for links.</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Custom JS/CSS animations.</li>
            </ul>
          </div>
        </section>
        <section id="skills" style={sectionStyles}>
          <h2 style={headingStyles}>Technical Skills</h2>
          <p style={{ ...bodyStyles, marginBottom: 6 }}><strong>Languages:</strong> JavaScript, TypeScript, Python, Java, C, Rust, Elixir, Bash, SQL, HTML/CSS</p>
          <p style={{ ...bodyStyles, marginBottom: 6 }}><strong>Frameworks / Libraries:</strong> React, Angular, Astro, Vue, TailwindCSS, Express, Flask, Spring Boot</p>
          <p style={{ ...bodyStyles, marginBottom: 6 }}><strong>Databases:</strong> PostgreSQL, SQLite, libSQL, MongoDB</p>
          <p style={bodyStyles}><strong>Developer Tools:</strong> Git, GitHub Actions, GitLab CI/CD, Docker, Vercel, Render, Fly.io</p>
        </section>
      </div>
    </div>
  )
}
