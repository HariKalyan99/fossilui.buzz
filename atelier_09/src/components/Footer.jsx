import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Container from "./ui/Container";

function InstagramIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const COLUMNS = [
  {
    title: "Services",
    links: [
      "Custom manufacturing",
      "Private labeling",
      "Bulk production",
      "Fabric sourcing",
    ],
  },
  {
    title: "Studio",
    links: ["About", "Factory tour", "Sustainability", "Careers"],
  },
  {
    title: "Resources",
    links: ["MOQ guide", "Tech pack template", "Cost calculator", "FAQ"],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-bone-300/10 bg-ink-950">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="py-16 md:py-24"
        >
          <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-lime text-ink-950 font-display font-bold">
                  A
                </div>
                <div className="font-display text-lg tracking-tight text-bone-50">
                  ATELIER<span className="text-accent-lime">/09</span>
                </div>
              </div>
              <p className="mt-6 max-w-sm text-sm text-bone-300 md:text-base">
                A full-stack apparel manufacturing factory — built for modern
                brands that care about every stitch.
              </p>

              <div className="mt-8 flex items-center gap-3">
                {[InstagramIcon, LinkedinIcon, Mail].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-bone-300/20 text-bone-200 transition-colors hover:border-accent-lime hover:text-accent-lime"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:col-span-7 md:grid-cols-3 md:gap-12">
              {COLUMNS.map((col) => (
                <div key={col.title}>
                  <h4 className="text-xs uppercase tracking-[0.25em] text-bone-300">
                    {col.title}
                  </h4>
                  <ul className="mt-5 space-y-3">
                    {col.links.map((l) => (
                      <li key={l}>
                        <a
                          href="#"
                          className="text-sm text-bone-100 transition-colors hover:text-accent-lime md:text-base"
                        >
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-display text-[22vw] leading-none tracking-[-0.06em] text-bone-50/5"
          >
            ATELIER/09
          </motion.div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-bone-300/10 py-6 text-[11px] uppercase tracking-[0.16em] text-bone-300 sm:text-xs sm:tracking-[0.22em] md:flex-row md:items-center md:tracking-[0.25em]">
          <span className="max-w-xs sm:max-w-none">
            © {new Date().getFullYear()} Atelier/09 · All rights reserved
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 normal-case tracking-normal">
              <span>Built by</span>
              <a
                href="https://www.fossilui.buzz"
                target="_blank"
                rel="noreferrer"
                className="font-medium"
              >
                <span className="text-white">Fossil</span>
                <span className="text-gray-400 underline underline-offset-2">
                  UI
                </span>
              </a>
            </div>
            <a href="#" className="hover:text-bone-50">
              Privacy
            </a>
            <a href="#" className="hover:text-bone-50">
              Terms
            </a>
            <a href="#" className="hover:text-bone-50">
              Factory cert.
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
