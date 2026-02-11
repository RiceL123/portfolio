import { useEffect, useRef, useContext } from 'react'
import { ResumeContext } from './ResumeContext'

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
      className={`absolute top-5 right-5 bottom-5 w-[60%] min-w-[320px] max-w-[520px] flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-[28px] backdrop-saturate-[160%] transition-opacity duration-200 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      style={{ WebkitBackdropFilter: 'blur(28px) saturate(160%)' }}
    >
      <header className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0 bg-white/[0.03]">
        <div>
          <div className="text-xl font-semibold text-white/95">Eric Liao</div>
          <div className="text-xs text-white/50 mt-0.5">Resume</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="w-9 h-9 rounded-lg border-0 bg-white/10 text-white/60 cursor-pointer text-xl leading-none flex items-center justify-center hover:bg-white/15 hover:text-white/80 transition-colors"
        >
          ×
        </button>
      </header>
      <div
        ref={scrollRef}
        data-resume-scroll
        className="flex-1 overflow-auto py-6 px-6 pb-[120px] scroll-smooth touch-pan-y"
      >
        <p className="text-[13px] text-white/60 mb-5 leading-relaxed">
          <a href="https://linkedin.com/in/-eric-liao" target="_blank" rel="noreferrer" className="text-white/85 underline">LinkedIn</a>
          {' · '}
          <a href="https://github.com/ricel123" target="_blank" rel="noreferrer" className="text-white/85 underline">GitHub</a>
          {' · '}
          <a href="/ERIC%20LIAO%20RESUME.pdf" download className="text-white/85 underline">Download Resume</a>
        </p>
        <section id="education" className="mb-7 py-4 border-b border-white/10 scroll-mt-3">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-3">Education</h2>
          <div className="font-semibold text-white/95">University of New South Wales</div>
          <div className="text-xs text-white/50 mt-0.5">Sydney, NSW · Bachelor of Computer Science · WAM 80/100 (Distinction) · Feb 2022 – Dec 2025</div>
          <ul className="mt-2.5 mb-0 pl-5 list-disc">
            <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Web Front-End Programming — React, Cypress, Jest: 88</li>
            <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">User Interface Design & Construction — usability testing, Figma prototyping, React Native: 89</li>
            <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Software Engineering Fundamentals — NodeJS, Express, SQLite: 99</li>
          </ul>
        </section>
        <section id="experience" className="mb-7 py-4 border-b border-white/10 scroll-mt-3">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-3">Experience</h2>
          <div className="mb-5">
            <div className="font-semibold text-white/95">Software Engineer – Frontend Intern</div>
            <div className="text-xs text-white/50 mt-0.5">Freelancer.com · Sydney, NSW · Dec 2025 – Present</div>
            <ul className="mt-2 mb-0 pl-5 list-disc">
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Developed and maintained web and cross-platform Angular applications while leading framework and library migrations (i.e. Angular 18 to 19, RxJS to Angular Signals, Protractor to Playwright for E2E testing)</li>
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Working with Figma designs to contribute to custom component library for brand consistency using TailwindCSS</li>
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Contributed to internal tools, including Jenkins CI/CD pipelines, automated alerts and data visualisation systems</li>
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Performed Lighthouse audits and performance testing on pages with company custom state management systems</li>
            </ul>
          </div>
          <div className="mb-5">
            <div className="font-semibold text-white/95">Software Developer – AI Trainer</div>
            <div className="text-xs text-white/50 mt-0.5">DataAnnotation · Remote · Feb 2024 – Nov 2025</div>
            <ul className="mt-2 mb-0 pl-5 list-disc">
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Fine-tuning LLMs to generate by testing, correcting and improving output for accuracy and performance</li>
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Reviewed and corrected 500+ AI-generated code responses in React, JavaScript/TypeScript, Python, Java, Go, Rust, and SQL to fix bugs, improve readability, and use modern syntax and up-to-date libraries</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white/95">Assistant Manager</div>
            <div className="text-xs text-white/50 mt-0.5">All Luggage Solutions · Brisbane, QLD · Feb 2020 – Jan 2022</div>
            <ul className="mt-2 mb-0 pl-5 list-disc">
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Automated manual entry of customer shipping information to reduce packaging times by 25% with JavaScript</li>
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Increased product visibility on Amazon/eBay by optimizing listings for SEO to drive sales and boost engagement</li>
            </ul>
          </div>
        </section>
        <section id="projects" className="mb-7 py-4 border-b border-white/10 scroll-mt-3">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-3">Projects</h2>
          <div className="mb-4">
            <div className="font-semibold text-white/95">RiceLang Playground</div>
            <div className="text-xs text-white/50 mt-1 mb-0">React, Java, Spring Boot, Wasm · Feb 2025 – Present</div>
            <ul className="mt-1.5 mb-0 pl-5 list-disc">
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Built a compiler for a custom language, RiceLang, a C/Java-like language that compiles to JVM bytecode</li>
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Created a Next.js frontend using Shadcn to handle syntax highlighting, and visualization of AST and output</li>
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Deployed a Spring Boot backend with routes for compilation and execution for clients without WasmGC support</li>
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Integrated a WASM JavaScript transpiler achieving an average 95%+ performance improvement over the backend</li>
            </ul>
          </div>
          <div className="mb-4">
            <div className="font-semibold text-white/95">Squaregg10 game</div>
            <div className="text-xs text-white/50 mt-1 mb-0">PostgreSQL, Rust, Elixir, Bevy, Phoenix · June 2024 – Present</div>
            <ul className="mt-1.5 mb-0 pl-5 list-disc">
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Developed a WASM-compiled game using Bevy engine and deployed online with PostgreSQL leaderboard</li>
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Implemented real-time chat using Elixir to take advantage of lightweight websockets on Erlang VM (BEAM)</li>
            </ul>
          </div>
          <div className="mb-4">
            <div className="font-semibold text-white/95">Personal Blog</div>
            <div className="text-xs text-white/50 mt-1 mb-0">Astro, libSQL, DrizzleORM, TailwindCSS · Oct 2024 – Nov 2024</div>
            <ul className="mt-1.5 mb-0 pl-5 list-disc">
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Achieved a 99+ Lighthouse score through static site generation with Astro to build a fast and responsive blog</li>
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Integrated AstroDB with DrizzleORM to handle likes, and comments efficiently with optimistic updates</li>
            </ul>
          </div>
          <div className="mb-4">
            <div className="font-semibold text-white/95">Recursive DNS Resolver</div>
            <div className="text-xs text-white/50 mt-1 mb-0">Python, React, JavaScript, Docker · May 2023 – Jan 2024</div>
            <ul className="mt-1.5 mb-0 pl-5 list-disc">
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Developed an RFC-1035 compliant DNS resolver handling 500+ queries per second with multithreading</li>
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Created an Express-based backend and React frontend with daisyUI with an intuitive interface with options for using Cloudflare, Google and Quad9 as substitute resolvers and dig as an alternative query builder</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white/95">Personal Links</div>
            <div className="text-xs text-white/50 mt-1 mb-0">Vue, JavaScript · Jan 2023 – Aug 2023</div>
            <ul className="mt-1.5 mb-0 pl-5 list-disc">
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Built a personalized site to display relevant links on a single landing page</li>
              <li className="text-sm leading-relaxed text-white/85 mb-1.5 pl-1">Animated custom transitions and effects with native JavaScript and CSS to optimize performance</li>
            </ul>
          </div>
        </section>
        <section id="skills" className="mb-7 py-4 border-b border-white/10 scroll-mt-3">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-3">Technical Skills</h2>
          <p className="text-sm leading-relaxed text-white/85 mb-1.5"><strong>Languages:</strong> JavaScript, TypeScript, Python, Java, C, Rust, Elixir, Bash, SQL, HTML/CSS</p>
          <p className="text-sm leading-relaxed text-white/85 mb-1.5"><strong>Frameworks / Libraries:</strong> React, Astro, Vue, TailwindCSS, Express, Flask, Springboot</p>
          <p className="text-sm leading-relaxed text-white/85 mb-1.5"><strong>Databases:</strong> PostgreSQL, SQLite, libSQL, MongoDB</p>
          <p className="text-sm leading-relaxed text-white/85"><strong>Developer Tools:</strong> Git, Github Actions, Gitlab CI/CD, Docker, Vercel, Render, Fly.io</p>
        </section>
      </div>
    </div>
  )
}
