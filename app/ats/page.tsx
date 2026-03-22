"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ATSScore {
  total: number;
  keywords: number;
  format: number;
  skills: number;
  experience: number;
  education: number;
  suggestions: string[];
}

export default function ATSScoreCheckerPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [score, setScore] = useState<ATSScore | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);

  const checkATSScore = () => {
    setIsChecking(true);
    setAnimatedScore(0);

    // Simulate checking
    setTimeout(() => {
      const calculatedScore = calculateATSScore(resumeText, jobDescription);
      setScore(calculatedScore);
      
      // Animate score counting up
      const duration = 2000;
      const steps = 60;
      const increment = calculatedScore.total / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= calculatedScore.total) {
          current = calculatedScore.total;
          clearInterval(timer);
        }
        setAnimatedScore(Math.round(current));
      }, duration / steps);

      setIsChecking(false);
    }, 1500);
  };

  const calculateATSScore = (resume: string, jobDesc: string): ATSScore => {
    let points = 0;
    const suggestions: string[] = [];

    // Check for email address
    const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(resume);
    if (hasEmail) points += 10;
    else suggestions.push("Add your email address");

    // Check for phone number
    const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(resume);
    if (hasPhone) points += 10;
    else suggestions.push("Add your phone number");

    // Check for proper sections
    const hasEducation = /education|university|college|degree/i.test(resume);
    const hasExperience = /experience|work|employment|career/i.test(resume);
    const hasSkills = /skills|abilities|competencies/i.test(resume);
    
    if (hasEducation && hasExperience && hasSkills) {
      points += 15;
    } else {
      if (!hasEducation) suggestions.push("Add Education section");
      if (!hasExperience) suggestions.push("Add Work Experience section");
      if (!hasSkills) suggestions.push("Add Skills section");
    }

    // Check for 5+ skills
    const skillMatches = resume.match(/\b(react|javascript|python|java|css|html|node|sql|aws|docker|git|angular|vue|typescript|mongodb|postgresql|mysql|redis|kubernetes|terraform|jenkins|ci\/cd|agile|scrum|leadership|communication|management|analytics|data|machine learning|ai|devops|testing|unit testing|integration|rest api|graphql|microservices|blockchain|web3|flutter|swift|kotlin|rust|go|ruby|php|laravel|django|flask|spring|express|firebase|supabase|mongodb|mysql|postgresql)\b/gi);
    if (skillMatches && skillMatches.length >= 5) {
      points += 10;
    } else {
      suggestions.push("List at least 5 relevant skills");
    }

    // Check for work experience
    if (hasExperience && resume.length > 200) {
      points += 15;
    }

    // Check for measurable achievements
    const hasNumbers = /\d+%|\$\d+|\d+\s*(years?|months?|clients?|projects?|users?|students?|sales?|revenue?|growth|increase|decrease|reduction)/i.test(resume);
    if (hasNumbers) {
      points += 10;
    } else {
      suggestions.push("Add measurable achievements with numbers and percentages");
    }

    // Check for no tables or graphics
    const hasTables = /\|.*\|/.test(resume) || /table|graph|image|chart/i.test(resume);
    if (!hasTables) {
      points += 10;
    } else {
      suggestions.push("Remove tables, graphics, or images");
    }

    // Check for proper date formats
    const hasDates = /\b(0?[1-9]|1[0-2])\/\d{2,4}\b|\b\d{4}\b|\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{4}\b/i.test(resume);
    if (hasDates) {
      points += 5;
    } else {
      suggestions.push("Include proper date formats for experience");
    }

    // Check for LinkedIn
    const hasLinkedIn = /linkedin\.com|linkedin/i.test(resume);
    if (hasLinkedIn) {
      points += 5;
    } else {
      suggestions.push("Add your LinkedIn profile URL");
    }

    // Check length (200-800 words)
    const wordCount = resume.split(/\s+/).length;
    if (wordCount >= 200 && wordCount <= 800) {
      points += 10;
    } else if (wordCount < 200) {
      suggestions.push("Resume is too short, add more details (aim for 200-800 words)");
    } else {
      suggestions.push("Resume is too long, make it more concise (aim for 200-800 words)");
    }

    // Calculate individual scores
    const keywords = hasEmail && hasPhone ? 10 : (hasEmail || hasPhone ? 5 : 0);
    const format = hasEducation && hasExperience && hasSkills ? 10 : 5;
    const skills = skillMatches ? Math.min(10, skillMatches.length * 2) : 0;
    const experience = hasExperience && hasNumbers ? 10 : (hasExperience ? 5 : 0);
    const education = hasEducation ? 10 : 0;

    return {
      total: points,
      keywords,
      format,
      skills,
      experience,
      education,
      suggestions
    };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#ABF62D"; // lime green
    if (score >= 60) return "#FFD700"; // yellow
    return "#ff4444"; // red
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container-x py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            ATS Score Checker
          </h1>
          <p className="text-xl text-white/60">
            See if your resume beats the hiring robots
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Side - Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Resume Text
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                className="w-full h-64 px-4 py-3 bg-[#111111] text-white border border-[#333333] rounded-lg focus:border-[#ABF62D] focus:ring-2 focus:ring-[#ABF62D]/20 outline-none transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Job Description (Optional)
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description here..."
                className="w-full h-32 px-4 py-3 bg-[#111111] text-white border border-[#333333] rounded-lg focus:border-[#ABF62D] focus:ring-2 focus:ring-[#ABF62D]/20 outline-none transition-all resize-none"
              />
            </div>

            <button
              onClick={checkATSScore}
              disabled={!resumeText.trim() || isChecking}
              className="w-full py-4 bg-[#ABF62D] text-black font-bold text-lg rounded-lg hover:bg-[#9fdf2a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isChecking ? "Checking..." : "Check ATS Score"}
            </button>
          </motion.div>

          {/* Right Side - Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {score ? (
              <>
                {/* Score Display */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-48 h-48 rounded-full border-8 border-[#333333] flex items-center justify-center">
                      <div className="text-center">
                        <div 
                          className="text-6xl font-black"
                          style={{ color: getScoreColor(animatedScore) }}
                        >
                          {animatedScore}
                        </div>
                        <div className="text-sm text-white/60">out of 100</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#111111] p-4 rounded-lg border border-[#333333]">
                    <div className="text-2xl font-bold text-[#ABF62D]">{score.keywords}/10</div>
                    <div className="text-sm text-white/60">Keywords Match</div>
                  </div>
                  <div className="bg-[#111111] p-4 rounded-lg border border-[#333333]">
                    <div className="text-2xl font-bold text-[#ABF62D]">{score.format}/10</div>
                    <div className="text-sm text-white/60">Format Score</div>
                  </div>
                  <div className="bg-[#111111] p-4 rounded-lg border border-[#333333]">
                    <div className="text-2xl font-bold text-[#ABF62D]">{score.skills}/10</div>
                    <div className="text-sm text-white/60">Skills Score</div>
                  </div>
                  <div className="bg-[#111111] p-4 rounded-lg border border-[#333333]">
                    <div className="text-2xl font-bold text-[#ABF62D]">{score.experience}/10</div>
                    <div className="text-sm text-white/60">Experience Score</div>
                  </div>
                  <div className="bg-[#111111] p-4 rounded-lg border border-[#333333] col-span-2">
                    <div className="text-2xl font-bold text-[#ABF62D]">{score.education}/10</div>
                    <div className="text-sm text-white/60">Education Score</div>
                  </div>
                </div>

                {/* Improvement Suggestions */}
                {score.suggestions.length > 0 && (
                  <div className="bg-[#111111] p-6 rounded-lg border border-[#333333]">
                    <h3 className="text-lg font-bold text-white mb-4">What to fix</h3>
                    <div className="space-y-3">
                      {score.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          <p className="text-sm text-white/80">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-[#111111] p-12 rounded-lg border border-[#333333] text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#333333] flex items-center justify-center">
                  <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-white/60">Your ATS score will appear here</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
