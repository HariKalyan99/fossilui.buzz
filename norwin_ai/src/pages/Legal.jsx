import PageTransition from '../components/layout/PageTransition';

function LegalDoc({ title, updated, children }) {
  return (
    <PageTransition>
      <section className="container-x pt-16 pb-20">
        <div className="mx-auto max-w-3xl">
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Legal
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted">Last updated {updated}</p>

          <div className="prose prose-invert mt-10 max-w-none prose-headings:font-display prose-headings:tracking-tight prose-p:text-muted prose-li:text-muted prose-strong:text-text prose-a:text-primary-400">
            {children}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export function Privacy() {
  return (
    <LegalDoc title="Privacy Policy" updated="April 2026">
      <p>
        We respect your privacy. This policy describes what information Nova collects, how we
        use it, and the controls you have. For questions, email{' '}
        <a href="mailto:privacy@nova.ai">privacy@nova.ai</a>.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>Account information (name, email, billing details).</li>
        <li>Prompts and outputs you generate within your workspace.</li>
        <li>Basic telemetry used to keep Nova running reliably.</li>
      </ul>
      <h2>How we use information</h2>
      <ul>
        <li>To provide the service and secure your account.</li>
        <li>To improve reliability, performance, and safety.</li>
        <li>We never use your prompts or outputs to train our models.</li>
      </ul>
      <h2>Your controls</h2>
      <p>
        You can export or delete your data at any time from the Dashboard → Settings page. We
        retain logs for up to 30 days for security and abuse prevention.
      </p>
    </LegalDoc>
  );
}

export function Terms() {
  return (
    <LegalDoc title="Terms of Service" updated="April 2026">
      <p>
        By accessing Nova, you agree to these terms. Please read them carefully. If you have
        questions, email <a href="mailto:legal@nova.ai">legal@nova.ai</a>.
      </p>
      <h2>Acceptable use</h2>
      <ul>
        <li>No unlawful, harmful, or infringing content.</li>
        <li>No generation of deceptive media of real people without consent.</li>
        <li>No attempts to disrupt or reverse-engineer the service.</li>
      </ul>
      <h2>Your content</h2>
      <p>
        You retain ownership of your prompts and generated outputs, subject to applicable law.
        You grant us a limited license to host and display your content to deliver the service.
      </p>
      <h2>Subscriptions</h2>
      <p>
        Plans renew automatically until cancelled. You may cancel anytime — access continues
        through the end of the billing period.
      </p>
    </LegalDoc>
  );
}
