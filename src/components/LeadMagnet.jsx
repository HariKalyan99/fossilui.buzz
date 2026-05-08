import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { GithubIcon } from "./icons/Brand";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

const STORAGE_KEY_DISMISSED = "fossilui:lead-magnet:dismissed";
const STORAGE_KEY_WAS_OPEN = "fossilui:lead-magnet:was-open";

export function LeadMagnet() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY_DISMISSED) === "1") return;
    if (localStorage.getItem(STORAGE_KEY_WAS_OPEN) === "1") {
      setOpen(true);
      return;
    }
    const t = setTimeout(() => setOpen(true), 10_000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onVisibilityChange = () => {
      if (document.hidden) {
        localStorage.setItem(STORAGE_KEY_WAS_OPEN, open ? "1" : "0");
        return;
      }
      if (localStorage.getItem(STORAGE_KEY_DISMISSED) === "1") return;
      if (localStorage.getItem(STORAGE_KEY_WAS_OPEN) === "1") setOpen(true);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [open]);

  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY_DISMISSED, "1");
      localStorage.setItem(STORAGE_KEY_WAS_OPEN, "0");
    } catch {
      /* ignore */
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSending(true);
    setError("");
    try {
      const userLocation =
        typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : undefined;
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "",
          email,
          contact: "",
          info: "lead magnet",
          remarks: "lead magnet request",
          userLocation,
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(payload?.error || "Failed to subscribe");
      setSubmitted(true);
      setTimeout(dismiss, 1400);
    } catch (err) {
      setError(err.message || "Failed to subscribe right now");
    } finally {
      setSending(false);
    }
  };

  return (
    <Modal open={open} onClose={dismiss} label="Stay updated">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <img
            src="/Rex.svg"
            alt=""
            aria-hidden="true"
            className="h-7 w-auto"
          />
          <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-medium">
            FossilUI
          </span>
        </div>

        <div>
          <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
            Get new templates in your inbox
          </h3>
          <p className="mt-1.5 text-sm text-neutral-600">
            Be first to know when we ship a new template, component, or docs
            guide. No spam, unsubscribe any time.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700">
            Thanks — you're on the list.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-2.5">
            <label className="sr-only" htmlFor="lead-email">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
              <Input
                id="lead-email"
                type="email"
                placeholder="you@developer.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-9"
                autoComplete="email"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={sending}
            >
              {sending ? "Submitting…" : "Get Updates"}
            </Button>
            {error && <p className="text-[12px] text-rose-600">{error}</p>}
          </form>
        )}

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-neutral-200" />
          <span className="text-[10.5px] uppercase tracking-[0.16em] text-neutral-400">
            or
          </span>
          <span className="h-px flex-1 bg-neutral-200" />
        </div>

        <Button
          as="a"
          href="https://github.com/HariKalyan99/fossilui.buzz"
          target="_blank"
          rel="noreferrer"
          variant="secondary"
          className="w-full"
        >
          <GithubIcon className="h-4 w-4" />
          Star on GitHub
        </Button>

        <button
          type="button"
          onClick={dismiss}
          className="text-[12px] text-neutral-500 hover:text-neutral-800 self-center"
        >
          Maybe later
        </button>
      </div>
    </Modal>
  );
}
