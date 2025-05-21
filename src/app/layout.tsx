// src/app/layout.tsx
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
    <html lang="en" data-theme="redlight">
      <head>
        {/* 1) Tailwind utility classes */}
        <script src="https://cdn.tailwindcss.com" />
        {/* 2) DaisyUI component styles (must come *after* Tailwind CDN) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/daisyui@2.59.2/dist/full.css"
        />
        {/* 3) Configure Tailwind + DaisyUI at runtime */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                plugins: [daisyui],
                daisyui: {
                  themes: [{
                    redlight: {
                      primary: '#f59e0b',
                      'primary-content': '#1f2937',
                      secondary: '#10b981',
                      accent: '#6366f1',
                      neutral: '#111827',
                      'base-100': '#f3f4f6',
                      info: '#3b82f6',
                      success: '#22c55e',
                      warning: '#f97316',
                      error: '#ef4444',
                    }
                  }]
                }
              };
            `,
          }}
        />
      </head>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          antialiased
          bg-base-200      /* page bg */
          text-base-content/* text color */
        `}
      >
        {children}
      </body>
    </html>
  );
}
