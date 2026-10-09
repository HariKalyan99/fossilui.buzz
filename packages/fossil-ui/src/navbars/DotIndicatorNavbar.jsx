import { cn } from '../lib/cn.js'
import { createAnimatedNavbar } from './shared/createAnimatedNavbar.jsx'
import { INDICATOR_GLIDE, SlidingLinks } from './shared/SlidingLinks.jsx'

const DOT_SIZE = 6

/** A small accent dot travels under the hovered or active link. */
export const DotIndicatorNavbar = createAnimatedNavbar({
  displayName: 'DotIndicatorNavbar',
  renderLinks: (ctx) => (
    <SlidingLinks
      ctx={ctx}
      renderIndicator={(rect) => (
        <span
          aria-hidden
          className={cn(INDICATOR_GLIDE, '-bottom-1 h-1.5 rounded-full bg-indigo-500')}
          style={{
            left: rect ? rect.left + rect.width / 2 - DOT_SIZE / 2 : undefined,
            width: DOT_SIZE,
            opacity: rect ? 1 : 0,
          }}
        />
      )}
    />
  ),
})
