"use client";

import { useEffect, useRef, useState } from "react";

const IDLE_TIMEOUT = 5 * 60 * 1000;
const WARN_BEFORE = 30 * 1000;

export function useSessionTimeout(onTimeout: () => void) {
  const [showWarning, setShowWarning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warnRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(onTimeout);
  callbackRef.current = onTimeout;

  useEffect(() => {
    function reset() {
      setShowWarning(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (warnRef.current) clearTimeout(warnRef.current);

      warnRef.current = setTimeout(() => {
        setShowWarning(true);
      }, IDLE_TIMEOUT - WARN_BEFORE);

      timerRef.current = setTimeout(() => {
        callbackRef.current();
      }, IDLE_TIMEOUT);
    }

    reset();

    window.addEventListener("mousemove", reset);
    window.addEventListener("keydown", reset);
    window.addEventListener("scroll", reset);
    window.addEventListener("click", reset);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (warnRef.current) clearTimeout(warnRef.current);
      window.removeEventListener("mousemove", reset);
      window.removeEventListener("keydown", reset);
      window.removeEventListener("scroll", reset);
      window.removeEventListener("click", reset);
    };
  }, []);

  return { showWarning };
}
