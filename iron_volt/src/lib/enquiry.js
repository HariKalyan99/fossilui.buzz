/**
 * Sends an enquiry to the endpoint configured in `VITE_ENQUIRY_ENDPOINT`
 * (any service accepting a JSON POST, e.g. a form backend or serverless
 * function). Without an endpoint nothing is transmitted and the caller is
 * told so explicitly.
 */
const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT

export const enquiryConfigured = Boolean(endpoint)

export async function submitEnquiry(payload, { timeout = 15000 } = {}) {
  if (!endpoint) return { status: 'not-configured' }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`The server responded with ${res.status}.`)
    return { status: 'sent' }
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('The request timed out.', { cause: err })
    throw err
  } finally {
    clearTimeout(timer)
  }
}

export function buildMailto(to, subject, fields) {
  const body = fields
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
