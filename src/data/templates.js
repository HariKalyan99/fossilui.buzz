// Templates registry. Each entry is hand-curated metadata for a template that
// lives at /home/harikalyan/fossilUI/<slug>. Source files are resolved lazily
// by the file-loader (see ./templateFiles.js) so the platform stays fast.

export const TEMPLATES = [
  {
    slug: 'atelier_09',
    name: 'Atelier 09',
    tagline: 'Boutique design studio portfolio',
    description:
      'A magazine-grade portfolio for design studios and boutique agencies. Editorial typography, pixel-tight grids, and motion that respects the work.',
    category: 'Portfolio',
    tags: ['Portfolio', 'Agency', 'Editorial'],
    accent: 'from-indigo-50 via-violet-50 to-fuchsia-50',
    swatch: '#6366f1',
    previewVideoUrl: '/videos/atelier_09.optimized.mp4',
    liveUrl: 'https://fossil-ui-template-v1-atelier-09.vercel.app/',
    githubUrl: 'https://github.com/HariKalyan99/fossilUI-template-v1-atelier_09',
  },
  {
    slug: 'eleven',
    name: 'Eleven CRM',
    tagline: 'Customer relationship dashboard',
    description:
      'Operational CRM dashboard with pipeline, contacts and reporting. Built for product teams who care about density and clarity.',
    category: 'Dashboard',
    tags: ['CRM', 'Dashboard', 'SaaS'],
    accent: 'from-sky-50 via-cyan-50 to-emerald-50',
    swatch: '#0ea5e9',
    previewVideoUrl: '/videos/elevencrm.optimized.mp4',
    liveUrl: 'https://fossil-ui-template-v1-elevencrm.vercel.app/',
    githubUrl: 'https://github.com/HariKalyan99/fossilUI-template-v1-elevencrm',
  },
  {
    slug: 'evently',
    name: 'Evently',
    tagline: 'Events and ticketing landing',
    description:
      'A high-energy events landing page with schedule, speakers and ticketing. Optimized for conversion without feeling pushy.',
    category: 'Marketing',
    tags: ['Events', 'Marketing', 'Landing'],
    accent: 'from-rose-50 via-orange-50 to-amber-50',
    swatch: '#f43f5e',
    previewVideoUrl: '/videos/evently.optimized.mp4',
    liveUrl: 'https://fossil-ui-template-v1-evently.vercel.app/',
    githubUrl: 'https://github.com/HariKalyan99/fossilUI-template-v1-evently',
  },
  {
    slug: 'glimpse',
    name: 'Glimpse',
    tagline: 'Photography & visual story',
    description:
      'A visual-first storytelling template for photographers and creators. Slow scroll, large imagery, quiet typography.',
    category: 'Portfolio',
    tags: ['Photography', 'Portfolio', 'Story'],
    accent: 'from-amber-50 via-orange-50 to-pink-50',
    swatch: '#f59e0b',
    previewVideoUrl: '/videos/glimpse.optimized.mp4',
    liveUrl: 'https://fossil-ui-template-v1-glimpse.vercel.app/',
    githubUrl: 'https://github.com/HariKalyan99/fossilUI-template-v1-glimpse',
  },
  {
    slug: 'nebula',
    name: 'Nebula',
    tagline: 'AI / Developer tooling SaaS',
    description:
      'Premium SaaS landing for AI and developer tooling. Hero with depth, feature grid, pricing and credible social proof.',
    category: 'SaaS',
    tags: ['SaaS', 'AI', 'DevTool'],
    accent: 'from-violet-50 via-indigo-50 to-cyan-50',
    swatch: '#8b5cf6',
    previewVideoUrl: '/videos/nebula.optimized.mp4',
    liveUrl: 'https://fossil-ui-template-v1-nebula.vercel.app/',
    githubUrl: 'https://github.com/HariKalyan99/fossilUI-template-v1-nebula',
  },
  {
    slug: 'northbound_labs',
    name: 'Northbound Labs',
    tagline: 'Research lab / product studio',
    description:
      'Quiet, considered marketing site for product studios and research labs. Heavy on typography, light on noise.',
    category: 'Marketing',
    tags: ['Studio', 'Marketing', 'Lab'],
    accent: 'from-emerald-50 via-teal-50 to-cyan-50',
    swatch: '#10b981',
    previewVideoUrl: '/videos/northboundlabs.optimized.mp4',
    liveUrl: 'https://fossil-ui-template-v1-northbound-la.vercel.app/',
    githubUrl: 'https://github.com/HariKalyan99/fossilUI-template-v1-northbound_labs',
  },
  {
    slug: 'norwin_ai',
    name: 'Norwin AI',
    tagline: 'AI product marketing site',
    description:
      'A focused AI product page with model cards, demo strip, and pricing. Fast to ship, easy to extend.',
    category: 'SaaS',
    tags: ['AI', 'Product', 'Marketing'],
    accent: 'from-fuchsia-50 via-pink-50 to-indigo-50',
    swatch: '#d946ef',
    previewVideoUrl: '/videos/norwinai.optimized.mp4',
    liveUrl: 'https://fossil-ui-template-v1-norwin-ai.vercel.app/',
    githubUrl: 'https://github.com/HariKalyan99/fossilUI-template-v1-norwin_ai',
  },
  {
    slug: 'olea',
    name: 'Olea',
    tagline: 'E-commerce product story',
    description:
      'Refined e-commerce template for premium goods. Editorial product detail pages, calm hero, and conversion-aware checkout flow.',
    category: 'E-commerce',
    tags: ['E-commerce', 'Shop', 'Editorial'],
    accent: 'from-lime-50 via-emerald-50 to-teal-50',
    swatch: '#84cc16',
    previewVideoUrl: '/videos/olea.optimized.mp4',
    liveUrl: 'https://fossil-ui-template-v1-olea.vercel.app/',
    githubUrl: 'https://github.com/HariKalyan99/fossilUI-template-v1-olea',
  },
]

export const CATEGORIES = ['All', 'Portfolio', 'Dashboard', 'SaaS', 'Marketing', 'E-commerce']

export function getTemplate(slug) {
  return TEMPLATES.find((t) => t.slug === slug)
}
