import type { ReactNode } from "react";
import { delay } from "@/lib/style";

export interface ExplainItem {
  icon: string;
  content: ReactNode;
}

export default function ExplainList({ items }: { items: ExplainItem[] }) {
  return (
    <ul>
      {items.map((it, i) => (
        <li
          key={i}
          className="reveal mb-[9px] flex items-start gap-[9px] text-[13.5px] leading-[1.45]"
          style={delay(`${(0.25 + i * 0.1).toFixed(2)}s`)}
        >
          <i className={`fa-solid ${it.icon} mt-0.5 text-[13px] text-pastel-blue-ink`} />
          <span>{it.content}</span>
        </li>
      ))}
    </ul>
  );
}