import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <PageTransition>
      <section className="container-x grid min-h-[calc(100vh-8rem)] place-items-center py-20 text-center">
        <div>
          <div className="font-display text-7xl font-semibold">
            <span className="gradient-text">404</span>
          </div>
          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight">
            This page drifted off into the latent space
          </h1>
          <p className="mt-2 text-muted">
            The page you're looking for doesn't exist — or it was never generated.
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <Button as={Link} to="/">Back home</Button>
            <Button as={Link} to="/generate" variant="secondary">
              Open Studio
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
