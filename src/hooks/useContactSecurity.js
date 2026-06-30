import { useRef, useState } from "react";
import { useTurnstileConfig } from "./useTurnstileConfig";

export function useContactSecurity() {
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState("");
  const turnstileRef = useRef(null);
  const turnstileConfig = useTurnstileConfig();

  const resetSecurity = () => {
    setHoneypot("");
    setTurnstileToken("");
    setTurnstileError("");
    turnstileRef.current?.reset();
  };

  const assertReady = () => {
    if (turnstileConfig.loading) {
      throw new Error("Security check is still loading. Please wait a moment.");
    }

    if (turnstileConfig.required && !turnstileConfig.siteKey) {
      throw new Error(
        "Security check failed to load. Please refresh the page or try again later.",
      );
    }

    if (turnstileConfig.enabled && !turnstileToken) {
      throw new Error(
        turnstileError ||
          "Please complete the security check before submitting.",
      );
    }
  };

  return {
    honeypot,
    turnstileToken,
    turnstileError,
    resetSecurity,
    assertReady,
    securityProps: {
      honeypot,
      onHoneypotChange: setHoneypot,
      onTurnstileChange: (token) => {
        setTurnstileToken(token);
        if (token) setTurnstileError("");
      },
      turnstileRef,
      turnstileSiteKey: turnstileConfig.siteKey,
      turnstileLoading: turnstileConfig.loading,
      onTurnstileLoadError: () => {
        setTurnstileError(
          "Security check could not load. Check your connection or refresh the page.",
        );
      },
    },
  };
}
