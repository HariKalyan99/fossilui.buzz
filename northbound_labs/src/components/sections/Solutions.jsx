import { useState } from 'react'
import { motion } from 'motion/react'
import { INDUSTRIES } from '../../lib/data'
import { SectionHeading } from '../ui/SectionHeading'

export function Solutions() {
  const [active, setActive] = useState(0)
  const current = INDUSTRIES[active]

  return (
    <section id="solutions" className="relative border-t border-[var(--border)] bg-[var(--bg-elevated)]/40 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Solutions"
          title="Built for the industries"
          serifAccent="that demand reliability."
          description="We bring deep operating experience in regulated, data-heavy, and user-facing domains — so your build benefits from patterns we've already paid the tuition on."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ul className="divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--bg)] overflow-hidden">
              {INDUSTRIES.map((ind, i) => {
                const isActive = i === active
                return (
                  <li key={ind.name}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="group relative flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-[var(--bg-subtle)]"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-[var(--fg-subtle)]">
                          0{i + 1}
                        </span>
                        <span
                          className={`text-lg font-medium tracking-tight transition-colors ${
                            isActive ? 'text-[var(--fg)]' : 'text-[var(--fg-muted)]'
                          }`}
                        >
                          {ind.name}
                        </span>
                      </div>
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'bg-[var(--accent)] scale-100'
                            : 'bg-[var(--border-strong)] scale-75'
                        }`}
                      />
                      {isActive && (
                        <motion.span
                          layoutId="ind-active"
                          className="absolute inset-y-0 left-0 w-0.5 bg-[var(--accent)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full min-h-[360px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8 sm:p-10"
            >
              <div
                aria-hidden
                className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]"
              />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-3 py-1 text-xs text-[var(--fg-muted)]">
                  Industry focus
                </span>
                <h3 className="mt-6 text-3xl font-semibold tracking-tight text-[var(--fg)] sm:text-4xl">
                  {current.name}
                </h3>
                <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-[var(--fg-muted)]">
                  {current.blurb}
                </p>

                <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[
                    { k: 'Avg. engagement', v: '14 wks' },
                    { k: 'On-time delivery', v: '96%' },
                    { k: 'Repeat clients', v: '74%' },
                  ].map((s) => (
                    <div
                      key={s.k}
                      className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-4"
                    >
                      <p className="text-[11px] uppercase tracking-wider text-[var(--fg-subtle)]">
                        {s.k}
                      </p>
                      <p className="mt-1.5 font-mono text-xl font-semibold">{s.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
