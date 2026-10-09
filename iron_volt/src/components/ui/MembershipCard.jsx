import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Button from './Button'
import { currency } from '../../data/memberships'
import { site } from '../../data/site'

export default function MembershipCard({ plan }) {
  const { id, name, tagline, price, period, featured, features } = plan

  return (
    <div data-membership-card className="h-full min-w-0">
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        aria-labelledby={`plan-${id}`}
        className={`relative flex h-full flex-col p-7 sm:p-9 ${
          featured ? 'bg-volt text-ink' : 'border border-bone/12 bg-charcoal text-bone'
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
          <h3 id={`plan-${id}`} className="type-display text-title">
            {name}
          </h3>
          {featured && <span className="type-eyebrow bg-ink px-2.5 py-1.5 text-volt">Recommended</span>}
        </div>
        <p className={`mt-3 text-[0.95rem] ${featured ? 'text-ink/75' : 'text-ash'}`}>{tagline}</p>

        <p className="mt-10 flex items-baseline gap-2">
          {price == null ? (
            <span className="type-display text-5xl">Ask us</span>
          ) : (
            <>
              <span className="type-display text-6xl tracking-tight sm:text-7xl">
                {currency}
                {price}
              </span>
              <span className={`text-sm font-semibold ${featured ? 'text-ink/70' : 'text-ash'}`}>/ {period}</span>
            </>
          )}
        </p>
        {site.showSampleNotices && price != null && (
          <p className={`mt-2 text-xs ${featured ? 'text-ink/70' : 'text-ash'}`}>Placeholder price</p>
        )}

        <ul className={`mt-8 flex-1 space-y-3.5 border-t pt-8 ${featured ? 'border-ink/15' : 'border-bone/10'}`}>
          {features.map((f) => (
            <li key={f} className="flex gap-3 text-[0.95rem] leading-snug">
              <Check
                aria-hidden="true"
                className={`mt-0.5 size-4 shrink-0 ${featured ? 'text-ink' : 'text-volt'}`}
                strokeWidth={2.5}
              />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <Button
          to={`/book-trial?plan=${id}`}
          variant={featured ? 'dark' : 'outline'}
          className="mt-10 w-full"
          aria-label={`Choose ${name} — book a trial`}
        >
          Choose {name}
        </Button>
      </motion.article>
    </div>
  )
}
