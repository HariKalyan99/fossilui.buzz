import { useEffect, useId, useRef, useState } from "react";

const TURNSTILE_SCRIPT_ID = "cf-turnstile-script";
const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

const TURNSTILE_WIDTH = 300;
const TURNSTILE_HEIGHT = 65;

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
  const shellRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onChangeRef = useRef(onChange);
  const onLoadErrorRef = useRef(onLoadError);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onLoadErrorRef.current = onLoadError;
  }, [onLoadError]);

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return undefined;

    const updateScale = () => {
      const width = el.getBoundingClientRect().width;
      if (!width) return;
      setScale(Math.min(1, width / TURNSTILE_WIDTH));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    window.addEventListener("resize", updateScale);
    window.visualViewport?.addEventListener("resize", updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
      window.visualViewport?.removeEventListener("resize", updateScale);
    };
  }, []);

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

  const scaled = scale < 0.999;
  const shellHeight = scaled ? TURNSTILE_HEIGHT * scale : TURNSTILE_HEIGHT;

  return (
    <div
      ref={shellRef}
      className="turnstile-widget w-full max-w-[300px] min-w-0 overflow-hidden"
      style={{ height: shellHeight }}
    >
      <div
        className="turnstile-widget__frame"
        style={
          scaled
            ? {
                width: TURNSTILE_WIDTH,
                height: TURNSTILE_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }
            : undefined
        }
      >
        <div id={containerId} />
      </div>
    </div>
  );
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
