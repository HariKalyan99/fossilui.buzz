import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { CASE_STUDIES } from '../../lib/data'
import { SectionHeading } from '../ui/SectionHeading'

export function CaseStudies() {
  return (
    <section id="case-studies" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Case studies"
          title="Outcomes over output."
          serifAccent="Measured in production."
          description="A snapshot of recent engagements and the metrics that moved once we shipped."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {CASE_STUDIES.map((cs, i) => (
            <CaseStudyCard key={cs.client} study={cs} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseStudyCard({ study, index }) {
  return (
    <motion.a
      href="#contact"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8 transition-all hover:border-[var(--border-strong)] hover:-translate-y-1"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1 text-[11px] text-[var(--fg-muted)]">
          <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
          {study.tag}
        </span>
        <ArrowUpRight
          className="h-5 w-5 text-[var(--fg-subtle)] transition-all group-hover:text-[var(--accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      </div>

      <p className="mt-6 font-mono text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
        {study.client}
      </p>
      <h3 className="mt-2 text-[22px] font-semibold leading-snug tracking-tight text-[var(--fg)]">
        {study.title}
      </h3>

      <div className="mt-auto pt-8">
        <div className="grid grid-cols-3 gap-3 border-t border-[var(--border)] pt-6">
          {study.metrics.map((m) => (
            <div key={m.label}>
              <p className="font-mono text-xl font-semibold tracking-tight text-[var(--fg)]">
                {m.value}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-[var(--fg-subtle)]">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.a>
  )
}
