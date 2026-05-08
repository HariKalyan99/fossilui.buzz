import { motion } from 'motion/react'
import { Calendar, Mail } from 'lucide-react'
import { BRAND } from '../../lib/data'
import { Button } from '../ui/Button'

export function CTA() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg)] px-6 py-20 sm:px-16 sm:py-24"
        >
          <div
            aria-hidden
            className="absolute inset-0 grid-lines opacity-[0.3] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,var(--accent),transparent_60%)] opacity-[0.14] blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,var(--accent),transparent_60%)] opacity-[0.08] blur-3xl"
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-3.5 py-1.5 text-xs text-[var(--fg-muted)]">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-[var(--accent)] animate-pulse-dot" />
              </span>
              Taking on 3 engagements this quarter
            </span>

            <h2 className="mt-8 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--fg)] sm:text-5xl md:text-6xl">
              Let&apos;s build something{' '}
              <span className="font-serif italic font-normal text-[var(--fg-muted)]">
                that lasts.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-balance text-[17px] leading-relaxed text-[var(--fg-muted)]">
              Tell us where you want to go. We&apos;ll come back within one
              business day with a clear view on scope, timeline, and whether
              we&apos;re the right team to get you there.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button as="a" href={`mailto:${BRAND.email}`} size="lg" withArrow>
                <Calendar className="h-4 w-4" strokeWidth={2} />
                Book a strategy call
              </Button>
              <Button
                as="a"
                href={`mailto:${BRAND.email}`}
                size="lg"
                variant="outline"
              >
                <Mail className="h-4 w-4" strokeWidth={2} />
                {BRAND.email}
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] text-[var(--fg-subtle)]">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Response within 1 business day
              </span>
              <span className="hidden h-3 w-px bg-[var(--border-strong)] sm:inline-block" />
              <span>NDAs welcome</span>
              <span className="hidden h-3 w-px bg-[var(--border-strong)] sm:inline-block" />
              <span>Fixed-scope pricing available</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
