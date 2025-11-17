import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import NavbarWrapper from "@/components/navbar/NavbarWrapper";
import Loader from "./loading";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from "nextjs-toploader";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata: Metadata = {
  title: "Portfolio Builder System",
  description: "Modern Portfolio Builder System",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (!stored && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>

      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <NextTopLoader
          color="#2563eb"
          height={3}
          showSpinner={false}
          speed={400}
        />

        {/* async session provider moved here */}
        <Suspense fallback={<Loader />}>
          <SessionWrapper>
            <NavbarWrapper />
            {children}
          </SessionWrapper>
        </Suspense>

        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
