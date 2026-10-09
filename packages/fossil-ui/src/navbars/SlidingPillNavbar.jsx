import { cn } from '../lib/cn.js'
import { createAnimatedNavbar } from './shared/createAnimatedNavbar.jsx'
import { INDICATOR_GLIDE, SlidingLinks } from './shared/SlidingLinks.jsx'

/** A soft pill glides behind the hovered link and rests on the active one. */
export const SlidingPillNavbar = createAnimatedNavbar({
  displayName: 'SlidingPillNavbar',
  renderLinks: (ctx) => (
    <SlidingLinks
      ctx={ctx}
      renderIndicator={(rect) => (
        <span
          aria-hidden
          className={cn(INDICATOR_GLIDE, 'inset-y-0 rounded-md bg-neutral-100')}
          style={{ left: rect?.left, width: rect?.width, opacity: rect ? 1 : 0 }}
        />
      )}
    />
  ),
})
