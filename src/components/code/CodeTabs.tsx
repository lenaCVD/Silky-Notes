"use client";
import { useState } from "react";
import CodeBlock from "./CodeBlock";

export interface CodeTab {
  id: string;
  label: string;
  code: string;
}

export default function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [active, setActive] = useState(tabs[0].id);

  return (
    <>
      <div className="flex gap-1.5" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === active}
            onClick={() => setActive(t.id)}
            className={`cursor-pointer rounded-full border border-chocolate px-3.5 py-1.5 text-xs font-semibold ${
              t.id === active ? "bg-chocolate text-butter" : "bg-transparent text-chocolate"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.id} role="tabpanel" hidden={t.id !== active}>
          <CodeBlock code={t.code} scroll maxHeight={440} fontSize={10.5} />
        </div>
      ))}
    </>
  );
}