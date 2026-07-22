"use client";

import { useEffect, useCallback } from "react";

export function useAutoSave(key: string, value: string) {
  useEffect(() => {
    if (value) {
      localStorage.setItem(key, value);
    }
  }, [key, value]);

  const load = useCallback(() => {
    return localStorage.getItem(key) ?? "";
  }, [key]);

  const clear = useCallback(() => {
    localStorage.removeItem(key);
  }, [key]);

  return { load, clear };
}
