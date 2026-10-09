import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Logo from '../ui/Logo'
import { legalNav, mainNav, site } from '../../data/site'
import { programs } from '../../data/programs'
import { memberships } from '../../data/memberships'

function Column({ title, children }) {
  return (
    <div>
      <h2 className="type-eyebrow text-ash">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm text-bone/85">{children}</ul>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-charcoal pt-20 text-bone">
      <div className="container-x">
        <div className="grid gap-12 border-b border-bone/10 pb-16 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-ash">
              Strength, conditioning and performance coaching. Train with purpose. Build strength. Become harder to
              stop.
            </p>
            <Link
              to="/book-trial"
              className="type-eyebrow group mt-8 inline-flex items-center gap-2 text-volt"
            >
              <span className="link-underline pb-1">Book a trial session</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-500 ease-expo group-hover:rotate-45"
              />
            </Link>
          </div>

          <Column title="Navigate">
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="link-underline hover:text-volt">
                  {item.label}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Programs">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link to={`/programs#${p.slug}`} className="link-underline hover:text-volt">
                  {p.title}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Membership">
            {memberships.map((m) => (
              <li key={m.id}>
                <Link to={`/book-trial?plan=${m.id}`} className="link-underline hover:text-volt">
                  {m.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/membership" className="link-underline hover:text-volt">
                Compare plans
              </Link>
            </li>
          </Column>

          <Column title="Contact">
            <li>
              <a href={`mailto:${site.contact.email}`} className="link-underline break-all hover:text-volt">
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={site.contact.phoneHref} className="link-underline hover:text-volt">
                {site.contact.phone}
              </a>
            </li>
            <li className="text-ash">
              {site.contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </li>
            <li className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline hover:text-volt"
                >
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </li>
          </Column>
        </div>

        <div className="flex flex-col gap-4 py-8 text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-2">
            <span>Built by</span>
            <a
              href="https://fossilui.buzz"
              target="_blank"
              rel="noopener noreferrer"
              className="group font-medium"
            >
              <span className="text-bone transition-colors group-hover:text-volt">Fossil</span>
              <span className="text-ash underline underline-offset-2 transition-colors group-hover:text-volt">UI</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="link-underline hover:text-bone">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="type-display pointer-events-none -mb-[0.2em] select-none text-center text-[11.5vw] leading-none text-bone/[0.04]"
      >
        {site.name}
      </p>
    </footer>
  )
}
