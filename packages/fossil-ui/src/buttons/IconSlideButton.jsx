import { forwardRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '../lib/cn.js'
import { BUTTON_BASE } from './buttonBase.js'

/** Arrow slides in from the left; label nudges slightly right. */
export const IconSlideButton = forwardRef(function IconSlideButton(
  { className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        BUTTON_BASE,
        'group h-11 gap-2 overflow-hidden bg-white px-4 text-[14px] text-neutral-900 ring-1 ring-neutral-200 transition-[box-shadow,ring-color] duration-300 hover:ring-neutral-300 hover:shadow-[0_4px_14px_-4px_rgba(15,23,42,0.12)]',
        className,
      )}
      {...props}
    >
      <span
        className="flex w-0 -translate-x-1 items-center overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:translate-x-0 group-hover:opacity-100"
        aria-hidden="true"
      >
        <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
      </span>
      <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">
        {children}
      </span>
    </button>
  )
})
