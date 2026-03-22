"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getEmptyResumeData, RESUME_STORAGE_KEY, type ResumeData } from "@/lib/resumeTypes";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [resumes, setResumes] = useState<any[]>([]);

  useEffect(() => {
    // Load resumes from localStorage (for now, just show empty state)
    try {
      const raw = localStorage.getItem(RESUME_STORAGE_KEY);
      if (raw) {
        // For now, just show a message that resumes are stored locally
        setResumes([{
          id: 'local',
          title: 'Local Resume',
          data: JSON.parse(raw),
          is_public: false,
          share_slug: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);
      }
    } catch (error) {
      console.error('Failed to load resumes:', error);
      toast.error('Failed to load resumes');
    }
  }, []);

  const handleDelete = (id: string) => {
    // For now, just clear localStorage
    localStorage.removeItem(RESUME_STORAGE_KEY);
    setResumes([]);
    toast.success('Resume deleted');
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container-x py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            My Resumes
          </h1>
          <p className="text-white/60">
            Manage your resume drafts
          </p>
        </div>

        {resumes.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#111111] flex items-center justify-center">
                <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2 2v6a2 2 0 012 2h6a2 2 0 012-2v-2a2 2 0 00-2-2z" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No resumes yet</h2>
            <p className="text-white/60 mb-6">
              Create your first resume to get started
            </p>
            <Link
              href="/builder"
              className="inline-flex items-center px-6 py-3 bg-[#ABF62D] text-black font-bold rounded-lg hover:bg-[#9fdf2a] transition-all"
            >
              Create Your First Resume
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="rounded-2xl bg-[#111111] p-6 border border-white/10 hover:border-[#ABF62D]/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    {resume.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    resume.is_public ? 'bg-[#ABF62D] text-black' : 'bg-gray-600 text-white'
                  }`}>
                    {resume.is_public ? 'Public' : 'Private'}
                  </span>
                </div>
                
                <div className="text-sm text-white/60 mb-4">
                  Last updated: {new Date(resume.updated_at).toLocaleDateString()}
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/builder?resume=${resume.id}`}
                    className="flex-1 px-3 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-all text-center"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/preview?resume=${resume.id}`}
                    className="flex-1 px-3 py-2 bg-[#ABF62D] text-black text-sm font-medium rounded-lg hover:bg-[#9fdf2a] transition-all text-center"
                  >
                    Preview
                  </Link>
                </div>

                <div className="flex gap-2 pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleDelete(resume.id)}
                    className="flex-1 px-3 py-2 bg-red-500/20 text-red-400 text-sm font-medium rounded-lg hover:bg-red-500/30 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/builder"
            className="inline-flex items-center px-6 py-3 bg-[#ABF62D] text-black font-bold rounded-lg hover:bg-[#9fdf2a] transition-all"
          >
            Create New Resume
          </Link>
        </div>
      </div>
    </main>
  );
}
