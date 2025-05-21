// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css"; // can be empty

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Redlight Dashboard",
  description: "Your trading signals at a glance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="redlight">
      <head>
        {/* 1) Your compiled Tailwind + DaisyUI CSS */}
        <link rel="stylesheet" href="/output.css" />

        {/* 2) Inject the Redlight theme variables at runtime */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
:root[data-theme="redlight"] {
  --p: 245,158,11;
  --pc: 31,41,55;
  --s: 16,185,129;
  --a: 99,102,241;
  --n: 17,24,39;
  --b1: 243,244,246;
  --info: 59,130,246;
  --success: 34,197,94;
  --warning: 249,115,22;
  --error: 239,68,68;
}
            `,
          }}
        />
      </head>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          antialiased
          bg-base-200
          text-base-content
        `}
      >
        {children}
      </body>
    </html>
  );
}
