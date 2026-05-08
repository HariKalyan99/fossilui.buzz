import { Link } from "react-router-dom";
import { brand, contact } from "../../data/content";

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="container-x py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <Link
              to="/"
              className="font-display text-5xl md:text-6xl leading-none tracking-tight inline-block"
            >
              {brand.name}
              <span className="text-bronze">.</span>
            </Link>
            <p className="mt-6 max-w-sm text-ivory/65 text-pretty">
              {brand.short}
            </p>
            <div className="mt-10 flex gap-3">
              <Link to="/reservations" className="btn-ghost-light">
                Reserve
              </Link>
              <a
                href={`mailto:${contact.email}`}
                className="btn !border-0 text-ivory/70 hover:text-ivory link-underline"
              >
                Write to us
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-ivory/50">Visit</p>
            <ul className="mt-5 space-y-1 text-ivory/80">
              {contact.address.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="mt-6 eyebrow text-ivory/50">Contact</p>
            <ul className="mt-5 space-y-1 text-ivory/80">
              <li>
                <a
                  className="link-underline"
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a className="link-underline" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-ivory/50">Explore</p>
            <ul className="mt-5 space-y-2 text-ivory/80">
              <li>
                <Link to="/stay" className="link-underline">
                  Stay
                </Link>
              </li>
              <li>
                <Link to="/menu" className="link-underline">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="link-underline">
                  Story
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="link-underline">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link-underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-ivory/50">Follow</p>
            <ul className="mt-5 space-y-2 text-ivory/80">
              <li>
                <a href="#" className="link-underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="link-underline">
                  Journal
                </a>
              </li>
              <li>
                <a href="#" className="link-underline">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-ivory/10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-[11px] uppercase tracking-widest2 text-ivory/45">
          <p>
            © {new Date().getFullYear()} {brand.name} — {brand.established}
          </p>
          <div className="flex items-center gap-2 normal-case tracking-normal text-ivory/65">
            <span>Built by</span>
            <a
              href="https://fossilui.buzz"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-ivory hover:text-ivory/80"
            >
              <span className="text-ivory">Fossil</span>
              <span className="text-gray-400 underline underline-offset-2">
                UI
              </span>
            </a>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ivory">
              Privacy
            </a>
            <a href="#" className="hover:text-ivory">
              Press
            </a>
            <a href="#" className="hover:text-ivory">
              Careers
            </a>
          </div>
          <p>{brand.location}</p>
        </div>
      </div>
    </footer>
  );
}
