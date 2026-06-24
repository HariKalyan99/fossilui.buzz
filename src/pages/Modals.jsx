import { useState } from 'react'
import {
  Modal,
  FadeModal,
  SlideUpModal,
  SlideDownModal,
  ScaleModal,
  BlurOverlayModal,
  DrawerRightModal,
} from '@fossilui/react'
import { Button } from '../components/ui/Button'
import { FamilyDocPage } from '../components/docs/FamilyDocPage'
import {
  MODAL_FAQS,
  MODAL_IMPORT,
  MODAL_INSTALL_SNIPPET,
  MODAL_PROPS,
  MODAL_VARIANTS,
  MODAL_WHEN_TO_USE,
} from '../data/modalDocs'
import { motionSnippet } from '../data/sharedDocs'

const COMPONENTS = {
  FadeModal,
  SlideUpModal,
  SlideDownModal,
  ScaleModal,
  BlurOverlayModal,
  DrawerRightModal,
}

function ModalPreview({ motion, title = 'Preview modal' }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        Open
      </Button>
      <Modal open={open} onOpenChange={setOpen} motion={motion} title={title} size="sm">
        <p className="text-[13px] text-neutral-600">Modal body content.</p>
      </Modal>
    </>
  )
}

export default function Modals() {
  return (
    <FamilyDocPage
      eyebrow="Modals"
      title="Dialog variants"
      description="Focus-friendly modals with fade, slide, scale, blur overlay, and drawer motion."
      importSnippet={MODAL_IMPORT}
      installSnippet={MODAL_INSTALL_SNIPPET}
      variants={MODAL_VARIANTS}
      components={COMPONENTS}
      renderPreview={(item) => <ModalPreview motion={item.id} title={item.name} />}
      motionProp="motion"
      motionOptions={MODAL_VARIANTS.map((v) => ({ value: v.id, label: v.name }))}
      defaultMotion="fade"
      buildMotionSnippet={(motion) => MODAL_VARIANTS.find((v) => v.id === motion)?.snippet ?? motionSnippet('Modal', 'motion', motion, 'open={open}\n  onOpenChange={setOpen}\n  title="Title"')}
      props={MODAL_PROPS}
      faqs={MODAL_FAQS}
      whenToUse={MODAL_WHEN_TO_USE}
    />
  )
}
