import type { ReactNode } from "react";

export type SlideVariant = "default" | "cover" | "dark";

export interface SlideDef {
  id: string;
  variant?: SlideVariant;
  eyebrow?: string;
  title?: string;
  body: ReactNode;
}