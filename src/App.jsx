import { Suspense, lazy, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { SmoothScroll } from './components/SmoothScroll'
import { LeadMagnet } from './components/LeadMagnet'
import DinoLoader from './components/loader/DinoLoader'
import { LoadingScreen, hasModelAlreadyLoaded } from './components/loader/LoadingScreen'
import { getTemplate } from './data/templates'

const Home = lazy(() => import('./pages/Home'))
const Templates = lazy(() => import('./pages/Templates'))
const TemplateDetail = lazy(() => import('./pages/TemplateDetail'))
const Components = lazy(() => import('./pages/Components'))
const Buttons = lazy(() => import('./pages/Buttons'))
const Cards = lazy(() => import('./pages/Cards'))
const Modals = lazy(() => import('./pages/Modals'))
const Inputs = lazy(() => import('./pages/Inputs'))
const Badges = lazy(() => import('./pages/Badges'))
const Alerts = lazy(() => import('./pages/Alerts'))
const Navbars = lazy(() => import('./pages/Navbars'))
const Heroes = lazy(() => import('./pages/Heroes'))
const Separators = lazy(() => import('./pages/Separators'))
const Spinners = lazy(() => import('./pages/Spinners'))
const Docs = lazy(() => import('./pages/Docs'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <DinoLoader compact />
    </div>
  )
}

const SEO_BASE_URL = 'https://fossilui.buzz'
const SEO_IMAGE_URL = `${SEO_BASE_URL}/icon-512.png`

function RouteSeo() {
  const location = useLocation()
  const path = location.pathname

  let title = 'Fossil UI - UI that never goes extinct'
  let description =
    'Production-ready templates and components for modern developers. Browse live previews and source code.'
  let robots = 'index, follow'
  let canonicalPath = path

  if (path === '/templates') {
    title = 'Templates - Fossil UI'
    description = 'Browse free production-ready templates with live demos and source code.'
  } else if (path.startsWith('/templates/')) {
    const slug = path.split('/')[2]
    const template = slug ? getTemplate(slug) : undefined
    if (template) {
      title = `${template.name} template - Fossil UI`
      description = template.description
    } else {
      title = 'Template not found - Fossil UI'
      description = 'The requested template page could not be found.'
      robots = 'noindex, nofollow'
    }
  } else if (path === '/components') {
    title = 'Components - Fossil UI'
    description =
      'Installable React components from @fossilui/react — buttons, cards, modals, inputs, navbars, heroes, and more.'
  } else if (path === '/components/buttons') {
    title = 'Buttons - Fossil UI'
    description = 'Animated button variants from @fossilui/react — roll text, stagger letters, shine sweep, and more.'
  } else if (path === '/components/cards') {
    title = 'Cards - Fossil UI'
    description = 'Animated card variants from @fossilui/react — lift shadow, image zoom, shine sweep, tilt hover, and more.'
  } else if (path === '/components/modals') {
    title = 'Modals - Fossil UI'
    description = 'Dialog variants from @fossilui/react — fade, slide, scale, blur overlay, and drawer motion.'
  } else if (path === '/components/inputs') {
    title = 'Inputs - Fossil UI'
    description = 'Input variants from @fossilui/react — text fields, selects, toggles, and form helpers.'
  } else if (path === '/components/badges') {
    title = 'Badges - Fossil UI'
    description = 'Badge variants from @fossilui/react — pulse, shine, scale, dot, and border glow.'
  } else if (path === '/components/alerts') {
    title = 'Alerts - Fossil UI'
    description = 'Alert banners from @fossilui/react — info, success, warning, and danger states.'
  } else if (path === '/components/navbars') {
    title = 'Navbars - Fossil UI'
    description = 'Navbar layouts from @fossilui/react — minimal, centered, CTA, scroll blur, and bordered.'
  } else if (path === '/components/heroes') {
    title = 'Hero blocks - Fossil UI'
    description = 'Hero section layouts from @fossilui/react — split, stats, media, newsletter, and more.'
  } else if (path === '/components/separators') {
    title = 'Separators - Fossil UI'
    description = 'Divider components from @fossilui/react — horizontal, vertical, and labeled.'
  } else if (path === '/components/spinners') {
    title = 'Spinners - Fossil UI'
    description = 'Loading spinners from @fossilui/react — default, ring, and dots motion.'
  } else if (path === '/docs') {
    title = 'Docs - Fossil UI'
    description = 'Get Fossil UI templates running fast with install, local run, and customization guides.'
  } else if (path === '/contact') {
    title = 'Contact - Fossil UI'
    description = 'Reach out to Fossil UI for support, feedback, and template requests.'
  } else if (path !== '/') {
    title = 'Page not found - Fossil UI'
    description = 'The page you requested does not exist on Fossil UI.'
    robots = 'noindex, nofollow'
  }

  const canonicalUrl = `${SEO_BASE_URL}${canonicalPath}`

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content="Fossil UI" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={SEO_IMAGE_URL} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SEO_IMAGE_URL} />
    </Helmet>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/:slug" element={<TemplateDetail />} />
          <Route path="/components" element={<Components />} />
          <Route path="/components/buttons" element={<Buttons />} />
          <Route path="/components/cards" element={<Cards />} />
          <Route path="/components/modals" element={<Modals />} />
          <Route path="/components/inputs" element={<Inputs />} />
          <Route path="/components/badges" element={<Badges />} />
          <Route path="/components/alerts" element={<Alerts />} />
          <Route path="/components/navbars" element={<Navbars />} />
          <Route path="/components/heroes" element={<Heroes />} />
          <Route path="/components/separators" element={<Separators />} />
          <Route path="/components/spinners" element={<Spinners />} />
          <Route path="/code" element={<Navigate to="/templates" replace />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  const [modelReady, setModelReady] = useState(() => hasModelAlreadyLoaded())

  return (
    <SmoothScroll>
      <RouteSeo />
      {!modelReady && (
        <LoadingScreen onReady={() => setModelReady(true)} />
      )}
      <div className="relative min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">
          <Suspense fallback={<PageFallback />}>
            <AnimatedRoutes />
          </Suspense>
        </main>
        <Footer />
        <LeadMagnet />
      </div>
    </SmoothScroll>
  )
}

export default App
