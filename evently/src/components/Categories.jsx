import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "../data/events";

export default function Categories() {
  return (
    <section className="container-page py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="chip">Browse by vibe</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Find your <span className="gradient-text">perfect category</span>
          </h2>
        </div>
        <Link to="/explore" className="hidden sm:inline-flex text-sm text-white/70 hover:text-white">
          See all events →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Link
              to={`/explore?category=${c.id}`}
              className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 p-5 card-hover"
            >
              <div
                className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${c.color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`}
              />
              <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${c.color} text-2xl shadow-glow`}>
                {c.emoji}
              </div>
              <h3 className="mt-4 font-semibold text-white">{c.name}</h3>
              <p className="text-xs text-white/50 mt-1">{c.count} events</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
