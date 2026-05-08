import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function CTA() {
  return (
    <section className="container-x py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-14 text-center sm:px-14"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-grad-soft opacity-70"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-72 w-[640px] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl"
        />

        <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Ready to create at the speed of your imagination?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Join thousands of creators shipping work that stands out. Start free — upgrade anytime.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button as={Link} to="/signup" size="lg">
            Create free account <ArrowRight size={16} />
          </Button>
          <Button as={Link} to="/pricing" variant="secondary" size="lg">
            See pricing
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
