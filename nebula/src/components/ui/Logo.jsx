export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative grid place-items-center size-8 rounded-xl bg-gradient-to-br from-brand-400 via-brand-500 to-accent-400 shadow-[0_6px_24px_-6px_rgba(106,119,255,0.8)]">
        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/30" />
        <svg
          viewBox="0 0 24 24"
          className="relative size-4 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 18c3-6 5-9 8-12" />
          <path d="M4 18c6-3 9-5 12-8" />
        </svg>
      </span>
      <span className="text-[17px] font-semibold tracking-[-0.01em]">
        Nebula
      </span>
    </div>
  );
}
