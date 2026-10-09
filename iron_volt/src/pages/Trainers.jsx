import PageHero from '../components/sections/PageHero'
import Coaches from '../components/sections/Coaches'
import FinalCTA from '../components/sections/FinalCTA'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/animations/Reveal'
import { usePageTitle } from '../hooks/usePageTitle'
import heroImg from '../assets/images/page-trainers.webp'

const approach = [
  {
    title: 'Assess',
    body: 'Your first session covers goals, training history and how you move, so the plan starts in the right place.',
  },
  {
    title: 'Program',
    body: 'You get a clear plan with defined sessions, progressions and standards for every key lift and drill.',
  },
  {
    title: 'Coach',
    body: 'Coaches are on the floor correcting technique, adjusting load and keeping intensity where it should be.',
  },
  {
    title: 'Review',
    body: 'Regular check-ins compare where you started with where you are, and adjust the plan from there.',
  },
]

export default function Trainers() {
  usePageTitle('Trainers')

  return (
    <>
      <PageHero
        eyebrow="Coaches & trainers"
        title="Coaching"
        accent="you can feel."
        copy="Real coaches on the floor, focused on technique, progression and the person in front of them."
        image={heroImg}
        position="50% 30%"
      />

      <Coaches index="01" showLink={false} />

      <section className="section-y bg-ink">
        <div className="container-x">
          <SectionHeading
            id="approach-title"
            index="02"
            eyebrow="How we coach"
            title={['Four steps.', { accent: 'Every member.' }]}
          />
          <Reveal as="ol" className="mt-16 grid gap-px bg-bone/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {approach.map((step, i) => (
              <li key={step.title} data-reveal className="bg-ink p-8 lg:p-10">
                <span className="type-display text-5xl text-volt">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="type-display mt-8 text-xl text-bone">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ash">{step.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <FinalCTA title={['Train with', 'a coach.']} />
    </>
  )
}
