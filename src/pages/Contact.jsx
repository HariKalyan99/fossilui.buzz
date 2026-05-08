import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, Check } from "lucide-react";
import { GithubIcon, TwitterIcon } from "../components/icons/Brand";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { Tag } from "../components/ui/Tag";
import { Input, Textarea } from "../components/ui/Input";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email.includes("@") || !form.message) return;
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
          username: form.name,
          email: form.email,
          contact: "",
          info: "contact request",
          remarks: form.message,
          userLocation,
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload?.error || "Failed to send message");
      }
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message || "Could not send your message right now");
    } finally {
      setSending(false);
    }
  };

  return (
    <Section className="pt-12 md:pt-20">
      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] items-start">
        <div>
          <Tag tone="accent">Contact</Tag>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-neutral-900 text-balance">
            Say hi. We read everything.
          </h1>
          <p className="mt-4 text-neutral-600 max-w-md text-balance leading-relaxed">
            Found a bug, want a new template, or just wanna nerd out about UI?
            Send a message — we read every email.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="mailto:makeartanhear8@gmail.com"
              className="card card-hover p-4 flex items-center gap-3"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-neutral-700">
                <Mail className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[14px] text-neutral-900 font-medium">
                  makeartanhear8@gmail.com
                </div>
                <div className="text-[12px] text-neutral-500">Direct email</div>
              </div>
            </a>
            <a
              href="https://github.com/HariKalyan99/fossilui.buzz"
              target="_blank"
              rel="noreferrer"
              className="card card-hover p-4 flex items-center gap-3"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-neutral-700">
                <GithubIcon className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[14px] text-neutral-900 font-medium">
                  GitHub
                </div>
                <div className="text-[12px] text-neutral-500">
                  Issues, PRs, stars
                </div>
              </div>
            </a>
            <div className="card p-4 flex items-center gap-3 opacity-70">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-neutral-100 text-neutral-400">
                <TwitterIcon className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[14px] text-neutral-900 font-medium">
                  Twitter
                </div>
                <div className="text-[12px] text-neutral-500">Coming soon</div>
              </div>
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          onSubmit={onSubmit}
          className="card p-6 md:p-8 flex flex-col gap-4"
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-neutral-100 text-neutral-700">
              <MessageSquare className="h-3.5 w-3.5" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-medium">
              Send a message
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-name"
                className="text-[12px] text-neutral-600 mb-1 block font-medium"
              >
                Name
              </label>
              <Input
                id="contact-name"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="text-[12px] text-neutral-600 mb-1 block font-medium"
              >
                Email
              </label>
              <Input
                id="contact-email"
                type="email"
                placeholder="you@developer.dev"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="text-[12px] text-neutral-600 mb-1 block font-medium"
            >
              Message
            </label>
            <Textarea
              id="contact-message"
              placeholder="What's on your mind?"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="self-start"
            disabled={sending}
          >
            {sent ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Sent — thanks
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                {sending ? "Sending…" : "Send Message"}
              </>
            )}
          </Button>

          {error ? (
            <p className="text-[12px] text-rose-600">{error}</p>
          ) : (
            <p className="text-[11.5px] text-neutral-500">
              Messages are securely saved and we send a confirmation email
              instantly.
            </p>
          )}
        </motion.form>
      </div>
    </Section>
  );
}
