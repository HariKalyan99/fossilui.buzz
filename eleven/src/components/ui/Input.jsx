import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Input = forwardRef(function Input(
  { className, type = 'text', leadingIcon: Leading, trailingIcon: Trailing, ...props },
  ref,
) {
  if (Leading || Trailing) {
    return (
      <div className={cn('relative flex items-center', className)}>
        {Leading && (
          <Leading className="pointer-events-none absolute left-2.5 size-4 text-muted-foreground" />
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-background text-[13px] text-foreground',
            'placeholder:text-muted-foreground/70',
            Leading ? 'pl-8' : 'pl-3',
            Trailing ? 'pr-8' : 'pr-3',
            'transition-colors',
            'focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30',
            'disabled:cursor-not-allowed disabled:opacity-60',
          )}
          {...props}
        />
        {Trailing && (
          <Trailing className="pointer-events-none absolute right-2.5 size-4 text-muted-foreground" />
        )}
      </div>
    )
  }

  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-background px-3 text-[13px] text-foreground',
        'placeholder:text-muted-foreground/70',
        'transition-colors',
        'focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30',
        'disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...props}
    />
  )
})

export default Input
