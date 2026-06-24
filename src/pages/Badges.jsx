import {
  DefaultBadge,
  PulseBadge,
  ShineBadge,
  ScaleBadge,
  DotBadge,
  BorderGlowBadge,
} from '@fossilui/react'
import { FamilyDocPage } from '../components/docs/FamilyDocPage'
import {
  BADGE_FAQS,
  BADGE_IMPORT,
  BADGE_INSTALL_SNIPPET,
  BADGE_PROPS,
  BADGE_VARIANTS,
  BADGE_WHEN_TO_USE,
} from '../data/badgeDocs'

const COMPONENTS = {
  DefaultBadge,
  PulseBadge,
  ShineBadge,
  ScaleBadge,
  DotBadge,
  BorderGlowBadge,
}

export default function Badges() {
  return (
    <FamilyDocPage
      eyebrow="Badges"
      title="Status pill variants"
      description="Compact labels with pulse, shine, scale, dot, and border glow effects."
      importSnippet={BADGE_IMPORT}
      installSnippet={BADGE_INSTALL_SNIPPET}
      variants={BADGE_VARIANTS}
      components={COMPONENTS}
      renderPreview={(item, Comp) => <Comp {...(item.previewProps ?? {})} />}
      motionProp="motion"
      motionOptions={BADGE_VARIANTS.map((v) => ({ value: v.id, label: v.name }))}
      defaultMotion="default"
      buildMotionSnippet={(motion) => BADGE_VARIANTS.find((v) => v.id === motion)?.snippet ?? `<FossilBadge motion="${motion}">Label</FossilBadge>`}
      props={BADGE_PROPS}
      faqs={BADGE_FAQS}
      whenToUse={BADGE_WHEN_TO_USE}
    />
  )
}
