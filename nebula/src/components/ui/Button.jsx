import { motion } from "framer-motion";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 focus-visible:ring-brand-400 disabled:opacity-60 disabled:pointer-events-none";

const sizes = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-[15px] px-6 py-3.5",
};

const variants = {
  primary:
    "text-white bg-white/[0.04] border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_10px_40px_-10px_rgba(79,91,255,0.6)] hover:bg-white/[0.07]",
  solid:
    "text-ink-950 bg-white hover:bg-mist-100 shadow-[0_10px_40px_-10px_rgba(255,255,255,0.35)]",
  ghost:
    "text-mist-200 hover:text-white hover:bg-white/5 border border-transparent",
  outline:
    "text-white border border-white/15 hover:border-white/30 hover:bg-white/[0.04]",
};

/**
 * Motion components are hoisted to module scope so they aren't re-created on
 * every render (which would reset internal state) and so we avoid the
 * `motion() is deprecated. Use motion.create() instead.` warning from
 * framer-motion 12.
 */
const MOTION_TAGS = {
  button: motion.button,
  a: motion.a,
  div: motion.div,
  span: motion.span,
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  as = "button",
  className = "",
  ...props
}) {
  const Component = MOTION_TAGS[as] ?? motion.button;
  return (
    <Component
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
