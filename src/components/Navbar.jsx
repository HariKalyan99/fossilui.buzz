import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { GithubIcon } from "./icons/Brand";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { cn } from "../lib/cn";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/templates", label: "Templates" },
  { to: "/components", label: "Components" },
];

const RESOURCES = [
  {
    to: "/code",
    label: "Code",
    desc: "Browse template source with CodeMirror.",
  },
  {
    to: "/docs",
    label: "Docs",
    desc: "Quick start, guides, and FAQ.",
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const dropdownRef = useRef(null);
  const closeTimer = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setMobile(false);
    setOpen(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors duration-200",
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-neutral-200/80"
          : "bg-white/70 backdrop-blur-sm border-b border-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-0.5 text-sm">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "inline-flex h-9 items-center px-3 rounded-md transition-colors",
                    isActive
                      ? "text-neutral-900 bg-neutral-100/80"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={openDropdown}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
                className={cn(
                  "inline-flex h-9 items-center gap-1 px-3 rounded-md transition-colors",
                  open
                    ? "text-neutral-900 bg-neutral-100/80"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50",
                )}
              >
                Resources
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform",
                    open && "rotate-180",
                  )}
                />
              </button>
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 2 }}
                    transition={{ duration: 0.14 }}
                    className="absolute left-0 top-full mt-2 w-72 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.18),0_2px_8px_rgba(15,23,42,0.06)]"
                    role="menu"
                  >
                    {RESOURCES.map((r) => (
                      <Link
                        key={r.to}
                        to={r.to}
                        role="menuitem"
                        className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5 hover:bg-neutral-50"
                      >
                        <span className="text-sm text-neutral-900 font-medium">
                          {r.label}
                        </span>
                        <span className="text-[12px] text-neutral-500">
                          {r.desc}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                cn(
                  "inline-flex h-9 items-center px-3 rounded-md transition-colors",
                  isActive
                    ? "text-neutral-900 bg-neutral-100/80"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50",
                )
              }
            >
              Contact
            </NavLink>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button
            as="a"
            href="https://github.com/HariKalyan99/fossilui.buzz"
            target="_blank"
            rel="noreferrer"
            variant="ghost"
            size="sm"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            GitHub
          </Button>
          <Button as={Link} to="/templates" variant="primary" size="sm">
            Browse templates
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100"
          onClick={() => setMobile((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobile ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-neutral-200 bg-white"
          >
            <div className="container-page py-4 flex flex-col gap-1">
              {[...NAV, ...RESOURCES, { to: "/contact", label: "Contact" }].map(
                (i) => (
                  <NavLink
                    key={i.to}
                    to={i.to}
                    end={i.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "rounded-md px-3 py-2 text-sm",
                        isActive
                          ? "bg-neutral-100 text-neutral-900"
                          : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50",
                      )
                    }
                  >
                    {i.label}
                  </NavLink>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
