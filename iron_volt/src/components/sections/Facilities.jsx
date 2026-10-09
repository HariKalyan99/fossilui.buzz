import SectionHeading from '../ui/SectionHeading'
import SampleNotice from '../ui/SampleNotice'
import { useGsap } from '../../hooks/useGsap'
import { gsap, MEDIA } from '../../lib/gsap'
import { facilities } from '../../data/facilities'

const shapes = {
  wide: 'w-[82vw] aspect-[4/3] sm:w-[60vw] lg:w-[calc(var(--card-h)*1.5)] lg:aspect-[3/2]',
  tall: 'w-[64vw] aspect-[3/4] sm:w-[40vw] lg:w-[calc(var(--card-h)*0.75)] lg:aspect-[3/4]',
}

export default function Facilities({ index = '05' }) {
  const scope = useGsap((_, el) => {
    const viewport = el.querySelector('[data-viewport]')
    const track = el.querySelector('[data-track]')
    const mm = gsap.matchMedia()

    mm.add(MEDIA.desktop, () => {
      gsap.set(viewport, { overflowX: 'hidden' })
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: el.querySelector('[data-pin]'),
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      gsap.fromTo(
        el.querySelector('[data-gallery-progress]'),
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: el.querySelector('[data-pin]'), start: 'top top', end: () => `+=${distance()}`, scrub: true } },
      )

      el.querySelectorAll('[data-facility]').forEach((card) => {
        gsap.fromTo(
          card.querySelector('[data-mask]'),
          { clipPath: 'inset(0% 0% 0% 100%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left 100%', end: 'left 55%', scrub: true },
          },
        )
        gsap.fromTo(
          card.querySelector('img'),
          { scale: 1.25, xPercent: -6 },
          {
            scale: 1,
            xPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
          },
        )
      })
    })
  })

  return (
    <section ref={scope} className="relative bg-charcoal">
      <div
        data-pin
        className="section-y lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0 lg:[--card-h:clamp(12rem,calc(100svh-23rem),56vh)]"
      >
        <div className="container-x flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="facilities-title"
            index={index}
            eyebrow="Featured facilities"
            title={['Built for', { accent: 'the work.' }]}
            size="text-[clamp(1.9rem,3.2vw+0.6rem,4.5rem)]"
          />
          <div className="max-w-sm space-y-4 lg:pb-2">
            <p className="text-ash">
              Free weights, power racks, open training floor and dedicated functional and conditioning zones.
            </p>
            <SampleNotice>Representative photography. Replace with images of your facility.</SampleNotice>
          </div>
        </div>

        <div
          data-viewport
          role="region"
          aria-label="Facilities gallery"
          tabIndex={0}
          className="mt-12 snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:mt-14 lg:snap-none [&::-webkit-scrollbar]:hidden"
        >
          <ul data-track className="flex w-max gap-4 px-[clamp(1.25rem,4vw,4rem)] sm:gap-6 lg:gap-8">
            {facilities.map((f, i) => (
              <li key={f.title} data-facility className="snap-start">
                <figure>
                  <div data-mask className={`relative overflow-hidden bg-ink ${shapes[f.shape]}`}>
                    <img
                      src={f.image}
                      alt={f.alt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-5 flex max-w-[min(24rem,64vw)] gap-4 lg:max-w-[max(16rem,calc(var(--card-h)*0.75))]">
                    <span className="type-eyebrow pt-1 text-volt">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="type-display block text-lg text-bone">{f.title}</span>
                      <span className="mt-1 block text-sm text-ash">{f.caption}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>

        <div className="container-x mt-10 hidden lg:block" aria-hidden="true">
          <div className="h-px bg-bone/10">
            <div data-gallery-progress className="h-px origin-left scale-x-0 bg-volt" />
          </div>
        </div>
      </div>
    </section>
  )
}
