import { cn } from '../lib/cn.js'
import { NAV_LINK, createAnimatedNavbar } from './shared/createAnimatedNavbar.jsx'

/** Floating frosted-glass bar that lifts on hover, with pill-shaped links. */
export const GlassFloatNavbar = createAnimatedNavbar({
  displayName: 'GlassFloatNavbar',
  mobileMenu: 'floatingCard',
  rootClassName: (menuOpen) =>
    cn(
      'mx-auto max-w-3xl border border-neutral-200/80 bg-white/75 backdrop-blur-md',
      'shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] transition-[border-radius,box-shadow,translate] duration-300 ease-out',
      'hover:-translate-y-0.5 data-[touch]:-translate-y-0.5 hover:shadow-[0_16px_40px_-14px_rgba(15,23,42,0.26)] data-[touch]:shadow-[0_16px_40px_-14px_rgba(15,23,42,0.26)] motion-reduce:transition-none',
      menuOpen ? 'rounded-2xl' : 'rounded-[28px]',
    ),
  ctaClassName: 'rounded-full',
  renderLinks: (ctx) => (
    <ul className="flex items-center gap-0.5">
      {ctx.links.map((link) => (
        <li key={link.label}>
          <a
            {...ctx.linkProps(link)}
            className={cn(
              NAV_LINK,
              'rounded-full transition-[color,background-color] duration-200',
              ctx.isActive(link)
                ? 'bg-neutral-900 text-white hover:text-white data-[touch]:text-white'
                : 'hover:bg-neutral-900/5 data-[touch]:bg-neutral-900/5',
            )}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  ),
})
