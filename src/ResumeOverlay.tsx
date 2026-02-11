import { useEffect, useRef, useContext } from 'react'
import { ResumeContext } from './ResumeContext'

const sectionStyles = {
  marginBottom: 28,
  padding: '16px 0',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  scrollMarginTop: 12,
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

export function ResumeOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const resume = useContext(ResumeContext)

  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!resume?.scrollToSection || !containerRef.current) return
    const el = containerRef.current.querySelector(`#${resume.scrollToSection}`) as HTMLElement | null
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
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
        width: '60%',
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
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.2s ease',
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
        data-resume-scroll
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
          {' · '}
          <a href="/ERIC%20LIAO%20RESUME.pdf" download style={linkStyles}>Download Resume</a>
        </p>
        <section id="education" style={sectionStyles}>
          <h2 style={headingStyles}>Education</h2>
          <div style={jobTitleStyles}>University of New South Wales</div>
          <div style={metaStyles}>Sydney, NSW · Bachelor of Computer Science · WAM 80/100 (Distinction) · Feb 2022 – Dec 2025</div>
          <ul style={{ marginTop: 10, marginBottom: 0, paddingLeft: 20, listStyleType: 'disc' }}>
            <li style={{ ...bodyStyles, ...listItemStyles }}>Web Front-End Programming — React, Cypress, Jest: 88</li>
            <li style={{ ...bodyStyles, ...listItemStyles }}>User Interface Design & Construction — usability testing, Figma prototyping, React Native: 89</li>
            <li style={{ ...bodyStyles, ...listItemStyles }}>Software Engineering Fundamentals — NodeJS, Express, SQLite: 99</li>
          </ul>
        </section>
        <section id="experience" style={sectionStyles}>
          <h2 style={headingStyles}>Experience</h2>
          <div style={{ marginBottom: 20 }}>
            <div style={jobTitleStyles}>Software Engineer – Frontend Intern</div>
            <div style={metaStyles}>Freelancer.com · Sydney, NSW · Dec 2025 – Present</div>
            <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20, listStyleType: 'disc' }}>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Developed and maintained web and cross-platform Angular applications while leading framework and library migrations (i.e. Angular 18 to 19, RxJS to Angular Signals, Protractor to Playwright for E2E testing)</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Working with Figma designs to contribute to custom component library for brand consistency using TailwindCSS</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Contributed to internal tools, including Jenkins CI/CD pipelines, automated alerts and data visualisation systems</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Performed Lighthouse audits and performance testing on pages with company custom state management systems</li>
            </ul>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={jobTitleStyles}>Software Developer – AI Trainer</div>
            <div style={metaStyles}>DataAnnotation · Remote · Feb 2024 – Nov 2025</div>
            <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20, listStyleType: 'disc' }}>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Fine-tuning LLMs to generate by testing, correcting and improving output for accuracy and performance</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Reviewed and corrected 500+ AI-generated code responses in React, JavaScript/TypeScript, Python, Java, Go, Rust, and SQL to fix bugs, improve readability, and use modern syntax and up-to-date libraries</li>
            </ul>
          </div>
          <div>
            <div style={jobTitleStyles}>Assistant Manager</div>
            <div style={metaStyles}>All Luggage Solutions · Brisbane, QLD · Feb 2020 – Jan 2022</div>
            <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20, listStyleType: 'disc' }}>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Automated manual entry of customer shipping information to reduce packaging times by 25% with JavaScript</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Increased product visibility on Amazon/eBay by optimizing listings for SEO to drive sales and boost engagement</li>
            </ul>
          </div>
        </section>
        <section id="projects" style={sectionStyles}>
          <h2 style={headingStyles}>Projects</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={jobTitleStyles}>RiceLang Playground</div>
            <div style={projectSubheadingStyles}>React, Java, Spring Boot, Wasm · Feb 2025 – Present</div>
            <ul style={listStyles}>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Built a compiler for a custom language, RiceLang, a C/Java-like language that compiles to JVM bytecode</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Created a Next.js frontend using Shadcn to handle syntax highlighting, and visualization of AST and output</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Deployed a Spring Boot backend with routes for compilation and execution for clients without WasmGC support</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Integrated a WASM JavaScript transpiler achieving an average 95%+ performance improvement over the backend</li>
            </ul>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={jobTitleStyles}>Squaregg10 game</div>
            <div style={projectSubheadingStyles}>PostgreSQL, Rust, Elixir, Bevy, Phoenix · June 2024 – Present</div>
            <ul style={listStyles}>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Developed a WASM-compiled game using Bevy engine and deployed online with PostgreSQL leaderboard</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Implemented real-time chat using Elixir to take advantage of lightweight websockets on Erlang VM (BEAM)</li>
            </ul>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={jobTitleStyles}>Personal Blog</div>
            <div style={projectSubheadingStyles}>Astro, libSQL, DrizzleORM, TailwindCSS · Oct 2024 – Nov 2024</div>
            <ul style={listStyles}>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Achieved a 99+ Lighthouse score through static site generation with Astro to build a fast and responsive blog</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Integrated AstroDB with DrizzleORM to handle likes, and comments efficiently with optimistic updates</li>
            </ul>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={jobTitleStyles}>Recursive DNS Resolver</div>
            <div style={projectSubheadingStyles}>Python, React, JavaScript, Docker · May 2023 – Jan 2024</div>
            <ul style={listStyles}>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Developed an RFC-1035 compliant DNS resolver handling 500+ queries per second with multithreading</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Created an Express-based backend and React frontend with daisyUI with an intuitive interface with options for using Cloudflare, Google and Quad9 as substitute resolvers and dig as an alternative query builder</li>
            </ul>
          </div>
          <div>
            <div style={jobTitleStyles}>Personal Links</div>
            <div style={projectSubheadingStyles}>Vue, JavaScript · Jan 2023 – Aug 2023</div>
            <ul style={listStyles}>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Built a personalized site to display relevant links on a single landing page</li>
              <li style={{ ...bodyStyles, ...listItemStyles }}>Animated custom transitions and effects with native JavaScript and CSS to optimize performance</li>
            </ul>
          </div>
        </section>
        <section id="skills" style={sectionStyles}>
          <h2 style={headingStyles}>Technical Skills</h2>
          <p style={{ ...bodyStyles, marginBottom: 6 }}><strong>Languages:</strong> JavaScript, TypeScript, Python, Java, C, Rust, Elixir, Bash, SQL, HTML/CSS</p>
          <p style={{ ...bodyStyles, marginBottom: 6 }}><strong>Frameworks / Libraries:</strong> React, Astro, Vue, TailwindCSS, Express, Flask, Springboot</p>
          <p style={{ ...bodyStyles, marginBottom: 6 }}><strong>Databases:</strong> PostgreSQL, SQLite, libSQL, MongoDB</p>
          <p style={bodyStyles}><strong>Developer Tools:</strong> Git, Github Actions, Gitlab CI/CD, Docker, Vercel, Render, Fly.io</p>
        </section>
      </div>
    </div>
  )
}
