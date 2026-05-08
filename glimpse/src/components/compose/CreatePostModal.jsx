import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Smile, MapPin, Globe2, X } from "lucide-react";
import { useApp } from "../../store/useApp";
import { Modal } from "../ui/Modal";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";

const MAX_LEN = 500;

export function CreatePostModal() {
  const open = useApp((s) => s.composerOpen);
  const close = useApp((s) => s.closeComposer);
  const me = useApp((s) => s.me);
  const createPost = useApp((s) => s.createPost);

  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);
  const taRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => taRef.current?.focus(), 60);
    } else {
      // small reset delay after exit
      const t = setTimeout(() => {
        setText("");
        setMedia(null);
        setSubmitting(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  function handleFiles(files) {
    const file = files?.[0];
    if (!file) return;
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    if (!isImage && !isVideo) return;
    const url = URL.createObjectURL(file);
    setMedia({ kind: isImage ? "image" : "video", url, name: file.name });
  }

  function clearMedia() {
    if (media?.url) URL.revokeObjectURL(media.url);
    setMedia(null);
  }

  async function submit() {
    if (!text.trim() && !media) return;
    setSubmitting(true);
    await createPost({
      text: text.trim(),
      media: media
        ? {
            kind: media.kind,
            url: media.url,
            ratio: "landscape",
          }
        : null,
    });
    setSubmitting(false);
    close();
  }

  const remaining = MAX_LEN - text.length;
  const overLimit = remaining < 0;
  const canPost = (text.trim().length > 0 || !!media) && !overLimit;

  return (
    <Modal open={open} onClose={close} title="New post" size="lg">
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-start gap-3">
          <Avatar src={me.avatar} name={me.name} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-soft">
              <span className="font-semibold text-base-strong">{me.name}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5">
                <Globe2 size={12} /> Public
              </span>
            </div>
            <textarea
              ref={taRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's happening?"
              rows={4}
              className="mt-2 w-full resize-none bg-transparent text-lg leading-relaxed outline-none placeholder:text-faint min-h-[120px]"
            />

            {media && (
              <div className="relative mt-2 overflow-hidden rounded-xl border border-app">
                {media.kind === "image" ? (
                  <img
                    src={media.url}
                    alt="upload preview"
                    className="w-full max-h-[420px] object-cover"
                  />
                ) : (
                  <video
                    src={media.url}
                    className="w-full max-h-[420px]"
                    controls
                    autoPlay
                    muted
                    loop
                  />
                )}
                <button
                  onClick={clearMedia}
                  className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
                  aria-label="Remove media"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {!media && (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  handleFiles(e.dataTransfer.files);
                }}
                onClick={() => fileRef.current?.click()}
                className={
                  "mt-3 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed py-7 px-4 text-center transition-colors " +
                  (dragOver
                    ? "border-brand-400 bg-brand-500/10"
                    : "border-app hover:border-[rgb(var(--text-faint))]/60 hover:bg-surface-2")
                }
              >
                <ImageIcon size={22} className="text-soft" />
                <p className="mt-2 text-sm font-medium">
                  Drop a photo or video, or{" "}
                  <span className="text-brand-300">browse</span>
                </p>
                <p className="text-xs text-faint mt-1">
                  PNG, JPG, MP4 · up to 50MB
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <footer className="flex items-center justify-between px-5 py-3 border-t border-app">
        <div className="flex items-center gap-1 text-soft">
          <button
            onClick={() => fileRef.current?.click()}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface-2 hover:text-emerald-400"
            aria-label="Add image"
          >
            <ImageIcon size={18} />
          </button>
          <button
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface-2 hover:text-amber-400"
            aria-label="Add emoji"
            type="button"
          >
            <Smile size={18} />
          </button>
          <button
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface-2 hover:text-rose-400"
            aria-label="Add location"
            type="button"
          >
            <MapPin size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <CharCount remaining={remaining} />
          <Button onClick={submit} disabled={!canPost || submitting}>
            {submitting ? "Posting..." : "Post"}
          </Button>
        </div>
      </footer>
    </Modal>
  );
}

function CharCount({ remaining }) {
  const max = 500;
  const used = max - remaining;
  const ratio = Math.min(1, used / max);
  const over = remaining < 0;
  const radius = 9;
  const c = 2 * Math.PI * radius;
  return (
    <div className="flex items-center gap-1.5 text-xs tabular-nums">
      <svg width="22" height="22" viewBox="0 0 22 22" className="-rotate-90">
        <circle
          cx="11"
          cy="11"
          r={radius}
          stroke="rgb(var(--border))"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="11"
          cy="11"
          r={radius}
          stroke={over ? "#f43f5e" : "url(#brandGrad)"}
          strokeWidth="2"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - ratio)}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="brandGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      {remaining < 80 && (
        <span className={over ? "text-rose-400" : "text-faint"}>
          {remaining}
        </span>
      )}
    </div>
  );
}
