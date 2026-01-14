import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Himalayan Nostalgia | Handcrafted Products",
  description: "Authentic handcrafted treasures from the Himalayan mountains.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${mono.variable} antialiased bg-[#FDFBF7] text-[#1C2321] selection:bg-[#BE5E46]/20`}
      >
        
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>

        <ContactSection />
        <Footer />
      </body>
    </html>
  );
}
