import {
  DefaultSpinner,
  RingSpinner,
  DotsSpinner,
} from '@fossilui/react'
import { FamilyDocPage } from '../components/docs/FamilyDocPage'
import {
  SPINNER_FAQS,
  SPINNER_IMPORT,
  SPINNER_INSTALL_SNIPPET,
  SPINNER_PROPS,
  SPINNER_VARIANTS,
  SPINNER_WHEN_TO_USE,
} from '../data/spinnerDocs'

const COMPONENTS = {
  DefaultSpinner,
  RingSpinner,
  DotsSpinner,
}

export default function Spinners() {
  return (
    <FamilyDocPage
      eyebrow="Spinners"
      title="Loading indicator variants"
      description="Default ring, dual-tone ring, and dot motion presets."
      importSnippet={SPINNER_IMPORT}
      installSnippet={SPINNER_INSTALL_SNIPPET}
      variants={SPINNER_VARIANTS}
      components={COMPONENTS}
      renderPreview={(item, Comp) => <Comp {...(item.previewProps ?? {})} />}
      motionProp="motion"
      motionOptions={SPINNER_VARIANTS.map((v) => ({ value: v.id, label: v.name }))}
      defaultMotion="default"
      buildMotionSnippet={(motion) => SPINNER_VARIANTS.find((v) => v.id === motion)?.snippet ?? `<FossilSpinner motion="${motion}" size="md" label="Loading" />`}
      props={SPINNER_PROPS}
      faqs={SPINNER_FAQS}
      whenToUse={SPINNER_WHEN_TO_USE}
    />
  )
}
