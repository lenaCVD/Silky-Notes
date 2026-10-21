interface Props {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onGo: (i: number) => void;
  onFullscreen: () => void;
}

const btn =
  "size-8 rounded-full bg-butter/10 text-[13px] transition active:scale-90 enabled:hover:bg-butter enabled:hover:text-chocolate disabled:cursor-default disabled:opacity-30";

export default function Navbar({ current, total, onPrev, onNext, onGo, onFullscreen }: Props) {
  return (
    <nav
      aria-label="Navegación de diapositivas"
      className="fixed bottom-3.5 left-1/2 z-[100] flex -translate-x-1/2 select-none items-center gap-3.5 rounded-full bg-chocolate px-3.5 py-2 text-[13px] text-butter shadow-[0_8px_24px_rgba(67,47,46,.35)] print:hidden"
    >
      <button className={btn} onClick={onPrev} disabled={current === 0} title="Anterior (←)" aria-label="Diapositiva anterior">
        <i className="fa-solid fa-chevron-left" />
      </button>

      <div className="flex items-center gap-1.5 max-[900px]:hidden">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            role="button"
            title={`Diapositiva ${i + 1}`}
            onClick={() => onGo(i)}
            className={`h-2 cursor-pointer rounded-full transition-all ${
              i === current ? "w-[22px] bg-butter" : "w-2 bg-pastel-blue/35 hover:bg-pastel-blue"
            }`}
          />
        ))}
      </div>

      <span className="min-w-[52px] text-center font-semibold tracking-[0.04em]">
        {current + 1} / {total}
      </span>

      <button className={btn} onClick={onNext} disabled={current === total - 1} title="Siguiente (→)" aria-label="Diapositiva siguiente">
        <i className="fa-solid fa-chevron-right" />
      </button>
      <button className={btn} onClick={onFullscreen} title="Pantalla completa (F)" aria-label="Pantalla completa">
        <i className="fa-solid fa-expand" />
      </button>
    </nav>
  );
}