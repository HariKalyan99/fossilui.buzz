import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/cn.js'

export function DefaultLoadingIcon({ className }) {
  return (
    <Loader2
      className={cn('h-4 w-4 shrink-0 animate-spin text-current', className)}
      strokeWidth={2}
      aria-hidden="true"
    />
  )
}
