import { forwardRef } from 'react'
import { cn } from '../lib/cn.js'
import { BUTTON_BASE } from './buttonBase.js'

/** Underline grows from the center beneath the label. */
export const UnderlineGrowButton = forwardRef(function UnderlineGrowButton(
  { className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        BUTTON_BASE,
        'group h-11 bg-transparent px-5 text-[14px] text-neutral-900',
        className,
      )}
      {...props}
    >
      <span className="relative">
        {children}
        <span
          className="absolute -bottom-1 left-1/2 h-px w-full origin-center -translate-x-1/2 scale-x-0 bg-indigo-600 transition-transform duration-500 ease-out group-hover:scale-x-100"
          aria-hidden="true"
        />
      </span>
    </button>
  )
})
