import { motion } from 'framer-motion';

const LOGOS = ['Acme', 'Lumen', 'Northwind', 'Helios', 'Quanta', 'Orbit', 'Vela'];

export default function LogoCloud() {
  return (
    <section className="container-x py-10">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-muted">
        Trusted by teams shipping creative work at scale
      </p>
      <div className="mt-6 grid grid-cols-3 gap-4 opacity-80 sm:grid-cols-4 md:grid-cols-7">
        {LOGOS.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="grid h-10 place-items-center font-display text-sm tracking-wider text-muted transition-colors hover:text-text"
          >
            {name}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
