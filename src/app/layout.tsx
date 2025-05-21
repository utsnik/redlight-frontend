// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Redlight Dashboard",
  description: "Your trading signals at a glance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* 1) DaisyUI plugin (UMD build) */}
        <script src="https://cdn.jsdelivr.net/npm/daisyui@2.59.2/dist/full.js"></script>

        {/* 2) Tailwind CDN */}
        <script src="https://cdn.tailwindcss.com"></script>

        {/* 3) Configure Tailwind to use DaisyUI and your themes */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                corePlugins: { preflight: true },
                plugins: [daisyui],
                daisyui: { themes: ['dark','cupcake'] }
              };
            `,
          }}
        />
      </head>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          antialiased
          bg-base-200        /* DaisyUI page bg */
          text-base-content  /* DaisyUI text color */
        `}
      >
        {children}
      </body>
    </html>
  );
}
