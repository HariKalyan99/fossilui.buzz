import { forwardRef } from 'react'
import { cn } from '../lib/cn.js'
import { INPUT_BASE, getInputMotionClass } from './shared/inputStyles.js'

export const Select = forwardRef(function Select({ className, motion = 'default', error, children, ...props }, ref) {
  const resolvedMotion = error ? 'error' : motion
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          INPUT_BASE,
          'appearance-none pr-9',
          getInputMotionClass(resolvedMotion),
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </div>
  )
})
