import Container from "./ui/Container";
import Logo from "./ui/Logo";

const COLS = [
  {
    title: "Studio",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#contact" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Branding", href: "#services" },
      { label: "Product design", href: "#services" },
      { label: "Engineering", href: "#services" },
      { label: "Growth & CRO", href: "#services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Case studies", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
];

function SocialIcon({ d, label }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="grid place-items-center size-9 rounded-lg border border-white/10 bg-white/[0.03] text-mist-300 hover:text-white hover:border-white/20 transition-colors"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={d} />
      </svg>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-40 blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(40% 100% at 50% 0%, rgba(106,119,255,0.2), transparent 70%)",
        }}
      />
      <Container>
        <div className="py-16 md:py-20 grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-5 flex flex-col gap-5">
            <Logo />
            <p className="text-sm text-mist-300 max-w-xs leading-relaxed">
              A senior-led web studio designing and shipping brands, websites
              and growth systems for ambitious teams.
            </p>
            <div className="flex items-center gap-2">
              <SocialIcon
                label="X"
                d="M18.244 2H21l-6.54 7.47L22 22h-6.828l-4.77-6.24L4.8 22H2.04l7-8L2 2h6.914l4.32 5.71L18.244 2zm-1.2 18h1.86L7.02 4H5.04l12.004 16z"
              />
              <SocialIcon
                label="LinkedIn"
                d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 9.5h4V21H3V9.5zm7 0h3.84v1.56h.06c.54-1 1.86-2.06 3.84-2.06 4.1 0 4.86 2.7 4.86 6.2V21h-4v-5c0-1.2-.02-2.74-1.66-2.74-1.66 0-1.92 1.3-1.92 2.66V21h-4V9.5z"
              />
              <SocialIcon
                label="Dribbble"
                d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.6 4.6A8.5 8.5 0 0120.4 12c-.3 0-3.4-.7-6.5-.3-.1-.3-.3-.7-.4-1 3.4-1.4 4.9-3.4 5.1-4.1zM12 3.5a8.4 8.4 0 015.4 2c-.2.3-1.5 2.2-4.9 3.4A33 33 0 008.8 4c1-.3 2-.5 3.2-.5zM7 4.7c.3.4 1.7 2.3 3.6 4.9-5.3 1.4-8 1.4-8.3 1.4.6-3 2.6-5.4 4.7-6.3zM2.1 12v-.1c.2 0 3.4.1 9.1-1.6.3.6.6 1.3.8 2-4 1.3-6.7 4.7-7 5.1A8.4 8.4 0 012.1 12zm4.5 6a8.3 8.3 0 015.9-4.4 32 32 0 011.7 6.7A8.5 8.5 0 016.6 18zm9.2 1.4a36 36 0 00-1.6-6.5c3-.5 5.7.3 6 .4a8.5 8.5 0 01-4.4 6.1z"
              />
              <SocialIcon
                label="GitHub"
                d="M12 .5a11.5 11.5 0 00-3.63 22.42c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.4-3.87-1.4-.52-1.3-1.28-1.65-1.28-1.65-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.25 3.36.96.1-.75.4-1.26.74-1.55-2.55-.3-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.2-3.08-.12-.3-.52-1.48.1-3.08 0 0 .98-.31 3.2 1.17a11.08 11.08 0 015.83 0c2.22-1.48 3.2-1.17 3.2-1.17.62 1.6.23 2.78.11 3.08.75.8 1.2 1.82 1.2 3.08 0 4.42-2.68 5.37-5.24 5.66.4.35.77 1.05.77 2.12v3.14c0 .31.2.67.8.56A11.5 11.5 0 0012 .5z"
              />
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title} className="md:col-span-2 flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.18em] text-mist-400">
                {col.title}
              </div>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-mist-200 hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <div className="text-xs uppercase tracking-[0.18em] text-mist-400">
              Contact
            </div>
            <a
              href="mailto:hello@nebula.studio"
              className="text-sm text-mist-200 hover:text-white transition-colors"
            >
              hello@nebula.studio
            </a>
            <span className="text-sm text-mist-400">Remote-first</span>
          </div>
        </div>

        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-mist-400">
          <div>
            © {new Date().getFullYear()} Nebula Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
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
            </div>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
