import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { events } from "../data/events";

export default function TrendingGrid() {
  const trending = events
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6);

  return (
    <section className="container-page py-16">
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <span className="chip">Don't miss out</span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Trending <span className="gradient-text">&amp; upcoming</span>
          </h2>
          <p className="mt-2 text-white/60 text-sm max-w-md">
            The events everyone's booking right now. Tap in before they sell out.
          </p>
        </div>
        <Link to="/explore" className="btn-ghost">
          View all events →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {trending.map((e, i) => (
          <EventCard key={e.id} event={e} index={i} />
        ))}
      </div>
    </section>
  );
}
