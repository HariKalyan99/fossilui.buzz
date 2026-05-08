import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Container from "./ui/Container";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";

const BG =
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=2000&q=80";

export default function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink-950 py-24 md:py-36">
      <Container>
        <div className="relative overflow-hidden rounded-[36px] border border-bone-300/10 bg-ink-900">
          <div className="absolute inset-0 -z-10">
            <img
              src={BG}
              alt=""
              className="h-full w-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-900/80 to-ink-800" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(214,255,61,0.2),transparent_55%)]" />
          </div>

          <div className="grid grid-cols-1 gap-10 p-5 sm:p-8 md:grid-cols-12 md:gap-16 md:p-16 lg:p-24">
            <div className="md:col-span-7">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-bone-300/25 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-bone-200"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
                Accepting 4 more brands · Q3 '26
              </motion.span>

              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-4xl leading-[0.95] tracking-tight text-bone-50 sm:text-5xl md:text-7xl">
                  Launch your <br />
                  clothing line <br />
                  <span className="italic text-accent-lime">today.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-6 max-w-xl text-base text-bone-300 md:text-lg">
                  Send us your brief, a mood board, or just a rough idea.
                  You'll hear back from a real human — not a form bot —
                  within one business day.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Button href="mailto:hello@atelier09.co" variant="primary">
                    Start a project
                  </Button>
                  <Button href="#work" variant="ghost">
                    See our work
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-5">
              <Reveal delay={0.3}>
                <div className="rounded-3xl border border-bone-300/15 bg-ink-950/60 p-6 backdrop-blur md:p-8">
                  <div className="text-xs uppercase tracking-[0.25em] text-bone-300">
                    Direct line
                  </div>
                  <a
                    href="mailto:hello@atelier09.co"
                    className="mt-4 flex items-start gap-3 border-b border-bone-300/10 pb-4 text-bone-50 transition-colors hover:text-accent-lime"
                  >
                    <Mail className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.75} />
                    <span className="font-display break-all text-base leading-tight tracking-tight sm:text-xl sm:break-normal md:text-2xl">
                      hello@atelier09.co
                    </span>
                  </a>
                  <a
                    href="tel:+919999999999"
                    className="mt-4 flex items-start gap-3 text-bone-50 transition-colors hover:text-accent-lime"
                  >
                    <Phone className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.75} />
                    <span className="font-display text-base leading-tight tracking-tight sm:text-xl md:text-2xl">
                      +91 99999 99999
                    </span>
                  </a>

                  <div className="mt-8 space-y-3 text-xs text-bone-300 sm:text-sm">
                    <div className="flex items-start justify-between gap-4 border-t border-bone-300/10 pt-4">
                      <span>MOQ</span>
                      <span className="text-bone-100">300 pcs / style</span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <span>Sampling</span>
                      <span className="text-bone-100">10–14 days</span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <span>Lead time</span>
                      <span className="text-bone-100">45–60 days</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
