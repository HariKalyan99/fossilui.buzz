import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SERVICES } from '../../lib/data'
import { SectionHeading } from '../ui/SectionHeading'

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Services"
            title="A senior team,"
            serifAccent="across the stack."
            description="We plug into your product as a focused, multi-disciplinary unit — design, engineering, and delivery working from the same sprint."
          />
          <motion.a
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
          >
            Discuss an engagement
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.25}
            />
          </motion.a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }) {
  const { icon: Icon, title, description, points } = service
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden bg-[var(--bg)] p-8 transition-colors duration-500 hover:bg-[var(--bg-elevated)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(600px circle at var(--mx,50%) var(--my,0%), color-mix(in srgb, var(--accent) 10%, transparent), transparent 40%)',
        }}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--fg)] transition-colors group-hover:border-[var(--accent)]/40 group-hover:text-[var(--accent)]">
            <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-subtle)]">
            0{index + 1}
          </span>
        </div>

        <h3 className="mt-8 text-[22px] font-semibold tracking-tight text-[var(--fg)]">
          {title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--fg-muted)]">
          {description}
        </p>

        <ul className="mt-6 space-y-2">
          {points.map((p) => (
            <li
              key={p}
              className="flex items-center gap-2.5 text-[13.5px] text-[var(--fg)]"
            >
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}
