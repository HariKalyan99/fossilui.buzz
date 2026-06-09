import { createAnimatedButton } from './shared/createAnimatedButton.jsx'

/** Label rolls upward on hover — duplicate line slides into view. */
export const RollTextButton = createAnimatedButton({
  displayName: 'RollTextButton',
  appearanceDefaults: { color: 'default', variant: 'solid' },
  animationClassName:
    'relative overflow-hidden shadow-[0_1px_2px_rgba(15,23,42,0.06)]',
  renderLoadingContent: ({ label, formattedChildren }) => (
    <span className="relative z-10 whitespace-nowrap">
      {formattedChildren ?? label}
    </span>
  ),
  renderContent: ({ label }) => (
    <>
      <span className="invisible block whitespace-nowrap" aria-hidden="true">
        {label}
      </span>
      <span className="absolute inset-x-0 top-0 flex w-full flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[var(--fossil-btn-h)] group-active:-translate-y-[var(--fossil-btn-h)]">
        <span className="flex h-[var(--fossil-btn-h)] items-center justify-center leading-none">
          {label}
        </span>
        <span
          className="flex h-[var(--fossil-btn-h)] items-center justify-center leading-none"
          aria-hidden="true"
        >
          {label}
        </span>
      </span>
    </>
  ),
})
