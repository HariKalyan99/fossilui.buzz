import { cn } from '@/lib/utils'

export default function Logo({ collapsed = false, className }) {
  return (
    <div className={cn('flex items-center gap-2 select-none', className)}>
      <span className="relative flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
        <span className="text-[13px] font-bold leading-none tracking-tight">E</span>
        <span className="absolute -inset-px rounded-md bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
      </span>
      {!collapsed && (
        <span className="text-[14px] font-semibold tracking-tight">Eleven</span>
      )}
    </div>
  )
}
