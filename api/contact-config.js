import { applyCors } from "./lib/contact-security.js";

export function getTurnstileSiteKey() {
  return (
    process.env.TURNSTILE_SITE_KEY ||
    process.env.VITE_TURNSTILE_SITE_KEY ||
    ""
  );
}

export default async function handler(req, res) {
  const corsAllowed = applyCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(corsAllowed ? 200 : 403).end();
  }
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!corsAllowed) {
    return res.status(403).json({ error: "Origin not allowed" });
  }

  return res.status(200).json({
    turnstileSiteKey: getTurnstileSiteKey(),
    turnstileRequired: Boolean(process.env.TURNSTILE_SECRET_KEY),
  });
}
