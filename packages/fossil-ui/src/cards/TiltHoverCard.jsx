import { cn } from '../lib/cn.js'
import { createAnimatedCard } from './shared/createAnimatedCard.jsx'
import { renderDefaultCardContent } from './shared/CardContent.jsx'

/** Subtle 3D tilt on hover for depth. */
export const TiltHoverCard = createAnimatedCard({
  displayName: 'TiltHoverCard',
  animationClassName: ({ interactive = true }) =>
    cn(
      interactive &&
        'transition-[transform,box-shadow] duration-300 ease-out hover:-rotate-1 hover:shadow-[0_14px_34px_-16px_rgba(15,23,42,0.2)]',
    ),
  renderContent: (prepared) => renderDefaultCardContent(prepared),
})
