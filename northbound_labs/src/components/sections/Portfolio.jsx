import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Globe } from 'lucide-react'
import { PORTFOLIO } from '../../lib/data'
import { SectionHeading } from '../ui/SectionHeading'

export function Portfolio() {
  const [active, setActive] = useState(0)
  const current = PORTFOLIO[active]

  return (
    <section
      id="work"
      className="relative border-t border-[var(--border)] bg-[var(--bg-elevated)]/40 py-24 sm:py-32"
    >
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Live products,"
            serifAccent="not case-study mockups."
            description="A curated look at craftsmanship we admire — and the kind of bar we hold ourselves to for every engagement."
          />
          <div className="hidden md:flex items-center gap-2 font-mono text-xs text-[var(--fg-subtle)]">
            <span>{String(active + 1).padStart(2, '0')}</span>
            <span className="h-px w-10 bg-[var(--border-strong)]" />
            <span>{String(PORTFOLIO.length).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <PortfolioFrame project={current} />
          </div>

          <div className="lg:col-span-4">
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {PORTFOLIO.map((p, i) => (
                <li key={p.url}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={`group relative w-full overflow-hidden rounded-xl border p-4 text-left transition-all ${
                      i === active
                        ? 'border-[var(--border-strong)] bg-[var(--bg)]'
                        : 'border-[var(--border)] bg-[var(--bg)]/50 hover:bg-[var(--bg)]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-[var(--fg-subtle)]">
                          {p.category}
                        </p>
                        <p className="mt-1 text-lg font-semibold tracking-tight text-[var(--fg)]">
                          {p.title}
                        </p>
                      </div>
                      <span
                        aria-hidden
                        className="h-8 w-8 shrink-0 rounded-full border border-[var(--border)] transition-transform group-hover:scale-110"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${p.accent}, transparent 70%)`,
                        }}
                      />
                    </div>
                    <p className="mt-3 line-clamp-2 text-[13.5px] text-[var(--fg-muted)]">
                      {p.description}
                    </p>
                    {i === active && (
                      <motion.span
                        layoutId="portfolio-active-bar"
                        className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--accent)]"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function PortfolioFrame({ project }) {
  const [loaded, setLoaded] = useState(false)
  const containerRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1 font-mono text-[11px] text-[var(--fg-subtle)]">
          <Globe className="h-3 w-3" />
          {new URL(project.url).hostname}
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1 text-[11px] font-medium text-[var(--fg)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]"
        >
          Visit
          <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
        </a>
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--bg-subtle)]">
        <AnimatePresence>
          {!loaded && (
            <motion.div
              key="skeleton"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 grid place-items-center"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 rounded-full border-2 border-[var(--border-strong)] border-t-[var(--accent)] animate-spin" />
                <p className="font-mono text-xs text-[var(--fg-subtle)]">
                  loading preview…
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={project.url}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            {inView && (
              <iframe
                src={project.url}
                title={`${project.title} live preview`}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                referrerPolicy="no-referrer"
                className="h-full w-full origin-top-left scale-[0.75] border-0"
                style={{ width: '133.33%', height: '133.33%' }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)]/30 via-transparent to-transparent" />
      </div>

      <div className="flex items-center justify-between gap-6 border-t border-[var(--border)] bg-[var(--bg-elevated)] px-6 py-5">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-[var(--fg-subtle)]">
            {project.category}
          </p>
          <p className="mt-0.5 text-lg font-semibold tracking-tight text-[var(--fg)]">
            {project.title}
          </p>
        </div>
        <p className="hidden max-w-md text-right text-[13.5px] text-[var(--fg-muted)] sm:block">
          {project.description}
        </p>
      </div>
    </motion.div>
  )
}
