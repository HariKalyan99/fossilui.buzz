import { forwardRef } from 'react'
import { ModalShell } from './shared/ModalShell.jsx'

function createModalVariant(displayName, motion) {
  const Component = forwardRef(function AnimatedModal(props, ref) {
    return <ModalShell ref={ref} {...props} motion={motion} />
  })
  Component.displayName = displayName
  return Component
}

/** Panel scales up from 95% while fading in. */
export const ScaleFadeModal = createModalVariant('ScaleFadeModal', 'scaleFade')

/** Panel rises from below the center. */
export const SlideUpModal = createModalVariant('SlideUpModal', 'slideUp')

/** Panel drops in from above the center. */
export const SlideDownModal = createModalVariant('SlideDownModal', 'slideDown')

/** Springy overshoot zoom for celebratory moments. */
export const ZoomBounceModal = createModalVariant('ZoomBounceModal', 'zoomBounce')

/** Panel flips forward on the X axis with perspective. */
export const FlipModal = createModalVariant('FlipModal', 'flip')

/** Panel sharpens from a soft blur. */
export const BlurInModal = createModalVariant('BlurInModal', 'blurIn')

/** Side sheet that slides in from the right edge. */
export const DrawerModal = createModalVariant('DrawerModal', 'drawer')

/** Sheet that slides up from the bottom edge. */
export const BottomSheetModal = createModalVariant('BottomSheetModal', 'bottomSheet')
