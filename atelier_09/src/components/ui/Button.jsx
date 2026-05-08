import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950";

const variants = {
  primary:
    "bg-accent-lime text-ink-950 hover:bg-bone-50",
  secondary:
    "bg-bone-50 text-ink-950 hover:bg-bone-200",
  ghost:
    "border border-bone-300/25 text-bone-100 hover:border-bone-100/60 hover:bg-bone-100/5",
  dark:
    "bg-ink-900 text-bone-50 hover:bg-ink-800",
};

export default function Button({
  as: As = "a",
  variant = "primary",
  withArrow = true,
  className = "",
  children,
  ...props
}) {
  return (
    <motion.span
      whileHover={{ y: -1 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block"
    >
      <As className={`${base} ${variants[variant]} ${className}`} {...props}>
        <span>{children}</span>
        {withArrow && (
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        )}
      </As>
    </motion.span>
  );
}
