import { forwardRef } from 'react'
import { cn } from '../lib/cn.js'
import { BUTTON_BASE } from './buttonBase.js'

/** Letter-spacing widens smoothly on hover. */
export const LetterSpacingButton = forwardRef(function LetterSpacingButton(
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
        'group h-11 border border-neutral-200 bg-neutral-50 px-5 text-[14px] uppercase text-neutral-900 transition-colors duration-300 hover:border-neutral-300 hover:bg-white',
        className,
      )}
      {...props}
    >
      <span className="inline-block tracking-[0.06em] transition-[letter-spacing] duration-500 ease-out group-hover:tracking-[0.12em] sm:tracking-[0.08em] sm:group-hover:tracking-[0.22em]">
        {label}
      </span>
    </button>
  )
})
