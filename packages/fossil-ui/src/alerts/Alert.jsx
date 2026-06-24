import { forwardRef } from 'react'
import { cn } from '../lib/cn.js'

const VARIANTS = {
  info: {
    wrap: 'border-indigo-100 bg-indigo-50/80 text-indigo-950',
    title: 'text-indigo-900',
    body: 'text-indigo-800/90',
  },
  success: {
    wrap: 'border-emerald-100 bg-emerald-50/80 text-emerald-950',
    title: 'text-emerald-900',
    body: 'text-emerald-800/90',
  },
  warning: {
    wrap: 'border-amber-100 bg-amber-50/80 text-amber-950',
    title: 'text-amber-900',
    body: 'text-amber-900/90',
  },
  danger: {
    wrap: 'border-rose-100 bg-rose-50/80 text-rose-950',
    title: 'text-rose-900',
    body: 'text-rose-800/90',
  },
}

const MOTION_CLASSES = {
  default: '',
  slideIn: 'animate-[fossil-alert-in_0.35s_ease-out]',
  borderGlow: 'transition-shadow duration-300 hover:shadow-[0_0_0_3px_rgba(99,102,241,0.1)]',
  accentBar: 'border-l-4 border-l-indigo-500',
}

export const Alert = forwardRef(function Alert(
  { className, variant = 'info', motion = 'default', title, children, ...props },
  ref,
) {
  const styles = VARIANTS[variant] ?? VARIANTS.info

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'rounded-lg border px-4 py-3',
        styles.wrap,
        MOTION_CLASSES[motion] ?? MOTION_CLASSES.default,
        motion === 'accentBar' && VARIANTS[variant]?.wrap,
        className,
      )}
      {...props}
    >
      {title ? <p className={cn('text-[13px] font-medium', styles.title)}>{title}</p> : null}
      {children ? (
        <p className={cn('text-[13px] leading-relaxed', title && 'mt-1', styles.body)}>{children}</p>
      ) : null}
    </div>
  )
})
