import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#000000]">
      <div className="container-x py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm font-extrabold text-[#ABF62D]">YourValue</p>
            <p className="text-sm text-white">
              A clean, modern resume builder that helps you showcase your true value.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold text-white">Explore</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/builder" className="font-semibold text-white/70 hover:text-[#ABF62D]">
                Build resume
              </Link>
              <Link href="/preview" className="font-semibold text-white/70 hover:text-[#ABF62D]">
                Preview
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold text-white">Made for clarity</p>
            <p className="text-sm text-white">Mobile-first design. Download-ready PDF.</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white md:flex-row md:items-center md:justify-between">
          <p>Copyright {new Date().getFullYear()} YourValue.in</p>
          <p className="font-semibold">English only.</p>
        </div>
      </div>
    </footer>
  );
}

