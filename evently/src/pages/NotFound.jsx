import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <div className="font-display text-8xl font-bold gradient-text">404</div>
      <h1 className="mt-4 font-display text-3xl font-bold">This page wandered off</h1>
      <p className="mt-2 text-white/60 max-w-md mx-auto">
        Looks like the event you're looking for either ended, moved, or never existed. Head back home and discover something new.
      </p>
      <Link to="/" className="btn-primary mt-8 inline-flex">
        <Home className="w-4 h-4" />
        Back to home
      </Link>
    </div>
  );
}
