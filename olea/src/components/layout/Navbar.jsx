import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { brand } from "../../data/content";

const links = [
  { to: "/", label: "Home" },
  { to: "/stay", label: "Stay" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "Story" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Pages where the hero is dark and the nav should start in light mode (ivory)
  const darkHeroRoutes = ["/", "/about"];
  const isDarkHero = darkHeroRoutes.includes(location.pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Color logic: solid ivory bg after scroll, transparent over hero
  const onLight = scrolled || !isDarkHero;
  const textCls = onLight ? "text-ink" : "text-ivory";
  const bgCls = scrolled
    ? "bg-ivory/85 backdrop-blur-md border-b border-ink/5"
    : "bg-transparent";

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-smooth ${bgCls}`}
      >
        <div className="container-x flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className={`font-display text-2xl md:text-[26px] tracking-tight transition-colors duration-500 ${textCls}`}
          >
            {brand.name}
            <span className="text-bronze">.</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-9">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `text-[11px] uppercase tracking-widest2 transition-colors duration-500 link-underline ${
                    textCls
                  } ${isActive ? "opacity-100" : "opacity-70 hover:opacity-100"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/reservations"
              className={
                onLight
                  ? "btn-primary !py-2.5 !px-5 text-[11px]"
                  : "btn-ghost-light !py-2.5 !px-5 text-[11px]"
              }
            >
              Reserve
            </Link>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className={`lg:hidden flex flex-col gap-1.5 transition-colors duration-500 ${textCls}`}
          >
            <span className="block w-7 h-px bg-current" />
            <span className="block w-5 h-px bg-current ml-auto" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-ink text-ivory lg:hidden flex flex-col"
          >
            <div className="container-x flex items-center justify-between h-16 md:h-20">
              <Link to="/" className="font-display text-2xl">
                {brand.name}
                <span className="text-bronze">.</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="text-[11px] uppercase tracking-widest2"
              >
                Close ✕
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
              className="flex-1 flex flex-col justify-center container-x gap-3"
            >
              {links.map((l) => (
                <motion.div
                  key={l.to}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className="block font-display text-5xl md:text-6xl py-1"
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10"
              >
                <Link to="/reservations" className="btn-ghost-light">
                  Reserve a Table or Stay
                </Link>
              </motion.div>
            </motion.nav>
            <div className="container-x py-8 text-[11px] uppercase tracking-widest2 text-ivory/50">
              {brand.location}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
