import { Link } from "react-router-dom";

export default function Logo({ className = "" }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-grad-primary shadow-glow">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none">
          <path
            d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5L12 3z"
            fill="currentColor"
          />
        </svg>
        <span className="absolute inset-0 rounded-lg ring-1 ring-white/20" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        Norwin<span className="gradient-text">.ai</span>
      </span>
    </Link>
  );
}
