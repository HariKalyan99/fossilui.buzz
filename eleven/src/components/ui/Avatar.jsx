import { cn, initials } from '@/lib/utils'

const sizes = {
  xs: 'size-5 text-[9px]',
  sm: 'size-6 text-[10px]',
  md: 'size-8 text-[11px]',
  lg: 'size-10 text-[13px]',
  xl: 'size-14 text-[16px]',
}

/**
 * Gradient-tinted initials avatar.
 * Looks like a real product avatar even without photos.
 */
export default function Avatar({ name, size = 'md', gradient = 'from-indigo-500 to-violet-500', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-gradient-to-br text-white font-semibold ring-1 ring-black/5 select-none shrink-0',
        gradient,
        sizes[size],
        className,
      )}
      aria-label={name}
    >
      {initials(name)}
    </span>
  )
}
