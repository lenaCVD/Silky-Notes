export type TokenType = "kw" | "fn" | "cm" | "num" | "str";
export interface Token { type: TokenType | null; text: string }

const KEYWORDS =
  "void|int|float|for|if|else|while|return|class|public|private|auto|size_t|true|false|const|static";

const RE = new RegExp(
  [
    String.raw`(?<cm>\/\/.*)`,
    String.raw`(?<str>"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')`,
    String.raw`(?<kw>#pragma once|#include|\b(?:${KEYWORDS})\b)`,
    String.raw`(?<fn>\b[A-Za-z_]\w*(?=\())`,
    String.raw`(?<num>\b\d+(?:\.\d+)?\b)`,
  ].join("|"),
  "g",
);

export function highlight(code: string): Token[] {
  const out: Token[] = [];
  let last = 0;
  for (const m of code.matchAll(RE)) {
    const i = m.index!;
    if (i > last) out.push({ type: null, text: code.slice(last, i) });
    const type = Object.entries(m.groups!).find(([, v]) => v !== undefined)![0] as TokenType;
    out.push({ type, text: m[0] });
    last = i + m[0].length;
  }
  if (last < code.length) out.push({ type: null, text: code.slice(last) });
  return out;
}