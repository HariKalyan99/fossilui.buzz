import { forwardRef } from 'react'
import { cn } from '../lib/cn.js'

export const Hero = forwardRef(function Hero(
  {
    className,
    variant = 'centered',
    compact = false,
    eyebrow,
    title = 'Build interfaces that last',
    description = 'Production-ready React components with thoughtful motion and accessible defaults.',
    primaryCta = 'Get started',
    primaryHref = '#',
    secondaryCta,
    secondaryHref = '#',
    imageSrc,
    imageAlt = '',
    stats,
    children,
    ...props
  },
  ref,
) {
  const isSplit = variant === 'split' || variant === 'mockup' || variant === 'media'
  const isCentered =
    variant === 'centered' ||
    variant === 'eyebrow' ||
    variant === 'gradient' ||
    variant === 'dualCta' ||
    variant === 'stats' ||
    variant === 'minimal' ||
    variant === 'newsletter'

  const copy = (
    <div className={cn(isCentered && 'mx-auto max-w-2xl text-center', isSplit && 'max-w-xl')}>
      {eyebrow || variant === 'eyebrow' ? (
        <p
          className={cn(
            'font-medium uppercase tracking-[0.14em] text-indigo-600',
            compact ? 'mb-2 text-[10px]' : 'mb-3 text-[12px]',
          )}
        >
          {eyebrow || 'Now available'}
        </p>
      ) : null}
      <h1
        className={cn(
          'font-semibold tracking-tight text-neutral-900',
          compact ? 'text-lg leading-snug' : 'text-3xl sm:text-4xl md:text-5xl',
        )}
      >
        {title}
      </h1>
      <p
        className={cn(
          'leading-relaxed text-neutral-600',
          compact ? 'mt-2 text-[11px]' : 'mt-4 text-[15px] sm:text-base',
        )}
      >
        {description}
      </p>
      <div className={cn('flex flex-wrap gap-2', compact ? 'mt-3' : 'mt-6', isCentered && 'justify-center')}>
        <a
          href={primaryHref}
          className={cn(
            'inline-flex items-center rounded-lg bg-neutral-900 font-medium text-white transition-colors hover:bg-neutral-800',
            compact ? 'h-8 px-3 text-[11px]' : 'h-10 px-4 text-[14px]',
          )}
        >
          {primaryCta}
        </a>
        {(secondaryCta || variant === 'dualCta') && (
          <a
            href={secondaryHref}
            className={cn(
              'inline-flex items-center rounded-lg border border-neutral-200 bg-white font-medium text-neutral-900 transition-colors hover:bg-neutral-50',
              compact ? 'h-8 px-3 text-[11px]' : 'h-10 px-4 text-[14px]',
            )}
          >
            {secondaryCta || 'View docs'}
          </a>
        )}
      </div>
      {variant === 'stats' && stats?.length ? (
        <dl className={cn('grid grid-cols-3 gap-3', compact ? 'mt-4' : 'mt-8')}>
          {stats.map((item) => (
            <div key={item.label}>
              <dt className={cn('uppercase tracking-[0.12em] text-neutral-500', compact ? 'text-[9px]' : 'text-[11px]')}>
                {item.label}
              </dt>
              <dd className={cn('font-semibold text-neutral-900', compact ? 'mt-0.5 text-sm' : 'mt-1 text-xl')}>
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
      {variant === 'newsletter' ? (
        <form
          className={cn(
            'mx-auto flex max-w-md gap-2',
            compact ? 'mt-3 flex-col' : 'mt-6 flex-col sm:flex-row',
          )}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="you@email.com"
            className={cn(
              'flex-1 rounded-lg border border-neutral-200 px-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/15',
              compact ? 'h-8 text-[11px]' : 'h-10 text-sm',
            )}
          />
          <button
            type="submit"
            className={cn(
              'rounded-lg bg-indigo-600 font-medium text-white hover:bg-indigo-700',
              compact ? 'h-8 px-3 text-[11px]' : 'h-10 px-4 text-sm',
            )}
          >
            Subscribe
          </button>
        </form>
      ) : null}
      {children}
    </div>
  )

  const media = imageSrc ? (
    <div className={cn(isSplit && (compact ? 'mt-4' : 'lg:mt-0'))}>
      <img
        src={imageSrc}
        alt={imageAlt}
        className={cn(
          'w-full rounded-2xl border border-neutral-200 object-cover',
          compact ? 'max-h-28 object-cover' : 'shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]',
          variant === 'mockup' && !compact && 'rotate-1',
        )}
      />
    </div>
  ) : variant === 'mockup' || variant === 'media' ? (
    <div
      className={cn(
        'w-full rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-100 to-indigo-50',
        compact ? 'mt-4 aspect-[16/9] max-h-28' : 'mt-8 aspect-[4/3] lg:mt-0',
      )}
    />
  ) : null

  return (
    <section
      ref={ref}
      className={cn(
        'relative w-full overflow-hidden',
        compact ? 'px-3 py-4' : 'px-4 py-14 sm:py-16 md:py-20',
        variant === 'gradient' && 'bg-gradient-to-b from-indigo-50/80 via-white to-white',
        variant === 'minimal' && !compact && 'py-16 sm:py-20',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'mx-auto w-full',
          compact ? 'max-w-none' : 'max-w-5xl',
          isSplit
            ? cn('grid gap-6', !compact && 'lg:grid-cols-2 lg:items-center lg:gap-10')
            : 'flex flex-col items-center',
        )}
      >
        {copy}
        {media}
      </div>
    </section>
  )
})
