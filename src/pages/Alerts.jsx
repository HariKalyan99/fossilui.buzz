import {
  InfoAlert,
  SuccessAlert,
  WarningAlert,
  DangerAlert,
} from '@fossilui/react'
import { FamilyDocPage } from '../components/docs/FamilyDocPage'
import {
  ALERT_FAQS,
  ALERT_IMPORT,
  ALERT_INSTALL_SNIPPET,
  ALERT_PROPS,
  ALERT_VARIANTS,
  ALERT_WHEN_TO_USE,
} from '../data/alertDocs'

const COMPONENTS = {
  InfoAlert,
  SuccessAlert,
  WarningAlert,
  DangerAlert,
}

export default function Alerts() {
  return (
    <FamilyDocPage
      eyebrow="Alerts"
      title="Inline banner variants"
      description="Semantic alerts for info, success, warning, and danger messaging."
      importSnippet={ALERT_IMPORT}
      installSnippet={ALERT_INSTALL_SNIPPET}
      variants={ALERT_VARIANTS}
      components={COMPONENTS}
      previewCellClassName="w-full items-stretch justify-start"
      playgroundPreviewClassName="w-full items-stretch justify-start"
      renderPreview={(item, Comp) => <Comp className="w-full" {...(item.previewProps ?? {})} />}
      motionProp="variant"
      motionOptions={ALERT_VARIANTS.map((v) => ({ value: v.id, label: v.name }))}
      defaultMotion="info"
      buildMotionSnippet={(variant) => ALERT_VARIANTS.find((v) => v.id === variant)?.snippet ?? `<FossilAlert variant="${variant}" title="Title">Message</FossilAlert>`}
      props={ALERT_PROPS}
      faqs={ALERT_FAQS}
      whenToUse={ALERT_WHEN_TO_USE}
    />
  )
}
