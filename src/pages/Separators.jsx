import {
  HorizontalSeparator,
  VerticalSeparator,
  LabeledSeparator,
} from '@fossilui/react'
import { FamilyDocPage } from '../components/docs/FamilyDocPage'
import {
  SEPARATOR_FAQS,
  SEPARATOR_IMPORT,
  SEPARATOR_INSTALL_SNIPPET,
  SEPARATOR_PROPS,
  SEPARATOR_VARIANTS,
  SEPARATOR_WHEN_TO_USE,
} from '../data/separatorDocs'

const COMPONENTS = {
  HorizontalSeparator,
  VerticalSeparator,
  LabeledSeparator,
}

function SeparatorPreview({ item, Comp }) {
  if (item.id === 'vertical') {
    return (
      <div className="flex h-12 items-center gap-3 text-[11px] text-neutral-500">
        <span>Left</span>
        <Comp />
        <span>Right</span>
      </div>
    )
  }
  return <Comp className="w-full max-w-[220px]" {...(item.previewProps ?? {})} />
}

export default function Separators() {
  return (
    <FamilyDocPage
      eyebrow="Separators"
      title="Divider variants"
      description="Horizontal, vertical, and labeled dividers for stacking content."
      importSnippet={SEPARATOR_IMPORT}
      installSnippet={SEPARATOR_INSTALL_SNIPPET}
      variants={SEPARATOR_VARIANTS}
      components={COMPONENTS}
      renderPreview={(item, Comp) => <SeparatorPreview item={item} Comp={Comp} />}
      motionProp="variant"
      motionOptions={SEPARATOR_VARIANTS.map((v) => ({ value: v.id, label: v.name }))}
      defaultMotion="horizontal"
      buildMotionSnippet={(variant) => SEPARATOR_VARIANTS.find((v) => v.id === variant)?.snippet ?? `<FossilSeparator variant="${variant}" />`}
      props={SEPARATOR_PROPS}
      faqs={SEPARATOR_FAQS}
      whenToUse={SEPARATOR_WHEN_TO_USE}
    />
  )
}
