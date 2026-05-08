import { ArrowUpRight } from "lucide-react";

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2H21l-6.51 7.44L22 22h-6.828l-4.77-6.22L4.8 22H2.042l6.96-7.955L2 2h6.914l4.31 5.716L18.244 2Zm-1.2 18h1.62L7.06 4H5.33l11.714 16Z" />
    </svg>
  );
}

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.57.1.78-.25.78-.55v-1.94c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.3-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.15v3.18c0 .3.21.66.79.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0Z" />
    </svg>
  );
}
import { BRAND } from "../../lib/data";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Custom Software", href: "#services" },
      { label: "Web & Mobile", href: "#services" },
      { label: "Cloud & DevOps", href: "#services" },
      { label: "UI/UX Engineering", href: "#services" },
      { label: "Enterprise", href: "#services" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Case studies", href: "#case-studies" },
      { label: "Stack", href: "#stack" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: BRAND.email, href: `mailto:${BRAND.email}` },
      { label: BRAND.phone, href: `tel:${BRAND.phone.replace(/\s+/g, "")}` },
      { label: "Book a call", href: "#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="container-x py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--fg)] text-[var(--bg)] font-semibold text-sm">
                {BRAND.mark}
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              <span className="text-base font-semibold tracking-tight">
                {BRAND.name}
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[var(--fg-muted)]">
              {BRAND.description}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { Icon: GithubIcon, href: "#", label: "GitHub" },
                { Icon: LinkedinIcon, href: "#", label: "LinkedIn" },
                { Icon: XIcon, href: "#", label: "X (Twitter)" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)] hover:bg-[var(--bg-subtle)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-[14.5px] text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
                      >
                        {link.label}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                          strokeWidth={2.25}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[var(--border)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--fg-subtle)]">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-sm text-[var(--fg-subtle)] inline-flex items-center gap-2">
            <span>Built by</span>
            <a
              href="https://www.fossilui.buzz"
              target="_blank"
              rel="noreferrer"
              className="font-medium"
            >
              <span className="text-black">Fossil</span>
              <span className="text-grey-400 underline underline-offset-2">
                UI
              </span>
            </a>
          </p>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden"
      >
        <div className="container-x">
          <div className="font-serif italic text-[18vw] leading-[0.85] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[var(--border-strong)] to-transparent pb-2">
            Northbound.
          </div>
        </div>
      </div>
    </footer>
  );
}
