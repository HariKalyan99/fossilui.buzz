import { forwardRef } from 'react'
import { cn } from '../lib/cn.js'

export const Separator = forwardRef(function Separator(
  { className, orientation = 'horizontal', decorative = true, label, ...props },
  ref,
) {
  const isHorizontal = orientation === 'horizontal'

  if (label && isHorizontal) {
    return (
      <div className={cn('flex w-full items-center gap-3', className)} {...props}>
        <div className="h-px flex-1 bg-neutral-200" role="separator" />
        <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">
          {label}
        </span>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>
    )
  }

  return (
    <div
      ref={ref}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        'shrink-0 bg-neutral-200',
        isHorizontal ? 'h-px w-full' : 'h-10 w-px',
        className,
      )}
      {...props}
    />
  )
})
