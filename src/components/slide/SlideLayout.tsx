import type { ReactNode } from "react";
import type { SlideVariant } from "@/lib/types";

interface Props {
  id: string;
  state: "active" | "past" | "next";
  variant?: SlideVariant;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
}

const STRIPE_BOTTOM =
  "after:absolute after:inset-x-0 after:bottom-0 after:h-2 after:content-[''] after:bg-[linear-gradient(90deg,var(--blue)_0_33.33%,var(--butter-deep)_33.33%_66.66%,var(--chocolate)_66.66%_100%)]";
const STRIPE_SIDE =
  "before:absolute before:inset-y-0 before:right-0 before:w-[190px] before:content-[''] before:bg-[linear-gradient(180deg,var(--blue)_0_33.33%,var(--butter)_33.33%_66.66%,var(--chocolate-soft)_66.66%_100%)]";

const VARIANT = {
  default: {
    root: "bg-butter text-chocolate",
    eyebrow: "text-pastel-blue-ink",
    title: "border-pastel-blue-deep",
    content: "",
  },
  cover: {
    root: `justify-center bg-chocolate text-butter ${STRIPE_SIDE}`,
    eyebrow: "text-pastel-blue",
    title: "",
    content: "",
  },
  dark: {
    root: "bg-chocolate text-butter",
    eyebrow: "text-pastel-blue",
    title: "border-pastel-blue text-butter",
    content: "mt-2",
  },
} as const;

export default function SlideLayout({ id, state, variant = "default", eyebrow, title, children }: Props) {
  const v = VARIANT[variant];

  return (
    <section
      id={id}
      data-state={state}
      data-active={state === "active"}
      className={`absolute inset-0 flex h-[720px] w-[1280px] flex-col overflow-hidden px-12 pb-10 pt-8 text-[15px] invisible opacity-0 [transform:translateX(48px)] transition-[opacity,transform,visibility] duration-[450ms] ease-[cubic-bezier(.22,.8,.3,1)] data-[state=past]:[transform:translateX(-48px)] data-[state=active]:visible data-[state=active]:z-10 data-[state=active]:opacity-100 data-[state=active]:[transform:none] print:visible! print:relative! print:opacity-100! print:[transform:none]! print:transition-none! print:break-after-page print:break-inside-avoid ${STRIPE_BOTTOM} ${v.root}`}
    >
      {eyebrow && (
        <p className={`mb-1 text-xs font-semibold uppercase tracking-[0.14em] ${v.eyebrow}`}>{eyebrow}</p>
      )}
      {title && (
        <h2
          className={`mb-3 border-b-[3px] pb-2 font-display text-[30px] font-extrabold leading-[1.2] tracking-[-0.01em] ${v.title}`}
        >
          {title}
        </h2>
      )}
      {variant === "cover" ? (
        children
      ) : (
        <div className={`flex grow flex-col gap-3 overflow-hidden ${v.content}`}>{children}</div>
      )}
    </section>
  );
}