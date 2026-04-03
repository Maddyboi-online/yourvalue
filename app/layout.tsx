import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import MotionWrapper from "@/components/MotionWrapper";
import BackToTop from "@/components/BackToTop";
import { Toaster } from "react-hot-toast";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: "YourValue.in — Resume Builder",
  description: "Build a professional resume in minutes and discover your true value.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
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
          <Analytics mode="production" />
          <ScrollProgress />
          <SiteHeader />
          <CustomCursor />
          <MotionWrapper>
            {children}
          </MotionWrapper>
          <SiteFooter />
          <BackToTop />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#111111',
                color: '#ffffff',
                border: '1px solid #333333',
              },
              success: {
                iconTheme: {
                  primary: '#ABF62D',
                  secondary: '#000000',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#000000',
                },
              },
            }}
          />
                  </div>
      </body>
    </html>
  );
}