import {
  DefaultInput,
  UnderlineInput,
  FilledInput,
  GhostInput,
  RingGlowInput,
  CompactInput,
  SearchInput,
  TextareaInput,
  SelectInput,
  CheckboxInput,
  SwitchInput,
  FieldInput,
  ErrorInput,
  SuccessInput,
} from '@fossilui/react'
import { FamilyDocPage } from '../components/docs/FamilyDocPage'
import {
  INPUT_FAQS,
  INPUT_IMPORT,
  INPUT_INSTALL_SNIPPET,
  INPUT_PROPS,
  INPUT_VARIANTS,
  INPUT_WHEN_TO_USE,
} from '../data/inputDocs'

const COMPONENTS = {
  DefaultInput,
  UnderlineInput,
  FilledInput,
  GhostInput,
  RingGlowInput,
  CompactInput,
  SearchInput,
  TextareaInput,
  SelectInput,
  CheckboxInput,
  SwitchInput,
  FieldInput,
  ErrorInput,
  SuccessInput,
}

function InputPreview({ item, Comp }) {
  if (item.id === 'select') {
    return (
      <Comp defaultValue="starter" className="w-full max-w-[220px]">
        <option value="starter">Starter</option>
        <option value="pro">Pro</option>
      </Comp>
    )
  }
  if (item.id === 'field') {
    return <div className="w-full max-w-[220px]"><Comp /></div>
  }
  if (item.id === 'textarea') {
    return <Comp className="w-full max-w-[220px]" rows={3} {...(item.previewProps ?? {})} />
  }
  return <Comp className="w-full max-w-[220px]" {...(item.previewProps ?? {})} />
}

export default function Inputs() {
  return (
    <FamilyDocPage
      eyebrow="Inputs"
      title="Form control variants"
      description="Text fields, selects, toggles, and form helpers with validation and focus states."
      importSnippet={INPUT_IMPORT}
      installSnippet={INPUT_INSTALL_SNIPPET}
      variants={INPUT_VARIANTS}
      components={COMPONENTS}
      previewCellClassName="w-full items-center justify-center"
      renderPreview={(item, Comp) => <InputPreview item={item} Comp={Comp} />}
      motionProp="motion"
      motionOptions={INPUT_VARIANTS.map((v) => ({ value: v.id, label: v.name }))}
      defaultMotion="default"
      buildMotionSnippet={(motion) => INPUT_VARIANTS.find((v) => v.id === motion)?.snippet ?? `<FossilInput motion="${motion}" placeholder="Enter text" />`}
      props={INPUT_PROPS}
      faqs={INPUT_FAQS}
      whenToUse={INPUT_WHEN_TO_USE}
    />
  )
}
