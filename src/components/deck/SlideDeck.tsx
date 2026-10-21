"use client";
import type { MouseEvent } from "react";
import { useDeck } from "@/hooks/useDeck";
import { useStageScale } from "@/hooks/useStageScale";
import type { SlideDef } from "@/lib/types";
import SlideLayout from "@/components/slide/SlideLayout";
import Navbar from "./Navbar";

export default function SlideDeck({ slides }: { slides: SlideDef[] }) {
  const total = slides.length;
  const { current, go, next, prev, toggleFullscreen } = useDeck(total);
  const { scale, top, ready } = useStageScale();

  const onStageClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a, button, [data-code-block]")) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    if (x > 0.85) next();
    else if (x < 0.15) prev();
  };

  return (
    <>
      <div
        className="fixed left-0 top-0 z-[101] h-[5px] bg-chocolate transition-[width] duration-[400ms] ease-in-out print:hidden"
        style={{ width: `${((current + 1) / total) * 100}%` }}
      />

      <div
        onClick={onStageClick}
        className="absolute left-1/2 top-1/2 h-[720px] w-[1280px] origin-center overflow-hidden rounded-[14px] bg-butter shadow-[0_30px_70px_rgba(67,47,46,.35),0_4px_14px_rgba(67,47,46,.2)] print:static! print:h-auto! print:transform-none! print:overflow-visible print:rounded-none print:shadow-none"
        style={{
          top,
          transform: `translate(-50%, -50%) scale(${scale})`,
          visibility: ready ? "visible" : "hidden",
        }}
      >
        {slides.map((s, i) => (
          <SlideLayout
            key={s.id}
            id={s.id}
            variant={s.variant}
            eyebrow={s.eyebrow}
            title={s.title}
            state={i === current ? "active" : i < current ? "past" : "next"}
          >
            {s.body}
          </SlideLayout>
        ))}
      </div>

      <Navbar
        current={current}
        total={total}
        onPrev={prev}
        onNext={next}
        onGo={go}
        onFullscreen={toggleFullscreen}
      />

      <div className="fixed bottom-[22px] right-4 z-[100] text-xs text-chocolate/65 max-[900px]:hidden print:hidden">
        <kbd className="rounded border border-chocolate bg-butter px-[5px] py-px font-mono text-[11px]">←</kbd>{" "}
        <kbd className="rounded border border-chocolate bg-butter px-[5px] py-px font-mono text-[11px]">→</kbd>{" "}
        navegar ·{" "}
        <kbd className="rounded border border-chocolate bg-butter px-[5px] py-px font-mono text-[11px]">F</kbd>{" "}
        pantalla completa
      </div>
    </>
  );
}