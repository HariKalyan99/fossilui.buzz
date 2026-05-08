import { cn } from '@/lib/utils'

export default function Label({ className, ...props }) {
  return (
    <label
      className={cn(
        'text-[13px] font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  )
}
