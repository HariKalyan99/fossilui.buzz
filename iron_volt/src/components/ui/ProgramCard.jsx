import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function ProgramCard({ program, index, className = '' }) {
  const { slug, title, short, image, alt, position, layout } = program

  return (
    <article data-program-card className={`group ${layout.span} ${layout.offset ?? ''} ${className}`}>
      <Link
        to={`/programs#${slug}`}
        className="block focus-visible:outline-offset-8"
        aria-label={`${title}: view program`}
      >
        <div className={`relative overflow-hidden bg-ink ${layout.aspect}`}>
          <img
            src={image}
            alt={alt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: position }}
            className="absolute inset-0 size-full object-cover grayscale-[35%] transition-[transform,filter] duration-[1.2s] ease-expo group-hover:scale-[1.06] group-hover:grayscale-0 group-focus-visible:scale-[1.06]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100"
          />
          <span className="type-display absolute top-4 left-4 text-sm text-bone sm:top-5 sm:left-5">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            aria-hidden="true"
            className="absolute right-4 bottom-4 grid size-12 translate-y-2 place-items-center bg-volt text-ink opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:right-5 sm:bottom-5"
          >
            <ArrowUpRight className="size-5" strokeWidth={2.25} />
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-6 border-t border-ink/15 pt-5">
          <div>
            <h3 className="type-display text-title text-ink">{title}</h3>
            <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-steel">{short}</p>
          </div>
          <span aria-hidden="true" className="type-eyebrow mt-1 hidden shrink-0 text-ink sm:inline lg:hidden xl:inline">
            <span className="link-underline bg-[length:0%_1px] pb-1 group-hover:bg-[length:100%_1px]">View</span>
          </span>
        </div>
      </Link>
    </article>
  )
}
