import { Fragment } from 'react'

/**
 * Splits text into masked words (and optionally characters) rendered as
 * spans, so GSAP can animate `[data-split-char]` / `[data-split-word]`
 * without measuring layout. Screen readers receive the original text once.
 */
export default function SplitText({ text, by = 'chars', className = '', wordClassName = '' }) {
  const words = text.split(' ')

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <Fragment key={`${word}-${wi}`}>
            <span className={`inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-top ${wordClassName}`}>
              {by === 'chars' ? (
                [...word].map((char, ci) => (
                  <span key={ci} data-split-char="" className="inline-block will-change-transform">
                    {char}
                  </span>
                ))
              ) : (
                <span data-split-word="" className="inline-block will-change-transform">
                  {word}
                </span>
              )}
            </span>
            {wi < words.length - 1 && ' '}
          </Fragment>
        ))}
      </span>
    </span>
  )
}
