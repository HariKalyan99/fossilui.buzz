import { cn } from '../lib/cn.js'
import { createAnimatedCard } from './shared/createAnimatedCard.jsx'
import { renderDefaultCardContent } from './shared/CardContent.jsx'

/** Border brightens with a soft outer glow on hover. */
export const BorderGlowCard = createAnimatedCard({
  displayName: 'BorderGlowCard',
  animationClassName: ({ interactive = true }) =>
    cn(
      interactive &&
        'transition-[border-color,box-shadow] duration-300 ease-out hover:border-indigo-200 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.18),0_8px_24px_-12px_rgba(99,102,241,0.35)]',
    ),
  renderContent: (prepared) => renderDefaultCardContent(prepared),
})
