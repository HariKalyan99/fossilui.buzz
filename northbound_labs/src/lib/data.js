import {
  Code2,
  Smartphone,
  Cloud,
  Palette,
  Building2,
  ShieldCheck,
  Search,
  PenTool,
  Cpu,
  Rocket,
} from 'lucide-react'

export const BRAND = {
  name: 'Northbound Labs',
  mark: 'NB',
  tagline: 'Software, engineered with intent.',
  description:
    'We design and build custom software, web & mobile apps, and cloud platforms for teams that measure outcomes, not output.',
  email: 'hello@northbound.studio',
  phone: '+1 (415) 555-0142',
  address: 'Suite 21 · 1140 Mission St, San Francisco',
}

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
]

export const METRICS = [
  { value: '120+', label: 'Products shipped' },
  { value: '42', label: 'Active clients' },
  { value: '99.98%', label: 'Avg. uptime' },
  { value: '11', label: 'Years operating' },
]

export const CLIENTS = [
  'Helio Health',
  'Ventura Capital',
  'Orbital Freight',
  'Meridian Studio',
  'Northwind Retail',
  'Quantic AI',
  'Lumen Finance',
  'Parallel Grid',
]

export const SERVICES = [
  {
    icon: Code2,
    title: 'Custom Software',
    description:
      'Long-lived platforms engineered for scale: internal tools, SaaS products, data-heavy back-offices.',
    points: ['Platform architecture', 'API & data modeling', 'Integration engineering'],
  },
  {
    icon: Smartphone,
    title: 'Web & Mobile Apps',
    description:
      'Fast, accessible product interfaces. Web, iOS, and Android delivered from one coordinated team.',
    points: ['React / Next.js', 'React Native & Swift', 'Design system delivery'],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description:
      'Production infrastructure you can trust: observability, cost control, zero-downtime deploys.',
    points: ['AWS / GCP / Azure', 'Kubernetes & Terraform', 'CI/CD & SRE'],
  },
  {
    icon: Palette,
    title: 'UI/UX Engineering',
    description:
      'Research-led product design, executed by engineers who ship what they design.',
    points: ['Product discovery', 'Interaction design', 'Design-to-code systems'],
  },
  {
    icon: Building2,
    title: 'Enterprise Solutions',
    description:
      'Modernize legacy platforms without breaking the business that depends on them.',
    points: ['Legacy migration', 'Compliance-aware builds', 'Vendor consolidation'],
  },
  {
    icon: ShieldCheck,
    title: 'Security & Compliance',
    description:
      'Security woven into the SDLC — not bolted on before an audit.',
    points: ['SOC 2 readiness', 'Pen-test remediation', 'Threat modeling'],
  },
]

export const INDUSTRIES = [
  {
    name: 'Fintech',
    blurb: 'Ledger systems, KYC flows, and trading interfaces that regulators and traders both trust.',
  },
  {
    name: 'Healthcare',
    blurb: 'HIPAA-aligned platforms for clinical data, provider workflows, and patient engagement.',
  },
  {
    name: 'Logistics',
    blurb: 'Real-time fleet, warehouse, and routing software built for operators, not demos.',
  },
  {
    name: 'SaaS',
    blurb: 'From zero-to-one MVPs to multi-tenant platforms ready for Series B scrutiny.',
  },
  {
    name: 'E-commerce',
    blurb: 'Storefronts, PIM/OMS integrations, and merchandising tools that lift conversion.',
  },
  {
    name: 'AI / Data',
    blurb: 'LLM-backed products, evaluation pipelines, and data platforms engineered for reliability.',
  },
]

export const PROCESS = [
  {
    step: '01',
    icon: Search,
    title: 'Discovery',
    description:
      'We embed with your team for 1–2 weeks to align on outcomes, constraints, and what "done" looks like.',
    deliverables: ['Product brief', 'Technical plan', 'Fixed-scope estimate'],
  },
  {
    step: '02',
    icon: PenTool,
    title: 'Design',
    description:
      'Interaction design and prototypes validated with real users before a single production line is written.',
    deliverables: ['Flow maps', 'Prototype', 'Design system'],
  },
  {
    step: '03',
    icon: Cpu,
    title: 'Development',
    description:
      'Two-week sprints, demoable every Friday. You see progress in staging, not in status meetings.',
    deliverables: ['Weekly demos', 'Staging builds', 'Code ownership'],
  },
  {
    step: '04',
    icon: Rocket,
    title: 'Delivery',
    description:
      'We ship, monitor, and hand off with documentation your team will actually use.',
    deliverables: ['Launch runbook', 'Observability', '30-day support'],
  },
]

