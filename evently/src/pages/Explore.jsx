import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, Calendar, MapPin, DollarSign, LayoutGrid, List } from "lucide-react";
import EventCard from "../components/EventCard";
import { events, categories, cities, formatDate, getCategory } from "../data/events";

const SORTS = [
  { id: "soonest", label: "Soonest" },
  { id: "popular", label: "Most popular" },
  { id: "price-low", label: "Price: low to high" },
  { id: "price-high", label: "Price: high to low" },
  { id: "rating", label: "Highest rated" },
];

export default function Explore() {
  const [params, setParams] = useSearchParams();
  const [view, setView] = useState("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [query, setQuery] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "");
  const [location, setLocation] = useState(params.get("location") || "All locations");
  const [date, setDate] = useState(params.get("date") || "");
  const [maxPrice, setMaxPrice] = useState(Number(params.get("maxPrice") || 300));
  const [sort, setSort] = useState("soonest");

  useEffect(() => {
    const next = new URLSearchParams();
    if (query) next.set("q", query);
    if (category) next.set("category", category);
    if (location && location !== "All locations") next.set("location", location);
    if (date) next.set("date", date);
    if (maxPrice !== 300) next.set("maxPrice", String(maxPrice));
    setParams(next, { replace: true });
  }, [query, category, location, date, maxPrice, setParams]);

  const filtered = useMemo(() => {
    let list = events.filter((e) => {
      if (query && !`${e.title} ${e.location} ${e.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (category && e.category !== category) return false;
      if (location && location !== "All locations" && e.location !== location) return false;
      if (date && e.date < date) return false;
      if (e.price > maxPrice) return false;
      return true;
    });
    switch (sort) {
      case "popular":
        list.sort((a, b) => b.attendees - a.attendees);
        break;
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return list;
  }, [query, category, location, date, maxPrice, sort]);

  const activeFilters = [
    category && { key: "category", label: getCategory(category)?.name, clear: () => setCategory("") },
    location !== "All locations" && location && { key: "location", label: location, clear: () => setLocation("All locations") },
    date && { key: "date", label: `From ${formatDate(date)}`, clear: () => setDate("") },
    maxPrice !== 300 && { key: "price", label: `Under $${maxPrice}`, clear: () => setMaxPrice(300) },
  ].filter(Boolean);

  return (
    <section className="container-page py-8 sm:py-12">
      <header className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
          Explore <span className="gradient-text">events</span>
        </h1>
        <p className="mt-2 text-white/60">
          Showing {filtered.length} of {events.length} events
        </p>
      </header>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className="hidden lg:block">
          <FilterPanel
            query={query}
            setQuery={setQuery}
            category={category}
            setCategory={setCategory}
            location={location}
            setLocation={setLocation}
            date={date}
            setDate={setDate}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </aside>

        <div>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events, artists, tags…"
                className="input-base !pl-10"
              />
            </div>
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden btn-ghost !py-2.5"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilters.length > 0 && (
                <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-violet text-[11px] font-semibold">
                  {activeFilters.length}
                </span>
              )}
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-base !w-auto !py-2.5 cursor-pointer"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id} className="bg-ink-900">
                  {s.label}
                </option>
              ))}
            </select>
            <div className="hidden sm:flex items-center rounded-xl border border-white/10 bg-white/[0.04] p-1">
              <button
                onClick={() => setView("grid")}
                className={`inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm transition ${
                  view === "grid" ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm transition ${
                  view === "list" ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {activeFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={f.clear}
                  className="chip hover:border-white/30 !text-white"
                >
                  {f.label}
                  <X className="w-3 h-3" />
                </button>
              ))}
              <button
                onClick={() => {
                  setCategory("");
                  setLocation("All locations");
                  setDate("");
                  setMaxPrice(300);
                  setQuery("");
                }}
                className="text-xs text-white/60 hover:text-white"
              >
                Clear all
              </button>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="glass rounded-3xl p-12 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-display text-xl font-semibold">No events match your filters</h3>
              <p className="mt-2 text-white/60 text-sm">
                Try adjusting your filters or browsing different categories.
              </p>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((e, i) => (
                <EventCard key={e.id} event={e} index={i} />
              ))}
            </div>
          ) : (
            <ListView events={filtered} />
          )}
        </div>
      </div>

      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-3xl bg-ink-900 border-t border-white/10 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl font-semibold">Filters</h3>
                <button onClick={() => setFiltersOpen(false)} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 inline-flex items-center justify-center">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <FilterPanel
                query={query}
                setQuery={setQuery}
                category={category}
                setCategory={setCategory}
                location={location}
                setLocation={setLocation}
                date={date}
                setDate={setDate}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
              />
              <button
                onClick={() => setFiltersOpen(false)}
                className="btn-primary w-full mt-6"
              >
                Show {filtered.length} events
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function FilterPanel({
  category,
  setCategory,
  location,
  setLocation,
  date,
  setDate,
  maxPrice,
  setMaxPrice,
}) {
  return (
    <div className="space-y-6 lg:sticky lg:top-24">
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">Category</h4>
        <div className="space-y-1.5">
          <button
            onClick={() => setCategory("")}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
              category === "" ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
            }`}
          >
            All categories
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(category === c.id ? "" : c.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition flex items-center justify-between ${
                category === c.id ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
              }`}
            >
              <span>
                <span className="mr-2">{c.emoji}</span>
                {c.name}
              </span>
              <span className="text-xs text-white/40">{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3 flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5" />
          Location
        </h4>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input-base cursor-pointer"
        >
          {cities.map((c) => (
            <option key={c} value={c} className="bg-ink-900">{c}</option>
          ))}
        </select>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3 flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5" />
          From date
        </h4>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input-base [color-scheme:dark]"
        />
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <DollarSign className="w-3.5 h-3.5" />
            Max price
          </span>
          <span className="text-white text-sm font-semibold">
            {maxPrice >= 300 ? "Any" : `$${maxPrice}`}
          </span>
        </h4>
        <input
          type="range"
          min={0}
          max={300}
          step={5}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-brand-violet"
        />
        <div className="flex justify-between text-[11px] text-white/40 mt-1">
          <span>Free</span>
          <span>$300+</span>
        </div>
      </div>
    </div>
  );
}

function ListView({ events: list }) {
  return (
    <div className="space-y-4">
      {list.map((e, i) => {
        const cat = getCategory(e.category);
        return (
          <motion.a
            key={e.id}
            href={`/events/${e.id}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className="group flex flex-col sm:flex-row gap-5 rounded-2xl border border-white/10 bg-ink-800/60 overflow-hidden card-hover"
          >
            <div className="relative sm:w-64 shrink-0 aspect-[16/10] sm:aspect-auto">
              <img src={e.image} alt={e.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`chip bg-gradient-to-r ${cat?.color} !text-white !border-white/20`}>
                    {cat?.emoji} {cat?.name}
                  </span>
                  {e.trending && <span className="chip">🔥 Trending</span>}
                </div>
                <h3 className="font-display text-xl font-semibold leading-tight group-hover:gradient-text transition-colors">{e.title}</h3>
                <p className="mt-2 text-sm text-white/60 line-clamp-2">{e.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-white/60">
                  <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(e.date)}</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{e.location}</span>
                </div>
                <div className="font-display font-bold">
                  {e.price === 0 ? <span className="text-emerald-400">Free</span> : `$${e.price}`}
                </div>
              </div>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
