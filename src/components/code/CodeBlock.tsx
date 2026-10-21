"use client";
import { useState, type MouseEvent } from "react";
import { highlight, type TokenType } from "@/lib/highlight";
import { delay } from "@/lib/style";

const TOKEN: Record<TokenType, string> = {
  kw: "font-semibold text-coral",
  fn: "text-[#8ec1ea]",
  cm: "italic text-[#a08a86]",
  num: "text-butter",
  str: "text-mint",
};

interface Props {
  code: string;
  scroll?: boolean;
  maxHeight?: number;
  fontSize?: number;
}

export default function CodeBlock({ code, scroll = false, maxHeight, fontSize }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async (e: MouseEvent) => {
    e.stopPropagation();
    try { await navigator.clipboard.writeText(code); } catch { /* sin permisos */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div
      data-code-block
      style={{ ...delay(".3s"), maxHeight, fontSize }}
      className={`reveal group relative whitespace-pre rounded-[10px] border border-chocolate-soft bg-chocolate px-4 py-3.5 font-mono text-[11px] leading-[1.4] text-[#e9f1f7] shadow-[6px_6px_0_var(--blue)] [print-color-adjust:exact] ${
        scroll ? "overflow-auto" : "overflow-hidden"
      }`}
    >
      {highlight(code).map((t, i) =>
        t.type ? (
          <span key={i} className={TOKEN[t.type]}>{t.text}</span>
        ) : (
          t.text
        ),
      )}
      <button
        type="button"
        onClick={copy}
        className={`absolute right-2 top-2 cursor-pointer rounded-md border border-pastel-blue/35 px-2 py-1 font-sans text-[11px] font-semibold transition group-hover:opacity-100 print:hidden ${
          copied
            ? "bg-butter text-chocolate opacity-100"
            : "bg-pastel-blue/10 text-pastel-blue opacity-0 hover:bg-pastel-blue/30"
        }`}
      >
        {copied ? (
          <><i className="fa-solid fa-check" /> Copiado</>
        ) : (
          <><i className="fa-regular fa-copy" /> Copiar</>
        )}
      </button>
    </div>
  );
}