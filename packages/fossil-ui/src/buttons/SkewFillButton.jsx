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
          'pointer-events-none absolute inset-y-0 left-0 w-full origin-left -skew-x-12 scale-x-0 transition-transform delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,500ms)] ease-[var(--fossil-ease,var(--fossil-ease-in-out))] group-hover:scale-x-100 group-data-[touch]:scale-x-100',
          appearance.accent.fill,
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          'relative z-10 transition-colors delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,300ms)] ease-[var(--fossil-ease,var(--default-transition-timing-function))]',
          appearance.accent.hoverText,
        )}
      >
        {formattedChildren}
      </span>
    </>
  ),
})
