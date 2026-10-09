/** Infinite text band. Pure CSS; stops automatically under reduced motion. */
export default function Marquee({ words, className = '', duration = 32 }) {
  const row = (hidden) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {words.map((w) => (
        <li key={w} className="type-display flex items-center px-6 text-[clamp(2rem,5vw,4.5rem)] sm:px-10">
          {w}
          <span aria-hidden="true" className="ml-12 inline-block size-3 rotate-45 bg-current sm:ml-20 sm:size-4" />
        </li>
      ))}
    </ul>
  )

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="animate-marquee flex w-max" style={{ '--marquee-duration': `${duration}s` }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
