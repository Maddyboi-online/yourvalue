"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { getEmptyResumeData, RESUME_STORAGE_KEY, type ResumeData } from "@/lib/resumeTypes";
import ResumePreview from "@/components/resume/ResumePreview";
import PdfDownloadButton from "@/components/resume/PdfDownloadButton";
import ClassicTemplate from "@/components/resume/templates/ClassicTemplate";

export default function PublicResumePage() {
  const params = useParams();
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadResume = async () => {
      const slug = params.slug as string;
      
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      // For now, load from localStorage only
      try {
        const raw = localStorage.getItem(RESUME_STORAGE_KEY);
        if (raw) {
          setResume(JSON.parse(raw) as ResumeData);
        } else {
          setResume(getEmptyResumeData());
        }
      } catch {
        setResume(getEmptyResumeData());
      }
      
      setLoading(false);
    };

    loadResume();
  }, [params.slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading resume...</div>
      </main>
    );
  }

  if (notFound || !resume) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Resume Not Found</h1>
          <p className="text-gray-600 mb-6">This resume is either private or doesn't exist.</p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-[#ABF62D] text-black font-semibold rounded-lg hover:bg-[#9fdf2a] transition-colors"
          >
            Build Your Own Resume
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container-x py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {resume.personal.fullName || "Professional Resume"}
          </h1>
          <p className="text-gray-600">
            This resume was created with YourValue.in
          </p>
        </div>

        {/* Resume Preview */}
        <div className="mb-8">
          <ResumePreview data={resume} template={ClassicTemplate} />
        </div>

        {/* Download Button */}
        <div className="flex justify-center mb-8">
          <PdfDownloadButton data={resume} template={ClassicTemplate} />
        </div>

        {/* CTA */}
        <div className="text-center py-8 bg-gray-50 rounded-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Build your own professional resume
          </h2>
          <p className="text-gray-600 mb-4">
            Create a stunning resume in minutes with our free resume builder
          </p>
          <a
            href="/"
            className="inline-flex items-center px-8 py-3 bg-[#ABF62D] text-black font-bold rounded-lg hover:bg-[#9fdf2a] transition-colors"
          >
            Get Started Free
          </a>
        </div>
      </div>
    </main>
  );
}
