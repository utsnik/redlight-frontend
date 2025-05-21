import "./globals.css";  // can be empty now
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
        {/* THIS must point to the CSS you build below */}
        <link rel="stylesheet" href="/output.css" />
      </head>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          antialiased bg-base-200 text-base-content
        `}
      >
        {children}
      </body>
    </html>
  );
}
