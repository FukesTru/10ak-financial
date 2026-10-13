import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { firm } from "@/config/firm";
import { SITE_URL } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCall } from "@/components/layout/FloatingCall";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { GaHead } from "@/components/analytics/GaHead";
import { ClickTracker } from "@/components/analytics/ClickTracker";
import { CookieNotice } from "@/components/analytics/CookieNotice";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: firm.name,
  title: { default: firm.name, template: `%s | ${firm.name}` },
  description: firm.description,
  formatDetection: { telephone: false, email: false, address: false },
  authors: [{ name: firm.name }],
  creator: firm.name,
};

export const viewport: Viewport = {
  themeColor: "#0A1633",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <GaHead />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-lg bg-white px-4 py-3 font-semibold text-midnight shadow-lg"
        >
          Skip to main content
        </a>
        <MotionProvider>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <FloatingCall />
        <CookieNotice />
        <ClickTracker />
      </body>
    </html>
  );
}
