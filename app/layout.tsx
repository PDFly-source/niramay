import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";

// Self-hosted heritage typography (next/font downloads at build time and
// serves the woff2 files from /_next/static — same-origin, offline-friendly).
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap",
});
const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  variable: "--font-display-bengali",
  display: "swap",
});
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { NiramayAssistantModal } from "@/components/assistant/NiramayAssistantModal";
import { NiramayAssistantTrigger } from "@/components/assistant/NiramayAssistantTrigger";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { OfflinePrepIndicator } from "@/components/offline/OfflinePrepIndicator";
import { SoundscapesPlayer } from "@/components/ambient/SoundscapesPlayer";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { FloatingInstallBanner } from "@/components/pwa/FloatingInstallBanner";
import { DisclaimerModal } from "@/components/DisclaimerModal";
import { ThemeSync } from "@/components/layout/ThemeSync";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pdfly-source.github.io";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1B4332" },
    { media: "(prefers-color-scheme: dark)", color: "#0F2318" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}${BASE_PATH}/`),
  title: "Niramay — Traditional Kitchen Remedies Hub",
  description:
    "Authentic Assamese & Indian kitchen remedies (kadha, herbal teas, spice pastes) with age-group dosage safety, ingredient checker, and traditional wellness wisdom.",
  applicationName: "Niramay",
  keywords: [
    "Assamese remedies",
    "Indian home remedies",
    "kitchen remedies",
    "kadha",
    "Ayurveda",
    "traditional wellness",
    "নিৰাময়",
    "ghoror mosolat",
  ],
  alternates: {
    canonical: "./",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Niramay",
  },
  icons: {
    icon: `${BASE_PATH}/icon-192.png`,
    apple: `${BASE_PATH}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Niramay — Traditional Kitchen Remedies Hub",
    description:
      "Traditional Assamese & Indian kitchen remedies with age-group dosage safety and kitchen pantry matching.",
    url: `${SITE_URL}${BASE_PATH}/`,
    siteName: "Niramay",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Niramay — Traditional Assamese & Indian Kitchen Wellness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Niramay — Traditional Kitchen Remedies Hub",
    description:
      "Traditional Assamese & Indian kitchen remedies with age-group dosage safety and kitchen pantry matching.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${sourceSans3.variable} ${notoSerifBengali.variable}`}>
      <body className="min-h-screen flex flex-col bg-parchment text-ink font-sans selection:bg-amber-200 selection:text-amber-900 pb-16 md:pb-0" suppressHydrationWarning>
        <DisclaimerModal />
        <ThemeSync />
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <BottomNavigation />
        <FloatingInstallBanner />
        <OfflineIndicator />
        <OfflinePrepIndicator />
        <SoundscapesPlayer />
        <NiramayAssistantModal />
        <NiramayAssistantTrigger />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
