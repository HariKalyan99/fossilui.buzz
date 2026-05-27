import { cn } from '../lib/cn.js'
import { createAnimatedButton } from './shared/createAnimatedButton.jsx'

/** Button lifts with a soft shadow on hover. */
export const LiftShadowButton = createAnimatedButton({
  displayName: 'LiftShadowButton',
  appearanceDefaults: { color: 'primary', variant: 'solid' },
  animationClassName: cn(
    'overflow-visible shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-[transform,box-shadow,background-color] duration-300 ease-out',
    'hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-6px_rgba(79,70,229,0.45)]',
    'active:translate-y-0 active:shadow-[0_2px_8px_-4px_rgba(79,70,229,0.35)]',
  ),
  renderContent: ({ formattedChildren }) => formattedChildren,
})
