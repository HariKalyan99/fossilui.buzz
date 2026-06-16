import { cn } from '../lib/cn.js'
import { createAnimatedCard } from './shared/createAnimatedCard.jsx'
import { renderDefaultCardContent } from './shared/CardContent.jsx'

/** Entire card scales up slightly on hover. */
export const ScaleUpCard = createAnimatedCard({
  displayName: 'ScaleUpCard',
  animationClassName: ({ interactive = true }) =>
    cn(
      interactive &&
        'origin-center transition-[transform,box-shadow] duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_10px_30px_-14px_rgba(15,23,42,0.18)]',
    ),
  renderContent: (prepared) => renderDefaultCardContent(prepared),
})
