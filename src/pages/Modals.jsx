import { useState } from 'react'
import {
  ScaleFadeModal,
  SlideUpModal,
  SlideDownModal,
  ZoomBounceModal,
  FlipModal,
  BlurInModal,
  DrawerModal,
  BottomSheetModal,
} from '@fossilui/react'
import { ComponentDocPage } from '../components/docs/ComponentDocPage'
import { DemoTrigger } from '../components/modals/DemoTrigger'
import { ModalConfigurator } from '../components/modals/ModalConfigurator'
import {
  MODAL_DEMO,
  MODAL_FAQS,
  MODAL_IMPORT_SNIPPET,
  MODAL_IMPORT_SNIPPETS,
  MODAL_MOTION_COMPATIBILITY,
  MODAL_PROPS,
  MODAL_VARIANTS,
  MODAL_WHEN_TO_USE,
} from '../data/modalDocs'

const MODAL_COMPONENTS = {
  ScaleFadeModal,
  SlideUpModal,
  SlideDownModal,
  ZoomBounceModal,
  FlipModal,
  BlurInModal,
  DrawerModal,
  BottomSheetModal,
}

function ModalTile({ item }) {
  const [open, setOpen] = useState(false)
  const ModalComp = MODAL_COMPONENTS[item.component]

  return (
    <>
      <DemoTrigger onClick={() => setOpen(true)}>Open {item.name.toLowerCase()}</DemoTrigger>
      <ModalComp {...MODAL_DEMO} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default function Modals() {
  return (
    <ComponentDocPage
      slug="modals"
      eyebrow="Modals"
      title="Animated modal variants"
      description="Open every variant, then install from @fossilui/react or @fossilui/modals, configure props, and copy a ready-to-use example into your app."
      variants={{
        description:
          'Open each modal to preview its entrance and exit, then copy a complete example with open state wired up.',
        tag: 'Live from @fossilui/react and @fossilui/modals',
        items: MODAL_VARIANTS,
        renderPreview: (item) => <ModalTile item={item} />,
      }}
      importGuide={{
        description:
          'Install the package you need, add the matching Tailwind @source snippet, then import Modal or a named variant.',
        snippets: MODAL_IMPORT_SNIPPETS,
        importCode: MODAL_IMPORT_SNIPPET,
      }}
      whenToUse={{
        description:
          'Interrupt only when a decision is required — the motion should make the context switch feel smooth, not dramatic.',
        items: MODAL_WHEN_TO_USE,
      }}
      configurator={<ModalConfigurator />}
      api={{
        description:
          'All animated modals share the same props. Extra attributes are forwarded to the dialog panel.',
        props: MODAL_PROPS,
        compatibility: MODAL_MOTION_COMPATIBILITY,
        compatibilityDescription:
          'Use this matrix to pick a motion that suits the moment. Layout motions (drawer, bottomSheet) also change where the panel sits.',
      }}
      faq={{
        description: 'Common questions about accessibility, state, and styling for @fossilui modals.',
        items: MODAL_FAQS,
      }}
    />
  )
}
