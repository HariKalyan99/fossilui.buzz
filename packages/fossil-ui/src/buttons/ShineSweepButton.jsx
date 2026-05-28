import { createAnimatedButton } from './shared/createAnimatedButton.jsx'

/** Diagonal light sweep glides across the surface on hover. */
export const ShineSweepButton = createAnimatedButton({
  displayName: 'ShineSweepButton',
  appearanceDefaults: { color: 'default', variant: 'solid' },
  animationClassName: 'relative overflow-hidden shadow-[0_1px_2px_rgba(15,23,42,0.06)]',
  renderContent: ({ formattedChildren }) => (
    <>
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full group-active:translate-x-full"
        aria-hidden="true"
      />
      <span className="relative z-10">{formattedChildren}</span>
    </>
  ),
})
