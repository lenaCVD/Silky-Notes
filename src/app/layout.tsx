import type { Metadata } from "next";
import { Inter, Playfair_Display, Fira_Code } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-playfair",
});

const fira = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fira",
});

export const metadata: Metadata = {
  title: "Programación Creativa con OpenFrameworks - Guía Técnica C++",
  description: "Guía técnica de programación creativa y referencia C++ en OpenFrameworks",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${fira.variable}`}>
      <body>{children}</body>
    </html>
  );
}