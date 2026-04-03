"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/builder", label: "Build" },
    { href: "/preview", label: "Preview" },
    { href: "/ats", label: "ATS Check" },
    { href: "/scorecard", label: "Score Card" },
    { href: "/cover-letter", label: "Cover Letter" },
    { href: "/interview", label: "Interview Prep" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#0a0a0a] overflow-hidden">
                <svg width="28" height="28" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="9" y="38" width="9" height="14" rx="3" fill="#AAFF00" opacity="0.35"/>
                  <rect x="22" y="28" width="9" height="24" rx="3" fill="#AAFF00" opacity="0.6"/>
                  <rect x="35" y="18" width="9" height="34" rx="3" fill="#AAFF00"/>
                  <polyline points="13.5,38 26.5,28 39.5,18 52,6" stroke="#AAFF00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <circle cx="13.5" cy="38" r="2.2" fill="#AAFF00"/>
                  <circle cx="26.5" cy="28" r="2.2" fill="#AAFF00"/>
                  <circle cx="39.5" cy="18" r="2.2" fill="#AAFF00"/>
                  <path d="M45 5 L52 6 L51 13" stroke="#AAFF00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </span>
              <div>
                <p className="text-sm font-extrabold text-white leading-tight">YourValue</p>
                <p className="text-[11px] text-white/50 leading-tight">Resume Builder</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-6 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors ${
                    pathname === link.href
                      ? "text-[#ABF62D]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/builder"
                className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#ABF62D] text-black font-bold text-sm rounded-full hover:bg-[#9fdf2a] hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                Build Free
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden flex flex-col gap-1.5 p-2"
                aria-label="Toggle menu"
              >
                <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
                <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="h-px bg-gradient-to-r from-[#ABF62D] via-[#D6A3FB] to-transparent" />

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black lg:hidden">
          <div className="flex flex-col h-full pt-20 px-6">
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-semibold text-white hover:text-[#ABF62D] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/builder"
                onClick={() => setIsOpen(false)}
                className="mt-4 inline-flex justify-center px-8 py-4 bg-[#ABF62D] text-black font-black text-base rounded-full"
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