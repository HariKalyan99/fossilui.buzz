import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const base =
  'group/btn relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden px-6 py-3.5 type-eyebrow transition-colors duration-300 ease-expo disabled:pointer-events-none disabled:opacity-50'

const variants = {
  primary: 'bg-volt text-ink',
  outline: 'border border-bone/30 text-bone hover:border-volt hover:text-ink',
  dark: 'bg-ink text-bone hover:text-ink',
  light: 'border border-ink/25 text-ink hover:border-ink hover:text-bone',
}

const fills = {
  primary: 'bg-bone',
  outline: 'bg-volt',
  dark: 'bg-volt',
  light: 'bg-ink',
}

/**
 * Renders a router Link (`to`), external anchor (`href`) or native button.
 * Accent bar on the left echoes the brand's lime indicator.
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  icon = true,
  accent = false,
  className = '',
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${className}`
  const content = (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-expo group-hover/btn:scale-y-100 group-focus-visible/btn:scale-y-100 ${fills[variant]}`}
      />
      {accent && <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-volt" />}
      <span className="relative">{children}</span>
      {icon && (
        <ArrowUpRight
          aria-hidden="true"
          className="relative size-4 transition-transform duration-500 ease-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:rotate-45"
          strokeWidth={2.25}
        />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {content}
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}
