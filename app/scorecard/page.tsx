"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { getEmptyResumeData, RESUME_STORAGE_KEY, type ResumeData } from "@/lib/resumeTypes";

interface ScoreData {
  total: number;
  skills: number;
  experience: number;
  education: number;
  potential: number;
  hiddenSkills: string[];
  jobRoles: JobRole[];
}

interface JobRole {
  title: string;
  salary: string;
  match: number;
  companies: string[];
  link: string;
}

function ScoreCardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [resumeData, setResumeData] = useState<ResumeData>(getEmptyResumeData);
  const [score, setScore] = useState<ScoreData | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadData = () => {
      // Load from localStorage only
      try {
        const raw = localStorage.getItem(RESUME_STORAGE_KEY);
        if (raw) {
          setResumeData(JSON.parse(raw) as ResumeData);
        }
      } catch {}
      
      setLoaded(true);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (loaded) {
      calculateScore();
    }
  }, [loaded, resumeData]);

  useEffect(() => {
    if (score && animatedScore < score.total) {
      const timer = setTimeout(() => {
        setAnimatedScore(prev => Math.min(prev + 2, score.total));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [animatedScore, score]);

  const calculateScore = () => {
    const skills = resumeData.skills.technicalSkills.length + resumeData.skills.softSkills.length;
    const experience = resumeData.workExperience.filter(w => w.companyOrInternshipName.trim()).length;
    const education = resumeData.education.filter(e => e.schoolCollegeName.trim()).length;
    const certifications = resumeData.certifications.filter(c => c.certificateName.trim()).length;

    // Calculate individual scores
    const skillsScore = Math.min(25, skills * 5);
    const experienceScore = Math.min(25, experience * 8);
    const educationScore = Math.min(25, (education * 8) + (certifications * 3));
    const potentialScore = Math.min(25, (skills + experience + education) * 2);

    const totalScore = Math.round((skillsScore + experienceScore + educationScore + potentialScore) / 4 * 4);

    // Determine hidden skills
    const hiddenSkills = getHiddenSkills(resumeData);

    // Determine job roles
    const jobRoles = getJobRoles(resumeData);

    setScore({
      total: totalScore,
      skills: skillsScore,
      experience: experienceScore,
      education: educationScore,
      potential: potentialScore,
      hiddenSkills,
      jobRoles
    });
  };

  const getHiddenSkills = (data: ResumeData): string[] => {
    const skills = [...data.skills.technicalSkills, ...data.skills.softSkills].map(s => s.toLowerCase());
    const hidden = [];

    // Check for full stack
    if (skills.some(s => s.includes('react') || s.includes('vue') || s.includes('angular')) && 
        skills.some(s => s.includes('node') || s.includes('express') || s.includes('django'))) {
      hidden.push('Full Stack Development');
    }

    // Check for multilingual
    if (data.skills.languagesKnown.length >= 2) {
      hidden.push('Multilingual Communication');
    }

    // Check for professional work ethic
    if (data.workExperience.some(w => w.companyOrInternshipName.toLowerCase().includes('intern'))) {
      hidden.push('Professional Work Ethic');
    }

    // Check for leadership
    if (skills.some(s => s.includes('leadership') || s.includes('management') || s.includes('team'))) {
      hidden.push('Leadership & Team Management');
    }

    // Check for data analysis
    if (skills.some(s => s.includes('data') || s.includes('analytics') || s.includes('excel') || s.includes('sql'))) {
      hidden.push('Data Analysis & Insights');
    }

    // Check for problem solving
    if (skills.some(s => s.includes('problem') || s.includes('analytical') || s.includes('critical'))) {
      hidden.push('Strategic Problem Solving');
    }

    return hidden.slice(0, 4);
  };

  const getJobRoles = (data: ResumeData): JobRole[] => {
    const skills = [...data.skills.technicalSkills, ...data.skills.softSkills].map(s => s.toLowerCase());
    const roles: JobRole[] = [];

    // Frontend Developer
    if (skills.some(s => s.includes('react') || s.includes('javascript') || s.includes('html') || s.includes('css'))) {
      roles.push({
        title: 'Frontend Developer',
        salary: '₹3-8 LPA',
        match: 85,
        companies: ['TCS', 'Infosys', 'Startups', 'MNCs'],
        link: 'https://www.linkedin.com/jobs/search?keywords=frontend%20developer&location=India'
      });
    }

    // Data Analyst
    if (skills.some(s => s.includes('python') || s.includes('data') || s.includes('analytics') || s.includes('sql'))) {
      roles.push({
        title: 'Data Analyst',
        salary: '₹4-10 LPA',
        match: 80,
        companies: ['Amazon', 'Flipkart', 'Analytics Firms', 'Consulting'],
        link: 'https://www.linkedin.com/jobs/search?keywords=data%20analyst&location=India'
      });
    }

    // Backend Developer
    if (skills.some(s => s.includes('java') || s.includes('spring') || s.includes('sql') || s.includes('node'))) {
      roles.push({
        title: 'Backend Developer',
        salary: '₹4-9 LPA',
        match: 82,
        companies: ['TCS', 'Wipro', 'Banks', 'Product Companies'],
        link: 'https://www.linkedin.com/jobs/search?keywords=backend%20developer&location=India'
      });
    }

    // UI/UX Designer
    if (skills.some(s => s.includes('figma') || s.includes('ui') || s.includes('ux') || s.includes('design'))) {
      roles.push({
        title: 'UI/UX Designer',
        salary: '₹3-7 LPA',
        match: 78,
        companies: ['Startups', 'Design Agencies', 'Product Companies'],
        link: 'https://www.linkedin.com/jobs/search?keywords=ui%20ux%20designer&location=India'
      });
    }

    // Business Analyst
    if (skills.some(s => s.includes('communication') || s.includes('excel') || s.includes('ppt') || s.includes('business'))) {
      roles.push({
        title: 'Business Analyst',
        salary: '₹3-7 LPA',
        match: 75,
        companies: ['Consulting Firms', 'Banks', 'IT Services'],
        link: 'https://www.linkedin.com/jobs/search?keywords=business%20analyst&location=India'
      });
    }

    // If no strong tech skills, add general roles
    if (roles.length === 0) {
      roles.push(
        {
          title: 'Content Writer',
          salary: '₹2-5 LPA',
          match: 70,
          companies: ['Media Houses', 'Agencies', 'Startups'],
          link: 'https://www.linkedin.com/jobs/search?keywords=content%20writer&location=India'
        },
        {
          title: 'HR Executive',
          salary: '₹2.5-6 LPA',
          match: 68,
          companies: ['Corporate', 'Consulting', 'Startups'],
          link: 'https://www.linkedin.com/jobs/search?keywords=hr%20executive&location=India'
        },
        {
          title: 'Sales Executive',
          salary: '₹2-6 LPA',
          match: 65,
          companies: ['Sales Companies', 'Startups', 'Retail'],
          link: 'https://www.linkedin.com/jobs/search?keywords=sales%20executive&location=India'
        }
      );
    }

    return roles.slice(0, 3);
  };

  const shareScore = () => {
    // Create shareable text
    const text = `My Value Score is ${score?.total || 0}/100! I'm stronger than ${Math.max(0, (score?.total || 0) - 10)}% of people my age. Check your value at YourValue.in`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Value Score',
        text: text,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(text + ' ' + window.location.href);
      alert('Score link copied to clipboard!');
    }
  };

  if (!loaded || !score) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ABF62D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Calculating your value...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container-x py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Your Value Score
          </h1>
          <p className="text-xl text-white/60">
            Based on your skills and experience
          </p>
        </motion.div>

        {/* Score Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <div className="w-64 h-64 rounded-full border-8 border-[#333333] flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl font-black text-[#ABF62D]">
                  {animatedScore}
                </div>
                <div className="text-lg text-white/60">out of 100</div>
                <div className="text-sm text-white/40 mt-2">
                  You are stronger than {Math.max(0, score.total - 10)}% of people your age
                </div>
              </div>
            </div>
            {/* Animated ring */}
            <div 
              className="absolute inset-0 rounded-full border-8 border-transparent border-t-[#ABF62D] animate-spin"
              style={{ animationDuration: '3s' }}
            ></div>
          </div>
        </motion.div>

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Score Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#111111] p-6 rounded-2xl border border-[#333333] text-center"
            >
              <div className="text-3xl font-black text-[#ABF62D] mb-2">{score.skills}</div>
              <div className="text-sm text-white/60">Skills Score</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#111111] p-6 rounded-2xl border border-[#333333] text-center"
            >
              <div className="text-3xl font-black text-[#ABF62D] mb-2">{score.experience}</div>
              <div className="text-sm text-white/60">Experience Score</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-[#111111] p-6 rounded-2xl border border-[#333333] text-center"
            >
              <div className="text-3xl font-black text-[#ABF62D] mb-2">{score.education}</div>
              <div className="text-sm text-white/60">Education Score</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-[#111111] p-6 rounded-2xl border border-[#333333] text-center"
            >
              <div className="text-3xl font-black text-[#ABF62D] mb-2">{score.potential}</div>
              <div className="text-sm text-white/60">Potential Score</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Hidden Skills */}
        {score.hiddenSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Skills you have but didn't know about
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {score.hiddenSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="bg-[#111111] p-4 rounded-xl border border-[#333333] text-center"
                >
                  <div className="text-lg font-bold text-[#ABF62D]">{skill}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Job Roles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            You qualify for these roles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {score.jobRoles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="bg-[#111111] p-6 rounded-2xl border border-[#333333]"
              >
                <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
                <div className="text-2xl font-black text-[#ABF62D] mb-4">{role.salary}</div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-sm text-white/60">Match:</div>
                  <div className="text-lg font-bold text-[#ABF62D]">{role.match}%</div>
                </div>
                <div className="text-sm text-white/60 mb-4">
                  Top companies: {role.companies.join(', ')}
                </div>
                <a
                  href={role.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 bg-[#ABF62D] text-black font-bold text-center rounded-lg hover:bg-[#9fdf2a] transition-all"
                >
                  View Jobs
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Motivational Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="text-center mb-16"
        >
          <div className="text-3xl font-black text-[#ABF62D] mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            "You are more valuable than you think."
          </div>
          <p className="text-lg text-white/60">
            Every expert was once a beginner. Your journey has just begun.
          </p>
        </motion.div>

        {/* Share Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="text-center"
        >
          <button
            onClick={shareScore}
            className="py-4 px-8 bg-[#ABF62D] text-black font-bold text-lg rounded-lg hover:bg-[#9fdf2a] transition-all"
          >
            Share My Score
          </button>
        </motion.div>
      </div>
    </main>
  );
}

export default function ScoreCardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <ScoreCardContent />
    </Suspense>
  );
}
