import { createAnimatedButton } from './shared/createAnimatedButton.jsx'

/** Letter-spacing widens smoothly on hover. */
export const LetterSpacingButton = createAnimatedButton({
  displayName: 'LetterSpacingButton',
  animationClassName:
    'uppercase border border-neutral-200 bg-neutral-50 transition-colors delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,300ms)] ease-[var(--fossil-ease,var(--default-transition-timing-function))] hover:border-neutral-300 data-[touch]:border-neutral-300 hover:bg-white data-[touch]:bg-white',
  useAppearance: false,
  renderContent: ({ label }) => (
    <span className="inline-block tracking-[0.06em] transition-[letter-spacing] delay-[var(--fossil-delay,0ms)] duration-[var(--fossil-duration,500ms)] ease-[var(--fossil-ease,ease-out)] group-hover:tracking-[0.12em] group-data-[touch]:tracking-[0.12em] sm:tracking-[0.08em] sm:group-hover:tracking-[0.22em] sm:group-data-[touch]:tracking-[0.22em]">
      {label}
    </span>
  ),
})
