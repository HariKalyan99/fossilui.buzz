import { Image, Smile, Sparkles } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { useApp } from "../../store/useApp";

export function InlineComposer() {
  const me = useApp((s) => s.me);
  const openComposer = useApp((s) => s.openComposer);

  return (
    <button
      onClick={openComposer}
      className="group w-full text-left rounded-2xl border border-app bg-surface hover:border-[rgb(var(--text-faint))]/40 transition-colors p-4"
    >
      <div className="flex items-center gap-3">
        <Avatar src={me.avatar} name={me.name} size="md" />
        <span className="flex-1 text-soft group-hover:text-base-strong transition-colors">
          What's on your mind, {me.name.split(" ")[0]}?
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-brand-300 bg-brand-500/10 rounded-full px-3 py-1.5">
          <Sparkles size={12} /> Share
        </span>
      </div>
      <div className="mt-3 flex items-center gap-1 text-soft text-xs">
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-surface-2">
          <Image size={14} className="text-emerald-400" /> Photo
        </span>
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-surface-2">
          <Smile size={14} className="text-amber-400" /> Mood
        </span>
      </div>
    </button>
  );
}
