import { cn } from '@/lib/utils'

export default function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center px-6 py-14 rounded-xl border border-dashed border-border bg-surface/40',
        className,
      )}
    >
      {Icon && (
        <div className="flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground mb-4">
          <Icon className="size-5" />
        </div>
      )}
      {title && (
        <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
      )}
      {description && (
        <p className="mt-1 max-w-sm text-[13px] text-muted-foreground leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
