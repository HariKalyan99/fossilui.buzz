import { Link } from "react-router-dom";
import { GithubIcon, TwitterIcon, LinkedinIcon } from "../ui/BrandIcons";
import Logo from "../ui/Logo";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { to: "/generate", label: "Generate" },
      { to: "/features", label: "Features" },
      { to: "/pricing", label: "Pricing" },
      { to: "/dashboard", label: "Dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy" },
      { to: "/terms", label: "Terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-surface/30">
      <div className="container-x py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">
              Nova is an AI platform for turning ideas into stunning images and
              cinematic videos — fast, private, and incredibly precise.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[GithubIcon, TwitterIcon, LinkedinIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-primary/40 hover:text-text"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                {col.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-text/80 transition-colors hover:text-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} Nova Labs, Inc. All rights reserved.
          </span>
          <span className="inline-flex items-center gap-2">
            <span>Built by</span>
            <a
              href="https://www.fossilui.buzz"
              target="_blank"
              rel="noreferrer"
              className="font-medium"
            >
              <span className="text-white">Fossil</span>
              <span className="text-grey-400 underline underline-offset-2">
                UI
              </span>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
