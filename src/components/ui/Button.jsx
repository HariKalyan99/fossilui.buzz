import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

const VARIANTS = {
  primary:
    'bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-950 shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.06)]',
  secondary:
    'bg-white text-neutral-900 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 shadow-[0_1px_2px_rgba(15,23,42,0.04)]',
  ghost: 'bg-transparent text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100',
  outline:
    'bg-transparent border border-neutral-200 text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50',
  accent:
    'bg-indigo-600 text-white hover:bg-indigo-700 shadow-[0_1px_2px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.16)]',
}

const SIZES = {
  sm: 'h-8 px-3 text-[13px] rounded-md',
  md: 'h-10 px-4 text-[14px] rounded-lg',
  lg: 'h-11 px-5 text-[15px] rounded-lg',
  icon: 'h-9 w-9 rounded-md',
}

export const Button = forwardRef(function Button(
  { className, variant = 'secondary', size = 'md', as: Comp = 'button', ...props },
  ref,
) {
  return (
    <Comp
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium tracking-tight whitespace-nowrap transition-all duration-150',
        'disabled:opacity-50 disabled:pointer-events-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  )
})
