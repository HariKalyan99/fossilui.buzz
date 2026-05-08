import { motion } from "framer-motion";

export default function SectionLabel({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] uppercase text-bone-300 ${className}`}
    >
      <span className="h-px w-8 bg-bone-300/50" />
      {children}
    </motion.div>
  );
}
