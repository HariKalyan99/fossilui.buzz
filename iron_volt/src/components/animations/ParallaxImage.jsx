import { useGsap } from '../../hooks/useGsap'
import { gsap, MEDIA } from '../../lib/gsap'

/**
 * Image inside a fixed-ratio frame (no layout shift) that unmasks on entry
 * and drifts slightly while scrolling.
 */
export default function ParallaxImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  position = '50% 50%',
  amount = 10,
  reveal = 'up',
  priority = false,
}) {
  const scope = useGsap((_, el) => {
    const img = el.querySelector('img')
    const mm = gsap.matchMedia()
    mm.add(MEDIA.motion, () => {
      const from = {
        up: 'inset(100% 0% 0% 0%)',
        left: 'inset(0% 100% 0% 0%)',
        right: 'inset(0% 0% 0% 100%)',
      }[reveal]

      if (from) {
        gsap.fromTo(
          el,
          { clipPath: from },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      }

      if (amount) {
        gsap.fromTo(
          img,
          { yPercent: -amount, scale: 1 + amount / 50 },
          {
            yPercent: amount,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      }
    })
  })

  return (
    <div ref={scope} className={`relative overflow-hidden bg-charcoal ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{ objectPosition: position }}
        className={`absolute inset-0 size-full object-cover ${imgClassName}`}
      />
    </div>
  )
}
