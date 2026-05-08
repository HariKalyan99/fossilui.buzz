import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';
import Logo from '../components/ui/Logo';
import { GithubIcon } from '../components/ui/BrandIcons';
import { AuthAside } from './Login';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const benefits = [
    '50 free generations per day',
    'No credit card required',
    'Unlimited prompts & downloads',
  ];

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
              Create your free account
            </h1>
            <p className="mt-1 text-muted">
              Start generating in under a minute. No credit card required.
            </p>

            <ul className="mt-5 space-y-2">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm">
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-primary/15 text-primary-400">
                    <Check size={10} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2">
              <Button variant="secondary" className="w-full justify-center">
                <GithubIcon size={14} /> Continue with GitHub
              </Button>
            </div>

            <div className="my-6 flex items-center gap-3 text-xs text-muted">
              <span className="h-px flex-1 bg-border" />
              or with email
              <span className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label" htmlFor="name">Full name</label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                  placeholder="Jane Doe"
                />
              </div>
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
                <label className="label" htmlFor="password">Password</label>
                <input
                  id="password"
                  required
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input"
                  placeholder="At least 8 characters"
                />
              </div>

              <Button type="submit" size="lg" className="w-full justify-center">
                Create account <ArrowRight size={14} />
              </Button>
            </form>

            <p className="mt-6 text-sm text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-400 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </motion.div>

        <AuthAside />
      </section>
    </PageTransition>
  );
}
