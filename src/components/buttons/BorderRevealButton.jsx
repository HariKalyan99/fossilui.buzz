import { forwardRef } from 'react'
import { cn } from '../../lib/cn'
import { BUTTON_BASE } from './buttonBase'

/** Top and bottom borders grow from the center on hover. */
export const BorderRevealButton = forwardRef(function BorderRevealButton(
  { className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        BUTTON_BASE,
        'group h-11 bg-transparent px-6 text-[14px] text-neutral-900',
        className,
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute inset-x-4 top-0 h-px origin-center scale-x-0 bg-neutral-900 transition-transform duration-500 ease-out group-hover:scale-x-100"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-x-4 bottom-0 h-px origin-center scale-x-0 bg-neutral-900 transition-transform duration-500 ease-out group-hover:scale-x-100"
        style={{ transitionDelay: '60ms' }}
        aria-hidden="true"
      />
      <span className="relative z-10 transition-transform duration-300 group-hover:scale-[1.02]">
        {children}
      </span>
    </button>
  )
})
