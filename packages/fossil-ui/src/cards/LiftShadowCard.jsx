import { cn } from '../lib/cn.js'
import { createAnimatedCard } from './shared/createAnimatedCard.jsx'
import { renderDefaultCardContent } from './shared/CardContent.jsx'

/** Card lifts with a soft shadow on hover. */
export const LiftShadowCard = createAnimatedCard({
  displayName: 'LiftShadowCard',
  animationClassName: ({ interactive = true }) =>
    cn(
      interactive &&
        'transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-[0_6px_24px_-10px_rgba(15,23,42,0.12),0_1px_2px_rgba(15,23,42,0.04)]',
    ),
  renderContent: (prepared) => renderDefaultCardContent(prepared),
})
