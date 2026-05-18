import { forwardRef } from 'react'
import { cn } from '../../lib/cn'
import { BUTTON_BASE } from './buttonBase'

/** Button lifts with a soft shadow on hover. */
export const LiftShadowButton = forwardRef(function LiftShadowButton(
  { className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        BUTTON_BASE,
        'h-11 bg-indigo-600 px-5 text-[14px] text-white shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-[transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-[0_8px_20px_-6px_rgba(79,70,229,0.45)] active:translate-y-0 active:shadow-[0_2px_8px_-4px_rgba(79,70,229,0.35)]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
})
