import type { ReactNode } from "react";
import { delay } from "@/lib/style";

interface Props {
  title: string;
  children: ReactNode;
}

export default function NoteCard({ title, children }: Props) {
  return (
    <div
      className="reveal rounded-[10px] border border-l-[5px] border-chocolate/[.18] border-l-chocolate bg-pastel-blue px-4 py-3.5 [print-color-adjust:exact]"
      style={delay(".15s")}
    >
      <h4 className="mb-1 font-display text-[17px] font-extrabold">{title}</h4>
      <p className="text-[13px] leading-[1.45]">{children}</p>
    </div>
  );
}