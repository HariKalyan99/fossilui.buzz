import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Sparkles, ArrowRight, Users } from "lucide-react";
import { categories, cities } from "../data/events";

export default function Hero() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("All locations");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location && location !== "All locations") params.set("location", location);
    if (date) params.set("date", date);
    if (category) params.set("category", category);
    navigate(`/explore?${params.toString()}`);
  };

  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-radial-glow opacity-90" />
        <div className="absolute top-40 -left-32 w-96 h-96 rounded-full bg-brand-violet/20 blur-3xl animate-float" />
        <div className="absolute top-60 -right-20 w-[28rem] h-[28rem] rounded-full bg-brand-blue/15 blur-3xl animate-float [animation-delay:2s]" />
        <div className="absolute bottom-10 left-1/3 w-72 h-72 rounded-full bg-brand-orange/15 blur-3xl animate-float [animation-delay:4s]" />
      </div>

      <div className="container-page pt-12 pb-16 sm:pt-20 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 chip">
            <Sparkles className="w-3.5 h-3.5 text-brand-violet" />
            <span>Over 24,000 events worldwide</span>
          </span>

          <h1 className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Discover &amp; Book{" "}
            <span className="gradient-text animate-gradient">Amazing Events</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            Concerts, conferences, parties, and once-in-a-lifetime moments — all in one place. Book in seconds, show up ready.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 max-w-4xl mx-auto"
        >
          <div className="glass-strong rounded-2xl p-2 sm:p-2.5 shadow-card">
            <div className="grid grid-cols-1 sm:grid-cols-[1.1fr_1fr_1fr_auto] gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/5">
                <MapPin className="w-4 h-4 text-white/50 shrink-0" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm appearance-none cursor-pointer"
                >
                  {cities.map((c) => (
                    <option key={c} value={c} className="bg-ink-900">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/5">
                <Calendar className="w-4 h-4 text-white/50 shrink-0" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm [color-scheme:dark]"
                />
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/5">
                <Search className="w-4 h-4 text-white/50 shrink-0" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm appearance-none cursor-pointer"
                >
                  <option value="" className="bg-ink-900">All categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id} className="bg-ink-900">
                      {c.emoji} {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn-primary !rounded-xl !py-3 sm:!px-6">
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-white/60">
            <span>Popular:</span>
            {["EDM", "AI Conferences", "Yoga", "Rooftop Parties", "Marathons"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => navigate(`/explore`)}
                className="chip hover:border-white/30 hover:text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          <button
            onClick={() => navigate("/explore")}
            className="btn-primary group"
          >
            Explore Events
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <div className="flex -space-x-2">
              {[
                "1494790108377-be9c29b29330",
                "1500648767791-00dcc994a43e",
                "1438761681033-6461ffad8d80",
                "1535713875002-d1d0cf377fde",
              ].map((src) => (
                <img
                  key={src}
                  src={`https://images.unsplash.com/photo-${src}?auto=format&fit=facearea&w=64&h=64&q=80`}
                  alt=""
                  loading="lazy"
                  className="w-8 h-8 rounded-full border-2 border-ink-900 object-cover"
                />
              ))}
            </div>
            <span className="inline-flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <strong className="text-white">120k+</strong> happy attendees this month
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
