import SplitText from '../animations/SplitText'
import Eyebrow from '../ui/Eyebrow'
import { useGsap } from '../../hooks/useGsap'
import { gsap, MEDIA } from '../../lib/gsap'

/** Compact cinematic header used by inner pages. */
export default function PageHero({ eyebrow, title, accent, copy, image, alt = '', position = '50% 40%', children }) {
  const scope = useGsap((_, el) => {
    const q = gsap.utils.selector(el)
    const mm = gsap.matchMedia()
    mm.add(MEDIA.motion, () => {
      const tl = gsap.timeline()
      tl.fromTo(q('[data-ph-media]'), { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' })
        .fromTo(q('[data-ph-media] img'), { scale: 1.2 }, { scale: 1, duration: 2 }, 0)
        .from(q('[data-split-char]'), { yPercent: 115, duration: 1.1, stagger: 0.022 }, 0.35)
        .from(q('[data-ph-fade]'), { y: 20, opacity: 0, duration: 1, stagger: 0.08 }, 0.7)

      gsap.to(q('[data-ph-media] img'), {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      })
    })
  })

  return (
    <section ref={scope} className="grain relative isolate flex min-h-[78svh] items-end overflow-hidden bg-ink pt-36 pb-16 lg:min-h-[86svh] lg:pb-24">
      {image && (
        <div data-ph-media aria-hidden={!alt} className="absolute inset-0 -z-10">
          <img
            src={image}
            alt={alt}
            fetchPriority="high"
            decoding="async"
            style={{ objectPosition: position }}
            className="size-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
        </div>
      )}

      <div className="container-x">
        <div data-ph-fade>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1 className="type-display mt-6 text-giant">
          <span className="block text-bone">
            <SplitText text={title} />
          </span>
          {accent && (
            <span className="block text-volt">
              <SplitText text={accent} />
            </span>
          )}
        </h1>
        {copy && (
          <p data-ph-fade className="mt-8 max-w-xl text-lead leading-relaxed text-bone/80">
            {copy}
          </p>
        )}
        {children && (
          <div data-ph-fade className="mt-10">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
