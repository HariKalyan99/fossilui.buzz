import { motion } from 'motion/react'
import { cn } from '../../lib/cn'

export function Eyebrow({ children, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--fg-muted)]',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse-dot" />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  serifAccent,
}) {
  const isCenter = align === 'center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'flex flex-col gap-5',
        isCenter ? 'items-center text-center max-w-2xl mx-auto' : 'max-w-2xl',
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-[var(--fg)] sm:text-4xl md:text-[44px] md:leading-[1.05]">
        {title}
        {serifAccent && (
          <>
            {' '}
            <span className="font-serif italic font-normal text-[var(--fg-muted)]">
              {serifAccent}
            </span>
          </>
        )}
      </h2>
      {description && (
        <p className="text-balance text-base text-[var(--fg-muted)] sm:text-[17px] leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  )
}
