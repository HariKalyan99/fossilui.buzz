import { forwardRef } from 'react'
import { Hero } from './Hero.jsx'

const DEMO_STATS = [
  { label: 'Components', value: '50+' },
  { label: 'Variants', value: '60+' },
  { label: 'Install', value: '1 pkg' },
]

export const CenteredHero = forwardRef((props, ref) => <Hero ref={ref} variant="centered" {...props} />)
export const SplitHero = forwardRef((props, ref) => (
  <Hero ref={ref} variant="split" imageSrc="/14.jpg" imageAlt="Preview" {...props} />
))
export const EyebrowHero = forwardRef((props, ref) => (
  <Hero ref={ref} variant="eyebrow" eyebrow="Fossil UI" {...props} />
))
export const GradientHero = forwardRef((props, ref) => <Hero ref={ref} variant="gradient" {...props} />)
export const DualCtaHero = forwardRef((props, ref) => <Hero ref={ref} variant="dualCta" {...props} />)
export const StatsHero = forwardRef((props, ref) => (
  <Hero ref={ref} variant="stats" stats={DEMO_STATS} {...props} />
))
export const MockupHero = forwardRef((props, ref) => <Hero ref={ref} variant="mockup" {...props} />)
export const MediaHero = forwardRef((props, ref) => (
  <Hero ref={ref} variant="media" imageSrc="/14.jpg" imageAlt="Hero media" {...props} />
))
export const MinimalHero = forwardRef((props, ref) => (
  <Hero ref={ref} variant="minimal" title="Ship faster." description="Minimal hero with oversized type." {...props} />
))
export const NewsletterHero = forwardRef((props, ref) => (
  <Hero ref={ref} variant="newsletter" title="Stay in the loop" description="Get updates when new families ship." {...props} />
))

const VARIANT_COMPONENTS = {
  centered: CenteredHero,
  split: SplitHero,
  eyebrow: EyebrowHero,
  gradient: GradientHero,
  dualCta: DualCtaHero,
  stats: StatsHero,
  mockup: MockupHero,
  media: MediaHero,
  minimal: MinimalHero,
  newsletter: NewsletterHero,
}

export const HERO_VARIANTS = /** @type {const} */ (Object.keys(VARIANT_COMPONENTS))

export const FossilHero = forwardRef(function FossilHero({ variant = 'centered', ...props }, ref) {
  const Comp = VARIANT_COMPONENTS[variant] ?? CenteredHero
  return <Comp ref={ref} {...props} />
})
