import { Link } from 'react-router-dom'
import PageHero from '../components/sections/PageHero'
import FinalCTA from '../components/sections/FinalCTA'
import ParallaxImage from '../components/animations/ParallaxImage'
import Reveal from '../components/animations/Reveal'
import Button from '../components/ui/Button'
import { usePageTitle } from '../hooks/usePageTitle'
import { programs } from '../data/programs'
import heroImg from '../assets/images/page-programs.webp'

export default function Programs() {
  usePageTitle('Programs')

  return (
    <>
      <PageHero
        eyebrow="Training programs"
        title="Six ways"
        accent="to get stronger."
        copy="Every program is coached, progressive and built to scale from your first session to your strongest."
        image={heroImg}
        position="50% 35%"
      >
        <nav aria-label="Programs on this page">
          <ul className="flex flex-wrap gap-2">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`#${p.slug}`}
                  className="inline-flex min-h-11 items-center border border-bone/20 px-4 text-sm font-semibold text-bone transition-colors hover:border-volt hover:text-volt"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="bg-ink">
        {programs.map((p, i) => (
          <section
            key={p.slug}
            id={p.slug}
            aria-labelledby={`${p.slug}-title`}
            className="scroll-mt-24 border-t border-bone/10 py-20 lg:py-28"
          >
            <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-8">
              <ParallaxImage
                src={p.image}
                alt={p.alt}
                position={p.position}
                reveal={i % 2 ? 'left' : 'right'}
                className={`aspect-[4/3] lg:col-span-6 ${i % 2 ? 'lg:order-2 lg:col-start-7' : ''}`}
              />
              <Reveal className={`flex flex-col justify-center lg:col-span-5 ${i % 2 ? 'lg:order-1' : 'lg:col-start-8'}`}>
                <p data-reveal className="type-eyebrow text-volt">
                  {String(i + 1).padStart(2, '0')} / {String(programs.length).padStart(2, '0')}
                </p>
                <h2 id={`${p.slug}-title`} data-reveal className="type-display mt-5 text-[clamp(1.75rem,3.6vw,3.75rem)] text-bone">
                  {p.title}
                </h2>
                <p data-reveal className="mt-6 text-lead leading-relaxed text-bone/85">
                  {p.description}
                </p>
                <dl data-reveal className="mt-8 grid gap-6 border-t border-bone/10 pt-8 sm:grid-cols-2">
                  <div>
                    <dt className="type-eyebrow text-ash">Best for</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-bone">{p.forWho}</dd>
                  </div>
                  <div>
                    <dt className="type-eyebrow text-ash">Format</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-bone">{p.format}</dd>
                  </div>
                </dl>
                <ul data-reveal className="mt-6 flex flex-wrap gap-2" aria-label="Focus areas">
                  {p.focus.map((f) => (
                    <li key={f} className="bg-charcoal px-3 py-1.5 text-xs font-semibold text-bone/90">
                      {f}
                    </li>
                  ))}
                </ul>
                <div data-reveal className="mt-10">
                  <Button to={`/book-trial?program=${p.slug}`} variant="outline">
                    Try {p.title.split(' ')[0]}
                  </Button>
                </div>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <FinalCTA title={['Find your', 'program.']} />
    </>
  )
}
