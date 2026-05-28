import { Link } from 'react-router-dom'
import { RexMark } from './RexMark'

const LOGO_PX = 36

export function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label="FossilUI home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <RexMark size={LOGO_PX} />
      <span className="text-[15px] font-semibold tracking-tight text-neutral-900">
        Fossil<span className="text-neutral-500">UI</span>
      </span>
    </Link>
  )
}
