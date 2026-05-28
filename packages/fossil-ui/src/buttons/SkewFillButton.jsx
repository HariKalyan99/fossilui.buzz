import { cn } from '../lib/cn.js'
import { createAnimatedButton } from './shared/createAnimatedButton.jsx'

/** Skewed accent panel slides in from the left on hover. */
export const SkewFillButton = createAnimatedButton({
  displayName: 'SkewFillButton',
  appearanceDefaults: { color: 'default', variant: 'outlined' },
  animationClassName: 'relative overflow-hidden',
  renderContent: ({ formattedChildren, appearance }) => (
    <>
      <span
        className={cn(
          'pointer-events-none absolute inset-y-0 left-0 w-full origin-left -skew-x-12 scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100 group-active:scale-x-100',
          appearance.accent.fill,
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          'relative z-10 transition-colors duration-300',
          appearance.accent.hoverText,
        )}
      >
        {formattedChildren}
      </span>
    </>
  ),
})
