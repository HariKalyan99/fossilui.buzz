import { forwardRef } from 'react'
import { cn } from '../lib/cn.js'
import { Label } from './Label.jsx'

export const Field = forwardRef(function Field(
  { className, label, htmlFor, required, hint, error, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('space-y-1.5', className)} {...props}>
      {label ? (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      ) : null}
      {children}
      {error ? (
        <p className="text-[12px] text-rose-600">{error}</p>
      ) : hint ? (
        <p className="text-[12px] text-neutral-500">{hint}</p>
      ) : null}
    </div>
  )
})
