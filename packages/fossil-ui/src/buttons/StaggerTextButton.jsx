import { cn } from '../lib/cn.js'
import { createAnimatedButton } from './shared/createAnimatedButton.jsx'

const STAGGER_CHAR =
  'inline-block origin-bottom translate-y-0 text-inherit ' +
  'transition-[transform,color] duration-300 ease-out delay-0 ' +
  'group-hover:delay-[var(--stagger)] group-active:delay-[var(--stagger)] group-hover:-translate-y-[0.22em] group-active:-translate-y-[0.22em]'

/** Each letter lifts with a staggered delay on hover. */
export const StaggerTextButton = createAnimatedButton({
  displayName: 'StaggerTextButton',
  appearanceDefaults: { color: 'default', variant: 'solid' },
  animationClassName:
    'gap-0 overflow-visible border shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-neutral-300',
  /** Let each letter participate in the button flex row (matches original layout). */
  contentClassName: 'contents',
  renderContent: ({ label, appearance }) => {
    const chars = [...label]
    const baseContrastClass = appearance.variant === 'solid' ? appearance.accent.contrastText : ''

    return (
      <span className="inline-flex items-end leading-none" aria-hidden={false}>
        {chars.map((char, i) => (
          <span
            key={`${char}-${i}`}
            className={cn(STAGGER_CHAR, baseContrastClass, appearance.accent.staggerHover)}
            style={{ '--stagger': `${i * 48}ms` }}
          >
            {char === ' ' ? '\u00a0' : char}
          </span>
        ))}
      </span>
    )
  },
})
