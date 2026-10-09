import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import PageHero from '../components/sections/PageHero'
import EnquiryForm from '../components/forms/EnquiryForm'
import Eyebrow from '../components/ui/Eyebrow'
import SampleNotice from '../components/ui/SampleNotice'
import Reveal from '../components/animations/Reveal'
import { usePageTitle } from '../hooks/usePageTitle'
import { site } from '../data/site'
import heroImg from '../assets/images/page-contact.webp'

function InfoRow({ icon: Icon, label, children }) {
  return (
    <div data-reveal className="flex gap-5 border-b border-bone/10 py-6">
      <span className="grid size-11 shrink-0 place-items-center bg-charcoal text-volt">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <div>
        <h3 className="type-eyebrow text-ash">{label}</h3>
        <div className="mt-2 text-bone">{children}</div>
      </div>
    </div>
  )
}

export default function Contact() {
  usePageTitle('Contact')

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to"
        accent="the team."
        copy="Questions about programs, membership or your first session? Send a message and a coach will get back to you."
        image={heroImg}
        position="50% 60%"
      />

      <section aria-labelledby="contact-details-title" className="section-y bg-ink">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <div data-reveal>
              <Eyebrow index="01">Find us</Eyebrow>
            </div>
            <h2 id="contact-details-title" data-reveal className="type-display mt-6 text-title">
              Visit, call or write.
            </h2>

            <div className="mt-8 border-t border-bone/10">
              <InfoRow icon={MapPin} label="Address">
                {site.contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </InfoRow>
              <InfoRow icon={Mail} label="Email">
                <a href={`mailto:${site.contact.email}`} className="link-underline break-all hover:text-volt">
                  {site.contact.email}
                </a>
              </InfoRow>
              <InfoRow icon={Phone} label="Phone">
                <a href={site.contact.phoneHref} className="link-underline hover:text-volt">
                  {site.contact.phone}
                </a>
              </InfoRow>
              <InfoRow icon={Clock} label="Opening hours">
                <dl className="space-y-1.5 text-sm">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-6">
                      <dt className="text-ash">{h.days}</dt>
                      <dd className="tabular-nums">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </InfoRow>
            </div>

            <div data-reveal className="mt-8 flex aspect-[4/3] flex-col items-center justify-center gap-3 border border-dashed border-bone/15 bg-charcoal p-6 text-center">
              <MapPin aria-hidden="true" className="size-6 text-ash" />
              <p className="text-sm text-ash">
                {site.contact.mapUrl ? (
                  <a href={site.contact.mapUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-bone">
                    Open in maps<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  'A map will appear here once the address is confirmed.'
                )}
              </p>
            </div>

            <SampleNotice className="mt-6">
              Address, phone, email and hours are placeholders. Update them in src/data/site.js.
            </SampleNotice>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <Eyebrow index="02">Send a message</Eyebrow>
            <h2 className="type-display mt-6 mb-10 text-title">How can we help?</h2>
            <EnquiryForm variant="contact" />
          </div>
        </div>
      </section>
    </>
  )
}
