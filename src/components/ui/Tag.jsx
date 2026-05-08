import { cn } from '../../lib/cn'

export function Tag({ className, children, tone = 'neutral', ...props }) {
  const tones = {
    neutral:
      'bg-white text-neutral-700 border-neutral-200',
    accent:
      'bg-indigo-50 text-indigo-700 border-indigo-100',
    soft:
      'bg-neutral-50 text-neutral-600 border-neutral-200',
    dark: 'bg-neutral-900 text-white border-neutral-900',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] tracking-tight font-medium',
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
