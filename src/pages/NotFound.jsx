import { Link } from 'react-router-dom'
import { ArrowRight, Home } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="container-page min-h-[60vh] flex items-center justify-center text-center py-16">
      <div>
        <p className="text-[12px] uppercase tracking-[0.18em] text-neutral-500">404</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-neutral-900">
          That page slipped through.
        </h1>
        <p className="mt-3 text-neutral-600 max-w-md mx-auto">
          The link you followed may be broken or the page may have moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button as={Link} to="/" variant="primary" size="md">
            <Home className="h-3.5 w-3.5" />
            Back home
          </Button>
          <Button as={Link} to="/templates" variant="secondary" size="md">
            Browse templates
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
