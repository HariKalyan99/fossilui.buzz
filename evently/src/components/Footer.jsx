import { Link } from "react-router-dom";
import { Sparkles, Bird, Camera, Globe, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-ink-900/40 backdrop-blur">
      <div className="container-page py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-brand-gradient shadow-glow">
                <Sparkles className="w-4 h-4 text-white" />
              </span>
              <span className="font-display font-bold text-xl">
                Event<span className="gradient-text">ly</span>
              </span>
            </Link>
            <p className="mt-4 text-white/60 text-sm max-w-md">
              Discover the events that move you. From electric concerts to
              intimate workshops — book in seconds, show up ready.
            </p>
            <div className="flex items-center gap-2 mt-5">
              {[Bird, Camera, Globe, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/10 transition-colors"
                  aria-label="social"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link to="/explore" className="hover:text-white">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  For Organizers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Gift cards
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link to="/contact" className="hover:text-white">
                  Support
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Evently. Crafted for unforgettable
            nights.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/60 normal-case tracking-normal">
            <span>Built by</span>
            <a
              href="https://fossilui.buzz"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-white hover:text-white/80"
            >
              <span className="text-white">Fossil</span>
              <span className="text-grey-400 underline underline-offset-2">
                UI
              </span>
            </a>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
