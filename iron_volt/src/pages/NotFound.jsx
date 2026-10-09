import Button from '../components/ui/Button'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')

  return (
    <section className="grain relative flex min-h-svh items-center overflow-hidden bg-ink pt-28 pb-20">
      <p
        aria-hidden="true"
        className="type-display pointer-events-none absolute -right-[0.05em] bottom-[-0.12em] select-none text-[38vw] leading-none text-bone/[0.04]"
      >
        404
      </p>
      <div className="container-x relative">
        <p className="type-eyebrow text-volt">Error 404</p>
        <h1 className="type-display mt-6 text-giant">
          <span className="block text-bone">Missed</span>
          <span className="block text-volt">the rep.</span>
        </h1>
        <p className="mt-8 max-w-md text-lead text-ash">The page you are looking for does not exist or has moved.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button to="/">Back to home</Button>
          <Button to="/programs" variant="outline">
            Explore programs
          </Button>
        </div>
      </div>
    </section>
  )
}
