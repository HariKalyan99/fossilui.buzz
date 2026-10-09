import Eyebrow from '../components/ui/Eyebrow'
import Button from '../components/ui/Button'
import { usePageTitle } from '../hooks/usePageTitle'
import { site } from '../data/site'

const copy = {
  privacy: {
    title: 'Privacy Policy',
    body: 'This page will set out how personal information submitted through this website is collected, used and stored.',
  },
  terms: {
    title: 'Terms of Use',
    body: 'This page will set out the terms that apply to using this website and to membership agreements.',
  },
}

/** Placeholder until the gym supplies reviewed legal copy. */
export default function Legal({ type }) {
  const { title, body } = copy[type]
  usePageTitle(title)

  return (
    <section className="flex min-h-[80svh] items-center bg-ink pt-36 pb-24">
      <div className="container-x max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="type-display mt-6 text-headline">{title}</h1>
        <p className="mt-8 text-lead leading-relaxed text-bone/85">{body}</p>
        <p className="mt-4 leading-relaxed text-ash">
          The final policy has not been published yet. For questions in the meantime, contact{' '}
          <a href={`mailto:${site.contact.email}`} className="link-underline text-volt">
            {site.contact.email}
          </a>
          .
        </p>
        <div className="mt-10">
          <Button to="/" variant="outline">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  )
}
