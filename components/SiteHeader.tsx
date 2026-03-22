"use client";

import { useState } from "react";
import Link from "next/link";

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="container-x py-3">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#ABF62D] text-black font-black shadow-soft yv-logo-pulse">
                YV
              </span>
              <div className="leading-tight">
                <p className="text-sm font-extrabold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>YourValue</p>
                <p className="text-[11px] font-semibold text-white/50">Resume Builder</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 text-sm md:flex">
              <Link href="/builder" className="font-semibold text-white/70 hover:text-lime transition-colors">
                Build
              </Link>
              <Link href="/preview" className="font-semibold text-white/70 hover:text-lime transition-colors">
                Preview
              </Link>
              <Link href="/ats" className="font-semibold text-white/70 hover:text-lime transition-colors">
                ATS Check
              </Link>
              <Link href="/scorecard" className="font-semibold text-white/70 hover:text-lime transition-colors">
                Score Card
              </Link>
              <Link href="/pricing" className="font-semibold text-white/70 hover:text-lime transition-colors">
                Pricing
              </Link>
              <Link href="/cover-letter" className="font-semibold text-white/70 hover:text-lime transition-colors">
                Cover Letter
              </Link>
              <Link href="/interview" className="font-semibold text-white/70 hover:text-lime transition-colors">
                Interview Prep
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/builder"
                className="btn text-base font-black px-6 py-3 bg-[#ABF62D] text-black hover:bg-[#9fdf2a] transition-all duration-300 hover:shadow-[0_0_20px_rgba(171,246,45,0.4)]"
                aria-label="Build My Resume Free"
              >
                Build Free
              </Link>
              
              {/* Mobile Hamburger Menu */}
              <button
                className="md:hidden flex flex-col gap-1 p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="h-px bg-gradient-to-r from-[#ABF62D] via-[#D6A3FB] to-transparent" />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black md:hidden">
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button
                className="p-2 text-white"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="flex flex-col items-center justify-center flex-1 gap-8 text-lg">
              <Link
                href="/builder"
                className="text-white font-semibold hover:text-[#ABF62D] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Build
              </Link>
              <Link
                href="/preview"
                className="text-white font-semibold hover:text-[#ABF62D] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Preview
              </Link>
              <Link
                href="/ats"
                className="text-white font-semibold hover:text-[#ABF62D] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ATS Check
              </Link>
              <Link
                href="/scorecard"
                className="text-white font-semibold hover:text-[#ABF62D] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Score Card
              </Link>
              <Link
                href="/pricing"
                className="text-white font-semibold hover:text-[#ABF62D] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/cover-letter"
                className="text-white font-semibold hover:text-[#ABF62D] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cover Letter
              </Link>
              <Link
                href="/interview"
                className="text-white font-semibold hover:text-[#ABF62D] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Interview Prep
              </Link>
              <Link
                href="/builder"
                className="btn text-base font-black px-8 py-4 bg-[#ABF62D] text-black hover:bg-[#9fdf2a] transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Build Free
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}