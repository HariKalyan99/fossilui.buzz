import { cn } from '../../lib/cn.js'

/**
 * @param {'fade' | 'slideUp' | 'slideDown' | 'scale' | 'blurOverlay' | 'drawerRight'} motion
 * @param {boolean} visible
 */
export function getModalMotionClasses(motion, visible) {
  const overlayBase = 'transition-all duration-200 ease-out'
  const panelBase = 'transition-all duration-200 ease-out'

  switch (motion) {
    case 'slideUp':
      return {
        container: 'items-center justify-center p-4',
        overlay: cn(overlayBase, visible ? 'opacity-100' : 'opacity-0'),
        panel: cn(panelBase, visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'),
      }
    case 'slideDown':
      return {
        container: 'items-start justify-center p-4 pt-10',
        overlay: cn(overlayBase, visible ? 'opacity-100' : 'opacity-0'),
        panel: cn(panelBase, visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'),
      }
    case 'scale':
      return {
        container: 'items-center justify-center p-4',
        overlay: cn(overlayBase, visible ? 'opacity-100' : 'opacity-0'),
        panel: cn(panelBase, visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'),
      }
    case 'blurOverlay':
      return {
        container: 'items-center justify-center p-4',
        overlay: cn(
          overlayBase,
          visible ? 'opacity-100 backdrop-blur-md bg-neutral-900/45' : 'opacity-0 backdrop-blur-none bg-neutral-900/20',
        ),
        panel: cn(panelBase, visible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'),
      }
    case 'drawerRight':
      return {
        container: 'items-stretch justify-end p-0',
        overlay: cn(overlayBase, visible ? 'opacity-100' : 'opacity-0'),
        panel: cn(
          panelBase,
          'h-full max-h-none rounded-none border-y-0 border-r-0 max-w-md',
          visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-100',
        ),
      }
    case 'fade':
    default:
      return {
        container: 'items-center justify-center p-4',
        overlay: cn(overlayBase, visible ? 'opacity-100' : 'opacity-0'),
        panel: cn(panelBase, visible ? 'opacity-100' : 'opacity-0'),
      }
  }
}
