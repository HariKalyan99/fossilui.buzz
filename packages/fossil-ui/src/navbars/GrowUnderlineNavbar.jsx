import { cn } from '../lib/cn.js'
import { NAV_LINK, NAV_LINK_ACTIVE, createAnimatedNavbar } from './shared/createAnimatedNavbar.jsx'

/** Each link draws its own underline from the left on hover; the active link keeps it. */
export const GrowUnderlineNavbar = createAnimatedNavbar({
  displayName: 'GrowUnderlineNavbar',
  renderLinks: (ctx) => (
    <ul className="flex items-center">
      {ctx.links.map((link) => {
        const active = ctx.isActive(link)
        return (
          <li key={link.label}>
            <a {...ctx.linkProps(link)} className={cn(NAV_LINK, 'group/link', active && NAV_LINK_ACTIVE)}>
              {link.label}
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute inset-x-3 bottom-1.5 h-px origin-left bg-neutral-900',
                  'transition-transform duration-300 ease-out motion-reduce:transition-none',
                  active ? 'scale-x-100' : 'scale-x-0 group-hover/link:scale-x-100',
                )}
              />
            </a>
          </li>
        )
      })}
    </ul>
  ),
})
