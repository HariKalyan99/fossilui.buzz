import ParallaxImage from '../animations/ParallaxImage'
import Counter from '../animations/Counter'
import Eyebrow from '../ui/Eyebrow'
import { useGsap } from '../../hooks/useGsap'
import { gsap, MEDIA } from '../../lib/gsap'
import { programs } from '../../data/programs'
import { memberships } from '../../data/memberships'
import { principles } from '../../data/principles'
import statementImg from '../../assets/images/statement.webp'

const lines = [
  { words: ['No', 'shortcuts.'], accent: false },
  { words: ['Just', 'progress.'], accent: true },
]

// Counts derived from the site's own content, so they are always accurate.
const facts = [
  { value: programs.length, label: 'Training programs' },
  { value: memberships.length, label: 'Membership options' },
  { value: principles.length, label: 'Coaching principles' },
]

export default function BrandStatement() {
  const scope = useGsap((_, el) => {
    const mm = gsap.matchMedia()
    mm.add(MEDIA.motion, () => {
      gsap.fromTo(
        el.querySelectorAll('[data-word]'),
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.12,
          ease: 'none',
          scrollTrigger: { trigger: el.querySelector('[data-statement]'), start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
        },
      )
      gsap.from(el.querySelector('[data-fade]'), {
        y: 30,
        opacity: 0,
        scrollTrigger: { trigger: el.querySelector('[data-fade]'), start: 'top 88%', once: true },
      })
      // Opacity only: the counters inside measure their own trigger positions.
      gsap.from(el.querySelectorAll('[data-fact]'), {
        opacity: 0,
        stagger: 0.12,
        scrollTrigger: { trigger: el.querySelector('[data-fact]'), start: 'top 92%', once: true },
      })
    })
  })

  return (
    <section ref={scope} aria-labelledby="statement-title" className="section-y relative bg-ink">
      <div className="container-x">
        <Eyebrow index="02">Our standard</Eyebrow>

        <h2 id="statement-title" data-statement className="type-display mt-10 text-giant">
          {lines.map((line, i) => (
            <span key={i} className={`block ${line.accent ? 'text-volt lg:pl-[12vw]' : 'text-bone'}`}>
              {line.words.map((w, wi) => (
                <span key={w} data-word className="inline-block">
                  {w}
                  {wi < line.words.length - 1 && '\u00a0'}
                </span>
              ))}
            </span>
          ))}
        </h2>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <ParallaxImage
            src={statementImg}
            alt="Athlete gripping a barbell in a dark gym, lit from above"
            className="aspect-[4/3] lg:col-span-7 lg:aspect-[16/10]"
            position="50% 45%"
          />

          <div className="flex flex-col justify-between gap-12 lg:col-span-4 lg:col-start-9">
            <p data-fade className="text-lead leading-relaxed text-bone/85">
              Training built around consistency, proper coaching, and measurable progress. No gimmicks, no
              ten-day transformations — just a clear plan and a team that holds the standard with you.
            </p>

            <dl className="grid divide-y divide-bone/10 border-t border-bone/10 sm:grid-cols-3 sm:gap-4 sm:divide-y-0 sm:pt-8 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:pt-0">
              {facts.map((f) => (
                <div
                  key={f.label}
                  data-fact
                  className="flex items-baseline justify-between gap-2 py-5 sm:flex-col sm:items-start sm:justify-start sm:py-0 lg:flex-row lg:items-baseline lg:justify-between lg:py-6"
                >
                  <dt className="type-eyebrow text-ash sm:order-2 lg:order-1">{f.label}</dt>
                  <dd className="type-display text-4xl text-bone sm:order-1 lg:order-2 lg:text-5xl">
                    <Counter value={f.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
