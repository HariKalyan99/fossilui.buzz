import { Link } from 'react-router-dom'

export function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label="FossilUI home"
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <span className="relative inline-flex h-7 w-7 items-center justify-center">
        <img
          src="/Rex.svg"
          alt=""
          aria-hidden="true"
          className="h-5 w-5 object-contain"
          draggable="false"
        />
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-neutral-900">
        Fossil<span className="text-neutral-500">UI</span>
      </span>
    </Link>
  )
}
