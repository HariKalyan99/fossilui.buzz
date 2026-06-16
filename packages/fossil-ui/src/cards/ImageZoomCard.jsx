import { cn } from '../lib/cn.js'
import { createAnimatedCard } from './shared/createAnimatedCard.jsx'
import { renderDefaultCardContent } from './shared/CardContent.jsx'

/** Media area scales up smoothly inside the card on hover. */
export const ImageZoomCard = createAnimatedCard({
  displayName: 'ImageZoomCard',
  animationClassName: 'overflow-hidden',
  renderContent: (prepared) =>
    renderDefaultCardContent(prepared, {
      mediaClassName: 'overflow-hidden',
      imageClassName: cn(
        prepared.interactive &&
          'transition-transform duration-500 ease-out group-hover:scale-[1.06]',
      ),
    }),
})
