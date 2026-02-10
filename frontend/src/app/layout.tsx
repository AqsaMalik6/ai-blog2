import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "BlogAgent AI | High-End Content Generation",
  description: "The world's most advanced AI blog generation platform. SEO, AEO, and GEO optimized.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${outfit.variable} antialiased selection:bg-accent-blue/30`}
      >
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
