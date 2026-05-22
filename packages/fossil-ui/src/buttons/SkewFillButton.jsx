import { forwardRef } from 'react'
import { cn } from '../lib/cn.js'
import { BUTTON_BASE } from './buttonBase.js'

/** Skewed accent panel slides in from the left on hover. */
export const SkewFillButton = forwardRef(function SkewFillButton(
  { className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        BUTTON_BASE,
        'group relative h-11 overflow-hidden border border-neutral-900 bg-transparent px-5 text-[14px] text-neutral-900',
        className,
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-full origin-left -skew-x-12 scale-x-0 bg-neutral-900 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
        aria-hidden="true"
      />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
        {children}
      </span>
    </button>
  )
})
