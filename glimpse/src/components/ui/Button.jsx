import { motion } from "framer-motion";
import { cn } from "../../lib/cn";

const VARIANTS = {
  primary:
    "gradient-brand text-white hover:brightness-110 active:brightness-95 shadow-lg shadow-brand-700/30",
  secondary:
    "bg-surface-2 text-base-strong hover:bg-[rgb(var(--border))]",
  ghost:
    "bg-transparent text-base-strong hover:bg-surface-2",
  outline:
    "bg-transparent text-base-strong border border-app hover:bg-surface-2",
  danger:
    "bg-rose-500/15 text-rose-300 hover:bg-rose-500/25",
};

const SIZES = {
  sm: "h-8 px-3 text-xs rounded-lg",
  md: "h-10 px-4 text-sm rounded-xl",
  lg: "h-12 px-6 text-sm rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  fullWidth,
  ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
