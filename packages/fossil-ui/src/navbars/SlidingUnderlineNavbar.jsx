import { cn } from '../lib/cn.js'
import { createAnimatedNavbar } from './shared/createAnimatedNavbar.jsx'
import { INDICATOR_GLIDE, SlidingLinks } from './shared/SlidingLinks.jsx'

const LINK_PADDING = 12

/** One underline slides between links, sized to each label. */
export const SlidingUnderlineNavbar = createAnimatedNavbar({
  displayName: 'SlidingUnderlineNavbar',
  renderLinks: (ctx) => (
    <SlidingLinks
      ctx={ctx}
      renderIndicator={(rect) => (
        <span
          aria-hidden
          className={cn(INDICATOR_GLIDE, '-bottom-px h-0.5 rounded-full bg-neutral-900')}
          style={{
            left: rect ? rect.left + LINK_PADDING : undefined,
            width: rect ? rect.width - LINK_PADDING * 2 : undefined,
            opacity: rect ? 1 : 0,
          }}
        />
      )}
    />
  ),
})
