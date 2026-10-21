"use client";
import { useState } from "react";
import { delay } from "@/lib/style";

interface Props {
  src: string;
  alt: string;
  caption: string;
}

export default function MediaFrame({ src, alt, caption }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className="reveal relative min-h-[240px] flex-1 overflow-hidden rounded-[10px] border border-chocolate-soft bg-chocolate shadow-[6px_6px_0_var(--butter-deep)] [print-color-adjust:exact]"
      style={delay(".4s")}
    >
      <div className="absolute inset-x-0 top-0 bottom-[26px] flex flex-col items-center justify-center gap-2 rounded-t-[10px] border-2 border-dashed border-chocolate-soft text-center text-xs leading-normal text-butter-deep">
        <i className="fa-regular fa-image text-[26px] text-pastel-blue" />
        <span>
          Añade aquí el resultado
          <br />
          <code className="font-mono text-butter">{src.replace(/^\//, "")}</code>
        </span>
      </div>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="absolute left-0 top-0 z-[1] h-[calc(100%-26px)] w-full bg-chocolate-dark object-cover"
        />
      )}
      <figcaption className="absolute inset-x-0 bottom-0 z-[2] h-[26px] bg-chocolate-soft px-3 text-[11px] font-semibold leading-[26px] tracking-[0.04em] text-butter">
        {caption}
      </figcaption>
    </figure>
  );
}