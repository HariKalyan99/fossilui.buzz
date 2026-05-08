import { motion } from 'motion/react'
import { PROCESS } from '../../lib/data'
import { SectionHeading } from '../ui/SectionHeading'

export function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Process"
          title="Predictable delivery,"
          serifAccent="without the theatre."
          description="Four phases, weekly demos, a single point of contact. You'll know more about your build than in most in-house teams."
        />

        <div className="mt-16 relative">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent lg:block"
          />
          <div className="grid gap-6 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <ProcessStep key={p.step} step={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcessStep({ step, index }) {
  const { icon: Icon, title, description, deliverables } = step
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="flex items-center gap-3">
        <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] transition-colors group-hover:border-[var(--accent)]/60">
          <Icon className="h-6 w-6 text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]" strokeWidth={1.75} />
          <span className="absolute -right-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--fg)] text-[var(--bg)] font-mono text-[10px] font-semibold">
            {step.step}
          </span>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 transition-colors group-hover:border-[var(--border-strong)]">
        <h3 className="text-xl font-semibold tracking-tight text-[var(--fg)]">
          {title}
        </h3>
        <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--fg-muted)]">
          {description}
        </p>
        <div className="mt-5 border-t border-[var(--border)] pt-4">
          <p className="text-[11px] uppercase tracking-wider text-[var(--fg-subtle)]">
            Deliverables
          </p>
          <ul className="mt-2 space-y-1.5">
            {deliverables.map((d) => (
              <li key={d} className="flex items-center gap-2 text-[13px] text-[var(--fg)]">
                <span className="font-mono text-[var(--accent)]">→</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
