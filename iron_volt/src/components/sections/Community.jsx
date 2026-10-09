import { Quote } from 'lucide-react'
import Marquee from '../ui/Marquee'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../animations/Reveal'
import { useGsap } from '../../hooks/useGsap'
import { gsap, MEDIA } from '../../lib/gsap'
import { communityHighlights, communityImages, marqueeWords } from '../../data/community'

const placements = [
  'col-span-7 lg:col-span-5',
  'col-span-5 lg:col-span-3 mt-16 lg:mt-32',
  'col-span-6 lg:col-span-4 lg:col-start-2 -mt-6 lg:-mt-24',
  'col-span-6 lg:col-span-3 lg:col-start-8 mt-10 lg:-mt-40',
]

export default function Community({ index = '08' }) {
  const scope = useGsap((_, el) => {
    const mm = gsap.matchMedia()
    mm.add(MEDIA.motion, () => {
      el.querySelectorAll('[data-speed]').forEach((frame) => {
        const speed = Number(frame.dataset.speed)
        gsap.fromTo(
          frame,
          { yPercent: speed },
          {
            yPercent: -speed,
            ease: 'none',
            scrollTrigger: { trigger: el.querySelector('[data-collage]'), start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
        gsap.fromTo(
          frame.firstElementChild,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: frame, start: 'top 90%', once: true },
          },
        )
      })
    })
  })

  return (
    <section ref={scope} className="relative overflow-hidden bg-ink">
      <Marquee words={marqueeWords} className="border-y border-ink bg-volt py-5 text-ink sm:py-7" />

      <div className="section-y container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <SectionHeading
              id="community-title"
              index={index}
              eyebrow="Results & community"
              title={['Progress is a', { accent: 'team sport.' }]}
              copy="Results come from consistent training, honest feedback and people who expect you back tomorrow."
            />
          </div>

          <Reveal as="ul" className="grid gap-px self-end bg-bone/10 lg:col-span-5 lg:col-start-8">
            {communityHighlights.map((h, i) => (
              <li key={h.title} data-reveal className="flex gap-6 bg-ink py-6">
                <span className="type-eyebrow pt-1.5 text-volt">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="type-display text-lg text-bone">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ash">{h.body}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>

        <div data-collage className="mt-20 grid grid-cols-12 gap-4 sm:gap-6 lg:mt-32 lg:gap-8">
          {communityImages.map((img, i) => (
            <div key={img.src} data-speed={img.speed} className={placements[i]}>
              <div className={`relative overflow-hidden bg-charcoal ${img.ratio}`}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
            </div>
          ))}

          <Reveal className="col-span-12 mt-10 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mt-0 lg:self-center">
            <figure data-reveal className="border border-bone/12 bg-charcoal p-8">
              <Quote aria-hidden="true" className="size-8 text-volt" />
              <blockquote className="type-display mt-6 text-xl leading-tight text-bone">
                Member stories, in their own words.
              </blockquote>
              <figcaption className="mt-4 text-sm leading-relaxed text-ash">
                This space is reserved for real member experiences, shared with permission. We do not publish invented
                testimonials or results.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
