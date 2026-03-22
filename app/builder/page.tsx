"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getEmptyResumeData, RESUME_STORAGE_KEY, type ResumeData } from "@/lib/resumeTypes";
import toast from "react-hot-toast";
import ResumeForm from "@/components/builder/ResumeForm";

function BuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<ResumeData>(getEmptyResumeData);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const loadResume = () => {
      try {
        const raw = localStorage.getItem(RESUME_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as ResumeData;
          setData(parsed);
        }
      } catch {
        setData(getEmptyResumeData());
      }
    };

    loadResume();
  }, []);

  const handleDataChange = (newData: ResumeData) => {
    setData(newData);
    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(newData));
    
    setIsSaving(true);
    setTimeout(() => {
      setLastSaved(new Date());
      setIsSaving(false);
      toast.success('Resume saved locally!');
    }, 500);
  };

  const handleSubmit = async (nextData: ResumeData) => {
    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(nextData));
    setData(nextData);
    toast.success('Resume ready for preview!');
    router.push('/preview');
  };

  const handleClear = () => {
    localStorage.removeItem(RESUME_STORAGE_KEY);
    setData(getEmptyResumeData());
    toast.success('Form cleared!');
  };

  const calculateProgress = () => {
    let filledFields = 0;
    let totalFields = 4;

    if (data.personal.fullName.trim()) filledFields++;
    if (data.personal.emailAddress.trim()) filledFields++;
    if (data.personal.phoneNumber.trim()) filledFields++;
    if (data.personal.cityState.trim()) filledFields++;

    totalFields += 1;
    if (data.education.some(e => e.schoolCollegeName.trim() || e.degreeOrClass.trim())) {
      filledFields++;
    }

    totalFields += 1;
    if (data.skills.technicalSkills.length > 0 || data.skills.softSkills.length > 0 || data.skills.languagesKnown.length > 0) {
      filledFields++;
    }

    totalFields += 1;
    if (data.workExperience.some(w => w.companyOrInternshipName.trim() || w.yourRoleOrPosition.trim())) {
      filledFields++;
    }

    return Math.round((filledFields / totalFields) * 100);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container-x py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Resume Builder
              </h1>
              <p className="text-white/60">
                Build your professional resume step by step
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-white/60">Progress</div>
                <div className="text-2xl font-black text-[#ABF62D]">{calculateProgress()}%</div>
                {lastSaved && (
                  <div className="text-xs text-white/40">
                    Saved: {lastSaved.toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ResumeForm initialData={data} onDataChange={handleDataChange} onSubmit={handleSubmit} />
          </div>
          
          <div className="space-y-6">
            <div className="rounded-2xl bg-[#111111] p-6 border border-white/10">
              <h3 className="text-lg font-black text-white mb-4">Save Progress</h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleSubmit(data)}
                  disabled={isSaving}
                  className="w-full py-3 bg-[#ABF62D] text-black font-bold rounded-lg hover:bg-[#9fdf2a] transition-all disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Preview Resume'}
                </button>
                <button
                  onClick={handleClear}
                  className="w-full py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all"
                >
                  Clear Form
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-[#111111] p-6 border border-white/10">
              <h3 className="text-lg font-black text-white mb-4">Pro Tips</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li>• Use action verbs to start bullet points</li>
                <li>• Quantify achievements with numbers</li>
                <li>• Keep resume to 1-2 pages</li>
                <li>• Use consistent formatting</li>
                <li>• Proofread carefully</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
