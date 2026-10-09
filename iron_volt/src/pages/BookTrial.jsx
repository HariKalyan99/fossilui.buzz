import { useSearchParams } from 'react-router-dom'
import PageHero from '../components/sections/PageHero'
import EnquiryForm from '../components/forms/EnquiryForm'
import Eyebrow from '../components/ui/Eyebrow'
import Reveal from '../components/animations/Reveal'
import { usePageTitle } from '../hooks/usePageTitle'
import heroImg from '../assets/images/page-trial.webp'

const steps = [
  { title: 'Request', body: 'Tell us your goals and when you would like to come in.' },
  { title: 'Confirm', body: 'A coach contacts you to confirm a time that works.' },
  { title: 'Train', body: 'Tour the space and complete a short session matched to your level.' },
]

export default function BookTrial() {
  usePageTitle('Book a trial')
  const [params] = useSearchParams()

  return (
    <>
      <PageHero
        eyebrow="Book a trial"
        title="Your first"
        accent="session."
        copy="Request a trial session. A coach will confirm your time, show you around and take you through a workout built for your level."
        image={heroImg}
        position="50% 40%"
      />

      <section aria-labelledby="trial-form-title" className="section-y bg-ink">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-8">
          <Reveal as="aside" className="lg:col-span-4" aria-label="What to expect">
            <div data-reveal>
              <Eyebrow index="01">What to expect</Eyebrow>
            </div>
            <ol className="mt-8 border-t border-bone/10">
              {steps.map((s, i) => (
                <li key={s.title} data-reveal className="flex gap-6 border-b border-bone/10 py-7">
                  <span className="type-display text-3xl text-volt">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="type-display text-lg text-bone">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ash">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p data-reveal className="mt-8 text-sm leading-relaxed text-ash">
              Bring comfortable training clothes, clean indoor shoes and a water bottle.
            </p>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <Eyebrow index="02">Your details</Eyebrow>
            <h2 id="trial-form-title" className="type-display mt-6 mb-10 text-title">
              Request your trial session
            </h2>
            <EnquiryForm
              variant="trial"
              initialPlan={params.get('plan') ?? ''}
              initialProgram={params.get('program') ?? ''}
            />
          </div>
        </div>
      </section>
    </>
  )
}
