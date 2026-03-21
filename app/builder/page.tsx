"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getEmptyResumeData, RESUME_STORAGE_KEY, type ResumeData } from "@/lib/resumeTypes";
import ResumeForm from "@/components/builder/ResumeForm";

export default function BuilderPage() {
  const router = useRouter();
  const [data, setData] = useState<ResumeData>(getEmptyResumeData);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RESUME_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as ResumeData;
      setData(parsed);
    } catch {
      // If storage is corrupted, start fresh.
      setData(getEmptyResumeData());
    }
  }, []);

  const handleSubmit = (nextData: ResumeData) => {
    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(nextData));
    router.push("/preview");
  };

  const handleClear = () => {
    localStorage.removeItem(RESUME_STORAGE_KEY);
    setData(getEmptyResumeData());
  };

  return (
    <main className="bg-[#000000] pb-14 text-white [&_.input]:bg-[#111111] [&_.input]:text-white [&_.input]:placeholder:text-white/30 [&_.input]:border-white/10 [&_.input]:focus:border-[#ABF62D] [&_.input]:focus:ring-[#ABF62D]/30 [&_.label]:text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_button]:bg-[#ABF62D] [&_button]:text-black [&_button]:ring-0 [&_button:hover]:bg-[#9fdf2a] [&_button:disabled]:opacity-60">
      <div className="container-x pt-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold uppercase tracking-wider text-white/70">YourValue</p>
            <h1 className="text-2xl font-black text-white md:text-3xl">Resume Builder</h1>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="btn" onClick={handleClear}>
              Start Over
            </button>
          </div>
        </div>
      </div>

      <ResumeForm initialData={data} onSubmit={handleSubmit} />
    </main>
  );
}

