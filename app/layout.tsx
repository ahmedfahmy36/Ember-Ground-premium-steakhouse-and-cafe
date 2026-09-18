import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ember & Ground — Wood-Fired Steakhouse & Café, Shoreditch",
  description:
    "A 26-cover wood-fired steakhouse and serious café in Shoreditch, London. Dry-aged beef from three farm partners, in-house roasted coffee. Open Tuesday to Sunday.",
  openGraph: {
    title: "Ember & Ground",
    description:
      "Wood-fired steakhouse & café in Shoreditch. 48-day dry-aged beef. In-house roasted coffee.",
    type: "website",
    locale: "en_GB",
  },
  keywords: [
    "steakhouse London",
    "Shoreditch restaurant",
    "dry-aged beef London",
    "wood-fired steak",
    "specialty coffee Shoreditch",
    "Ember Ground restaurant",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-charcoal text-cream font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
