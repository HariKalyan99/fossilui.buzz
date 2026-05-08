import { Sparkles, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../../store/useApp";

export function TopBar() {
  const setSearchQuery = useApp((s) => s.setSearchQuery);
  const searchQuery = useApp((s) => s.searchQuery);
  return (
    <header className="md:hidden sticky top-0 z-30 bg-app/85 backdrop-blur-xl border-b border-app">
      <div className="flex items-center gap-3 px-4 h-14">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg gradient-brand text-white">
            <Sparkles size={16} />
          </span>
          <span className="text-lg font-extrabold tracking-tight">Glimpse</span>
        </Link>
        <label className="flex flex-1 items-center gap-2 rounded-full border border-app bg-surface-2 px-3 py-2">
          <Search size={14} className="text-faint" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent text-sm outline-none placeholder:text-faint"
            aria-label="Search"
          />
        </label>
      </div>
    </header>
  );
}
