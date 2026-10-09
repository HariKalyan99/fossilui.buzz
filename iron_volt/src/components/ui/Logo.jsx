import { Link } from 'react-router-dom'
import { site } from '../../data/site'

export default function Logo({ className = '', tone = 'light', onClick }) {
  const [first, second] = site.wordmark
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${site.name} home`}
      className={`type-display inline-flex items-baseline text-[1.05rem] tracking-[-0.02em] sm:text-xl ${className}`}
    >
      <span className={tone === 'light' ? 'text-bone' : 'text-ink'}>{first}</span>
      <span className={tone === 'light' ? 'text-volt' : 'text-ink/55'}>{second}</span>
    </Link>
  )
}
