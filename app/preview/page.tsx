"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { getEmptyResumeData, RESUME_STORAGE_KEY, type ResumeData } from "@/lib/resumeTypes";
import ResumePreview from "@/components/resume/ResumePreview";
import PdfDownloadButton from "@/components/resume/PdfDownloadButton";
import ClassicTemplate from "@/components/resume/templates/ClassicTemplate";
import ModernTemplate from "@/components/resume/templates/ModernTemplate";
import MinimalTemplate from "@/components/resume/templates/MinimalTemplate";
import CreativeTemplate from "@/components/resume/templates/CreativeTemplate";

type TemplateType = 'classic' | 'modern' | 'minimal' | 'creative';

const templates = [
  { id: 'classic', name: 'Classic', component: ClassicTemplate, description: 'Professional traditional look' },
  { id: 'modern', name: 'Modern', component: ModernTemplate, description: 'Black background with lime sidebar' },
  { id: 'minimal', name: 'Minimal', component: MinimalTemplate, description: 'Clean and simple design' },
  { id: 'creative', name: 'Creative', component: CreativeTemplate, description: 'Two-column purple accent' },
];

function PreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<ResumeData>(getEmptyResumeData);
  const [loaded, setLoaded] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('classic');

  useEffect(() => {
    const loadData = () => {
      // Load from localStorage only
      try {
        const raw = localStorage.getItem(RESUME_STORAGE_KEY);
        if (raw) {
          setData(JSON.parse(raw) as ResumeData);
        }
      } catch {
        setData(getEmptyResumeData());
      }
      
      setLoaded(true);
    };

    loadData();
  }, [searchParams, router]);

  const hasAny = () => {
    return (
      data.personal.fullName.trim() ||
      data.personal.emailAddress.trim() ||
      data.education.some((e) => e.schoolCollegeName.trim() || e.degreeOrClass.trim()) ||
      data.workExperience.some((w) => w.companyOrInternshipName.trim() || w.yourRoleOrPosition.trim())
    );
  };

  const handleClear = () => {
    localStorage.removeItem(RESUME_STORAGE_KEY);
    setData(getEmptyResumeData());
  };

  const getSelectedTemplateComponent = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    return template?.component || ClassicTemplate;
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
        ) : !hasAny() ? (
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
          <div className="mt-6 space-y-6">
            {/* Template Selector */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-[#111111] p-6 ring-1 ring-white/10 shadow-soft"
            >
              <h2 className="text-lg font-black text-white mb-4">Choose Template</h2>
              <div className="grid gap-4 md:grid-cols-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id as TemplateType)}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition-all ${
                      selectedTemplate === template.id
                        ? 'border-[#ABF62D] shadow-[0_0_20px_rgba(171,246,45,0.3)]'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="aspect-[3/4] bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-white/50 text-sm">{template.name}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">{template.name}</h3>
                    <p className="text-xs text-white/60">{template.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-[320px_1fr] md:items-start">
              <motion.aside
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl bg-[#111111] p-4 ring-1 ring-white/10 shadow-soft"
              >
                <div className="space-y-3">
                  <p className="text-sm font-extrabold text-white">Download</p>
                  <PdfDownloadButton data={data} template={getSelectedTemplateComponent()} />
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
                <ResumePreview data={data} template={getSelectedTemplateComponent()} />
              </motion.section>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <PreviewContent />
    </Suspense>
  );
}
