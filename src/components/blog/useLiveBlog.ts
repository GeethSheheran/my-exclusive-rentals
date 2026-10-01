"use client";

import { useCallback, useEffect, useState } from "react";

export function useLiveBlog<T>(load: () => Promise<T>, initialData?: T) {
  const [data, setData] = useState<T | undefined>(initialData);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(initialData === undefined);
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  useEffect(() => {
    let active = true;
    let pending = false;
    const refresh = async () => {
      if (pending) return;
      pending = true;
      let timeout: ReturnType<typeof setTimeout> | undefined;
      try {
        const result = await Promise.race([
          load(),
          new Promise<never>((_, reject) => {
            timeout = setTimeout(() => reject(new Error("Blog request timed out")), 15000);
          }),
        ]);
        if (active) {
          setData(result);
          setError(false);
        }
      } catch {
        if (active) setError(true);
      } finally {
        clearTimeout(timeout);
        pending = false;
        if (active) setLoading(false);
      }
    };
    const refreshIfVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    void refresh();
    window.addEventListener("focus", refreshIfVisible);
    document.addEventListener("visibilitychange", refreshIfVisible);
    const interval = setInterval(refreshIfVisible, 60000);
    return () => {
      active = false;
      clearInterval(interval);
      window.removeEventListener("focus", refreshIfVisible);
      document.removeEventListener("visibilitychange", refreshIfVisible);
    };
  }, [load, attempt]);

  return { data, error, loading, retry };
}
