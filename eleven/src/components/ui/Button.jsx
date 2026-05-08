import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

const variants = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95 disabled:bg-primary/60',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-muted border border-border',
  outline:
    'bg-transparent border border-border text-foreground hover:bg-muted',
  ghost: 'text-foreground hover:bg-muted',
  destructive:
    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  link: 'text-primary underline-offset-4 hover:underline',
}

const sizes = {
  xs: 'h-7 px-2 text-xs gap-1 [&>svg]:size-3.5',
  sm: 'h-8 px-3 text-[13px] gap-1.5 [&>svg]:size-3.5',
  md: 'h-9 px-3.5 text-[13px] gap-2 [&>svg]:size-4',
  lg: 'h-10 px-4 text-sm gap-2 [&>svg]:size-4',
  icon: 'h-9 w-9 [&>svg]:size-4',
  'icon-sm': 'h-8 w-8 [&>svg]:size-3.5',
}

const Button = forwardRef(function Button(
  { className, variant = 'primary', size = 'md', asChild = false, loading = false, children, disabled, ...props },
  ref,
) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-0',
        'disabled:pointer-events-none disabled:opacity-60',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="size-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
          {children}
        </span>
      ) : (
        children
      )}
    </Comp>
  )
})

export default Button
