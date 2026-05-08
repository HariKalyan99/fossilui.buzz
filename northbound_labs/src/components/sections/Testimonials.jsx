import { motion } from 'motion/react'
import { Quote } from 'lucide-react'
import { TESTIMONIALS } from '../../lib/data'
import { SectionHeading } from '../ui/SectionHeading'

export function Testimonials() {
  return (
    <section className="relative border-t border-[var(--border)] bg-[var(--bg-elevated)]/40 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Client voices"
          title="Trusted by operators"
          serifAccent="who've seen both sides."
          description="Engineering leaders and founders on what it's like to work with us — and why they keep coming back."
          align="center"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8 md:p-10"
            >
              <Quote
                className="absolute right-8 top-8 h-8 w-8 text-[var(--border-strong)]"
                strokeWidth={1.25}
              />

              <blockquote className="text-[17px] leading-relaxed tracking-tight text-[var(--fg)] sm:text-[19px] sm:leading-[1.55]">
                <span className="font-serif italic text-[var(--accent)]">“</span>
                {t.quote}
                <span className="font-serif italic text-[var(--accent)]">”</span>
              </blockquote>

              <figcaption className="mt-8 flex items-center gap-4 border-t border-[var(--border)] pt-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--fg)] text-[var(--bg)] text-sm font-semibold">
                  {t.author
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-[var(--fg)]">
                    {t.author}
                  </span>
                  <span className="text-xs text-[var(--fg-muted)]">
                    {t.role} · {t.company}
                  </span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
