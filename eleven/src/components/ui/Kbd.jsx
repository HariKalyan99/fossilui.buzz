import { cn } from '@/lib/utils'

export default function Kbd({ children, className }) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded border border-border bg-muted text-[10.5px] font-medium text-muted-foreground font-sans',
        className,
      )}
    >
      {children}
    </kbd>
  )
}
