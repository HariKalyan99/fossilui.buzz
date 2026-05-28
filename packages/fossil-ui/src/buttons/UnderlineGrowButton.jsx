import { cn } from '../lib/cn.js'
import { createAnimatedButton } from './shared/createAnimatedButton.jsx'

/** Underline grows from the center beneath the label. */
export const UnderlineGrowButton = createAnimatedButton({
  displayName: 'UnderlineGrowButton',
  animationClassName: 'bg-transparent text-neutral-900',
  useAppearance: false,
  renderContent: ({ formattedChildren, appearance }) => (
    <span className="relative">
      {formattedChildren}
      <span
        className={cn(
          'absolute -bottom-1 left-1/2 h-px w-full origin-center -translate-x-1/2 scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 group-active:scale-x-100',
          appearance.accent.line,
        )}
        aria-hidden="true"
      />
    </span>
  ),
})
