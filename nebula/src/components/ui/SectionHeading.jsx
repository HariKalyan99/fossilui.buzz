import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}) {
  const alignment =
    align === "center"
      ? "items-center text-center mx-auto"
      : "items-start text-left";

  return (
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`flex flex-col gap-5 max-w-3xl ${alignment} ${className}`}
    >
      {eyebrow ? (
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium tracking-wider uppercase text-mist-200">
            <span className="size-1.5 rounded-full bg-brand-400 shadow-[0_0_12px_2px_rgba(106,119,255,0.8)]" />
            {eyebrow}
          </span>
        </motion.div>
      ) : null}

      <motion.h2
        variants={fadeUp}
        className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.02] text-gradient-brand"
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg leading-relaxed text-mist-300 max-w-2xl"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
