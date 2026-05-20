import { Link } from "react-router-dom";
import { GithubIcon, TwitterIcon, InstagramIcon } from "./icons/Brand";
import { Logo } from "./Logo";

const COLS = [
  {
    title: "Product",
    links: [
      { to: "/templates", label: "Templates" },
      { to: "/components", label: "Components" },
      { to: "/code", label: "Code" },
    ],
  },
  {
    title: "Resources",
    links: [
      { to: "/docs", label: "Documentation" },
      { to: "/docs#faq", label: "FAQ" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Community",
    links: [
      {
        to: "https://github.com/HariKalyan99/fossilui.buzz",
        label: "GitHub",
        external: true,
      },
      { label: "Twitter (coming soon)", disabled: true },
      { label: "Instagram (coming soon)", disabled: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
              Free, production-ready UI templates for modern developers. Preview
              live, browse the source, ship faster.
            </p>
            <div className="mt-5 flex items-center gap-1">
              <a
                href="https://github.com/HariKalyan99/fossilui.buzz"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <span
                aria-label="Twitter coming soon"
                className="inline-flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-md text-neutral-300"
              >
                <TwitterIcon className="h-4 w-4" />
              </span>
              <span
                aria-label="Instagram coming soon"
                className="inline-flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-md text-neutral-300"
              >
                <InstagramIcon className="h-4 w-4" />
              </span>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-4 font-medium">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                {col.links.map((l) =>
                  l.disabled ? (
                    <li key={l.label}>
                      <span className="text-neutral-400 cursor-not-allowed">
                        {l.label}
                      </span>
                    </li>
                  ) : l.external ? (
                    <li key={l.to}>
                      <a
                        href={l.to}
                        target="_blank"
                        rel="noreferrer"
                        className="text-neutral-600 hover:text-neutral-900"
                      >
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="text-neutral-600 hover:text-neutral-900"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline mt-14" />

        <div className="mt-6 flex flex-col gap-3 text-[12px] text-neutral-500">
          <p className="leading-relaxed">
            <a
              href="https://skfb.ly/oE6v8"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-600 hover:text-neutral-900"
            >
              &ldquo;Demon Trex&rdquo;
            </a>{' '}
            by endlessvoidmc is licensed under{' '}
            <a
              href="http://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-600 hover:text-neutral-900"
            >
              Creative Commons Attribution
            </a>
            .
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} FossilUI — Built for developers.</p>
            <p className="underline">
              Open-source. Use freely in commercial and personal projects.
              Standard license.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
