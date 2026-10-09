import MembershipCard from '../ui/MembershipCard'
import SectionHeading from '../ui/SectionHeading'
import SampleNotice from '../ui/SampleNotice'
import { useGsap } from '../../hooks/useGsap'
import { gsap, MEDIA } from '../../lib/gsap'
import { memberships } from '../../data/memberships'

export default function MembershipSection({ index = '07', headingAs = 'h2' }) {
  const scope = useGsap((_, el) => {
    const mm = gsap.matchMedia()
    mm.add(MEDIA.motion, () => {
      gsap.from(el.querySelectorAll('[data-membership-card]'), {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        scrollTrigger: { trigger: el.querySelector('[data-plans]'), start: 'top 85%', once: true },
      })
    })
  })

  return (
    <section ref={scope} id="membership" className="section-y bg-ink">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="membership-title"
            as={headingAs}
            index={index}
            eyebrow="Membership"
            title={['Pick your', { accent: 'level.' }]}
          />
          <p className="max-w-sm text-ash lg:pb-3">
            Three clear plans that grow with you. Every membership starts with a coach-led onboarding session.
          </p>
        </div>

        <div data-plans className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-3 lg:gap-6 xl:gap-8">
          {memberships.map((plan) => (
            <MembershipCard key={plan.id} plan={plan} />
          ))}
        </div>

        <SampleNotice className="mt-8">
          Prices and inclusions are placeholders. Final rates, contract terms and any joining fees will be confirmed by
          the gym.
        </SampleNotice>
      </div>
    </section>
  )
}
