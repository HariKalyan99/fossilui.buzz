import {
  FossilHero,
  CenteredHero,
  SplitHero,
  EyebrowHero,
  GradientHero,
  DualCtaHero,
  StatsHero,
  MockupHero,
  MediaHero,
  MinimalHero,
  NewsletterHero,
} from '@fossilui/react'
import { FamilyDocPage } from '../components/docs/FamilyDocPage'
import {
  HERO_FAQS,
  HERO_IMPORT,
  HERO_INSTALL_SNIPPET,
  HERO_PROPS,
  HERO_VARIANTS,
  HERO_WHEN_TO_USE,
} from '../data/heroDocs'

const COMPONENTS = {
  CenteredHero,
  SplitHero,
  EyebrowHero,
  GradientHero,
  DualCtaHero,
  StatsHero,
  MockupHero,
  MediaHero,
  MinimalHero,
  NewsletterHero,
}

export default function Heroes() {
  return (
    <FamilyDocPage
      eyebrow="Hero blocks"
      title="Above-the-fold variants"
      description="Centered, split, stats, media, and newsletter hero layouts."
      importSnippet={HERO_IMPORT}
      installSnippet={HERO_INSTALL_SNIPPET}
      variants={HERO_VARIANTS}
      components={COMPONENTS}
      variantsGridClassName="xl:grid-cols-2"
      variantCardClassName="min-h-[300px]"
      previewCellClassName="w-full items-start justify-start overflow-hidden p-2"
      playgroundPreviewClassName="w-full items-start justify-start overflow-hidden p-2"
      renderPreview={(item) => (
        <div className="w-full overflow-hidden rounded-lg border border-neutral-200 bg-white">
          <FossilHero variant={item.id} compact />
        </div>
      )}
      motionProp="variant"
      motionOptions={HERO_VARIANTS.map((v) => ({ value: v.id, label: v.name }))}
      defaultMotion="centered"
      buildMotionSnippet={(variant) => HERO_VARIANTS.find((v) => v.id === variant)?.snippet ?? `<FossilHero variant="${variant}" />`}
      props={HERO_PROPS}
      faqs={HERO_FAQS}
      whenToUse={HERO_WHEN_TO_USE}
    />
  )
}
