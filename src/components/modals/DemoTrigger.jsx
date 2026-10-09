import { cn } from '../../lib/cn'

export function DemoTrigger({ className, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-9 items-center justify-center rounded-lg border border-neutral-200 bg-white px-4',
        'text-[13px] font-medium text-neutral-800 shadow-[0_1px_2px_rgba(15,23,42,0.06)]',
        'transition-[border-color,box-shadow,translate] duration-200 hover:-translate-y-px hover:border-neutral-300',
        'hover:shadow-[0_6px_16px_-8px_rgba(15,23,42,0.25)] active:translate-y-0',
        className,
      )}
      {...props}
    />
  )
}
