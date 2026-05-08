// Lightweight relative time formatting.
const DIVS = [
  { unit: "y", secs: 60 * 60 * 24 * 365 },
  { unit: "mo", secs: 60 * 60 * 24 * 30 },
  { unit: "w", secs: 60 * 60 * 24 * 7 },
  { unit: "d", secs: 60 * 60 * 24 },
  { unit: "h", secs: 60 * 60 },
  { unit: "m", secs: 60 },
];

export function relativeTime(iso) {
  const ts = typeof iso === "number" ? iso : new Date(iso).getTime();
  const diff = Math.max(0, Date.now() - ts) / 1000;
  if (diff < 30) return "just now";
  for (const d of DIVS) {
    if (diff >= d.secs) {
      return `${Math.floor(diff / d.secs)}${d.unit}`;
    }
  }
  return `${Math.floor(diff)}s`;
}

export function formatCount(n) {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(n < 10_000 ? 1 : 0)}K`.replace(".0", "");
  return `${(n / 1_000_000).toFixed(1)}M`.replace(".0", "");
}
