import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn.js'
import { NAV_LINK, NAV_LINK_ACTIVE } from './createAnimatedNavbar.jsx'

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Links with one shared indicator that glides to the hovered (or active) link.
 *
 * @param {{ ctx: object, renderIndicator: (rect: { left: number, width: number } | null) => import('react').ReactNode }} props
 */
export function SlidingLinks({ ctx, renderIndicator }) {
  const containerRef = useRef(null)
  const itemsRef = useRef(new Map())
  const [hovered, setHovered] = useState(null)
  const [rect, setRect] = useState(null)
  const target = hovered ?? ctx.current

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const measure = () => {
      const el = target == null ? null : itemsRef.current.get(target)
      setRect(el && el.offsetWidth ? { left: el.offsetLeft, width: el.offsetWidth } : null)
    }

    measure()
    if (typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    return () => observer.disconnect()
  }, [target])

  return (
    <ul ref={containerRef} className="relative flex items-center" onMouseLeave={() => setHovered(null)}>
      {renderIndicator(rect)}
      {ctx.links.map((link) => (
        <li key={link.label}>
          <a
            {...ctx.linkProps(link)}
            ref={(node) => {
              if (node) itemsRef.current.set(link.label, node)
              else itemsRef.current.delete(link.label)
            }}
            onMouseEnter={() => setHovered(link.label)}
            onFocus={() => setHovered(link.label)}
            onBlur={() => setHovered(null)}
            className={cn(NAV_LINK, ctx.isActive(link) && NAV_LINK_ACTIVE)}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export const INDICATOR_GLIDE =
  'pointer-events-none absolute transition-[left,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
