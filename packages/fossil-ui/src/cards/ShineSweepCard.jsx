import { cn } from '../lib/cn.js'
import { createAnimatedCard } from './shared/createAnimatedCard.jsx'
import { renderDefaultCardContent } from './shared/CardContent.jsx'

/** Diagonal highlight sweeps across the card on hover. */
export const ShineSweepCard = createAnimatedCard({
  displayName: 'ShineSweepCard',
  animationClassName: 'overflow-hidden',
  renderContent: (prepared) => (
    <>
      {renderDefaultCardContent(prepared)}
      {prepared.interactive ? (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 z-10 -translate-x-full skew-x-[-18deg]',
            'bg-gradient-to-r from-transparent via-white/55 to-transparent',
            'transition-transform duration-700 ease-out group-hover:translate-x-full',
          )}
        />
      ) : null}
    </>
  ),
})
