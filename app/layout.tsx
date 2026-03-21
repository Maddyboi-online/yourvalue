import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: "YourValue.in — Resume Builder",
  description: "Build a professional resume in minutes and discover your true value.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} bg-gradient-to-br from-purple-950 via-indigo-950 to-black`}>
        <div className="min-h-dvh">
          <SiteHeader />
          <CustomCursor />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

