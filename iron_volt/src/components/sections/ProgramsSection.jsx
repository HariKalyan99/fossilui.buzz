import ProgramCard from '../ui/ProgramCard'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { useGsap } from '../../hooks/useGsap'
import { gsap, MEDIA, ScrollTrigger } from '../../lib/gsap'
import { programs } from '../../data/programs'

export default function ProgramsSection() {
  const scope = useGsap((_, el) => {
    const mm = gsap.matchMedia()
    mm.add(MEDIA.motion, () => {
      const cards = el.querySelectorAll('[data-program-card]')
      gsap.set(cards, { y: 70, opacity: 0 })
      ScrollTrigger.batch(cards, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12 }),
      })
    })
  })

  return (
    <section
      ref={scope}
      id="programs"
      className="surface-light section-y relative bg-mist text-ink"
    >
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="programs-title"
            index="03"
            eyebrow="Training programs"
            title={['Built for', { accent: 'every goal.' }]}
            tone="light"
          />
          <p className="max-w-sm text-steel lg:pb-3">
            Six coached disciplines that work on their own or together. Every program scales from your first session to
            your strongest.
          </p>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          {programs.slice(0, 5).map((program, i) => (
            <ProgramCard key={program.slug} program={program} index={i} />
          ))}

          <div className="flex flex-col justify-end gap-6 sm:col-span-2 lg:col-span-4 lg:row-start-3 lg:pb-24">
            <p className="type-display text-title text-ink">Not sure where to start?</p>
            <p className="max-w-xs text-steel">
              Book a trial session and a coach will help match you with the right program.
            </p>
            <div>
              <Button to="/book-trial" variant="dark">
                Book a trial
              </Button>
            </div>
          </div>
          <ProgramCard program={programs[5]} index={5} className="sm:col-span-2 lg:row-start-3" />
        </div>
      </div>
    </section>
  )
}
