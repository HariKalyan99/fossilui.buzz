import { useEffect, useId, useRef } from "react";

const TURNSTILE_SCRIPT_ID = "cf-turnstile-script";
const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadTurnstileScript() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Turnstile is only available in the browser"));
  }
  if (window.turnstile) return Promise.resolve(window.turnstile);

  const existing = document.getElementById(TURNSTILE_SCRIPT_ID);
  if (existing?.dataset.loaded === "true" && window.turnstile) {
    return Promise.resolve(window.turnstile);
  }

  return new Promise((resolve, reject) => {
    const script = existing || document.createElement("script");
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      script.dataset.loaded = "true";
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error("Turnstile failed to initialize"));
    };
    script.onerror = () => reject(new Error("Failed to load Turnstile"));

    if (!existing) document.head.appendChild(script);
  });
}

function TurnstileWidget({ siteKey, onChange, widgetRef, onLoadError }) {
  const containerId = useId().replace(/:/g, "");
  const widgetIdRef = useRef(null);

  useEffect(() => {
    if (!siteKey) return undefined;

    let cancelled = false;

    loadTurnstileScript()
      .then((turnstile) => {
        if (cancelled) return;

        widgetIdRef.current = turnstile.render(`#${containerId}`, {
          sitekey: siteKey,
          theme: "light",
          size: "flexible",
          callback: (token) => onChange(token),
          "expired-callback": () => onChange(""),
          "error-callback": () => {
            onChange("");
            onLoadError?.();
          },
        });

        if (widgetRef) {
          widgetRef.current = {
            reset: () => {
              if (widgetIdRef.current != null) {
                turnstile.reset(widgetIdRef.current);
              }
              onChange("");
            },
          };
        }
      })
      .catch((err) => {
        console.error(err);
        onChange("");
        onLoadError?.();
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current != null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      if (widgetRef) widgetRef.current = null;
    };
  }, [containerId, onChange, onLoadError, siteKey, widgetRef]);

  return <div id={containerId} className="min-h-[65px]" />;
}

export function ContactSecurityFields({
  honeypot,
  onHoneypotChange,
  onTurnstileChange,
  turnstileRef,
  turnstileSiteKey,
  turnstileLoading,
  onTurnstileLoadError,
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => onHoneypotChange(e.target.value)}
        />
      </div>

      {turnstileLoading ? (
        <p className="text-[12px] text-neutral-500">Loading security check…</p>
      ) : null}

      {turnstileSiteKey ? (
        <TurnstileWidget
          siteKey={turnstileSiteKey}
          onChange={onTurnstileChange}
          widgetRef={turnstileRef}
          onLoadError={onTurnstileLoadError}
        />
      ) : null}
    </>
  );
}
