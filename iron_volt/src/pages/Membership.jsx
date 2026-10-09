import { Check, Minus } from 'lucide-react'
import PageHero from '../components/sections/PageHero'
import MembershipSection from '../components/sections/MembershipSection'
import FinalCTA from '../components/sections/FinalCTA'
import SectionHeading from '../components/ui/SectionHeading'
import Accordion from '../components/ui/Accordion'
import Reveal from '../components/animations/Reveal'
import { usePageTitle } from '../hooks/usePageTitle'
import { comparison, faq, memberships } from '../data/memberships'
import heroImg from '../assets/images/page-membership.webp'

function Cell({ value }) {
  if (value === true) {
    return (
      <>
        <Check aria-hidden="true" className="mx-auto size-5 text-volt" strokeWidth={2.5} />
        <span className="sr-only">Included</span>
      </>
    )
  }
  if (!value) {
    return (
      <>
        <Minus aria-hidden="true" className="mx-auto size-4 text-bone/30" />
        <span className="sr-only">Not included</span>
      </>
    )
  }
  return <span className="text-sm font-semibold text-bone">{value}</span>
}

export default function Membership() {
  usePageTitle('Membership')

  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Commit to"
        accent="the work."
        copy="Three clear options. Start with a trial, choose the level of support you want, and change as you progress."
        image={heroImg}
        position="50% 30%"
      />

      <MembershipSection index="01" />

      <section className="section-y border-t border-bone/10 bg-ink pt-0!">
        <div className="container-x">
          <SectionHeading id="compare-title" index="02" eyebrow="Compare" title={['Side by', { accent: 'side.' }]} />

          <Reveal className="mt-14 overflow-x-auto" tabIndex={0} role="region" aria-label="Membership comparison table">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">What each membership includes</caption>
              <thead>
                <tr className="border-b border-bone/15">
                  <th scope="col" className="type-eyebrow py-5 pr-4 text-ash">
                    Feature
                  </th>
                  {memberships.map((m) => (
                    <th
                      key={m.id}
                      scope="col"
                      className={`type-display w-1/5 py-5 text-center text-base ${m.featured ? 'text-volt' : 'text-bone'}`}
                    >
                      {m.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} data-reveal className="border-b border-bone/10">
                    <th scope="row" className="py-5 pr-4 text-[0.95rem] font-medium text-bone/90">
                      {row.label}
                    </th>
                    {row.values.map((v, i) => (
                      <td key={i} className={`py-5 text-center ${memberships[i].featured ? 'bg-volt/[0.04]' : ''}`}>
                        <Cell value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-charcoal">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeading id="faq-title" index="03" eyebrow="Questions" title={['Good to', { accent: 'know.' }]} />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion items={faq} />
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
