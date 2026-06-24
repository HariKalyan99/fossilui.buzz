import { forwardRef } from 'react'
import { cn } from '../lib/cn.js'

const TONES = {
  neutral: 'border-neutral-200 bg-white text-neutral-700',
  accent: 'border-indigo-100 bg-indigo-50 text-indigo-700',
  soft: 'border-neutral-200 bg-neutral-50 text-neutral-600',
  success: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  warning: 'border-amber-100 bg-amber-50 text-amber-800',
  danger: 'border-rose-100 bg-rose-50 text-rose-700',
}

const MOTION_CLASSES = {
  default: '',
  pulse: 'motion-safe:animate-pulse',
  shine:
    'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full',
  scale: 'transition-transform duration-200 hover:scale-105',
  dot: 'pl-5 before:absolute before:left-2 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-current',
  borderGlow:
    'transition-shadow duration-300 hover:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]',
}

export const Badge = forwardRef(function Badge(
  { className, tone = 'neutral', motion = 'default', children, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'relative inline-flex items-center gap-1 rounded-full border px-2 py-0.5',
        'text-[11px] font-medium tracking-tight',
        TONES[tone] ?? TONES.neutral,
        MOTION_CLASSES[motion] ?? MOTION_CLASSES.default,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
})
