import { forwardRef } from 'react'
import {
  BlurInModal,
  BottomSheetModal,
  DrawerModal,
  FlipModal,
  ScaleFadeModal,
  SlideDownModal,
  SlideUpModal,
  ZoomBounceModal,
} from './variants.jsx'

const MOTION_COMPONENTS = {
  scaleFade: ScaleFadeModal,
  slideUp: SlideUpModal,
  slideDown: SlideDownModal,
  zoomBounce: ZoomBounceModal,
  flip: FlipModal,
  blurIn: BlurInModal,
  drawer: DrawerModal,
  bottomSheet: BottomSheetModal,
}

export const MODAL_MOTIONS = /** @type {const} */ (Object.keys(MOTION_COMPONENTS))

/**
 * Standard entrypoint with motion variants.
 * Example: <Modal motion="scaleFade" open={open} onClose={() => setOpen(false)} title="Title" />
 */
export const Modal = forwardRef(function Modal({ motion = 'scaleFade', ...props }, ref) {
  const Comp = MOTION_COMPONENTS[motion] ?? ScaleFadeModal
  return <Comp ref={ref} {...props} />
})

export { MODAL_SIZES, MODAL_TONES } from './shared/constants.js'
