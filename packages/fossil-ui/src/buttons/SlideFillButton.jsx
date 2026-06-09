import { cn } from '../lib/cn.js'
import { createAnimatedButton } from './shared/createAnimatedButton.jsx'

/** Accent fill slides up from the bottom on hover. */
export const SlideFillButton = createAnimatedButton({
  displayName: 'SlideFillButton',
  appearanceDefaults: { color: 'primary', variant: 'outlined' },
  animationClassName: 'relative overflow-hidden bg-white hover:bg-white',
  renderContent: ({ formattedChildren, appearance }) => (
    <>
      <span
        className={cn(
          'pointer-events-none absolute inset-x-[-1px] inset-y-0 rounded-[inherit]',
          'translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-y-0 group-active:translate-y-0',
          appearance.accent.fill,
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          'relative z-10 text-neutral-900 transition-colors duration-300',
          appearance.accent.hoverText,
        )}
      >
        {formattedChildren}
      </span>
    </>
  ),
})
