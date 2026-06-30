function getUserLocation() {
  if (typeof Intl === "undefined") return undefined;
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export async function submitContact(payload, { honeypot = "", turnstileToken = "" } = {}) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      userLocation: getUserLocation(),
      website: honeypot,
      turnstileToken,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error || "Request failed");
  }
  return data;
}

export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";
export const TURNSTILE_ENABLED = Boolean(TURNSTILE_SITE_KEY);
