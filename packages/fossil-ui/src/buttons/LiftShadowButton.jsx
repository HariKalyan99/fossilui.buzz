import { cn } from '../lib/cn.js'
import { createAnimatedButton } from './shared/createAnimatedButton.jsx'

/** Button lifts with a soft shadow on hover. */
export const LiftShadowButton = createAnimatedButton({
  displayName: 'LiftShadowButton',
  appearanceDefaults: { color: 'primary', variant: 'solid' },
  animationClassName: ({ appearance }) =>
    cn(
      'overflow-visible shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-[transform,translate,scale,rotate,box-shadow,background-color] delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,300ms)] ease-[var(--fossil-ease,ease-out)]',
      'hover:-translate-y-0.5 data-[touch]:-translate-y-0.5',
      appearance.accent.liftShadowHover,
      'active:translate-y-0',
      appearance.accent.liftShadowActive,
    ),
  renderContent: ({ formattedChildren }) => formattedChildren,
})
