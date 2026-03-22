"use client";

import { useState } from "react";
import Link from "next/link";

export default function CoverLetterPage() {
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    company: "",
    jobDescription: "",
    resume: "",
    tone: "professional"
  });

  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isPro, setIsPro] = useState(false);

  const generateCoverLetter = () => {
    const templates = {
      professional: `Dear Hiring Manager at ${formData.company},

I am writing to express my strong interest in the ${formData.jobTitle} position at ${formData.company}. With my background in ${formData.resume}, I am confident I can contribute significantly to your team.

Throughout my experience, I have developed strong skills in ${formData.resume}. I am particularly drawn to ${formData.company} because of its reputation for innovation and excellence.

I am eager to bring my professional approach and dedication to ${formData.company}. I look forward to discussing how my background aligns with your needs.

Best regards,
${formData.name}`,

      friendly: `Hi ${formData.company} Team,

I hope this message finds you well! I'm excited to apply for the ${formData.jobTitle} role I saw advertised. With my experience in ${formData.resume}, I think I'd be a great fit for your team.

What really caught my eye about ${formData.company} is your amazing culture and the innovative work you're doing. I'd love to be part of that!

I bring enthusiasm and a fresh perspective to everything I do. My skills in ${formData.resume} have prepared me to take on new challenges and grow with your team.

I'm particularly excited about this opportunity because it combines my passion for ${formData.resume} with a chance to make a real impact.

Looking forward to hearing from you!

Best,
${formData.name}`,

      confident: `Dear Hiring Manager at ${formData.company},

I am writing to express my enthusiastic interest in the ${formData.jobTitle} position at ${formData.company}. With my proven expertise in ${formData.resume}, I am confident I possess the skills and qualifications necessary to make an immediate and significant contribution to your team.

Throughout my career, I have consistently demonstrated excellence in ${formData.resume}. I am particularly drawn to ${formData.company} because of its industry leadership and commitment to innovation.

I am eager to bring my confident approach and dedication to ${formData.company}. I look forward to discussing how my background aligns with your strategic goals.

Sincerely,
${formData.name}`
    };

    setGeneratedLetter(templates[formData.tone as keyof typeof templates] || templates.professional);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    alert("Cover letter copied to clipboard!");
  };

  const downloadPDF = () => {
    // Simple PDF download simulation
    const blob = new Blob([generatedLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cover-letter.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Pro Badge */}
      {!isPro && (
        <div className="bg-[#D6A3FB] text-black px-4 py-2 text-center text-sm font-medium">
          🔒 Pro Feature - Upgrade to unlock AI-powered cover letters
        </div>
      )}

      <div className="container-x py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            AI Cover Letter Generator
          </h1>
          <p className="text-xl text-white/60">
            Tailored cover letters in seconds
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left - Input Form */}
          <div className="space-y-6">
            <div className="bg-[#111111] rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6">Your Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-[#000000] border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#ABF62D] focus:ring-1 focus:ring-[#ABF62D]/20"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Job Title</label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                    className="w-full px-4 py-3 bg-[#000000] border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#ABF62D] focus:ring-1 focus:ring-[#ABF62D]/20"
                    placeholder="Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Company Name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 bg-[#000000] border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#ABF62D] focus:ring-1 focus:ring-[#ABF62D]/20"
                    placeholder="Google"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Job Description</label>
                  <textarea
                    value={formData.jobDescription}
                    onChange={(e) => setFormData({...formData, jobDescription: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 bg-[#000000] border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#ABF62D] focus:ring-1 focus:ring-[#ABF62D]/20"
                    placeholder="Paste the job description here..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Your Key Skills</label>
                  <textarea
                    value={formData.resume}
                    onChange={(e) => setFormData({...formData, resume: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 bg-[#000000] border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#ABF62D] focus:ring-1 focus:ring-[#ABF62D]/20"
                    placeholder="React, Node.js, Python, AWS..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-4">Tone</label>
                  <div className="flex gap-2">
                    {['professional', 'friendly', 'confident'].map((tone) => (
                      <button
                        key={tone}
                        onClick={() => setFormData({...formData, tone})}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          formData.tone === tone
                            ? 'bg-[#ABF62D] text-black'
                            : 'bg-[#111111] text-white hover:bg-white/20'
                        }`}
                      >
                        {tone.charAt(0).toUpperCase() + tone.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={generateCoverLetter}
                  className="w-full py-4 bg-[#ABF62D] text-black font-bold rounded-lg hover:bg-[#9fdf2a] transition-all"
                >
                  Generate Cover Letter
                </button>
              </div>
            </div>
          </div>

          {/* Right - Output */}
          <div className="space-y-6">
            <div className="bg-[#111111] rounded-2xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Generated Cover Letter</h2>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
                  >
                    Copy
                  </button>
                  <button
                    onClick={downloadPDF}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
                  >
                    Download
                  </button>
                </div>
              </div>

              <div className="bg-[#000000] rounded-lg p-6 min-h-[400px]">
                <pre className="text-white/90 whitespace-pre-wrap font-serif text-sm leading-relaxed">
                  {generatedLetter || "Your cover letter will appear here..."}
                </pre>
              </div>

              {generatedLetter && (
                <button
                  onClick={generateCoverLetter}
                  className="w-full mt-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
                >
                  Regenerate
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
