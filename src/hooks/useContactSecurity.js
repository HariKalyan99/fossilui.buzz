import { useRef, useState } from "react";
import { TURNSTILE_ENABLED } from "../lib/submitContact";

export function useContactSecurity() {
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef(null);

  const resetSecurity = () => {
    setHoneypot("");
    setTurnstileToken("");
    turnstileRef.current?.reset();
  };

  const assertReady = () => {
    if (TURNSTILE_ENABLED && !turnstileToken) {
      throw new Error("Please complete the security check before submitting.");
    }
  };

  return {
    honeypot,
    setHoneypot,
    turnstileToken,
    setTurnstileToken,
    turnstileRef,
    resetSecurity,
    assertReady,
    securityProps: {
      honeypot,
      onHoneypotChange: setHoneypot,
      onTurnstileChange: setTurnstileToken,
      turnstileRef,
    },
  };
}
