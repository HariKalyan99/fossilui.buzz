export default function TrainerCard({ trainer, index, className = '' }) {
  const { name, role, specialties, bio, image, alt, position } = trainer

  return (
    <article data-trainer-card className={`group ${className}`}>
      <div className="relative aspect-[3/4] overflow-hidden bg-ink">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: position }}
          className="absolute inset-0 size-full object-cover grayscale transition-[transform,filter] duration-[1.2s] ease-expo group-hover:scale-105 group-hover:grayscale-0"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
        <span className="type-eyebrow absolute top-4 left-4 bg-ink px-2.5 py-1.5 text-volt">
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className="type-eyebrow absolute bottom-4 left-4 text-bone">{role}</p>
      </div>
      <h3 className="type-display mt-5 text-title text-ink">{name}</h3>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${name}'s specialties`}>
        {specialties.map((s) => (
          <li key={s} className="border border-ink/20 px-2.5 py-1 text-xs font-semibold text-ink">
            {s}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-steel">{bio}</p>
    </article>
  )
}
