import { forwardRef } from 'react'
import { cn } from '../lib/cn.js'
import { BUTTON_BASE } from './buttonBase.js'

/** Label rolls upward on hover — duplicate line slides into view. */
export const RollTextButton = forwardRef(function RollTextButton(
  { className, children, ...props },
  ref,
) {
  const label = typeof children === 'string' ? children : String(children ?? '')

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        BUTTON_BASE,
        'group relative h-11 overflow-hidden bg-neutral-900 px-5 text-[14px] text-white shadow-[0_1px_2px_rgba(15,23,42,0.06)] hover:bg-neutral-800',
        className,
      )}
      {...props}
    >
      <span className="invisible whitespace-nowrap" aria-hidden="true">
        {label}
      </span>
      <span className="absolute inset-x-0 top-0 flex w-full flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-11">
        <span className="flex h-11 items-center justify-center leading-none">{label}</span>
        <span
          className="flex h-11 items-center justify-center leading-none"
          aria-hidden="true"
        >
          {label}
        </span>
      </span>
    </button>
  )
})
