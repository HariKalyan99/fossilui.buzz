import { forwardRef } from 'react'
import { cn } from '../lib/cn.js'
import { INPUT_BASE, getInputMotionClass } from './shared/inputStyles.js'

export const Input = forwardRef(function Input({ className, motion = 'default', error, ...props }, ref) {
  const resolvedMotion = error ? 'error' : motion
  return (
    <input
      ref={ref}
      className={cn(INPUT_BASE, getInputMotionClass(resolvedMotion), className)}
      {...props}
    />
  )
})

export const Textarea = forwardRef(function Textarea({ className, motion = 'default', error, rows = 4, ...props }, ref) {
  const resolvedMotion = error ? 'error' : motion
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        INPUT_BASE,
        'min-h-[120px] resize-y py-2.5',
        getInputMotionClass(resolvedMotion),
        motion === 'default' && 'px-3',
        motion === 'underline' && 'px-0',
        motion !== 'underline' && motion !== 'compact' && 'px-3',
        className,
      )}
      {...props}
    />
  )
})
