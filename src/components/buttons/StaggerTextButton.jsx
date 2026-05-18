import { forwardRef } from 'react'
import { cn } from '../../lib/cn'
import { BUTTON_BASE } from './buttonBase'

/** Each letter lifts with a staggered delay on hover. */
export const StaggerTextButton = forwardRef(function StaggerTextButton(
  { className, children, ...props },
  ref,
) {
  const label = typeof children === 'string' ? children : String(children ?? '')
  const chars = [...label]

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        BUTTON_BASE,
        'group h-11 gap-0 border border-neutral-200 bg-white px-5 text-[14px] text-neutral-900 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-neutral-300',
        className,
      )}
      {...props}
    >
      <span className="flex">
        {chars.map((char, i) => (
          <span
            key={`${char}-${i}`}
            className="inline-block transition-[transform,color] duration-300 ease-out group-hover:-translate-y-1 group-hover:text-indigo-600"
            style={{ transitionDelay: `${i * 28}ms` }}
          >
            {char === ' ' ? '\u00a0' : char}
          </span>
        ))}
      </span>
    </button>
  )
})
