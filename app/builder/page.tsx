"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, Suspense } from "react";
import { getEmptyResumeData, RESUME_STORAGE_KEY, type ResumeData } from "@/lib/resumeTypes";
import ResumeForm from "@/components/builder/ResumeForm";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import ShareButton from "@/components/ShareButton";

function BuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<ResumeData>(getEmptyResumeData);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [shareSlug, setShareSlug] = useState<string | null>(null);

  useEffect(() => {
    const loadResume = async () => {
      const editingResumeId = searchParams.get('resume');
      
      if (editingResumeId) {
        // Load existing resume from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/auth');
          return;
        }

        const { data: resume, error } = await supabase
          .from('resumes')
          .select('*')
          .eq('id', editingResumeId)
          .eq('user_id', session.user.id)
          .single();

        if (error || !resume) {
          toast.error('Resume not found');
          router.push('/dashboard');
          return;
        }

        setData(resume.data);
        setResumeId(resume.id);
        setLastSaved(new Date(resume.updated_at));
        setIsPublic(resume.is_public || false);
        setShareSlug(resume.share_slug || null);
      } else {
        // Load from localStorage for new resumes
        try {
          const raw = localStorage.getItem(RESUME_STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw) as ResumeData;
            setData(parsed);
          }
        } catch {
          // If storage is corrupted, start fresh.
          setData(getEmptyResumeData());
        }
      }
    };

    loadResume();
  }, [searchParams, router]);

  const debouncedSave = useMemo(() => {
    return (newData: ResumeData) => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }

      setIsSaving(true);
      const timeout = setTimeout(async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session || !resumeId) return;

          const { error } = await supabase
            .from('resumes')
            .update({ data: newData, updated_at: new Date().toISOString() })
            .eq('id', resumeId)
            .eq('user_id', session.user.id);

          if (error) throw error;
          
          setLastSaved(new Date());
        } catch (error) {
          toast.error('Failed to save resume');
          console.error(error);
        } finally {
          setIsSaving(false);
        }
      }, 1000);

      setSaveTimeout(timeout);
    };
  }, [saveTimeout, resumeId]);

  const handleDataChange = (newData: ResumeData) => {
    setData(newData);
    
    // Also save to localStorage as backup
    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(newData));
    
    // Auto-save to Supabase if we have a resume ID
    if (resumeId) {
      debouncedSave(newData);
    }
  };

  const handleSubmit = async (nextData: ResumeData) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/auth');
      return;
    }

    try {
      if (resumeId) {
        // Update existing resume
        const { error } = await supabase
          .from('resumes')
          .update({ data: nextData, updated_at: new Date().toISOString() })
          .eq('id', resumeId)
          .eq('user_id', session.user.id);

        if (error) throw error;
        toast.success('Resume saved successfully!');
      } else {
        // Create new resume
        const { data: resume, error } = await supabase
          .from('resumes')
          .insert({
            user_id: session.user.id,
            title: 'My Resume',
            data: nextData,
            is_public: isPublic,
            share_slug: isPublic ? (shareSlug || Math.random().toString(36).substring(2, 15)) : null,
          })
          .select()
          .single();

        if (error) throw error;
        
        setResumeId(resume.id);
        toast.success('Resume created successfully!');
      }

      // Redirect to preview page
      router.push(`/preview${resumeId ? `?resume=${resumeId}` : ''}`);
    } catch (error) {
      toast.error('Failed to save resume');
      console.error(error);
    }
  };

  const handleClear = () => {
    localStorage.removeItem(RESUME_STORAGE_KEY);
    setData(getEmptyResumeData());
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

  const togglePublicSharing = async () => {
    if (!resumeId) {
      toast.error('Please save your resume first');
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const newPublicState = !isPublic;
      const { error } = await supabase
        .from('resumes')
        .update({ 
          is_public: newPublicState,
          share_slug: newPublicState && !shareSlug ? Math.random().toString(36).substring(2, 15) : shareSlug
        })
        .eq('id', resumeId)
        .eq('user_id', session.user.id)
        .select()
        .single();

      if (error) throw error;

      setIsPublic(newPublicState);
      if (newPublicState && !shareSlug) {
        const newSlug = Math.random().toString(36).substring(2, 15);
        setShareSlug(newSlug);
        toast.success('Resume is now public!');
      } else {
        toast.success('Resume is now private');
      }
    } catch (error) {
      toast.error('Error updating sharing settings');
      console.error(error);
    }
  };

  return (
    <main className="bg-black pb-14 text-white [&_.input]:bg-[#1a1a1a] [&_.input]:text-white [&_.input]:placeholder:text-white/30 [&_.input]:border-[#333333] [&_.input]:focus:border-[#ABF62D] [&_.input]:focus:ring-[#ABF62D]/30 [&_.label]:text-white [&_h1]:text-[#ABF62D] [&_h2]:text-[#ABF62D] [&_h3]:text-[#ABF62D] [&_button]:bg-[#ABF62D] [&_button]:text-black [&_button]:ring-0 [&_button:hover]:bg-[#9fdf2a] [&_button:disabled]:opacity-60 [&_.form-section]:bg-[#111111]">
      <div className="container-x pt-6">
        <div className="sticky top-16 z-40 mb-6 bg-black/90 backdrop-blur py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-white">
              Profile {calculateProgress}% complete
            </div>
            <div className="flex items-center gap-4">
              {resumeId && (
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isSaving ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                  <span className="text-xs text-white/60">
                    {isSaving ? 'Saving...' : lastSaved ? `Saved ${lastSaved.toLocaleTimeString()}` : 'Saved'}
                  </span>
                </div>
              )}
              <div className="h-2 w-32 rounded-full bg-white/20">
                <div 
                  className="h-2 rounded-full bg-[#ABF62D] transition-all duration-300"
                  style={{ width: `${calculateProgress}%` }}
                />
              </div>
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

      <ResumeForm initialData={data} onSubmit={handleSubmit} onDataChange={handleDataChange} />

      {/* Sharing Section */}
      {resumeId && (
        <div className="container-x mt-8">
          <div className="rounded-3xl bg-[#111111] p-6 ring-1 ring-white/10 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-white">Share Resume</h2>
              <button
                onClick={togglePublicSharing}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isPublic 
                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {isPublic ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Public
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Private
                  </>
                )}
              </button>
            </div>

            {isPublic && shareSlug ? (
              <div className="space-y-4">
                <p className="text-sm text-white/60">
                  Your resume is publicly accessible via this link:
                </p>
                <ShareButton 
                  shareUrl={`${typeof window !== 'undefined' ? window.location.origin : 'https://yourvalue.vercel.app'}/r/${shareSlug}`}
                  resumeTitle={data.personal.fullName || "My Resume"}
                />
              </div>
            ) : (
              <p className="text-sm text-white/60">
                Make your resume public to share it with others. Anyone with the link can view and download your resume.
              </p>
            )}
          </div>
        </div>
      )}
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
