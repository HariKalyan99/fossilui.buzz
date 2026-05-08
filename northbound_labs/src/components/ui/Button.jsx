import { ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/cn'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] focus-visible:ring-[var(--ring)] disabled:opacity-50 disabled:pointer-events-none will-change-transform'

const variants = {
  primary:
    'bg-[var(--accent)] text-[var(--accent-fg)] hover:brightness-110 active:brightness-95 shadow-[0_8px_24px_-12px_var(--accent)]',
  secondary:
    'bg-[var(--fg)] text-[var(--bg)] hover:opacity-90 active:opacity-80',
  outline:
    'border border-[var(--border-strong)] text-[var(--fg)] hover:bg-[var(--bg-subtle)]',
  ghost:
    'text-[var(--fg)] hover:bg-[var(--bg-subtle)]',
}

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px]',
}

export function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  withArrow = false,
  ...props
}) {
  return (
    <Tag
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {withArrow && (
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2.25}
          />
        )}
      </span>
    </Tag>
  )
}
