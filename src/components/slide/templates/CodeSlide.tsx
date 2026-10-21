import type { ReactNode } from "react";
import NoteCard from "@/components/slide/NoteCard";
import ExplainList, { type ExplainItem } from "@/components/slide/ExplainList";
import CodeBlock from "@/components/code/CodeBlock";
import CodeTabs, { type CodeTab } from "@/components/code/CodeTabs";

interface Props {
  note: { title: string; text: ReactNode };
  items: ExplainItem[];
  code: string | CodeTab[];
  source: string;
  aside?: ReactNode;
}

export default function CodeSlide({ note, items, code, source, aside }: Props) {
  return (
    <>
      <div className="flex w-full grow items-stretch gap-6">
        <div className="flex flex-1 flex-col gap-3">
          <NoteCard title={note.title}>{note.text}</NoteCard>
          <ExplainList items={items} />
          {aside}
        </div>
        <div className="flex flex-1 flex-col gap-3">
          {typeof code === "string" ? <CodeBlock code={code} /> : <CodeTabs tabs={code} />}
        </div>
      </div>
      <span className="mt-auto inline-block self-start rounded-full bg-chocolate px-2.5 py-1 text-[11px] font-semibold text-butter [print-color-adjust:exact]">
        {source}
      </span>
    </>
  );
}