export const PORTFOLIO = [
  {
    title: 'Linear',
    category: 'Product · SaaS',
    description: 'Issue tracking reimagined for software teams. Speed and craft as a core feature.',
    url: 'https://linear.app',
    accent: '#5E6AD2',
  },
  {
    title: 'Vercel',
    category: 'Platform · DX',
    description: 'Frontend cloud with zero-config deploys, edge functions, and AI primitives.',
    url: 'https://vercel.com',
    accent: '#ffffff',
  },
  {
    title: 'Stripe',
    category: 'Fintech · Payments',
    description: 'Programmable payments infrastructure trusted by millions of businesses.',
    url: 'https://stripe.com',
    accent: '#635BFF',
  },
  {
    title: 'Framer',
    category: 'Design · Tools',
    description: 'A visual canvas that produces production-grade websites and interactions.',
    url: 'https://framer.com',
    accent: '#0099FF',
  },
]

export const CASE_STUDIES = [
  {
    client: 'Orbital Freight',
    tag: 'Logistics platform',
    title: 'Replatformed a 12-year-old dispatch system without losing a day of operations.',
    metrics: [
      { label: 'Dispatch time', value: '−62%' },
      { label: 'Fleet utilization', value: '+18%' },
      { label: 'Cutover downtime', value: '0 min' },
    ],
  },
  {
    client: 'Helio Health',
    tag: 'Patient engagement',
    title: 'Shipped a HIPAA-aligned scheduling app in 14 weeks — and through SOC 2 in 3 months.',
    metrics: [
      { label: 'No-show rate', value: '−37%' },
      { label: 'NPS', value: '71' },
      { label: 'Audit findings', value: '0' },
    ],
  },
  {
    client: 'Quantic AI',
    tag: 'LLM product',
    title: 'Designed and engineered an evaluation platform now used by 40+ ML teams.',
    metrics: [
      { label: 'Eval throughput', value: '9.4×' },
      { label: 'Time-to-insight', value: '−71%' },
      { label: 'Internal users', value: '1,200+' },
    ],
  },
]

export const TESTIMONIALS = [
  {
    quote:
      "They operate like a senior team we just hired — not a vendor. The bar on engineering craft is noticeably higher than the last three partners we worked with.",
    author: 'Priya Narayan',
    role: 'VP Engineering',
    company: 'Orbital Freight',
  },
  {
    quote:
      "Northbound took a roadmap we'd been stuck on for a year and turned it into six production launches. Calm, predictable, and the code holds up.",
    author: 'Marcus Haight',
    role: 'CTO',
    company: 'Helio Health',
  },
  {
    quote:
      "Rare combination of product thinking and actual engineering depth. Our team levels up every time we work with them.",
    author: 'Elena Rossi',
    role: 'Head of Product',
    company: 'Lumen Finance',
  },
  {
    quote:
      "They killed a feature we thought we needed, saved us two months, and were right. That alone paid for the engagement.",
    author: 'David Okoye',
    role: 'Founder',
    company: 'Parallel Grid',
  },
]

export const TECH_STACK = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Svelte', 'Astro'],
  },
  {
    category: 'Mobile',
    items: ['React Native', 'Swift', 'Kotlin', 'Expo'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Go', 'Python', 'Rust', 'PostgreSQL', 'Redis'],
  },
  {
    category: 'Cloud & Infra',
    items: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'Cloudflare', 'Vercel'],
  },
  {
    category: 'Data & AI',
    items: ['dbt', 'Snowflake', 'ClickHouse', 'OpenAI', 'LangChain', 'Pinecone'],
  },
  {
    category: 'Tooling',
    items: ['GitHub Actions', 'Datadog', 'Sentry', 'Linear', 'Figma'],
  },
]
