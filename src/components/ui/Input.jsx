import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

export const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        'h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-400',
        'transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 focus:outline-none',
        'shadow-[0_1px_2px_rgba(15,23,42,0.04)]',
        className,
      )}
      {...props}
    />
  )
})

export const Textarea = forwardRef(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        'min-h-[120px] w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 resize-y',
        'transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 focus:outline-none',
        'shadow-[0_1px_2px_rgba(15,23,42,0.04)]',
        className,
      )}
      {...props}
    />
  )
})
