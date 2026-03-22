"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getEmptyResumeData, RESUME_STORAGE_KEY, type ResumeData } from "@/lib/resumeTypes";
import ResumePreview from "@/components/resume/ResumePreview";
import PdfDownloadButton from "@/components/resume/PdfDownloadButton";
import SiteFooter from "@/components/SiteFooter";

export default function PreviewPage() {
  const router = useRouter();
  const [data, setData] = useState<ResumeData>(getEmptyResumeData);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RESUME_STORAGE_KEY);
      if (!raw) {
        setLoaded(true);
        return;
      }
      setData(JSON.parse(raw) as ResumeData);
      setLoaded(true);
    } catch {
      setData(getEmptyResumeData());
      setLoaded(true);
    }
  }, []);

  const hasAny = useMemo(() => {
    return (
      data.personal.fullName.trim() ||
      data.personal.emailAddress.trim() ||
      data.education.some((e) => e.schoolCollegeName.trim() || e.degreeOrClass.trim()) ||
      data.workExperience.some((w) => w.companyOrInternshipName.trim() || w.yourRoleOrPosition.trim())
    );
  }, [data]);

  const handleClear = () => {
    localStorage.removeItem(RESUME_STORAGE_KEY);
    setData(getEmptyResumeData());
  };

  return (
    <main className="bg-black pb-14 text-white">
      <div className="container-x pt-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold uppercase tracking-wider text-white/70">YourValue</p>
            <h1 className="text-2xl font-black text-white md:text-3xl">Resume Preview</h1>
            <p className="text-sm font-semibold text-white/70">Looks good? Download your PDF.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="btn text-base font-black px-6 py-3 bg-[#ABF62D] text-black hover:bg-[#9fdf2a] transition-all duration-300" onClick={() => router.push("/builder")}>
              Edit
            </button>
            <button type="button" className="btn text-base font-black px-6 py-3 bg-[#ABF62D] text-black hover:bg-[#9fdf2a] transition-all duration-300" onClick={handleClear}>
              Start Over
            </button>
          </div>
        </div>

        {!loaded ? (
          <div className="mt-8 rounded-3xl bg-[#111111] p-8 ring-1 ring-white/10 shadow-soft" />
        ) : !hasAny ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 rounded-3xl bg-[#111111] p-8 ring-1 ring-white/10 shadow-soft"
          >
            <p className="text-base font-extrabold text-white">No resume data found.</p>
            <p className="mt-2 text-sm font-semibold text-white/70">Build your resume first.</p>
            <button type="button" className="btn text-base font-black px-6 py-3 bg-[#ABF62D] text-black hover:bg-[#9fdf2a] transition-all duration-300 mt-4" onClick={() => router.push("/builder")}>
              Go to Builder
            </button>
          </motion.div>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-[320px_1fr] md:items-start">
            <motion.aside
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-[#111111] p-4 ring-1 ring-white/10 shadow-soft"
            >
              <div className="space-y-3">
                <p className="text-sm font-extrabold text-white">Download</p>
                <PdfDownloadButton data={data} />
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className="text-xs font-extrabold text-[#ABF62D]">Tip</p>
                  <p className="mt-1 text-xs font-semibold text-white/65">
                    Keep bullet points crisp. Strong impact statements get noticed.
                  </p>
                </div>
              </div>
            </motion.aside>

            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-white p-3 ring-1 ring-white/20 md:p-4"
            >
              <ResumePreview data={data} />
            </motion.section>
          </div>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}

