// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Redlight Dashboard",
  description: "Your trading signals at a glance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          antialiased

          bg-base-200       /* dark theme page bg (mid‐gray) */
          text-base-content /* light text on dark bg */
        `}
      >
        {children}
      </body>
    </html>
  );
}
