import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="container-x py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#ABF62D] text-black font-black shadow-soft">
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
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/builder"
              className="btn text-base font-black px-6 py-3 bg-[#ABF62D] text-black hover:bg-[#9fdf2a] transition-all duration-300 hover:shadow-[0_0_20px_rgba(171,246,45,0.4)] hidden md:inline-flex"
              aria-label="Build My Resume Free"
            >
              Build My Resume Free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}