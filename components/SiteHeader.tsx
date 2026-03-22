"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/context/ThemeContext";

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: any } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUserDropdownOpen(false);
    router.push('/');
  };

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
            </nav>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <div className="flex items-center gap-2">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ABF62D] text-black font-black text-sm hover:bg-[#9fdf2a] transition-colors"
                  >
                    {user.email?.[0]?.toUpperCase()}
                  </button>
                  
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#111111] border border-white/10 shadow-lg py-2">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        My Resumes
                      </Link>
                      <Link
                        href="/account"
                        className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        Account
                      </Link>
                      <hr className="my-2 border-white/10" />
                      <button
                        onClick={handleSignOut}
                        className="block w-full px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 transition-colors text-left"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/auth"
                    className="btn text-base font-black px-6 py-3 bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hidden md:inline-flex"
                    aria-label="Login"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth"
                    className="btn text-base font-black px-6 py-3 bg-[#ABF62D] text-black hover:bg-[#9fdf2a] transition-all duration-300 hover:shadow-[0_0_20px_rgba(171,246,45,0.4)] hidden md:inline-flex"
                    aria-label="Build My Resume Free"
                  >
                    Build Free
                  </Link>
                </>
              )}
              
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
              {user ? (
                <>
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ABF62D] text-black font-black text-lg">
                      {user.email?.[0]?.toUpperCase()}
                    </div>
                    <p className="text-white/60 text-sm">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="text-white font-semibold hover:text-[#ABF62D] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Resumes
                  </Link>
                  <Link
                    href="/account"
                    className="text-white font-semibold hover:text-[#ABF62D] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Account
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-red-400 font-semibold hover:text-red-300 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth"
                    className="text-white font-semibold hover:text-[#ABF62D] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth"
                    className="btn text-base font-black px-8 py-4 bg-[#ABF62D] text-black hover:bg-[#9fdf2a] transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Build Free
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}