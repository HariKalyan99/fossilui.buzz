import { cn } from "../../lib/cn";

const SIZES = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-24 w-24 text-2xl",
  "2xl": "h-32 w-32 text-3xl",
};

export function Avatar({ src, name = "?", size = "md", className, ring = false }) {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-2 font-semibold text-soft",
        ring &&
          "ring-2 ring-offset-2 ring-offset-[rgb(var(--bg))] ring-brand-500/70",
        SIZES[size],
        className
      )}
      aria-label={name}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center gradient-brand text-white",
          src && "opacity-0"
        )}
      >
        {initials || "?"}
      </span>
    </span>
  );
}
