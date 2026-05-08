import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Mail,
  ThumbsDown,
  ThumbsUp,
  Zap,
  Code2,
  Layers,
  Box,
} from "lucide-react";
import {
  GithubIcon,
  TwitterIcon,
  InstagramIcon,
} from "../components/icons/Brand";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { Tag } from "../components/ui/Tag";
import { cn } from "../lib/cn";

const NAV = [
  {
    title: "Quick Start",
    items: [
      { id: "install", label: "Install a template" },
      { id: "run", label: "Run locally" },
      { id: "customize", label: "Customize" },
    ],
  },
  {
    title: "FossilUI Docs",
    items: [
      { id: "intro", label: "Introduction" },
      { id: "features", label: "Features" },
      { id: "community", label: "Community" },
      { id: "feedback", label: "Feedback" },
      { id: "faq", label: "FAQ" },
      { id: "credits", label: "Credits" },
    ],
  },
];

const FEATURES = [
  {
    icon: Code2,
    title: "Real source code",
    desc: "Each template ships with full, readable source — no obfuscation, no dependencies on private packages.",
  },
  {
    icon: Zap,
    title: "Live previews",
    desc: "Open a working production deployment for any template directly from the platform.",
  },
  {
    icon: Layers,
    title: "Composable patterns",
    desc: "Hero, sections, cards, modals — patterns that re-appear across templates with consistent APIs.",
  },
  {
    icon: Box,
    title: "Modern stack",
    desc: "React, Vite, Tailwind, Framer Motion, Gsap, Three.js — the same set of tools across every template.",
  },
];

