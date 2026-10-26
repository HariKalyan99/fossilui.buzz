import { cn } from '../lib/cn.js'
import { NAV_LINK, NAV_LINK_ACTIVE, createAnimatedNavbar } from './shared/createAnimatedNavbar.jsx'

const ROLL = 'block transition-transform delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,300ms)] ease-[var(--fossil-ease,var(--fossil-ease-out))] motion-reduce:transition-none group-hover/link:-translate-y-full group-data-[touch]/link:-translate-y-full'

/** Link labels roll upward to reveal an accent copy on hover. */
export const TextRollNavbar = createAnimatedNavbar({
  displayName: 'TextRollNavbar',
  mobileMenu: 'rollUp',
  renderLinks: (ctx) => (
    <ul className="flex items-center">
      {ctx.links.map((link) => (
        <li key={link.label}>
          <a
            {...ctx.linkProps(link)}
            className={cn(NAV_LINK, 'group/link', ctx.isActive(link) && NAV_LINK_ACTIVE)}
          >
            <span className="relative block overflow-hidden leading-5">
              <span className={ROLL}>{link.label}</span>
              <span aria-hidden className={cn(ROLL, 'absolute inset-x-0 top-full text-indigo-600')}>
                {link.label}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  ),
})
