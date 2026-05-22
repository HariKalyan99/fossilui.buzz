import { forwardRef } from 'react'
import { cn } from '../lib/cn.js'
import { BUTTON_BASE } from './buttonBase.js'

/** Diagonal light sweep glides across the surface on hover. */
export const ShineSweepButton = forwardRef(function ShineSweepButton(
  { className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        BUTTON_BASE,
        'group h-11 overflow-hidden bg-neutral-900 px-5 text-[14px] text-white shadow-[0_1px_2px_rgba(15,23,42,0.06)] hover:bg-neutral-800',
        className,
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </button>
  )
})
