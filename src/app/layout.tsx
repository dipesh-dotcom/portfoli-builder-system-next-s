import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavbarWrapper from "@/components/NavbarWrapper";
import Loader from "./loading";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Portfolio Builder System",
  description: "Modern Portfolio Builder System",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
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
          <NavbarWrapper />
          <Suspense fallback={<Loader />}>{children}</Suspense>
          <Analytics />
        </body>
      </html>
      <Toaster />
    </ClerkProvider>
  );
}
