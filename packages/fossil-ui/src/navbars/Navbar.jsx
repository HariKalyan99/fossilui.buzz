import { forwardRef, useEffect, useState } from 'react'
import { cn } from '../lib/cn.js'

const DEFAULT_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Features', href: '#' },
  { label: 'Pricing', href: '#' },
]

/**
 * @param {object} props
 * @param {'minimal' | 'centered' | 'withCta' | 'scrollBlur' | 'bordered'} props.variant
 */
export const Navbar = forwardRef(function Navbar(
  {
    className,
    variant = 'minimal',
    compact = false,
    logo = 'Fossil',
    links = DEFAULT_LINKS,
    ctaLabel = 'Get started',
    ctaHref = '#',
    ...props
  },
  ref,
) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (variant !== 'scrollBlur' || compact) return
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [variant, compact])

  const shellClass = cn(
    'w-full transition-colors duration-200',
    variant === 'scrollBlur' && (scrolled || compact) && 'bg-white/85 backdrop-blur-md shadow-[0_1px_0_rgba(15,23,42,0.06)]',
    variant === 'bordered' && 'border-b border-neutral-200 bg-white',
    variant !== 'bordered' && variant !== 'scrollBlur' && 'bg-white/90',
    className,
  )

  const linkClass = cn(
    'font-medium text-neutral-600 transition-colors hover:text-neutral-900',
    compact ? 'text-[11px]' : 'text-[13px]',
  )

  const navLinks = (
    <nav
      className={cn('items-center', compact ? 'flex flex-wrap gap-3' : 'hidden gap-6 md:flex')}
      aria-label="Primary"
    >
      {links.map((link) => (
        <a key={link.label} href={link.href} className={linkClass}>
          {link.label}
        </a>
      ))}
    </nav>
  )

  const cta = (
    <a
      href={ctaHref}
      className={cn(
        'inline-flex items-center rounded-lg bg-neutral-900 font-medium text-white transition-colors hover:bg-neutral-800',
        compact ? 'h-7 px-2.5 text-[11px]' : 'h-9 px-3.5 text-[13px]',
      )}
    >
      {ctaLabel}
    </a>
  )

  if (variant === 'centered') {
    return (
      <header ref={ref} className={shellClass} {...props}>
        <div
          className={cn(
            'mx-auto flex flex-col items-center px-4',
            compact ? 'gap-2 py-3' : 'max-w-5xl gap-3 py-4',
          )}
        >
          <a
            href="#"
            className={cn(
              'font-semibold tracking-tight text-neutral-900',
              compact ? 'text-[13px]' : 'text-[15px]',
            )}
          >
            {logo}
          </a>
          <nav className="flex flex-wrap items-center justify-center gap-4" aria-label="Primary">
            {links.map((link) => (
              <a key={link.label} href={link.href} className={linkClass}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    )
  }

  return (
    <header ref={ref} className={shellClass} {...props}>
      <div
        className={cn(
          'mx-auto flex items-center justify-between gap-3 px-4',
          compact ? 'h-11' : 'h-14 max-w-5xl gap-4',
        )}
      >
        <a
          href="#"
          className={cn(
            'shrink-0 font-semibold tracking-tight text-neutral-900',
            compact ? 'text-[13px]' : 'text-[15px]',
          )}
        >
          {logo}
        </a>
        {navLinks}
        <div className={cn('items-center gap-2', compact ? 'flex' : 'hidden md:flex')}>
          {variant === 'withCta' ? cta : null}
        </div>
        {!compact ? (
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 text-neutral-700 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        ) : null}
      </div>
      {!compact && mobileOpen ? (
        <div className="border-t border-neutral-200 px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {links.map((link) => (
              <a key={link.label} href={link.href} className="py-1.5 text-[14px] text-neutral-700">
                {link.label}
              </a>
            ))}
            {variant === 'withCta' ? <div className="pt-2">{cta}</div> : null}
          </nav>
        </div>
      ) : null}
    </header>
  )
})
