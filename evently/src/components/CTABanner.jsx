import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="container-page py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-white/10"
      >
        <div className="absolute inset-0 bg-brand-gradient bg-[length:200%_200%] animate-gradient opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/40 to-ink-950/10" />

        <div className="relative grid lg:grid-cols-2 gap-8 items-center p-8 sm:p-12">
          <div>
            <span className="chip !border-white/20 !bg-white/10 backdrop-blur">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              Hosting an event?
            </span>
            <h3 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight max-w-md">
              Sell tickets to a global audience in minutes.
            </h3>
            <p className="mt-3 text-white/80 max-w-md">
              Powerful tools, real-time analytics, and a checkout that converts. Zero setup fee.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Become a host
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/explore" className="btn-ghost">
                Browse events
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <div className="grid grid-cols-3 gap-3">
              {[
                { v: "24K+", l: "Events listed" },
                { v: "120K", l: "Monthly attendees" },
                { v: "98%", l: "Booking success" },
                { v: "180+", l: "Cities" },
                { v: "4.9", l: "Avg. rating" },
                { v: "<3s", l: "Avg. checkout" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-4 text-center"
                >
                  <div className="font-display font-bold text-2xl text-white">{s.v}</div>
                  <div className="text-[11px] text-white/70 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
