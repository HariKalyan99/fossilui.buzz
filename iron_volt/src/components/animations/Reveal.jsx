import { useGsap } from '../../hooks/useGsap'
import { gsap, MEDIA } from '../../lib/gsap'

/**
 * Scroll-triggered entrance for a group of elements. Direct targets are
 * `[data-reveal]` descendants (or the wrapper itself when none exist);
 * split-text spans inside are revealed with a masked rise.
 */
export default function Reveal({
  as: Tag = 'div',
  children,
  className = '',
  y = 40,
  stagger = 0.08,
  start = 'top 85%',
  delay = 0,
  ...props
}) {
  const scope = useGsap((_, el) => {
    const mm = gsap.matchMedia()
    mm.add(MEDIA.motion, () => {
      const items = el.querySelectorAll('[data-reveal]')
      const targets = items.length ? items : [el]
      const chars = el.querySelectorAll('[data-split-char], [data-split-word]')

      const tl = gsap.timeline({
        delay,
        scrollTrigger: { trigger: el, start, once: true },
      })

      if (chars.length) {
        tl.from(chars, { yPercent: 115, duration: 1.1, stagger: 0.018 }, 0)
      }
      tl.from(targets, { y, opacity: 0, duration: 1.1, stagger }, chars.length ? 0.15 : 0)
    })
  })

  return (
    <Tag ref={scope} className={className} {...props}>
      {children}
    </Tag>
  )
}
