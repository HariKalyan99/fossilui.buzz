import { cn } from '../lib/cn.js'
import { NAV_LINK, NAV_LINK_ACTIVE, createAnimatedNavbar } from './shared/createAnimatedNavbar.jsx'

/** Hovering one link dims the others so attention follows the pointer. */
export const SpotlightNavbar = createAnimatedNavbar({
  displayName: 'SpotlightNavbar',
  mobileMenu: 'circleReveal',
  renderLinks: (ctx) => (
    <ul className="group/links flex items-center">
      {ctx.links.map((link) => (
        <li key={link.label}>
          <a
            {...ctx.linkProps(link)}
            className={cn(
              NAV_LINK,
              'transition-[opacity,color] duration-300 group-hover/links:opacity-35 hover:opacity-100 group-has-[[data-touch]]/links:opacity-35 data-[touch]:opacity-100 motion-reduce:transition-none',
              ctx.isActive(link) && NAV_LINK_ACTIVE,
            )}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  ),
})
