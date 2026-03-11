import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { headers } from "next/headers";
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

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://campusconnection.vercel.app");

const defaultOgImagePath = "/ogimage.png";
const whatsappOgImagePath = "/whatsappOG.png";
const siteName = "Campus Connection";
const siteDescription =
  "CampusConnection helps friends reconnect and stay in touch after graduation.";

function isWhatsAppCrawler(userAgent: string) {
  return userAgent.toLowerCase().includes("whatsapp");
}

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

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const userAgent = requestHeaders.get("user-agent") ?? "";
  const openGraphImagePath = isWhatsAppCrawler(userAgent)
    ? whatsappOgImagePath
    : defaultOgImagePath;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    alternates: {
      canonical: "/",
    },
    keywords: [
      "CampusConnection",
      "friends",
      "alumni",
      "reconnect",
      "graduation",
      "social network",
      "community",
    ],
    authors: [{ name: "CampusConnection Team", url: siteUrl }],
    creator: "CampusConnection Team",
    openGraph: {
      title: siteName,
      description:
        "Reconnect with friends after graduation and grow your alumni network.",
      type: "website",
      locale: "en_US",
      url: "/",
      siteName,
      images: [
        {
          url: openGraphImagePath,
          width: 1200,
          height: 630,
          alt: "CampusConnection - Alumni Network Map",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description:
        "Reconnect with friends after graduation and grow your alumni network.",
      images: [defaultOgImagePath],
    },
  };
}

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
