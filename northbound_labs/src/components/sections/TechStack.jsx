import { motion } from 'motion/react'
import { TECH_STACK } from '../../lib/data'
import { SectionHeading } from '../ui/SectionHeading'

export function TechStack() {
  return (
    <section id="stack" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our stack"
            title="Chosen for reliability,"
            serifAccent="not fashion."
            description="We're deliberate about what we bring into production. Below is the core — we extend it only when an engagement demands it."
          />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-sm text-sm text-[var(--fg-muted)]"
          >
            Every stack choice is optimized for two things: your team&apos;s ability
            to own it after handover, and the total cost of running it in year three.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TECH_STACK.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 transition-colors hover:border-[var(--border-strong)]"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
                  {group.category}
                </h3>
                <span className="font-mono text-[11px] text-[var(--fg-subtle)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1.5 text-[13px] text-[var(--fg)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
