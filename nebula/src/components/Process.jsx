import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, PenTool, Code, Rocket, Check } from "lucide-react";
import Container from "./ui/Container";
import SectionHeading from "./ui/SectionHeading";
import { EASE } from "../lib/motion";

const STEPS = [
  {
    icon: Compass,
    number: "01",
    title: "Discover",
    subtitle: "Week 1",
    description:
      "Kickoff workshops, stakeholder interviews and competitive audits. We leave with a sharp brand brief, success metrics and a site map ready to design against.",
    deliverables: ["Strategy brief", "Site architecture", "Success metrics"],
  },
  {
    icon: PenTool,
    number: "02",
    title: "Design",
    subtitle: "Week 2–3",
    description:
      "High-fidelity design in Figma with a reusable system — type scale, color tokens, components, motion rules — so what we ship at launch keeps scaling after.",
    deliverables: ["Design system", "Page-level UI", "Motion prototypes"],
  },
  {
    icon: Code,
    number: "03",
    title: "Build",
    subtitle: "Week 3–5",
    description:
      "Next.js + TypeScript builds with accessible components, a headless CMS and edge-rendered performance. Every commit ships to a preview URL your team can review.",
    deliverables: ["Next.js build", "Headless CMS", "Preview URLs"],
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch & iterate",
    subtitle: "Week 5+",
    description:
      "QA, analytics and SEO baked in before launch. Post-go-live we run experiments against your funnel — every sprint compounds conversion, not just pixels.",
    deliverables: ["Launch QA", "Analytics setup", "CRO sprints"],
  },
];

/**
 * Geometry notes for the connector line:
 *   Each button uses `p-3` (12px) + an icon container of `size-14` (56px).
 *   Therefore the vertical center of each icon sits at `12 + 28 = 40px`
 *   from the top of its button, and `40px` from the left edge of the list.
 *   The connector is anchored with `top-10`, `bottom-10`, `left-10` so it
 *   runs from the center of the first icon to the center of the last icon —
 *   no matter how the buttons reflow at different breakpoints.
 */
export default function Process() {
  const [active, setActive] = useState(0);
  const Current = STEPS[active];
  const progress = STEPS.length > 1 ? active / (STEPS.length - 1) : 0;

  return (
    <section id="process" className="relative py-24 md:py-36 border-t border-white/5">
      <Container>
        <SectionHeading
          eyebrow="Process"
          title="A proven path from brief to launch."
          description="Four focused phases, six weeks on average. Clear deliverables at every step — no mystery, no bloat."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5">
            <ol className="relative flex flex-col gap-2">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-10 top-10 bottom-10 w-px"
              >
                <div className="absolute inset-0 bg-white/10" />
                <motion.div
                  className="absolute top-0 left-0 right-0 bg-gradient-to-b from-brand-400 to-accent-400"
                  animate={{ height: `${progress * 100}%` }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              </div>

              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === active;
                const isComplete = i < active;
                return (
                  <li key={s.number}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={isActive ? "step" : undefined}
                      className={`group relative z-10 w-full text-left flex items-center gap-4 rounded-2xl p-3 pr-4 transition-colors ${
                        isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                      }`}
                    >
                      <span
                        className={`relative grid place-items-center size-14 rounded-xl border transition-all duration-500 ${
                          isActive
                            ? "border-brand-400/50 bg-brand-500/15 text-white shadow-[0_0_0_6px_rgba(106,119,255,0.08)]"
                            : isComplete
                            ? "border-brand-400/30 bg-ink-900 text-brand-200"
                            : "border-white/10 bg-ink-900 text-mist-300 group-hover:text-white"
                        }`}
                      >
                        {isComplete ? (
                          <Check className="size-5" />
                        ) : (
                          <Icon className="size-5" />
                        )}
                      </span>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3">
                          <span
                            className={`text-xs font-mono tracking-wider ${
                              isActive || isComplete ? "text-brand-300" : "text-mist-400"
                            }`}
                          >
                            {s.number}
                          </span>
                          <span className="text-[11px] uppercase tracking-wider text-mist-400">
                            {s.subtitle}
                          </span>
                        </div>
                        <div
                          className={`mt-0.5 text-lg font-semibold tracking-tight ${
                            isActive ? "text-white" : "text-mist-200"
                          }`}
                        >
                          {s.title}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-8 md:p-10 min-h-[440px] overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-32 -right-24 size-80 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(106,119,255,0.28), transparent 70%)",
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={Current.number}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="relative"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-mist-200">
                      Step {Current.number}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-mist-400">
                      {Current.subtitle}
                    </span>
                  </div>
                  <h3 className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight text-white">
                    {Current.title}
                  </h3>
                  <p className="mt-4 text-base md:text-lg leading-relaxed text-mist-300 max-w-xl">
                    {Current.description}
                  </p>

                  <div className="mt-8">
                    <div className="text-xs uppercase tracking-wider text-mist-400">
                      Deliverables
                    </div>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {Current.deliverables.map((d) => (
                        <li
                          key={d}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-mist-200"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
