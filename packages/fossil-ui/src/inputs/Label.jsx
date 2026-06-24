import { forwardRef } from 'react'
import { cn } from '../lib/cn.js'

export const Label = forwardRef(function Label({ className, required, children, ...props }, ref) {
  return (
    <label
      ref={ref}
      className={cn('block text-[13px] font-medium text-neutral-700', className)}
      {...props}
    >
      {children}
      {required ? <span className="ml-0.5 text-rose-500">*</span> : null}
    </label>
  )
})
