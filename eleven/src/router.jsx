import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import NotFound from '@/pages/NotFound'

// Lazy-load route bundles. The editor (Tiptap) and media (large gradients)
// are the heaviest, so they only load when the user navigates there.
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Content = lazy(() => import('@/pages/Content'))
const Editor = lazy(() => import('@/pages/Editor'))
const Media = lazy(() => import('@/pages/Media'))
const Users = lazy(() => import('@/pages/Users'))
const Settings = lazy(() => import('@/pages/Settings'))

function RouteFallback() {
  return (
    <div className="space-y-4">
      <div className="skeleton h-8 w-48" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-[120px] rounded-xl" />
        ))}
      </div>
      <div className="skeleton h-[260px] rounded-xl" />
    </div>
  )
}

function withSuspense(El) {
  return (
    <Suspense fallback={<RouteFallback />}>
      <El />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: withSuspense(Dashboard) },
      { path: 'content', element: withSuspense(Content) },
      { path: 'content/new', element: withSuspense(Editor) },
      { path: 'content/:id', element: withSuspense(Editor) },
      { path: 'media', element: withSuspense(Media) },
      { path: 'users', element: withSuspense(Users) },
      { path: 'settings', element: withSuspense(Settings) },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
