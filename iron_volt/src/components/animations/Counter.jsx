import { useGsap } from '../../hooks/useGsap'
import { gsap, MEDIA } from '../../lib/gsap'

/**
 * Counts up to `value` when scrolled into view. Only use with figures that
 * are true by construction or verified. The final value is rendered in the
 * markup so it is correct without JavaScript or with reduced motion.
 */
export default function Counter({ value, pad = 2, className = '' }) {
  const format = (n) => String(Math.round(n)).padStart(pad, '0')

  const scope = useGsap((_, el) => {
    const mm = gsap.matchMedia()
    mm.add(MEDIA.motion, () => {
      const state = { n: 0 }
      el.textContent = format(0)
      gsap.to(state, {
        n: value,
        duration: 1.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => {
          el.textContent = format(state.n)
        },
      })
      return () => {
        el.textContent = format(value)
      }
    })
  }, [value])

  return (
    <span ref={scope} className={`tabular-nums ${className}`}>
      {format(value)}
    </span>
  )
}
