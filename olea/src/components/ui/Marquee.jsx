export default function Marquee({ items = [], className = "" }) {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 text-[11px] uppercase tracking-widest2 text-muted"
          >
            <span className="font-display text-ink/80 text-base normal-case tracking-normal">
              {item.name}
            </span>
            <span className="opacity-60">·</span>
            <span>{item.note}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
