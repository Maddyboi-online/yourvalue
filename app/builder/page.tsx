"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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

  const calculateProgress = useMemo(() => {
    let filledFields = 0;
    let totalFields = 4; // personal info section

    // Check personal info
    if (data.personal.fullName.trim()) filledFields++;
    if (data.personal.emailAddress.trim()) filledFields++;
    if (data.personal.phoneNumber.trim()) filledFields++;
    if (data.personal.cityState.trim()) filledFields++;

    // Check education (counts as 1 section)
    totalFields += 1;
    if (data.education.some(e => e.schoolCollegeName.trim() || e.degreeOrClass.trim())) {
      filledFields++;
    }

    // Check skills (counts as 1 section)
    totalFields += 1;
    if (data.skills.technicalSkills.length > 0 || data.skills.softSkills.length > 0 || data.skills.languagesKnown.length > 0) {
      filledFields++;
    }

    // Check work experience (counts as 1 section)
    totalFields += 1;
    if (data.workExperience.some(w => w.companyOrInternshipName.trim() || w.yourRoleOrPosition.trim())) {
      filledFields++;
    }

    return Math.round((filledFields / totalFields) * 100);
  }, [data]);

  const handleClear = () => {
    localStorage.removeItem(RESUME_STORAGE_KEY);
    setData(getEmptyResumeData());
  };

  return (
    <main className="bg-black pb-14 text-white [&_.input]:bg-[#1a1a1a] [&_.input]:text-white [&_.input]:placeholder:text-white/30 [&_.input]:border-[#333333] [&_.input]:focus:border-[#ABF62D] [&_.input]:focus:ring-[#ABF62D]/30 [&_.label]:text-white [&_h1]:text-[#ABF62D] [&_h2]:text-[#ABF62D] [&_h3]:text-[#ABF62D] [&_button]:bg-[#ABF62D] [&_button]:text-black [&_button]:ring-0 [&_button:hover]:bg-[#9fdf2a] [&_button:disabled]:opacity-60 [&_.form-section]:bg-[#111111]">
      <div className="container-x pt-6">
        <div className="sticky top-16 z-40 mb-6 bg-black/90 backdrop-blur py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-white">
              Profile {calculateProgress}% complete
            </div>
            <div className="h-2 w-32 rounded-full bg-white/20">
              <div 
                className="h-2 rounded-full bg-[#ABF62D] transition-all duration-300"
                style={{ width: `${calculateProgress}%` }}
              />
            </div>
          </div>
        </div>
        
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

