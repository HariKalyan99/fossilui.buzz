import { Fragment, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Minus, Sparkles } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';
import { cn } from '../lib/cn';

const TIERS = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'For exploring Nova',
    monthly: 0,
    yearly: 0,
    cta: 'Start for free',
    features: [
      '50 generations / day',
      'Standard image quality',
      '6-second videos',
      'Community templates',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For individuals shipping work',
    monthly: 19,
    yearly: 15,
    cta: 'Upgrade to Pro',
    highlight: true,
    features: [
      'Unlimited images',
      'High-quality & 4K upscale',
      '12-second HD videos',
      'Priority rendering',
      'Private workspace',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For teams & studios',
    monthly: null,
    yearly: null,
    cta: 'Contact sales',
    features: [
      'Custom credits & SLA',
      'SSO & advanced roles',
      'Team workspaces',
      'Custom style packs',
      'Dedicated support',
    ],
  },
];

const COMPARE = [
  { group: 'Generation', rows: [
    ['Daily image generations', '50', 'Unlimited', 'Unlimited'],
    ['Max video length', '6s', '12s', 'Custom'],
    ['4K upscale', false, true, true],
    ['Priority rendering', false, true, true],
  ]},
  { group: 'Collaboration', rows: [
    ['Private workspace', false, true, true],
    ['Team members', '1', '5', 'Unlimited'],
    ['SSO & SAML', false, false, true],
  ]},
  { group: 'Support', rows: [
    ['Community support', true, true, true],
    ['Priority email', false, true, true],
    ['Dedicated CSM', false, false, true],
  ]},
];

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <PageTransition>
      <section className="container-x pt-16 pb-10 text-center">
        <span className="chip mx-auto">
          <Sparkles size={12} className="text-primary-400" /> Simple, transparent pricing
        </span>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Pick a plan that <span className="gradient-text">scales with you</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          Start free. Upgrade when you need more. Cancel anytime — no gotchas.
        </p>

        <div className="mt-8 inline-flex items-center gap-1 rounded-xl border border-border bg-surface p-1">
          {[
            { id: false, label: 'Monthly' },
            { id: true, label: 'Yearly', save: '-20%' },
          ].map((opt) => (
            <button
              key={String(opt.id)}
              onClick={() => setYearly(opt.id)}
              className={cn(
                'relative rounded-lg px-4 py-1.5 text-sm',
                yearly === opt.id ? 'text-text' : 'text-muted hover:text-text'
              )}
            >
              {yearly === opt.id && (
                <motion.span
                  layoutId="pricing-toggle"
                  className="absolute inset-0 rounded-lg bg-grad-primary"
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                />
              )}
              <span className="relative">{opt.label}</span>
              {opt.save && (
                <span className="relative ml-1 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                  {opt.save}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="container-x">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={cn(
                'card relative p-6',
                t.highlight && 'border-primary/40 shadow-glow'
              )}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-6 rounded-full bg-grad-primary px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-xl font-semibold">{t.name}</h3>
                {t.highlight && (
                  <Sparkles size={16} className="text-primary-400" />
                )}
              </div>
              <p className="mt-1 text-sm text-muted">{t.tagline}</p>

              <div className="mt-5 flex items-baseline gap-1">
                {t.monthly === null ? (
                  <span className="font-display text-3xl font-semibold">Custom</span>
                ) : (
                  <>
                    <span className="font-display text-4xl font-semibold">
                      ${yearly ? t.yearly : t.monthly}
                    </span>
                    <span className="text-sm text-muted">/ month</span>
                  </>
                )}
              </div>
              {yearly && t.monthly > 0 && (
                <div className="mt-1 text-xs text-muted">
                  Billed annually as ${t.yearly * 12}
                </div>
              )}

              <Button
                as={Link}
                to={t.id === 'enterprise' ? '/contact' : '/signup'}
                variant={t.highlight ? 'primary' : 'secondary'}
                className="mt-5 w-full"
                size="lg"
              >
                {t.cta}
              </Button>

              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 grid h-4 w-4 place-items-center rounded-full bg-primary/15 text-primary-400">
                      <Check size={10} />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-x py-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Compare plans
        </h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface2 text-muted">
              <tr>
                <th className="px-4 py-3 text-xs uppercase tracking-wider">Feature</th>
                {TIERS.map((t) => (
                  <th key={t.id} className="px-4 py-3 text-xs uppercase tracking-wider">
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((group) => (
                <Fragment key={group.group}>
                  <tr className="bg-surface/40">
                    <td
                      colSpan={4}
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      {group.group}
                    </td>
                  </tr>
                  {group.rows.map((row, i) => (
                    <tr
                      key={`${group.group}-${i}`}
                      className="border-t border-border"
                    >
                      <td className="px-4 py-3">{row[0]}</td>
                      {row.slice(1).map((v, j) => (
                        <td key={j} className="px-4 py-3 text-muted">
                          {typeof v === 'boolean' ? (
                            v ? (
                              <Check size={14} className="text-primary-400" />
                            ) : (
                              <Minus size={14} className="text-border" />
                            )
                          ) : (
                            <span className="text-text">{v}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageTransition>
  );
}
