"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

interface Resume {
  id: string;
  title: string;
  data: any;
  is_public: boolean;
  share_slug: string;
  created_at: string;
  updated_at: string;
}

export default function DashboardPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUserAndResumes = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth');
        return;
      }
      
      setUser(session.user);
      
      const { data: resumesData, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', session.user.id)
        .order('updated_at', { ascending: false });

      if (error) {
        toast.error('Error loading resumes');
      } else {
        setResumes(resumesData || []);
      }
      
      setLoading(false);
    };

    getUserAndResumes();
  }, [router]);

  const handleDeleteResume = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;
    
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Error deleting resume');
    } else {
      toast.success('Resume deleted successfully');
      setResumes(resumes.filter(r => r.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="container-x pt-8 pb-14">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            My Resumes
          </h1>
          <p className="text-white/60">
            Manage all your resumes in one place
          </p>
        </div>

        {resumes.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-[#111111] mb-6">
              <svg className="h-10 w-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No resumes yet</h2>
            <p className="text-white/60 mb-6">Build your first professional resume</p>
            <Link
              href="/builder"
              className="btn text-base font-black px-8 py-4 bg-[#ABF62D] text-black hover:bg-[#9fdf2a] transition-all duration-300"
            >
              Create New Resume
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <Link
                href="/builder"
                className="btn text-base font-black px-8 py-4 bg-[#ABF62D] text-black hover:bg-[#9fdf2a] transition-all duration-300"
              >
                Create New Resume
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resumes.map((resume) => (
                <div key={resume.id} className="bg-[#111111] rounded-2xl p-6 ring-1 ring-white/10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{resume.title}</h3>
                      <p className="text-sm text-white/60">
                        Last edited: {formatDate(resume.updated_at)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {resume.is_public && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          Public
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/builder?resume=${resume.id}`}
                      className="flex-1 btn text-sm font-semibold px-3 py-2 bg-[#ABF62D] text-black hover:bg-[#9fdf2a] transition-all duration-300"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/preview?resume=${resume.id}`}
                      className="flex-1 btn text-sm font-semibold px-3 py-2 bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                    >
                      Preview
                    </Link>
                    <button
                      onClick={() => handleDeleteResume(resume.id)}
                      className="btn text-sm font-semibold px-3 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
