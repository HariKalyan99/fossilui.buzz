import { createAnimatedButton } from './shared/createAnimatedButton.jsx'

/** Letter-spacing widens smoothly on hover. */
export const LetterSpacingButton = createAnimatedButton({
  displayName: 'LetterSpacingButton',
  animationClassName:
    'uppercase border border-neutral-200 bg-neutral-50 transition-colors duration-300 hover:border-neutral-300 hover:bg-white',
  useAppearance: false,
  renderContent: ({ label }) => (
    <span className="inline-block tracking-[0.06em] transition-[letter-spacing] duration-500 ease-out group-hover:tracking-[0.12em] sm:tracking-[0.08em] sm:group-hover:tracking-[0.22em]">
      {label}
    </span>
  ),
})
