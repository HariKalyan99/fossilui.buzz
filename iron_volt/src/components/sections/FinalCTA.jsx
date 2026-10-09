import SplitText from '../animations/SplitText'
import Button from '../ui/Button'
import { useGsap } from '../../hooks/useGsap'
import { gsap, MEDIA } from '../../lib/gsap'
import ctaImg from '../../assets/images/cta.webp'

export default function FinalCTA({
  title = ['Your next rep', 'starts here.'],
  copy = 'Book a trial session, meet a coach and train the way we train. No pressure — just your first step.',
}) {
  const scope = useGsap((_, el) => {
    const mm = gsap.matchMedia()
    mm.add(MEDIA.motion, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 70%', once: true } })
      tl.from(el.querySelectorAll('[data-split-char]'), { yPercent: 115, duration: 1.1, stagger: 0.02 })
        .from(el.querySelectorAll('[data-fade]'), { y: 24, opacity: 0, duration: 1, stagger: 0.1 }, 0.5)

      gsap.fromTo(
        el.querySelector('[data-cta-img]'),
        { yPercent: -10, scale: 1.15 },
        { yPercent: 10, scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
      )
    })
  })

  return (
    <section
      ref={scope}
      className="grain relative isolate overflow-hidden bg-ink py-[clamp(7rem,16vw,15rem)]"
    >
      <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-full overflow-hidden lg:w-1/2">
        <img
          data-cta-img
          src={ctaImg}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-[50%_30%] opacity-45 grayscale lg:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink" />
      </div>

      <div className="container-x">
        <h2 id="cta-title" className="type-display text-mega">
          {title.map((line, i) => (
            <span key={line} className={`block ${i === title.length - 1 ? 'text-volt' : 'text-bone'}`}>
              <SplitText text={line} />
            </span>
          ))}
        </h2>
        <p data-fade className="mt-8 max-w-lg text-lead leading-relaxed text-bone/80">
          {copy}
        </p>
        <div data-fade className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button to="/book-trial" accent className="pl-7!">
            Book a trial session
          </Button>
          <Button to="/contact" variant="outline">
            Talk to a coach
          </Button>
        </div>
      </div>
    </section>
  )
}
