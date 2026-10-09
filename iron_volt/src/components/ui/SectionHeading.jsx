import Reveal from '../animations/Reveal'
import SplitText from '../animations/SplitText'
import Eyebrow from './Eyebrow'

/**
 * Eyebrow + oversized split headline + optional supporting copy.
 * `title` may be a string or an array of lines; wrap a line in `{ accent }`
 * to highlight it in volt (dark surfaces only).
 */
export default function SectionHeading({
  id,
  eyebrow,
  index,
  title,
  copy,
  tone = 'dark',
  as: Heading = 'h2',
  size = 'text-headline',
  align = 'left',
  className = '',
  children,
}) {
  const lines = Array.isArray(title) ? title : [title]
  const dark = tone === 'dark'

  return (
    <Reveal className={`${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow && (
        <div data-reveal className={align === 'center' ? 'flex justify-center' : ''}>
          <Eyebrow index={index} tone={tone}>
            {eyebrow}
          </Eyebrow>
        </div>
      )}
      <Heading id={id} className={`type-display mt-6 ${size} ${dark ? 'text-bone' : 'text-ink'}`}>
        {lines.map((line, i) => {
          const accent = typeof line === 'object'
          const text = accent ? line.accent : line
          return (
            <span key={i} className={`block ${accent ? (dark ? 'text-volt' : 'text-ink/45') : ''}`}>
              <SplitText text={text} by="words" />
            </span>
          )
        })}
      </Heading>
      {copy && (
        <p
          data-reveal
          className={`mt-6 max-w-xl text-lead leading-relaxed ${align === 'center' ? 'mx-auto' : ''} ${dark ? 'text-ash' : 'text-steel'}`}
        >
          {copy}
        </p>
      )}
      {children}
    </Reveal>
  )
}
