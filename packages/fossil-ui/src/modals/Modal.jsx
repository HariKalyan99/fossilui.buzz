import { forwardRef } from 'react'
import { BlurOverlayModal } from './BlurOverlayModal.jsx'
import { DrawerRightModal } from './DrawerRightModal.jsx'
import { FadeModal } from './FadeModal.jsx'
import { ScaleModal } from './ScaleModal.jsx'
import { SlideDownModal } from './SlideDownModal.jsx'
import { SlideUpModal } from './SlideUpModal.jsx'

const MOTION_COMPONENTS = {
  fade: FadeModal,
  slideUp: SlideUpModal,
  slideDown: SlideDownModal,
  scale: ScaleModal,
  blurOverlay: BlurOverlayModal,
  drawerRight: DrawerRightModal,
}

export const MODAL_MOTIONS = /** @type {const} */ (Object.keys(MOTION_COMPONENTS))

/**
 * Standard modal with motion variants.
 * Example: <Modal motion="slideUp" open={open} onOpenChange={setOpen} title="Confirm" />
 */
export const Modal = forwardRef(function Modal({ motion = 'fade', ...props }, ref) {
  const Comp = MOTION_COMPONENTS[motion] ?? FadeModal
  return <Comp ref={ref} {...props} />
})
