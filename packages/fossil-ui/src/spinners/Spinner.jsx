import { forwardRef } from 'react'
import { cn } from '../lib/cn.js'

const SIZES = {
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-8 w-8 border-[3px]',
}

const MOTION_CLASSES = {
  default: 'border-neutral-200 border-t-indigo-600',
  dots: 'border-0 border-t-0 bg-[radial-gradient(circle,theme(colors.indigo.600)_2px,transparent_2px)] bg-[length:8px_8px] animate-[fossil-spin-dots_1s_linear_infinite]',
  ring: 'border-indigo-200 border-t-indigo-600 border-r-indigo-400',
}

export const Spinner = forwardRef(function Spinner(
  { className, size = 'md', motion = 'default', label = 'Loading', ...props },
  ref,
) {
  const isDots = motion === 'dots'

  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cn(
        'inline-block animate-spin rounded-full',
        !isDots && (SIZES[size] ?? SIZES.md),
        MOTION_CLASSES[motion] ?? MOTION_CLASSES.default,
        isDots && (size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-8 w-8' : 'h-5 w-5'),
        className,
      )}
      {...props}
    />
  )
})
