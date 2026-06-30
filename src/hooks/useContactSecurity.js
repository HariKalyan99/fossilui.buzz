import { useCallback, useMemo, useRef, useState } from "react";
import { useTurnstileConfig } from "./useTurnstileConfig";

export function useContactSecurity() {
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState("");
  const turnstileRef = useRef(null);
  const turnstileConfig = useTurnstileConfig();

  const onTurnstileChange = useCallback((token) => {
    setTurnstileToken(token);
    if (token) setTurnstileError("");
  }, []);

  const onTurnstileLoadError = useCallback(() => {
    setTurnstileError(
      "Security check could not load. Check your connection or refresh the page.",
    );
  }, []);

  const resetSecurity = useCallback(() => {
    setHoneypot("");
    setTurnstileToken("");
    setTurnstileError("");
    turnstileRef.current?.reset();
  }, []);

  const assertReady = useCallback(() => {
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
  }, [turnstileConfig, turnstileError, turnstileToken]);

  const securityProps = useMemo(
    () => ({
      honeypot,
      onHoneypotChange: setHoneypot,
      onTurnstileChange,
      turnstileRef,
      turnstileSiteKey: turnstileConfig.siteKey,
      turnstileLoading: turnstileConfig.loading,
      onTurnstileLoadError: onTurnstileLoadError,
    }),
    [
      honeypot,
      onTurnstileChange,
      onTurnstileLoadError,
      turnstileConfig.loading,
      turnstileConfig.siteKey,
    ],
  );

  return {
    honeypot,
    turnstileToken,
    turnstileError,
    resetSecurity,
    assertReady,
    securityProps,
  };
}
