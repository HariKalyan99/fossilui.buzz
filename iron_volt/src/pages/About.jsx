import PageHero from '../components/sections/PageHero'
import Philosophy from '../components/sections/Philosophy'
import Facilities from '../components/sections/Facilities'
import FinalCTA from '../components/sections/FinalCTA'
import Eyebrow from '../components/ui/Eyebrow'
import Reveal from '../components/animations/Reveal'
import SplitText from '../components/animations/SplitText'
import { usePageTitle } from '../hooks/usePageTitle'
import { site } from '../data/site'
import heroImg from '../assets/images/page-about.webp'

export default function About() {
  usePageTitle('About')

  return (
    <>
      <PageHero
        eyebrow={`About ${site.name}`}
        title="Built on"
        accent="the basics."
        copy="A training facility for people who want to get genuinely stronger — with coaching, structure and a community that shows up."
        image={heroImg}
        position="50% 50%"
      />

      <section className="surface-light section-y bg-mist text-ink">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Eyebrow index="01" tone="light">
              Why we exist
            </Eyebrow>
          </div>
          <Reveal className="lg:col-span-8">
            <h2 id="story-title" className="type-display text-[clamp(1.75rem,3.4vw,3.75rem)] leading-[0.95]">
              <SplitText
                by="words"
                text="Most gyms sell access. We coach people to get stronger, train consistently and stay healthy for the long run."
              />
            </h2>
            <div className="mt-12 grid gap-8 text-steel sm:grid-cols-2">
              <p data-reveal className="leading-relaxed">
                Every program follows the same logic: master the fundamentals, add load or volume when you are ready, and
                measure what changes. It is simple, and it works when it is coached well.
              </p>
              <p data-reveal className="leading-relaxed">
                The space is designed around that idea — serious equipment, room to move, and coaches who are on the floor
                rather than behind a desk.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Philosophy index="02" />
      <Facilities index="03" />
      <FinalCTA />
    </>
  )
}
