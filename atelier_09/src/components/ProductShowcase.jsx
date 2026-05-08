import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Container from "./ui/Container";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import { PRODUCTS } from "../data/content";

function ProductCard({ product, index, large }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay: index * 0.06,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative overflow-hidden rounded-3xl bg-ink-800 ${
        large ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover"
          initial={{ scale: 1.02 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent opacity-80" />

        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-bone-50/95 text-ink-950 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-45">
          <Plus className="h-5 w-5" />
        </div>

        <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-7">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className="font-display text-xl tracking-tight text-bone-50 md:text-2xl">
                {product.title}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-bone-300">
                {product.tag}
              </p>
            </div>
            <span className="rounded-full border border-bone-300/25 bg-ink-950/40 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-bone-200 backdrop-blur">
              #{String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </figcaption>
      </div>
    </motion.figure>
  );
}

export default function ProductShowcase() {
  return (
    <section id="work" className="relative bg-ink-900 py-24 md:py-36">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-2xl">
            <SectionLabel>Recent work</SectionLabel>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight text-bone-50 md:text-7xl">
                Garments, made <br />
                <span className="italic">properly.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="max-w-md">
            <p className="text-base text-bone-300 md:text-lg">
              A small slice of what's left our floor this season — hoodies,
              boxy tees, cargos, knit polos and denim.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-20 md:grid-cols-4 md:gap-6">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.title} product={p} index={i} large={i === 0} />
          ))}
        </div>
      </Container>
    </section>
  );
}
