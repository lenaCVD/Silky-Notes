"use client";
import { useEffect, useState } from "react";

const NAV_SPACE = 70;

export function useStageScale() {
  const [s, setS] = useState({ scale: 1, top: "50%", ready: false });

  useEffect(() => {
    const fit = () => {
      const scale = Math.max(
        Math.min(window.innerWidth / 1280, (window.innerHeight - NAV_SPACE) / 720),
        0.2,
      );
      setS({ scale, top: `${(window.innerHeight - NAV_SPACE) / 2 + 8}px`, ready: true });
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return s;
}