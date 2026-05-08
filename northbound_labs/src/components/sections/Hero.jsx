import { motion } from 'motion/react'
import { ArrowUpRight, Play } from 'lucide-react'
import { Button } from '../ui/Button'

const STATUS_TAGS = [
  'SOC 2 Type II',
  'US · EU · APAC',
  'Available for Q2 builds',
]

const ease = [0.22, 1, 0.36, 1]

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 grid-lines opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--accent)_0%,transparent_60%)] opacity-[0.12] blur-3xl"
      />

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mx-auto mb-7 inline-flex w-full justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]/70 backdrop-blur px-3.5 py-1.5 text-xs text-[var(--fg-muted)]">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-[var(--accent)] animate-pulse-dot" />
              <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-40 blur-[3px]" />
            </span>
            <span className="font-medium text-[var(--fg)]">Available for Q2 engagements</span>
            <span className="h-3 w-px bg-[var(--border-strong)]" />
            <span>Avg. start time: 2–3 weeks</span>
          </div>
        </motion.div>

        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-balance text-[40px] font-semibold leading-[1.02] tracking-tight text-[var(--fg)] sm:text-6xl md:text-7xl lg:text-[88px]">
            {['Software,', 'engineered'].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 + i * 0.08, ease }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease }}
              className="inline-block font-serif italic font-normal text-[var(--fg-muted)]"
            >
              with intent.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            className="mx-auto mt-7 max-w-2xl text-balance text-[17px] leading-relaxed text-[var(--fg-muted)] sm:text-lg"
          >
            We are a senior product & engineering studio building custom software,
            web and mobile products, and cloud platforms for teams that measure
            outcomes — not output.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button as="a" href="#contact" size="lg" withArrow>
              Book a strategy call
            </Button>
            <Button as="a" href="#work" size="lg" variant="outline">
              <Play className="h-4 w-4 fill-current" strokeWidth={0} />
              See selected work
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-[var(--fg-subtle)]"
          >
            {STATUS_TAGS.map((tag, i) => (
              <li key={tag} className="flex items-center gap-6">
                <span>{tag}</span>
                {i < STATUS_TAGS.length - 1 && (
                  <span className="h-3 w-px bg-[var(--border-strong)]" aria-hidden />
                )}
              </li>
            ))}
          </motion.ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.6, ease }}
      className="relative mx-auto mt-20 max-w-5xl"
    >
      <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)]">
        <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[var(--bg)] px-3 py-1 text-xs text-[var(--fg-subtle)] font-mono">
              northbound.studio/ops-dashboard
            </div>
            <div className="w-14" />
          </div>

          <div className="grid grid-cols-12 gap-3 p-5 sm:p-6">
            <div className="col-span-12 md:col-span-4 space-y-3">
              <StatCard label="Deploys this week" value="38" trend="+12%" />
              <StatCard label="P95 latency" value="142ms" trend="−8%" positive />
              <StatCard label="Error rate" value="0.04%" trend="−0.01%" positive />
            </div>

            <div className="col-span-12 md:col-span-8 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
                    Platform health
                  </p>
                  <p className="mt-1 text-sm font-medium">Production · last 24h</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                  Operational
                </span>
              </div>
              <ChartMock />
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  { label: 'Requests', value: '1.24M' },
                  { label: 'Active users', value: '12,408' },
                  { label: 'Uptime', value: '99.99%' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] px-3 py-2.5"
                  >
                    <p className="text-[11px] text-[var(--fg-subtle)]">{s.label}</p>
                    <p className="mt-0.5 font-mono text-sm font-medium">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingBadge
        className="absolute -left-3 top-10 sm:-left-10"
        initialRotate={-6}
      >
        <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--fg-subtle)]">
          Shipped
        </span>
        <span className="font-serif italic text-lg">in 14 weeks</span>
      </FloatingBadge>

      <FloatingBadge
        className="absolute -right-3 bottom-8 sm:-right-10"
        initialRotate={4}
      >
        <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--fg-subtle)]">
          Client NPS
        </span>
        <span className="flex items-baseline gap-1 font-mono text-lg font-semibold">
          71
          <ArrowUpRight className="h-3.5 w-3.5 text-[var(--accent)]" strokeWidth={2.5} />
        </span>
      </FloatingBadge>
    </motion.div>
  )
}

function StatCard({ label, value, trend, positive }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4">
      <p className="text-[11px] uppercase tracking-wider text-[var(--fg-subtle)]">
        {label}
      </p>
      <div className="mt-2 flex items-baseline justify-between">
        <p className="font-mono text-2xl font-semibold text-[var(--fg)]">{value}</p>
        <span
          className={`text-[11px] font-mono ${
            positive ? 'text-emerald-500' : 'text-[var(--accent)]'
          }`}
        >
          {trend}
        </span>
      </div>
    </div>
  )
}

function ChartMock() {
  const bars = [38, 52, 46, 64, 58, 72, 68, 80, 74, 88, 82, 94, 86, 76]
  return (
    <div className="flex h-28 items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          initial={{ scaleY: 0.1, opacity: 0 }}
          animate={{ scaleY: h / 100, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.9 + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: 'bottom' }}
          className={`flex-1 rounded-sm ${
            i === bars.length - 3
              ? 'bg-[var(--accent)]'
              : 'bg-[var(--border-strong)]'
          }`}
        />
      ))}
    </div>
  )
}

function FloatingBadge({ children, className = '', initialRotate = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, rotate: initialRotate }}
      animate={{ opacity: 1, y: 0, rotate: initialRotate }}
      transition={{ duration: 0.6, delay: 1.1, ease }}
      className={`hidden sm:flex flex-col gap-0.5 rounded-xl border border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur px-4 py-3 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.4)] ${className}`}
    >
      {children}
    </motion.div>
  )
}
