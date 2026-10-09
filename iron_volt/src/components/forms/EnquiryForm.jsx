import { useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CircleAlert, CircleCheck, LoaderCircle, Mail, PencilLine, TriangleAlert } from 'lucide-react'
import Button from '../ui/Button'
import { ChoiceGroup, Field, Input, Select, Textarea } from '../ui/FormField'
import { buildMailto, submitEnquiry } from '../../lib/enquiry'
import { programs } from '../../data/programs'
import { memberships } from '../../data/memberships'
import { site } from '../../data/site'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const programOptions = [
  ...programs.map((p) => ({ value: p.slug, label: p.title })),
  { value: 'not-sure', label: 'Not sure yet' },
]
const planOptions = [
  ...memberships.map((m) => ({ value: m.id, label: m.name })),
  { value: 'undecided', label: 'Undecided' },
]
const timeOptions = [
  { value: 'morning', label: 'Morning (06:00 – 12:00)' },
  { value: 'afternoon', label: 'Afternoon (12:00 – 17:00)' },
  { value: 'evening', label: 'Evening (17:00 – close)' },
]
const experienceOptions = [
  { value: 'new', label: 'New to training' },
  { value: 'some', label: 'Some experience' },
  { value: 'experienced', label: 'Experienced' },
]

const ease = [0.16, 1, 0.3, 1]

function todayISO() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

