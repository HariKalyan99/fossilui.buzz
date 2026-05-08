import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Container from "./ui/Container";
import Button from "./ui/Button";
import Logo from "./ui/Logo";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="pt-3 md:pt-5">
        <Container>
          <div
            className={`flex items-center justify-between rounded-2xl border transition-all duration-500 px-4 md:px-5 ${
              scrolled
                ? "border-white/10 bg-ink-900/70 backdrop-blur-xl py-2.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
                : "border-transparent bg-transparent py-3"
            }`}
          >
            <a href="#top" className="shrink-0">
              <Logo />
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-3.5 py-2 text-sm text-mist-200 hover:text-white transition-colors rounded-lg"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" as="a" href="#login">
                Sign in
              </Button>
              <Button variant="solid" size="sm" as="a" href="#contact">
                Start a project
                <ArrowUpRight className="size-4" />
              </Button>
            </div>

            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden grid place-items-center size-10 rounded-xl border border-white/10 bg-white/[0.03] text-white"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mt-2"
          >
            <Container>
              <div className="rounded-2xl border border-white/10 bg-ink-900/90 backdrop-blur-xl p-4">
                <div className="flex flex-col">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="px-3 py-3 text-sm text-mist-100 hover:bg-white/5 rounded-lg"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" as="a" href="#login">
                    Sign in
                  </Button>
                  <Button variant="solid" size="sm" as="a" href="#contact">
                    Start
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