const FAQS = [
  {
    q: "Is FossilUI really free?",
    a: "Yes. Every template is MIT licensed and free for commercial and personal use. No sign-up required.",
  },
  {
    q: "Can I use these templates in client projects?",
    a: "Absolutely. The MIT license allows you to use, modify and redistribute. Attribution is appreciated but not required.",
  },
  {
    q: "How do I install a template?",
    a: "Clone the GitHub repository linked on each template page, run `npm install` then `npm run dev`. Each template is a self-contained Vite project.",
  },
  {
    q: "Can I keep the demo images/assets from templates in production?",
    a: "No. You must replace all demo/sample images and third-party media with assets you own or are explicitly licensed to use. You are solely responsible for verifying copyright, trademark, and usage rights before publishing.",
  },
  {
    q: "Why React + Vite + Tailwind?",
    a: "Predictable, fast, and well-documented. The combination favors developer experience over magical abstractions.",
  },
  {
    q: "Will there be more templates and components?",
    a: "Yes. Components are coming soon, and new templates are added regularly. Subscribe on the Components page for updates.",
  },
  {
    q: "How can I contribute?",
    a: "Open issues or PRs on any template repository. Bug reports, accessibility fixes and new variants are all welcome.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-neutral-200">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-[15px] text-neutral-900 font-medium">{q}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-neutral-500 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-[14px] text-neutral-600 leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Feedback() {
  const [vote, setVote] = useState(null);
  const [text, setText] = useState("");
  const [redirectingToMail, setRedirectingToMail] = useState(false);

  const sendViaMail = () => {
    const subject = encodeURIComponent(
      `FossilUI guide feedback (${vote || "no rating"})`,
    );
    const body = encodeURIComponent(text.trim() || "No additional notes.");
    setRedirectingToMail(true);
    window.location.href = `mailto:makeartanhear8@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="card p-6">
      <h3 className="text-[15px] font-semibold text-neutral-900">
        How is this guide?
      </h3>
      <p className="mt-1 text-[13.5px] text-neutral-600">
        Your feedback helps us improve. Pick a rating and (optionally) leave a
        note.
      </p>
      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setVote("positive")}
          className={cn(
            "inline-flex items-center gap-1.5 h-9 px-3 rounded-md border text-[13px] transition-colors",
            vote === "positive"
              ? "border-emerald-300 text-emerald-700 bg-emerald-50"
              : "border-neutral-200 text-neutral-700 hover:bg-neutral-50",
          )}
        >
          <ThumbsUp className="h-3.5 w-3.5" />
          Helpful
        </button>
        <button
          type="button"
          onClick={() => setVote("negative")}
          className={cn(
            "inline-flex items-center gap-1.5 h-9 px-3 rounded-md border text-[13px] transition-colors",
            vote === "negative"
              ? "border-rose-300 text-rose-700 bg-rose-50"
              : "border-neutral-200 text-neutral-700 hover:bg-neutral-50",
          )}
        >
          <ThumbsDown className="h-3.5 w-3.5" />
          Could be better
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Optional: tell us what's missing or unclear…"
          className="min-h-[90px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 focus:outline-none resize-y"
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={sendViaMail}>
            <Mail className="h-3.5 w-3.5" />
            {redirectingToMail ? "Redirecting to mail app…" : "Send via mail"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Docs() {
  const [active, setActive] = useState("install");
  const [copiedKey, setCopiedKey] = useState(null);

  const copySnippet = async (key, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current));
      }, 1300);
    } catch {
      /* ignore clipboard failures */
    }
  };

  useEffect(() => {
    const ids = NAV.flatMap((n) => n.items.map((i) => i.id));
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!targets.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 1] },
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  return (
    <Section className="pt-12 md:pt-20">
      <div className="grid gap-10 md:grid-cols-[220px_1fr]">
        <aside className="md:sticky md:top-24 md:self-start">
          <nav className="flex flex-col gap-6 text-sm">
            {NAV.map((group) => (
              <div key={group.title}>
                <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-2 font-medium">
                  {group.title}
                </div>
                <ul className="flex flex-col gap-0.5">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={cn(
                          "block rounded-md px-2 py-1.5 text-[13.5px]",
                          active === item.id
                            ? "bg-neutral-100 text-neutral-900 font-medium"
                            : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50",
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <div className="mb-12">
            <Tag tone="accent">Quick Start</Tag>
            <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.025em] text-neutral-900">
              Get a template running in 60 seconds.
            </h1>
            <p className="mt-2 text-neutral-600 max-w-2xl leading-relaxed">
              Each FossilUI template is a self-contained React + Vite project.
              Clone, install, run.
            </p>
            <div className="mt-4 max-w-2xl rounded-lg border border-indigo-100 bg-indigo-50/70 px-4 py-3 text-[13.5px] text-indigo-900">
              Built for plug-and-play workflows: drop in UI, connect your real
              data, and keep most of your brainpower for backend logic and
              database design.
            </div>
          </div>

          <article id="install" className="scroll-mt-24 mb-10">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              1. Install a template
            </h2>
            <p className="mt-2 text-neutral-600">
              Clone the repo from any template's GitHub link.
            </p>
            <div className="mt-4 rounded-lg border border-neutral-900/10 bg-[#0a0a0a]">
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                <span className="text-[11px] uppercase tracking-[0.14em] text-neutral-400">
                  Install
                </span>
                <button
                  type="button"
                  onClick={() =>
                    copySnippet(
                      "install",
                      `# Pick the template you want
git clone https://github.com/HariKalyan99/fossilUI-template-v1-nebula
cd fossilUI-template-v1-nebula
npm install`,
                    )
                  }
                  className="rounded-md border border-white/15 px-2 py-1 text-[11px] text-neutral-200 hover:bg-white/10"
                >
                  {copiedKey === "install" ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[13px] text-neutral-200 selection:bg-indigo-500/50 selection:text-white">
                {`# Pick the template you want
git clone https://github.com/HariKalyan99/fossilUI-template-v1-nebula
cd fossilUI-template-v1-nebula
npm install`}
              </pre>
            </div>
          </article>

          <article id="run" className="scroll-mt-24 mb-10">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              2. Run locally
            </h2>
            <p className="mt-2 text-neutral-600">
              Start the dev server and open the local URL.
            </p>
            <div className="mt-4 rounded-lg border border-neutral-900/10 bg-[#0a0a0a]">
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                <span className="text-[11px] uppercase tracking-[0.14em] text-neutral-400">
                  Run
                </span>
                <button
                  type="button"
                  onClick={() =>
                    copySnippet(
                      "run",
                      `npm run dev
# → http://localhost:5173`,
                    )
                  }
                  className="rounded-md border border-white/15 px-2 py-1 text-[11px] text-neutral-200 hover:bg-white/10"
                >
                  {copiedKey === "run" ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[13px] text-neutral-200 selection:bg-indigo-500/50 selection:text-white">
                {`npm run dev
# → http://localhost:5173`}
              </pre>
            </div>
          </article>

          <article id="customize" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              3. Customize
            </h2>
            <p className="mt-2 text-neutral-600">
              Update{" "}
              <code className="text-neutral-900 font-mono bg-neutral-100 px-1 py-0.5 rounded">
                tailwind.config.js
              </code>
              , swap copy, and rewire data files. Each template's{" "}
              <code className="text-neutral-900 font-mono bg-neutral-100 px-1 py-0.5 rounded">
                src/data
              </code>{" "}
              folder is the entry point for content changes.
            </p>
            <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] leading-relaxed text-rose-900">
              <strong className="font-semibold">Strict disclaimer:</strong>{" "}
              Before shipping any template, replace all placeholder/demo images
              with your own assets. Do not publish sample media unless you have
              explicit usage rights. You are responsible for all copyright and
              licensing compliance.
            </div>
          </article>

          <div className="mt-4 mb-8 hairline" />
          <Tag tone="accent">FossilUI Docs</Tag>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.025em] text-neutral-900">
            Everything you need to know.
          </h2>

          <article id="intro" className="scroll-mt-24 mt-10">
            <h3 className="text-xl font-semibold text-neutral-900">
              Introduction
            </h3>
            <p className="mt-2 text-neutral-600 leading-relaxed">
              FossilUI is a free library of UI templates, designed for
              developers who would rather build than browse. Each template is
              opinionated, production-quality, and shipped with full source.
            </p>
          </article>

          <article id="features" className="scroll-mt-24 mt-10">
            <h3 className="text-xl font-semibold text-neutral-900">Features</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {FEATURES.map((f) => (
                <div key={f.title} className="card p-5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-neutral-700">
                    <f.icon className="h-4 w-4" />
                  </span>
                  <h4 className="mt-3 text-[15px] font-medium text-neutral-900">
                    {f.title}
                  </h4>
                  <p className="mt-1.5 text-[13.5px] text-neutral-600 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article id="community" className="scroll-mt-24 mt-10">
            <h3 className="text-xl font-semibold text-neutral-900">
              Community
            </h3>
            <p className="mt-2 text-neutral-600">
              Follow along, ask questions, share what you build.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <a
                href="https://github.com/HariKalyan99/fossilui.buzz"
                target="_blank"
                rel="noreferrer"
                className="card card-hover p-5 flex items-start gap-3"
              >
                <GithubIcon className="h-5 w-5 text-neutral-700 mt-0.5" />
                <div>
                  <div className="text-[14px] text-neutral-900 font-medium">
                    GitHub
                  </div>
                  <div className="text-[12.5px] text-neutral-500">
                    Star repos and report issues
                  </div>
                </div>
              </a>
              <div className="card p-5 flex items-start gap-3 opacity-70">
                <TwitterIcon className="h-5 w-5 text-neutral-400 mt-0.5" />
                <div>
                  <div className="text-[14px] text-neutral-900 font-medium">
                    Twitter
                  </div>
                  <div className="text-[12.5px] text-neutral-500">
                    Coming soon
                  </div>
                </div>
              </div>
              <div className="card p-5 flex items-start gap-3 opacity-70">
                <InstagramIcon className="h-5 w-5 text-neutral-400 mt-0.5" />
                <div>
                  <div className="text-[14px] text-neutral-900 font-medium">
                    Instagram
                  </div>
                  <div className="text-[12.5px] text-neutral-500">
                    Coming soon
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article id="feedback" className="scroll-mt-24 mt-10">
            <h3 className="text-xl font-semibold text-neutral-900">Feedback</h3>
            <p className="mt-2 text-neutral-600">
              Tell us how this guide can improve.
            </p>
            <div className="mt-4">
              <Feedback />
            </div>
          </article>

          <article id="faq" className="scroll-mt-24 mt-12">
            <h3 className="text-xl font-semibold text-neutral-900">FAQ</h3>
            <div className="mt-3">
              {FAQS.map((f) => (
                <FAQItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </article>

          <article id="credits" className="scroll-mt-24 mt-12">
            <h3 className="text-xl font-semibold text-neutral-900">Credits</h3>
            <p className="mt-2 text-neutral-600">
              Asset attribution is included in app metadata.
            </p>
          </article>

          <div className="hairline mt-14" />

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[13px] text-neutral-500">
              Still stuck? Reach out and we'll help you get unblocked.
            </p>
            <Button as={Link} to="/contact" variant="secondary" size="sm">
              Contact us
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
