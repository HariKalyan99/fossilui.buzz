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
  const onChangeRef = useRef(onChange);
  const onLoadErrorRef = useRef(onLoadError);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onLoadErrorRef.current = onLoadError;
  }, [onLoadError]);

  useEffect(() => {
    if (!siteKey) return undefined;

    let cancelled = false;

    loadTurnstileScript()
      .then((turnstile) => {
        if (cancelled || widgetIdRef.current != null) return;

        widgetIdRef.current = turnstile.render(`#${containerId}`, {
          sitekey: siteKey,
          theme: "light",
          size: "normal",
          callback: (token) => onChangeRef.current(token),
          "expired-callback": () => onChangeRef.current(""),
          "error-callback": () => {
            onChangeRef.current("");
            onLoadErrorRef.current?.();
          },
        });

        if (widgetRef) {
          widgetRef.current = {
            reset: () => {
              if (widgetIdRef.current != null) {
                turnstile.reset(widgetIdRef.current);
              }
              onChangeRef.current("");
            },
          };
        }
      })
      .catch((err) => {
        console.error(err);
        onChangeRef.current("");
        onLoadErrorRef.current?.();
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current != null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      if (widgetRef) widgetRef.current = null;
    };
  }, [containerId, siteKey, widgetRef]);

  return <div id={containerId} className="min-h-[65px] w-full" />;
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
  if (turnstileLoading) {
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
        <p className="text-[12px] text-neutral-500">Loading security check…</p>
      </>
    );
  }

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
