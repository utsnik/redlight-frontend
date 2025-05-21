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
        {/* 1) Load Tailwind + DaisyUI plugin in the browser */}
        <script
          src="https://cdn.tailwindcss.com?plugins=daisyui"
          defer
        ></script>

        {/* 2) Inject your custom redlight theme */}
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                daisyui: {
                  themes: [
                    {
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
                    }
                  ]
                }
              }
            `,
          }}
        />
      </head>
      <body
        data-theme="redlight"
        className={`
          ${geistSans.variable} ${geistMono.variable}
          antialiased
          bg-base-200       /* page background */
          text-base-content /* text color */
        `}
      >
        {children}
      </body>
    </html>
  );
}
