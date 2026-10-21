import type { CSSProperties } from "react";

export const delay = (s: string) => ({ "--delay": s }) as CSSProperties;