import { motion } from "framer-motion";
import { cn } from "../../lib/cn";

export function IconButton({
  className,
  children,
  active = false,
  activeClass = "text-rose-400",
  size = "md",
  ...props
}) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-9 w-9",
    lg: "h-10 w-10",
  };
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 500, damping: 24 }}
      className={cn(
        "inline-flex items-center justify-center rounded-full text-soft transition-colors hover:bg-surface-2 hover:text-base-strong",
        sizes[size],
        active && activeClass,
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
