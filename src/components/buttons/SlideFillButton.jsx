import { forwardRef } from 'react'
import { cn } from '../../lib/cn'
import { BUTTON_BASE } from './buttonBase'

/** Accent fill slides up from the bottom on hover. */
export const SlideFillButton = forwardRef(function SlideFillButton(
  { className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        BUTTON_BASE,
        'group h-11 overflow-hidden border border-neutral-900 bg-transparent px-5 text-[14px] text-neutral-900',
        className,
      )}
      {...props}
    >
      <span
        className="absolute inset-0 origin-bottom scale-y-0 bg-indigo-600 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100"
        aria-hidden="true"
      />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
        {children}
      </span>
    </button>
  )
})
