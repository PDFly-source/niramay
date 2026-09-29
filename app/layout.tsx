import type { Metadata, Viewport } from "next";
import "./globals.css";
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

export const viewport: Viewport = {
  themeColor: "#D97706",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Niramay — Traditional Kitchen Remedies Hub",
  description:
    "Authentic Assamese & Indian kitchen remedies (kadha, herbal teas, spice pastes) with age-group dosage safety, ingredient checker, and traditional wisdom.",
  applicationName: "Niramay",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Niramay",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Niramay — Traditional Kitchen Remedies Hub",
    description:
      "Traditional Assamese & Indian kitchen remedies with age-group dosage safety and kitchen pantry matching.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Niramay — Traditional Kitchen Remedies Hub",
    description:
      "Traditional Assamese & Indian kitchen remedies with age-group dosage safety and kitchen pantry matching.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FFF8F0] text-[#292524] selection:bg-amber-200 selection:text-amber-900 pb-16 md:pb-0" suppressHydrationWarning>
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
