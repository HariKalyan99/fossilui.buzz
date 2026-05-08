import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Play } from "lucide-react";
import { useApp } from "../../store/useApp";

export function PostMedia({ post }) {
  const toggleLike = useApp((s) => s.toggleLike);
  const [showHeart, setShowHeart] = useState(false);

  if (!post.media) return null;

  function handleDoubleClick() {
    if (!post.liked) toggleLike(post.id);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 700);
  }

  if (post.media.kind === "image") {
    return (
      <div
        onDoubleClick={handleDoubleClick}
        className="relative mt-3 overflow-hidden rounded-xl border border-app bg-surface-2 cursor-zoom-in select-none"
      >
        <img
          src={post.media.url}
          alt=""
          loading="lazy"
          className="w-full h-auto max-h-[640px] object-cover"
        />
        {showHeart && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 grid place-items-center pointer-events-none"
          >
            <Heart size={120} className="fill-white/90 text-white drop-shadow-2xl" />
          </motion.div>
        )}
      </div>
    );
  }

  if (post.media.kind === "video") {
    return <VideoMedia post={post} onDoubleClick={handleDoubleClick} showHeart={showHeart} />;
  }

  return null;
}

function VideoMedia({ post, onDoubleClick, showHeart }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().then(() => setPlaying(true)).catch(() => {});
          } else {
            el.pause();
            setPlaying(false);
          }
        });
      },
      { threshold: 0.6 }
    );
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  function toggle(e) {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <div
      ref={containerRef}
      onDoubleClick={onDoubleClick}
      className="relative mt-3 overflow-hidden rounded-xl border border-app bg-black select-none"
    >
      <video
        ref={videoRef}
        src={post.media.url}
        poster={post.media.poster}
        muted
        loop
        playsInline
        className="w-full max-h-[640px] object-cover"
      />
      <button
        onClick={toggle}
        className="absolute inset-0 grid place-items-center bg-black/0 hover:bg-black/20 transition-colors"
        aria-label={playing ? "Pause" : "Play"}
      >
        {!playing && (
          <span className="grid h-14 w-14 place-items-center rounded-full bg-black/50 text-white backdrop-blur">
            <Play size={24} className="ml-1" />
          </span>
        )}
      </button>
      {showHeart && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 grid place-items-center pointer-events-none"
        >
          <Heart size={120} className="fill-white/90 text-white drop-shadow-2xl" />
        </motion.div>
      )}
    </div>
  );
}
