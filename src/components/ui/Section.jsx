import { cn } from '../../lib/cn'

export function Section({ id, className, children, ...rest }) {
  return (
    <section
      id={id}
      className={cn('relative w-full py-20 md:py-28', className)}
      {...rest}
    >
      <div className="container-page">{children}</div>
    </section>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 mb-12 md:mb-16',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-medium">
          <span className="h-px w-6 bg-neutral-300" />
          {eyebrow}
        </div>
      )}
      {title && (
        <h2 className="text-3xl md:text-[44px] md:leading-[1.05] font-semibold tracking-[-0.025em] text-neutral-900 text-balance">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-neutral-600 max-w-2xl text-balance text-[15.5px] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
