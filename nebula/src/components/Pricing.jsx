import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, ArrowUpRight } from "lucide-react";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import { fadeUp, staggerContainer, viewportOnce, EASE } from "../lib/motion";

const TIERS = [
  {
    name: "Launchpad",
    tagline: "For early-stage teams shipping their first site.",
    priceMonthly: 9800,
    priceYearly: 8400,
    priceUnit: "one-time",
    priceSub: "Delivered in 4 weeks",
    cta: "Start a project",
    features: [
      "Up to 6 designed pages",
      "Design system kit",
      "Next.js + CMS build",
      "Launch + 30 days support",
      "Analytics + SEO foundations",
    ],
    featured: false,
  },
  {
    name: "Studio",
    tagline: "A full rebrand + website + foundations for growth.",
    priceMonthly: 24000,
    priceYearly: 19800,
    priceUnit: "one-time",
    priceSub: "Delivered in 6 weeks",
    cta: "Book a call",
    features: [
      "Unlimited pages + templates",
      "Rebrand + full design system",
      "Headless CMS + integrations",
      "Performance + accessibility audit",
      "CRO + experimentation setup",
      "60 days post-launch support",
    ],
    featured: true,
  },
  {
    name: "Partner",
    tagline: "Ongoing design + engineering capacity, monthly.",
    priceMonthly: 6900,
    priceYearly: 5900,
    priceUnit: "/mo",
    priceSub: "Cancel anytime",
    cta: "Talk to us",
    features: [
      "Dedicated senior team",
      "Design + eng sprints",
      "Roadmap + strategy support",
      "Quarterly brand audits",
      "Priority response SLA",
    ],
    featured: false,
  },
];

function formatPrice(value) {
  return `$${value.toLocaleString("en-US")}`;
}

function BillingToggle({ yearly, onChange }) {
  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="relative inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 34 }}
          className="absolute inset-y-1 rounded-full bg-white shadow-[0_4px_20px_-4px_rgba(255,255,255,0.35)]"
          style={{
            left: yearly ? "50%" : "4px",
            right: yearly ? "4px" : "50%",
          }}
        />
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
            !yearly ? "text-ink-950" : "text-mist-200 hover:text-white"
          }`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`relative z-10 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
            yearly ? "text-ink-950" : "text-mist-200 hover:text-white"
          }`}
        >
          Yearly
          <span
            className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold tracking-wide transition-colors ${
              yearly
                ? "bg-ink-950/10 text-ink-950"
                : "bg-brand-500/20 text-brand-200"
            }`}
          >
            −15%
          </span>
        </button>
      </div>
    </div>
  );
}

function PriceDisplay({ yearly, tier }) {
  const price = yearly ? tier.priceYearly : tier.priceMonthly;
  const showStrike = yearly && tier.priceYearly < tier.priceMonthly;

  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-2">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={price}
            initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: EASE }}
            className="text-[44px] md:text-[52px] font-semibold tracking-[-0.035em] leading-none text-white"
          >
            {formatPrice(price)}
          </motion.span>
        </AnimatePresence>
        <span className="text-sm text-mist-400 translate-y-[-4px]">
          {tier.priceUnit}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2 flex-wrap min-h-[24px]">
        {showStrike ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-brand-400/30 bg-brand-500/10 px-2 py-0.5 text-[11px] font-medium text-brand-200">
            Save {formatPrice(tier.priceMonthly - tier.priceYearly)}
          </span>
        ) : null}
        {tier.priceSub ? (
          <span className="text-xs text-mist-400">{tier.priceSub}</span>
        ) : null}
      </div>
    </div>
  );
}

function TierCard({ tier, yearly }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`relative flex ${tier.featured ? "lg:-mt-6" : ""}`}
    >
      {tier.featured ? (
        <div className="absolute left-1/2 -top-3 -translate-x-1/2 z-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-400 via-brand-500 to-accent-400 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase text-white shadow-[0_10px_30px_-8px_rgba(138,92,255,0.6)]">
            <Sparkles className="size-3" />
            Most popular
          </span>
        </div>
      ) : null}

      {tier.featured ? (
        <div
          aria-hidden="true"
          className="absolute -inset-10 -z-10 rounded-[48px] opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(138,92,255,0.35), rgba(79,91,255,0.18) 60%, transparent 80%)",
          }}
        />
      ) : null}

      <div
        className={`relative w-full rounded-3xl p-[1px] ${
          tier.featured
            ? "bg-gradient-to-b from-brand-400/80 via-brand-500/40 to-white/10"
            : "bg-white/10"
        }`}
      >
        <div
          className={`relative h-full rounded-[calc(1.5rem-1px)] p-8 md:p-9 flex flex-col overflow-hidden ${
            tier.featured
              ? "bg-[linear-gradient(180deg,#111118_0%,#0b0b12_100%)]"
              : "bg-gradient-to-b from-white/[0.04] to-transparent"
          }`}
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold tracking-tight text-white">
              {tier.name}
            </h3>
            <p className="text-sm leading-relaxed text-mist-300 max-w-[28ch]">
              {tier.tagline}
            </p>
          </div>

          <div className="mt-8">
            <PriceDisplay yearly={yearly} tier={tier} />
          </div>

          <Button
            variant={tier.featured ? "solid" : "outline"}
            size="md"
            as="a"
            href="#contact"
            className="mt-8 w-full"
          >
            {tier.cta}
            <ArrowUpRight className="size-4" />
          </Button>

          <div className="mt-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-mist-400">
              What&rsquo;s included
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <ul className="mt-6 flex flex-col gap-3">
            {tier.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 text-sm leading-relaxed text-mist-100"
              >
                <span
                  className={`mt-0.5 grid place-items-center size-4 rounded-full shrink-0 ${
                    tier.featured
                      ? "bg-brand-500/30 text-brand-100 ring-1 ring-brand-400/40"
                      : "bg-brand-500/15 text-brand-200"
                  }`}
                >
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="relative py-24 md:py-36 border-t border-white/5">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Transparent pricing. Senior teams only."
          description="Fixed-scope engagements with clear deliverables. No juniors, no account managers, no surprises."
        />

        <BillingToggle yearly={yearly} onChange={setYearly} />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch"
        >
          {TIERS.map((tier) => (
            <TierCard key={tier.name} tier={tier} yearly={yearly} />
          ))}
        </motion.div>

        <p className="mt-12 text-center text-sm text-mist-400">
          Every engagement includes a dedicated Slack channel, weekly async updates
          and a senior point of contact.
        </p>
      </Container>
    </section>
  );
}
