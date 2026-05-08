import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';
import Logo from '../components/ui/Logo';
import { GithubIcon } from '../components/ui/BrandIcons';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <PageTransition>
      <section className="container-x grid min-h-[calc(100vh-4rem)] grid-cols-1 items-center gap-10 py-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="order-2 lg:order-1"
        >
          <div className="mx-auto max-w-md">
            <div className="lg:hidden">
              <Logo />
            </div>
            <h1 className="mt-8 font-display text-3xl font-semibold tracking-tight lg:mt-0">
              Welcome back
            </h1>
            <p className="mt-1 text-muted">Log in to pick up where you left off.</p>

            <div className="mt-6 space-y-2">
              <Button variant="secondary" className="w-full justify-center">
                <GithubIcon size={14} /> Continue with GitHub
              </Button>
              <Button variant="secondary" className="w-full justify-center">
                <GoogleIcon /> Continue with Google
              </Button>
            </div>

            <div className="my-6 flex items-center gap-3 text-xs text-muted">
              <span className="h-px flex-1 bg-border" />
              or with email
              <span className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label" htmlFor="email">Email</label>
                <input
                  id="email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="label" htmlFor="password">Password</label>
                  <Link to="#" className="text-xs text-primary-400 hover:underline">
                    Forgot?
                  </Link>
                </div>
                <input
                  id="password"
                  required
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input"
                  placeholder="••••••••"
                />
              </div>

              <Button type="submit" size="lg" className="w-full justify-center">
                Log in <ArrowRight size={14} />
              </Button>
            </form>

            <p className="mt-6 text-sm text-muted">
              No account?{' '}
              <Link to="/signup" className="text-primary-400 hover:underline">
                Create one — it's free
              </Link>
            </p>
          </div>
        </motion.div>

        <AuthAside />
      </section>
    </PageTransition>
  );
}

function AuthAside() {
  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative order-1 hidden overflow-hidden rounded-3xl border border-border lg:order-2 lg:block"
    >
      <img
        src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80"
        alt=""
        className="h-[560px] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-8">
        <span className="chip bg-black/40 backdrop-blur-sm">
          <Sparkles size={12} className="text-primary-400" /> Nova Studio
        </span>
        <h3 className="mt-3 font-display text-2xl font-semibold">
          Generate beyond what you can imagine.
        </h3>
        <p className="mt-2 max-w-md text-sm text-muted">
          Image, video, upscales, variations — all in one fast, private workspace.
        </p>
      </div>
    </motion.aside>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        d="M21.35 11.1H12v2.9h5.35c-.25 1.4-1.6 4.1-5.35 4.1a5.9 5.9 0 010-11.8c1.85 0 3.1.8 3.8 1.5l2.6-2.5C16.95 3.9 14.7 3 12 3a9 9 0 100 18c5.2 0 8.65-3.65 8.65-8.8 0-.6-.05-1.05-.15-1.5z"
        fill="currentColor"
      />
    </svg>
  );
}

export { AuthAside };
