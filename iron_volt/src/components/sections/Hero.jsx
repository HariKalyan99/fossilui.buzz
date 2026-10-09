import SplitText from '../animations/SplitText'
import Button from '../ui/Button'
import { useGsap } from '../../hooks/useGsap'
import { gsap, MEDIA } from '../../lib/gsap'
import { site } from '../../data/site'

const heroSrcSet = '/images/hero-960.webp 960w, /images/hero-1600.webp 1600w, /images/hero-2400.webp 2400w'

export default function Hero() {
  const scope = useGsap((_, el) => {
    const q = gsap.utils.selector(el)
    const mm = gsap.matchMedia()

    mm.add(MEDIA.motion, () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.fromTo(q('[data-hero-veil]'), { opacity: 1 }, { opacity: 0, duration: 0.9, ease: 'power2.out' })
        .fromTo(
          q('[data-hero-media]'),
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' },
          0.05,
        )
        .fromTo(q('[data-hero-img]'), { scale: 1.22 }, { scale: 1, duration: 2.4 }, 0.05)
        .from(q('[data-hero-word]'), { opacity: 0, yPercent: 18, duration: 2 }, 0.35)
        .from(q('[data-hero-title] [data-split-char]'), { yPercent: 115, duration: 1.15, stagger: 0.028 }, 0.6)
        .from(q('[data-hero-fade]'), { y: 24, opacity: 0, duration: 1, stagger: 0.09 }, 1.0)
        .from(q('[data-hero-cta] > *'), { y: 20, opacity: 0, duration: 0.9, stagger: 0.08 }, 1.15)
        .from(q('[data-hero-deco]'), { opacity: 0, duration: 1.2, stagger: 0.1 }, 1.25)

      const scrub = { trigger: el, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to(q('[data-hero-parallax]'), { yPercent: 12, ease: 'none', scrollTrigger: scrub })
      gsap.to(q('[data-hero-content]'), { yPercent: -14, opacity: 0.15, ease: 'none', scrollTrigger: scrub })
      gsap.to(q('[data-hero-word]'), { xPercent: -10, ease: 'none', scrollTrigger: scrub })
    })
  })

  return (
    <section
      ref={scope}
      className="grain relative isolate h-[100svh] min-h-[640px] overflow-hidden bg-ink lg:min-h-[720px]"
    >
      <p
        data-hero-word
        aria-hidden="true"
        className="type-display pointer-events-none absolute -bottom-[0.1em] -left-[0.03em] z-0 select-none text-[40vw] leading-none text-bone/[0.045] lg:text-[22vw]"
      >
        {site.wordmark[1]}
      </p>

      <div data-hero-media className="absolute inset-0 z-0 lg:left-auto lg:w-[72%]">
        <div data-hero-parallax className="absolute inset-0">
          <img
            data-hero-img
            src="/images/hero-1600.webp"
            srcSet={heroSrcSet}
            sizes="(min-width: 1024px) 72vw, 100vw"
            alt="Muscular athlete seen from behind, flexing both arms against a black background"
            fetchPriority="high"
            decoding="async"
            width="2400"
            height="1600"
            className="size-full object-cover object-[50%_8%] lg:object-[50%_22%]"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10 lg:hidden" />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden w-3/5 bg-gradient-to-r from-ink via-ink/55 to-transparent lg:block"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 hidden h-2/5 bg-gradient-to-t from-ink to-transparent lg:block"
        />
      </div>

      <div className="container-x relative z-10 flex h-full flex-col justify-end pt-28 pb-28 sm:pb-32 lg:justify-center lg:pb-10">
        <div data-hero-content className="max-w-[min(100%,72rem)]">
          <p data-hero-fade className="type-eyebrow flex items-center gap-3 text-bone/80">
            <span aria-hidden="true" className="h-px w-10 bg-volt" />
            Fitness for every level
          </p>

          <h1 id="hero-title" data-hero-title className="type-display mt-6 text-mega lg:mt-8">
            <span className="block text-volt">
              <SplitText text="Stronger" />
            </span>
            <span className="block text-bone">
              <SplitText text="Every Day." />
            </span>
          </h1>

          <p data-hero-fade className="mt-6 max-w-md text-lead leading-relaxed text-bone/80 lg:mt-8">
            Train with purpose. Build strength. Become harder to stop.
          </p>

          <div data-hero-cta className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-10">
            <Button to="/book-trial" accent className="pl-7!">
              Start your journey
            </Button>
            <Button to="/programs" variant="outline">
              Explore programs
            </Button>
          </div>
        </div>
      </div>

      <div className="container-x absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-6 pb-6 sm:pb-8">
        <div data-hero-deco className="flex items-end gap-5">
          <span
            aria-hidden="true"
            className="type-display text-4xl text-transparent [-webkit-text-stroke:1.5px_var(--color-volt)] sm:text-5xl"
          >
            01
          </span>
          <p className="type-eyebrow hidden pb-1 text-ash sm:block">
            {site.pillars.join(' / ')}
          </p>
        </div>
        <div data-hero-deco aria-hidden="true" className="hidden items-center gap-4 pb-1 sm:flex">
          <span className="type-eyebrow text-ash">Scroll</span>
          <span className="relative block h-12 w-px overflow-hidden bg-bone/15">
            <span className="animate-scroll-cue absolute inset-0 bg-volt" />
          </span>
        </div>
      </div>

      <div
        data-hero-veil
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-ink opacity-0"
      />
    </section>
  )
}
