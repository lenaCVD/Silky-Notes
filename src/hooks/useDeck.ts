"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export function useDeck(total: number) {
  const [current, setCurrent] = useState(0);
  const touchX = useRef<number | null>(null);

  const go = useCallback((n: number) => setCurrent(Math.max(0, Math.min(total - 1, n))), [total]);
  const next = useCallback(() => setCurrent((c) => Math.min(total - 1, c + 1)), [total]);
  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen();
  }, []);

  useEffect(() => {
    const h = parseInt(location.hash.replace(/\D/g, ""), 10);
    if (h >= 1 && h <= total) setCurrent(h - 1);
  }, [total]);

  useEffect(() => {
    history.replaceState(null, "", `#${current + 1}`);
  }, [current]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight": case "ArrowDown": case "PageDown": case " ":
          e.preventDefault(); next(); break;
        case "ArrowLeft": case "ArrowUp": case "PageUp":
          e.preventDefault(); prev(); break;
        case "Home": go(0); break;
        case "End": go(total - 1); break;
        case "f": case "F": toggleFullscreen(); break;
      }
    };
    const onStart = (e: TouchEvent) => { touchX.current = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      if (touchX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
      touchX.current = null;
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchend", onEnd);
    };
  }, [go, next, prev, toggleFullscreen, total]);

  return { current, go, next, prev, toggleFullscreen };
}