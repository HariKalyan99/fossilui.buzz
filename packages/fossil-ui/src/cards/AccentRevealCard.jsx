import { cn } from '../lib/cn.js'
import { createAnimatedCard } from './shared/createAnimatedCard.jsx'
import { renderDefaultCardContent } from './shared/CardContent.jsx'

/** Bottom accent bar grows from the center on hover. */
export const AccentRevealCard = createAnimatedCard({
  displayName: 'AccentRevealCard',
  animationClassName: 'overflow-hidden',
  renderContent: (prepared) => (
    <>
      {renderDefaultCardContent(prepared)}
      {prepared.interactive ? (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 z-10 h-0.5 origin-center scale-x-0',
            'bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500',
            'transition-transform duration-300 ease-out group-hover:scale-x-100',
          )}
        />
      ) : null}
    </>
  ),
})