function validate(values, variant) {
  const e = {}
  if (values.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!EMAIL.test(values.email.trim())) e.email = 'Enter a valid email address, like name@example.com.'
  if (values.phone.trim() && values.phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a valid phone number or leave this blank.'

  if (variant === 'trial') {
    if (!values.interest) e.interest = 'Choose the program you are most interested in.'
    if (!values.date) e.date = 'Choose a preferred date.'
    else if (values.date < todayISO()) e.date = 'Choose today or a future date.'
    if (!values.time) e.time = 'Choose a preferred time of day.'
    if (!values.experience) e.experience = 'Tell us your training experience.'
  } else if (values.message.trim().length < 10) {
    e.message = 'Please add a short message (at least 10 characters).'
  }

  if (!values.consent) e.consent = 'Please confirm we can contact you about this enquiry.'
  return e
}

/**
 * Trial booking (`variant="trial"`) or general enquiry (`variant="contact"`).
 * Submission only reports success when a configured endpoint accepts it.
 */
export default function EnquiryForm({ variant = 'trial', initialPlan = '', initialProgram = '' }) {
  const formId = useId()
  const formRef = useRef(null)
  const statusRef = useRef(null)
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    interest: programOptions.some((o) => o.value === initialProgram) ? initialProgram : '',
    plan: planOptions.some((o) => o.value === initialPlan) ? initialPlan : '',
    date: '',
    time: '',
    experience: '',
    message: '',
    consent: false,
    company: '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')

  const isTrial = variant === 'trial'

  const update = (name, value) => {
    const next = { ...values, [name]: value }
    setValues(next)
    if (touched[name] || errors[name]) {
      const all = validate(next, variant)
      setErrors((prev) => ({ ...prev, [name]: all[name] }))
    }
  }

  const onBlur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }))
    const all = validate(values, variant)
    setErrors((prev) => ({ ...prev, [name]: all[name] }))
  }

  const bind = (name) => ({
    value: values[name],
    onChange: (e) => update(name, e.target.value),
    onBlur: () => onBlur(name),
    error: errors[name],
  })

  const summary = [
    ['Name', values.name],
    ['Email', values.email],
    ['Phone', values.phone],
    ['Program', programOptions.find((o) => o.value === values.interest)?.label],
    ['Membership', planOptions.find((o) => o.value === values.plan)?.label],
    ['Preferred date', values.date],
    ['Preferred time', timeOptions.find((o) => o.value === values.time)?.label],
    ['Experience', experienceOptions.find((o) => o.value === values.experience)?.label],
    ['Message', values.message],
  ]

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'submitting') return
    if (values.company) return

    const found = validate(values, variant)
    setErrors(found)
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])))

    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      const el = formRef.current?.querySelector(`[name="${firstInvalid}"]`)
      el?.focus()
      return
    }

    setStatus('submitting')
    setServerError('')
    try {
      const payload = { ...values }
      delete payload.company
      const result = await submitEnquiry({ type: variant, ...payload })
      setStatus(result.status)
    } catch (err) {
      setServerError(err.message || 'Something went wrong.')
      setStatus('error')
    }
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  const subject = isTrial ? `Trial session request — ${values.name}` : `Enquiry — ${values.name}`

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <motion.div
            key="sent"
            ref={statusRef}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="border border-volt/40 bg-charcoal p-8 outline-none sm:p-10"
          >
            <CircleCheck aria-hidden="true" className="size-10 text-volt" />
            <h3 className="type-display mt-6 text-title">Request received.</h3>
            <p className="mt-4 max-w-lg leading-relaxed text-ash">
              Thanks, {values.name.split(' ')[0]}. Your {isTrial ? 'trial request' : 'enquiry'} was delivered. A member
              of the team will reply to {values.email} to confirm the details.
            </p>
          </motion.div>
        ) : status === 'not-configured' ? (
          <motion.div
            key="not-configured"
            ref={statusRef}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="border border-bone/15 bg-charcoal p-8 outline-none sm:p-10"
          >
            <TriangleAlert aria-hidden="true" className="size-9 text-volt" />
            <h3 className="type-display mt-6 text-title">Not sent yet.</h3>
            <p className="mt-4 max-w-xl leading-relaxed text-bone/85">
              Your details are complete, but online {isTrial ? 'booking is' : 'enquiries are'} not connected on this
              website yet, so <strong className="text-bone">nothing has been transmitted</strong>. Send the same details
              by email instead, or call us on{' '}
              <a href={site.contact.phoneHref} className="link-underline text-volt">
                {site.contact.phone}
              </a>
              .
            </p>

            <dl className="mt-8 grid gap-x-8 gap-y-3 border-t border-bone/10 pt-6 text-sm sm:grid-cols-2">
              {summary
                .filter(([, v]) => v)
                .map(([label, v]) => (
                  <div key={label} className={label === 'Message' ? 'sm:col-span-2' : ''}>
                    <dt className="type-eyebrow text-ash">{label}</dt>
                    <dd className="mt-1 break-words text-bone">{v}</dd>
                  </div>
                ))}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={buildMailto(site.contact.email, subject, summary)} icon={false}>
                <span className="inline-flex items-center gap-2">
                  <Mail aria-hidden="true" className="size-4" /> Send by email
                </span>
              </Button>
              <Button variant="outline" icon={false} onClick={() => setStatus('idle')}>
                <span className="inline-flex items-center gap-2">
                  <PencilLine aria-hidden="true" className="size-4" /> Edit details
                </span>
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            aria-describedby={`${formId}-note`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid gap-7 sm:grid-cols-2"
          >
            <p id={`${formId}-note`} className="text-sm text-ash sm:col-span-2">
              Fields marked <span className="text-volt">*</span> are required.
            </p>

            <Field name="name" label="Full name" required error={errors.name}>
              <Input name="name" autoComplete="name" required {...bind('name')} />
            </Field>
            <Field name="email" label="Email" required error={errors.email}>
              <Input name="email" type="email" inputMode="email" autoComplete="email" required {...bind('email')} />
            </Field>
            <Field name="phone" label="Phone" error={errors.phone} hint="So a coach can call to confirm.">
              <Input name="phone" type="tel" inputMode="tel" autoComplete="tel" hint {...bind('phone')} />
            </Field>

            {isTrial ? (
              <>
                <Field name="interest" label="Program of interest" required error={errors.interest}>
                  <Select
                    name="interest"
                    required
                    placeholder="Select a program"
                    options={programOptions}
                    {...bind('interest')}
                  />
                </Field>
                <Field name="plan" label="Membership you are considering" error={errors.plan}>
                  <Select name="plan" placeholder="Select a membership" options={planOptions} {...bind('plan')} />
                </Field>
                <Field name="date" label="Preferred date" required error={errors.date}>
                  <Input name="date" type="date" min={todayISO()} required className="[color-scheme:dark]" {...bind('date')} />
                </Field>
                <Field name="time" label="Preferred time" required error={errors.time}>
                  <Select name="time" required placeholder="Select a time" options={timeOptions} {...bind('time')} />
                </Field>
                <div className="sm:col-span-2">
                  <ChoiceGroup
                    name="experience"
                    label="Training experience"
                    required
                    options={experienceOptions}
                    value={values.experience}
                    onChange={(v) => {
                      update('experience', v)
                      setTouched((t) => ({ ...t, experience: true }))
                    }}
                    error={errors.experience}
                  />
                </div>
                <Field name="message" label="Anything we should know?" className="sm:col-span-2" error={errors.message}>
                  <Textarea name="message" placeholder="Goals, injuries, schedule…" {...bind('message')} />
                </Field>
              </>
            ) : (
              <>
                <Field name="interest" label="Topic" error={errors.interest}>
                  <Select
                    name="interest"
                    placeholder="Select a topic"
                    options={programOptions}
                    {...bind('interest')}
                  />
                </Field>
                <Field name="message" label="Message" required className="sm:col-span-2" error={errors.message}>
                  <Textarea name="message" required placeholder="How can we help?" {...bind('message')} />
                </Field>
              </>
            )}

            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={values.company}
                onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-start gap-4 text-sm leading-relaxed text-bone/85">
                <input
                  type="checkbox"
                  name="consent"
                  checked={values.consent}
                  onChange={(e) => update('consent', e.target.checked)}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? 'consent-error' : undefined}
                  className="mt-0.5 size-5 shrink-0 cursor-pointer accent-volt"
                />
                <span>I agree to be contacted about this {isTrial ? 'trial request' : 'enquiry'}.</span>
              </label>
              {errors.consent && (
                <p id="consent-error" className="mt-2 text-sm font-medium text-alert">
                  {errors.consent}
                </p>
              )}
            </div>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  ref={statusRef}
                  tabIndex={-1}
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden outline-none sm:col-span-2"
                >
                  <div className="flex gap-3 border border-alert/50 p-4 text-sm text-bone">
                    <CircleAlert aria-hidden="true" className="size-5 shrink-0 text-alert" />
                    <p>
                      We could not send your {isTrial ? 'request' : 'enquiry'}. {serverError} Please try again, or email{' '}
                      <a href={`mailto:${site.contact.email}`} className="link-underline text-volt">
                        {site.contact.email}
                      </a>
                      .
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === 'submitting'}
                aria-busy={status === 'submitting'}
                className="group/btn relative inline-flex min-h-14 items-center justify-center gap-3 overflow-hidden bg-volt px-8 type-eyebrow text-ink transition-opacity disabled:cursor-wait disabled:opacity-70"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-500 ease-expo group-hover/btn:scale-y-100 group-focus-visible/btn:scale-y-100"
                />
                {status === 'submitting' && <LoaderCircle aria-hidden="true" className="relative size-4 animate-spin" />}
                <span className="relative">
                  {status === 'submitting' ? 'Sending…' : isTrial ? 'Request trial session' : 'Send enquiry'}
                </span>
              </button>
              <p className="text-xs text-ash">
                Read how we handle your details in our{' '}
                <Link to="/privacy" className="link-underline text-bone">
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
