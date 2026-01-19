import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";

import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "CampusConnection",
  description:
    "CampusConnection helps friends reconnect and stay in touch after graduation.",
  keywords: [
    "CampusConnection",
    "friends",
    "alumni",
    "reconnect",
    "graduation",
    "social network",
    "community",
  ],
  authors: [{ name: "CampusConnection Team" }],
  creator: "CampusConnection Team",
  openGraph: {
    title: "CampusConnection",
    description:
      "Reconnect with friends after graduation and grow your alumni network.",
    type: "website",
    locale: "en_US",
    siteName: "CampusConnection",
    images: [
      {
        url: "/bg.webp",
        width: 1200,
        height: 630,
        alt: "CampusConnection - Alumni Network Map",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CampusConnection",
    description:
      "Reconnect with friends after graduation and grow your alumni network.",
    images: ["/bg.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signUpForceRedirectUrl="/CompleteInformation"
      signUpFallbackRedirectUrl="/CompleteInformation"
    >
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={`${inter.variable} ${instrumentSerif.variable} antialiased selection:bg-neutral-700 selection:text-white dark:selection:bg-amber-50 dark:selection:text-black`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Analytics />
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
