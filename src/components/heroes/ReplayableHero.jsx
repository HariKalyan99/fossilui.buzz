import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { cn } from '../../lib/cn'

/** Renders a hero with a Replay button that remounts it to rerun the entrance. */
export function ReplayableHero({ Component, props }) {
  const [run, setRun] = useState(0)
  return (
    <div className="relative w-full overflow-hidden rounded-[inherit]">
      <Component key={run} {...props} />
      <button
        type="button"
        onClick={() => setRun((n) => n + 1)}
        className={cn(
          'absolute right-3 top-3 z-10 inline-flex h-8 items-center gap-1.5 rounded-md border border-neutral-200 bg-white/90 px-2.5',
          'text-[12px] font-medium text-neutral-600 backdrop-blur transition-colors hover:border-neutral-300 hover:text-neutral-900',
        )}
      >
        <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
        Replay
      </button>
    </div>
  )
}
