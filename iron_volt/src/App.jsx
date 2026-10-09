import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'

const Programs = lazy(() => import('./pages/Programs'))
const Membership = lazy(() => import('./pages/Membership'))
const Trainers = lazy(() => import('./pages/Trainers'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const BookTrial = lazy(() => import('./pages/BookTrial'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return (
    <div role="status" className="flex min-h-svh items-center justify-center bg-ink">
      <span className="sr-only">Loading page</span>
      <span aria-hidden="true" className="h-px w-24 overflow-hidden bg-bone/10">
        <span className="animate-scroll-cue block h-full w-full bg-volt" />
      </span>
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      {(location) => (
        <Suspense fallback={<PageFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-trial" element={<BookTrial />} />
            <Route path="/privacy" element={<Legal type="privacy" />} />
            <Route path="/terms" element={<Legal type="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      )}
    </Layout>
  )
}
