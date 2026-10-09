import TrainerCard from '../ui/TrainerCard'
import SectionHeading from '../ui/SectionHeading'
import SampleNotice from '../ui/SampleNotice'
import Button from '../ui/Button'
import { useGsap } from '../../hooks/useGsap'
import { gsap, MEDIA, ScrollTrigger } from '../../lib/gsap'
import { trainers } from '../../data/trainers'

export default function Coaches({ index = '06', showLink = true }) {
  const scope = useGsap((_, el) => {
    const mm = gsap.matchMedia()
    mm.add(MEDIA.motion, () => {
      const cards = el.querySelectorAll('[data-trainer-card]')
      gsap.set(cards, { y: 60, opacity: 0 })
      ScrollTrigger.batch(cards, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 1.1, stagger: 0.1 }),
      })
    })
    mm.add(MEDIA.desktop, () => {
      el.querySelectorAll('[data-trainer-card]:nth-child(even)').forEach((card) => {
        gsap.to(card, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
    })
  })

  return (
    <section ref={scope} className="surface-light section-y bg-bone text-ink">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="coaches-title"
            index={index}
            eyebrow="Coaches"
            title={['Coached by', { accent: 'people who care.' }]}
            tone="light"
          />
          <div className="max-w-sm space-y-4 lg:pb-3">
            <p className="text-steel">
              Every member works with real coaches who know their name, their goals and their numbers.
            </p>
            <SampleNotice tone="light">Sample profiles. Replace with your coaching team and their own details.</SampleNotice>
          </div>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-x-8 lg:pb-16">
          {trainers.map((t, i) => (
            <TrainerCard key={t.name} trainer={t} index={i} />
          ))}
        </div>

        {showLink && (
          <div className="mt-14 flex justify-start lg:mt-6">
            <Button to="/trainers" variant="light">
              Meet the team
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
