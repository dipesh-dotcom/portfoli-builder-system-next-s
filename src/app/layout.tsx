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
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Portfolio Builder System",
  description: "Modern Portfolio Builder System",
  generator: "v0.app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
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
            color="#2563eb" // Progress bar color
            height={3} // Height of the bar
            showSpinner={false} // Optional spinner
            speed={400} // Speed of animation
          />

          <NavbarWrapper />
          <Suspense fallback={<Loader />}>{children}</Suspense>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
      <Toaster />
    </SessionProvider>
  );
}
