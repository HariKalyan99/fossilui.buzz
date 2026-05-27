import { cn } from '../lib/cn.js'
import { createAnimatedButton } from './shared/createAnimatedButton.jsx'

/** Top and bottom borders grow from the center on hover. */
export const BorderRevealButton = createAnimatedButton({
  displayName: 'BorderRevealButton',
  animationClassName: 'relative bg-transparent text-neutral-900',
  useAppearance: false,
  renderContent: ({ formattedChildren, appearance }) => (
    <>
      <span
        className={cn(
          'pointer-events-none absolute inset-x-4 top-0 h-px origin-center scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100',
          appearance.accent.line,
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          'pointer-events-none absolute inset-x-4 bottom-0 h-px origin-center scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100',
          appearance.accent.line,
        )}
        style={{ transitionDelay: '60ms' }}
        aria-hidden="true"
      />
      <span className="relative z-10 transition-transform duration-300 group-hover:scale-[1.02]">
        {formattedChildren}
      </span>
    </>
  ),
})
