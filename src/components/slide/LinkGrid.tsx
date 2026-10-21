import { delay } from "@/lib/style";

interface Props {
  links: { label: string; href: string }[];
}

export default function LinkGrid({ links }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {links.map((l, i) => (
        <div
          key={l.href}
          className="reveal rounded-r-lg border-l-[3px] border-pastel-blue bg-pastel-blue/10 px-3 py-[9px] transition-colors hover:bg-pastel-blue/25 [print-color-adjust:exact]"
          style={delay(i % 2 === 0 ? ".25s" : ".35s")}
        >
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-mono text-xs text-butter no-underline hover:text-pastel-blue hover:underline"
          >
            {l.label}
          </a>
        </div>
      ))}
    </div>
  );
}