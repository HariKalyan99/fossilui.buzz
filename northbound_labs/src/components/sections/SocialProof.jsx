import { motion } from 'motion/react'
import { CLIENTS, METRICS } from '../../lib/data'

export function SocialProof() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--bg-elevated)]/40 py-16">
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-medium uppercase tracking-[0.22em] text-[var(--fg-subtle)]"
        >
          Trusted by teams at seed, Series B, and the Fortune 500
        </motion.p>

        <div className="mt-10 relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-14">
            {[...CLIENTS, ...CLIENTS].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="flex items-center gap-3 whitespace-nowrap text-xl font-semibold tracking-tight text-[var(--fg)]/60 hover:text-[var(--fg)] transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-4">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[var(--bg)] px-6 py-10 text-center"
            >
              <p className="font-mono text-4xl font-semibold tracking-tight text-[var(--fg)] sm:text-5xl">
                {m.value}
              </p>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
