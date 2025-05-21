// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";  // you can leave this empty or delete it

export const metadata: Metadata = {
  title: "Redlight Dashboard",
  description: "Your trading signals at a glance",
};

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="redlight">
      <head>
        {/* 1) DaisyUI CSS: all the component styles */}
        <link
          rel="stylesheet"
          href="/output.css"
        />

        {/* 2) Tailwind Play CDN (v4 browser build) */}
        <script
          src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"
          defer
        ></script>
      </head>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          antialiased
          bg-base-200        /* subtle page bg */
          text-base-content  /* theme text color */
        `}
      >
        {children}
      </body>
    </html>
  );
}
