import { Link } from 'react-router-dom'

const LOGO_PX = 36

export function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label="FossilUI home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <img
        src="/Rex.svg"
        alt=""
        aria-hidden="true"
        width={LOGO_PX}
        height={LOGO_PX}
        className="h-9 w-9 shrink-0 object-contain [transform:translateZ(0)]"
        draggable="false"
      />
      <span className="text-[15px] font-semibold tracking-tight text-neutral-900">
        Fossil<span className="text-neutral-500">UI</span>
      </span>
    </Link>
  )
}
