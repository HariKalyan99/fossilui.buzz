import { forwardRef, useId, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../lib/cn.js'

export const NAV_LINK =
  'relative z-[1] inline-flex h-9 items-center whitespace-nowrap rounded-md px-3 text-[13.5px] font-medium text-neutral-600 transition-colors duration-200 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'

export const NAV_LINK_ACTIVE = 'text-neutral-900'

const DEFAULT_ROOT = 'border-b border-neutral-200/80 bg-white/90 backdrop-blur'

const MENU_BAR =
  'absolute left-1/2 h-[1.5px] w-4 -translate-x-1/2 rounded-full bg-current transition-[top,rotate,opacity,scale,translate] duration-300 ease-out motion-reduce:transition-none'

function normalizeLinks(links) {
  return (links ?? []).map((link) =>
    typeof link === 'string' ? { label: link, href: '#' } : { href: '#', ...link },
  )
}

function MenuButton({ open, controls, onClick }) {
  return (
    <button
      type="button"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      aria-controls={controls}
      onClick={onClick}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:bg-neutral-100 @xl:hidden"
    >
      <span className={cn(MENU_BAR, open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-[12.5px]')} />
      <span className={cn(MENU_BAR, 'top-1/2 -translate-y-1/2', open && 'scale-x-0 opacity-0')} />
      <span className={cn(MENU_BAR, open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-[22px]')} />
    </button>
  )
}

function MobileMenu({ id, open, ctx, ctaLabel, ctaHref, ctaClassName }) {
  return (
    <div
      id={id}
      aria-hidden={!open}
      className={cn(
        'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none @xl:hidden',
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
    >
      <div className="min-h-0 overflow-hidden">
        <ul className="flex flex-col gap-0.5 border-t border-neutral-200/80 px-3 pb-4 pt-3">
          {ctx.links.map((link, index) => (
            <li
              key={link.label}
              style={{ transitionDelay: open ? `${80 + index * 45}ms` : '0ms' }}
              className={cn(
                'transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none',
                open ? 'translate-y-0 opacity-100' : '-translate-y-1.5 opacity-0',
              )}
            >
              <a
                {...ctx.linkProps(link)}
                tabIndex={open ? undefined : -1}
                className={cn(
                  'flex h-10 items-center rounded-md px-3 text-[14px] font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900',
                  ctx.isActive(link) && 'bg-neutral-100 text-neutral-900',
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
          {ctaLabel ? (
            <li
              style={{ transitionDelay: open ? `${80 + ctx.links.length * 45}ms` : '0ms' }}
              className={cn(
                'pt-2 transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none',
                open ? 'translate-y-0 opacity-100' : '-translate-y-1.5 opacity-0',
              )}
            >
              <CtaLink
                label={ctaLabel}
                href={ctaHref}
                tabIndex={open ? undefined : -1}
                className={cn('flex w-full justify-center', ctaClassName)}
              />
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  )
}

function CtaLink({ label, href, className, tabIndex }) {
  const Comp = href ? 'a' : 'button'
  return (
    <Comp
      href={href}
      type={href ? undefined : 'button'}
      tabIndex={tabIndex}
      className={cn(
        'group/cta h-9 items-center gap-1.5 rounded-lg bg-neutral-900 px-3.5 text-[13px] font-medium text-white transition-colors hover:bg-neutral-800',
        className,
      )}
    >
      {label}
      <ArrowRight
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5"
        strokeWidth={2}
      />
    </Comp>
  )
}

/**
 * @typedef {{ label: string, href?: string }} FossilNavLink
 *
 * @typedef {import('react').HTMLAttributes<HTMLElement> & {
 *   brand?: string
 *   brandHref?: string
 *   logo?: import('react').ReactNode
 *   links?: Array<FossilNavLink | string>
 *   active?: string
 *   ctaLabel?: string
 *   ctaHref?: string
 *   onLinkClick?: (link: FossilNavLink, event: import('react').MouseEvent) => void
 * }} FossilNavbarProps
 */

/**
 * Factory for animated navbars with a shared brand, CTA, and mobile menu.
 *
 * @param {object} config
 * @param {string} config.displayName
 * @param {(menuOpen: boolean) => string} [config.rootClassName]
 * @param {string} [config.ctaClassName]
 * @param {(ctx: object) => import('react').ReactNode} config.renderLinks
 */
export function createAnimatedNavbar({ displayName, rootClassName, ctaClassName, renderLinks }) {
  const Component = forwardRef(function AnimatedNavbar(props, ref) {
    const {
      brand = 'Fossil UI',
      brandHref,
      logo,
      links,
      active,
      ctaLabel,
      ctaHref,
      onLinkClick,
      className,
      ...rest
    } = props

    const [current, setCurrent] = useState(active)
    const [prevActive, setPrevActive] = useState(active)
    const [menuOpen, setMenuOpen] = useState(false)
    const menuId = useId()

    if (active !== prevActive) {
      setPrevActive(active)
      setCurrent(active)
    }

    const items = normalizeLinks(links)
    const ctx = {
      links: items,
      current,
      isActive: (link) => link.label === current,
      linkProps: (link) => ({
        href: link.href,
        'aria-current': link.label === current ? 'page' : undefined,
        onClick: (event) => {
          onLinkClick?.(link, event)
          setCurrent(link.label)
          setMenuOpen(false)
        },
      }),
    }

    const BrandTag = brandHref ? 'a' : 'div'

    return (
      <header
        ref={ref}
        className={cn('@container relative w-full', rootClassName ? rootClassName(menuOpen) : DEFAULT_ROOT, className)}
        {...rest}
      >
        <nav aria-label="Primary" className="flex h-14 items-center justify-between gap-3 px-4">
          <BrandTag
            href={brandHref}
            className="flex min-w-0 items-center gap-2 text-[14px] font-semibold tracking-tight text-neutral-900"
          >
            {logo ?? (
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-900 text-[12px] font-bold text-white">
                {brand?.charAt(0)}
              </span>
            )}
            <span className="truncate">{brand}</span>
          </BrandTag>

          <div className="hidden min-w-0 @xl:flex">{renderLinks(ctx)}</div>

          <div className="flex shrink-0 items-center gap-2">
            {ctaLabel ? (
              <CtaLink label={ctaLabel} href={ctaHref} className={cn('hidden @xl:inline-flex', ctaClassName)} />
            ) : null}
            <MenuButton open={menuOpen} controls={menuId} onClick={() => setMenuOpen((v) => !v)} />
          </div>
        </nav>

        <MobileMenu
          id={menuId}
          open={menuOpen}
          ctx={ctx}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
          ctaClassName={ctaClassName}
        />
      </header>
    )
  })
  Component.displayName = displayName
  return Component
}
