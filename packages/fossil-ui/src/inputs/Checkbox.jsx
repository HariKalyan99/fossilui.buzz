import { forwardRef } from 'react'
import { cn } from '../lib/cn.js'

export const Checkbox = forwardRef(function Checkbox({ className, label, id, ...props }, ref) {
  const inputId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  const input = (
    <input
      ref={ref}
      id={inputId}
      type="checkbox"
      className={cn(
        'h-4 w-4 shrink-0 rounded border-neutral-300 text-indigo-600 accent-indigo-600',
        'transition-shadow focus:ring-2 focus:ring-indigo-500/20 focus:ring-offset-0',
        'disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...props}
    />
  )

  if (!label) return input

  return (
    <label htmlFor={inputId} className="inline-flex cursor-pointer items-center gap-2 text-[13px] text-neutral-700">
      {input}
      <span>{label}</span>
    </label>
  )
})
