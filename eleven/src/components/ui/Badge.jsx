import { cn } from '@/lib/utils'

const tones = {
  default: 'bg-secondary text-secondary-foreground border-border',
  primary: 'bg-primary-muted text-primary border-transparent dark:text-primary',
  success: 'bg-success-muted text-success border-transparent',
  warning: 'bg-warning-muted text-warning border-transparent',
  destructive: 'bg-destructive-muted text-destructive border-transparent',
  outline: 'bg-transparent text-foreground border-border',
  muted: 'bg-muted text-muted-foreground border-transparent',
}

const sizes = {
  sm: 'h-5 px-1.5 text-[11px]',
  md: 'h-6 px-2 text-[11.5px]',
}

export default function Badge({ className, tone = 'default', size = 'md', dot = false, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md font-medium border whitespace-nowrap',
        tones[tone],
        sizes[size],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'size-1.5 rounded-full',
            tone === 'success' && 'bg-success',
            tone === 'warning' && 'bg-warning',
            tone === 'destructive' && 'bg-destructive',
            tone === 'primary' && 'bg-primary',
            (tone === 'default' || tone === 'outline' || tone === 'muted') && 'bg-muted-foreground',
          )}
        />
      )}
      {children}
    </span>
  )
}
