import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'

export const Select = forwardRef(function Select({ className, children, ...props }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          'h-9 w-full min-w-0 appearance-none rounded-md border border-neutral-200 bg-white',
          'pl-2.5 pr-9 text-[13px] text-neutral-800 outline-none transition-colors',
          'focus:border-indigo-300',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500"
        strokeWidth={2}
        aria-hidden
      />
    </div>
  )
})
