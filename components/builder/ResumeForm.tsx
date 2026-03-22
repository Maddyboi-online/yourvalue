"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ResumeData, ResumeEducation, ResumeWorkExperience, ResumeCertification } from "@/lib/resumeTypes";
import { getEmptyResumeData } from "@/lib/resumeTypes";
import TagInput from "@/components/builder/TagInput";
import Cropper from "react-easy-crop";

type Props = {
  initialData: ResumeData;
  onSubmit: (data: ResumeData) => void;
  onDataChange?: (data: ResumeData) => void;
};

function removeAt<T>(arr: T[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

type SuggestInputProps = {
  value: string;
  placeholder?: string;
  suggestions: string[];
  onChange: (value: string) => void;
};

function SuggestInput({ value, placeholder, suggestions, onChange }: SuggestInputProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const filtered = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return suggestions.slice(0, 5);
    return suggestions.filter((s) => s.toLowerCase().includes(q)).slice(0, 5);
  }, [value, suggestions]);

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <input
        className="input"
        value={value}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
      />
      {open && filtered.length > 0 && (
        <div className="absolute z-20 mt-1 max-h-[200px] w-full overflow-y-auto rounded-[12px] border border-[#ABF62D40] bg-[#111111] py-1 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {filtered.map((item) => (
            <button
              key={item}
              type="button"
              className="block w-full border-l-[3px] border-l-transparent px-4 py-[10px] text-left text-[14px] text-white transition-colors hover:border-l-[#ABF62D] hover:bg-[#ABF62D15] hover:text-[#ABF62D]"
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ResumeForm({ initialData, onSubmit, onDataChange }: Props) {
  const technicalSkillSuggestions = [
    "HTML/CSS",
    "JavaScript",
    "Microsoft Office",
    "Git",
    "Python",
    "React",
    "TypeScript",
    "SQL",
    "Node.js",
    "MongoDB",
    "Docker",
    "AWS",
    "Figma",
  ];

  const softSkillSuggestions = [
    "Communication",
    "Team Work",
    "Problem Solving",
    "Time Management",
    "Leadership",
    "Critical Thinking",
    "Creativity",
    "Adaptability",
    "Project Management",
  ];

  const languageSuggestions = [
    "English",
    "Hindi",
    "Tamil",
    "Telugu",
    "Kannada",
    "Malayalam",
    "Bengali",
    "Marathi",
    "Gujarati",
  ];
  const roleSuggestions = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Data Analyst",
    "Product Manager",
    "Marketing Intern",
    "Business Analyst",
    "DevOps Engineer",
  ];
  const companySuggestions = [
    "TCS",
    "Infosys",
    "Wipro",
    "HCL",
    "Google",
    "Microsoft",
    "Amazon",
    "Flipkart",
    "Zomato",
    "Swiggy",
    "Razorpay",
    "Freshworks",
    "Zoho",
    "IBM",
    "Accenture",
  ];

  const certificateSuggestions = [
    "Google Digital Marketing",
    "AWS Cloud Practitioner",
    "Meta Frontend Developer",
    "Google Data Analytics",
    "IBM Data Science",
    "Microsoft Azure Fundamentals",
    "Coursera Python",
    "HackerRank JavaScript",
    "Udemy React Complete Guide",
    "NPTEL Programming",
  ];

  const [data, setData] = useState<ResumeData>(initialData);
  const [showCropModal, setShowCropModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasAtLeastOneEducation = useMemo(() => data.education.length > 0, [data.education.length]);
  const hasAtLeastOneWork = useMemo(() => data.workExperience.length > 0, [data.workExperience.length]);
  const hasAtLeastOneCert = useMemo(() => data.certifications.length > 0, [data.certifications.length]);

  const updatePersonal = (patch: Partial<ResumeData["personal"]>) => {
    setData((prev) => {
      const newData = { ...prev, personal: { ...prev.personal, ...patch } };
      onDataChange?.(newData);
      return newData;
    });
  };

  const updateEducation = (index: number, patch: Partial<ResumeEducation>) => {
    setData((prev) => {
      const newData = {
        ...prev,
        education: prev.education.map((e, i) => (i === index ? { ...e, ...patch } : e)),
      };
      onDataChange?.(newData);
      return newData;
    });
  };

  const updateWork = (index: number, patch: Partial<ResumeWorkExperience>) => {
    setData((prev) => {
      const newData = {
        ...prev,
        workExperience: prev.workExperience.map((w, i) => (i === index ? { ...w, ...patch } : w)),
      };
      onDataChange?.(newData);
      return newData;
    });
  };

  const updateCertification = (index: number, patch: Partial<ResumeCertification>) => {
    setData((prev) => {
      const newData = {
        ...prev,
        certifications: prev.certifications.map((c, i) => (i === index ? { ...c, ...patch } : c)),
      };
      onDataChange?.(newData);
      return newData;
    });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    setCroppedImage(croppedImage);
    setShowCropModal(false);
    updatePersonal({ profilePhoto: croppedImage });
  };

  const handleRemovePhoto = () => {
    setCroppedImage(null);
    setSelectedImage(null);
    updatePersonal({ profilePhoto: null });
  };

  return (
    <div className="container-x py-8 md:py-12">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-extrabold uppercase tracking-wider text-white/50">Resume builder</p>
        <h1 className="text-2xl font-black text-white md:text-3xl">Build your resume in minutes</h1>
        <p className="text-sm font-semibold text-white/50">
          Fill this form and generate a clean, modern, white resume template.
        </p>
      </div>

      <div className="mt-6 rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-4 shadow-soft md:p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(data);
          }}
          className="space-y-7"
        >
          {/* Personal */}
          <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black text-[var(--add-btn)]">Personal Info</p>
                <p className="text-xs font-semibold text-[var(--text-muted)]">Basic details recruiters look for.</p>
              </div>
              <div className="h-px w-16 bg-gradient-to-r from-[var(--add-btn)] to-[var(--text-muted)] opacity-60" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Photo Upload Section */}
              <div className="md:col-span-2">
                <label className="label text-[var(--label-text)]">Profile Photo (Optional)</label>
                <div className="flex items-center gap-4">
                  {/* Photo Upload Circle */}
                  <div 
                    className="relative w-[100px] h-[100px] rounded-full border-2 border-dashed border-[#ABF62D] bg-[#1a1a1a] flex items-center justify-center cursor-pointer hover:border-[#ABF62D] transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {croppedImage ? (
                      <img 
                        src={croppedImage} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <svg className="w-6 h-6 text-[#ABF62D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0 0h6m-6 0v6m0 0h6" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2z" />
                      </svg>
                    )
                  }
                  <div className="flex-1">
                    <p className="text-[#888888] text-sm mb-2">Add Photo (Optional)</p>
                    {croppedImage && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="text-[#888888] hover:text-white text-xs underline"
                          onClick={handleRemovePhoto}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
              
              {/* Name Input */}
              <div>
                <label className="label text-[var(--label-text)]">Full Name</label>
                <input
                  className="input"
                  value={data.personal.fullName}
                  onChange={(e) => updatePersonal({ fullName: e.target.value })}
                  placeholder="e.g., Arjun Sharma"
                  required
                />
              </div>
              <div>
                <label className="label text-[var(--label-text)]">Phone Number</label>
                <input
                  className="input"
                  value={data.personal.phoneNumber}
                  onChange={(e) => updatePersonal({ phoneNumber: e.target.value })}
                  placeholder="e.g., +91 98765 43210"
                />
              </div>
              <div>
                <label className="label text-[var(--label-text)]">Email Address</label>
                <input
                  className="input"
                  type="email"
                  value={data.personal.emailAddress}
                  onChange={(e) => updatePersonal({ emailAddress: e.target.value })}
                  placeholder="e.g., arjun@email.com"
                  required
                />
              </div>
              <div>
                <label className="label text-[var(--label-text)]">City and State</label>
                <input
                  className="input"
                  value={data.personal.cityState}
                  onChange={(e) => updatePersonal({ cityState: e.target.value })}
                  placeholder="e.g., Mumbai, Maharashtra"
                />
              </div>
              <div className="md:col-span-2">
                <label className="label text-[var(--label-text)]">LinkedIn URL (optional)</label>
                <input
                  className="input"
                  value={data.personal.linkedInUrl ?? ""}
                  onChange={(e) => updatePersonal({ linkedInUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/your-profile"
                />
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black text-[#ABF62D]">Education</p>
                <p className="text-xs font-semibold text-white/50">Add multiple education entries.</p>
              </div>
              <button
                type="button"
                className="btn-ghost btn bg-white px-3 py-2"
                onClick={() => {
                  const newData = {
                    ...data,
                    education: [
                      ...data.education,
                      getEmptyResumeData().education[0],
                    ],
                  };
                  setData(newData);
                  onDataChange?.(newData);
                }}
              >
                + Add Education
              </button>
            </div>

            <AnimatePresence initial={false}>
              {data.education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl bg-[#111111] p-4 ring-1 ring-white/10 md:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#ABF62D] text-lg font-bold text-black">
                        {idx + 1}
                      </div>
                      <p className="text-xs font-semibold text-white/50">Fill the details.</p>
                    </div>
                    <button
                      type="button"
                      className="rounded-xl bg-[#ABF62D] px-3 py-2 text-sm font-bold text-black ring-1 ring-[#ABF62D]/60 hover:bg-[#9fdf2a]"
                      onClick={() => {
                        const newData = { ...data, education: removeAt(data.education, idx) };
                        setData(newData);
                        onDataChange?.(newData);
                      }}
                      disabled={!hasAtLeastOneEducation || data.education.length <= 1}
                      aria-disabled={data.education.length <= 1}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="label">School/College Name</label>
                      <input
                        className="input"
                        value={edu.schoolCollegeName}
                        onChange={(e) => updateEducation(idx, { schoolCollegeName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label">Degree or Class (10th/12th/Graduation)</label>
                      <input
                        className="input"
                        value={edu.degreeOrClass}
                        onChange={(e) => updateEducation(idx, { degreeOrClass: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label">Board or University</label>
                      <input
                        className="input"
                        value={edu.boardOrUniversity}
                        onChange={(e) => updateEducation(idx, { boardOrUniversity: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label">Year of Passing</label>
                      <input
                        className="input"
                        value={edu.yearOfPassing}
                        onChange={(e) => updateEducation(idx, { yearOfPassing: e.target.value })}
                        placeholder="e.g., 2025"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">Percentage or CGPA</label>
                      <input
                        className="input"
                        value={edu.percentageOrCgpa}
                        onChange={(e) => updateEducation(idx, { percentageOrCgpa: e.target.value })}
                        placeholder="e.g., 8.6 CGPA or 92%"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </section>

          {/* Skills */}
          <section className="space-y-4">
            <div>
              <p className="text-sm font-black text-[#ABF62D]">Skills</p>
              <p className="text-xs font-semibold text-white/50">Add skills as tags.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <TagInput
                label="Technical Skills (add as tags)"
                value={data.skills.technicalSkills}
                onChange={(next) => {
                  const newData = { ...data, skills: { ...data.skills, technicalSkills: next } };
                  setData(newData);
                  onDataChange?.(newData);
                }}
                placeholder="e.g., React, TypeScript, SQL"
                suggestions={technicalSkillSuggestions}
              />
              <TagInput
                label="Soft Skills (add as tags)"
                value={data.skills.softSkills}
                onChange={(next) => {
                  const newData = { ...data, skills: { ...data.skills, softSkills: next } };
                  setData(newData);
                  onDataChange?.(newData);
                }}
                placeholder="e.g., Communication, Leadership"
                suggestions={softSkillSuggestions}
              />
            </div>

            <TagInput
              label="Languages Known"
              value={data.skills.languagesKnown}
              onChange={(next) => {
                const newData = { ...data, skills: { ...data.skills, languagesKnown: next } };
                setData(newData);
                onDataChange?.(newData);
              }}
              placeholder="e.g., English, Tamil, Hindi"
              suggestions={languageSuggestions}
            />
          </section>

          {/* Work experience */}
          <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black text-[#ABF62D]">Work Experience</p>
                <p className="text-xs font-semibold text-white/50">Add multiple experiences.</p>
              </div>
              <button
                type="button"
                className="btn-ghost btn bg-white px-3 py-2"
                onClick={() => {
                  const newData = {
                    ...data,
                    workExperience: [
                      ...data.workExperience,
                      {
                        companyOrInternshipName: "",
                        yourRoleOrPosition: "",
                        startDate: "",
                        endDate: "",
                        bullet1: "",
                        bullet2: "",
                        bullet3: "",
                      },
                    ],
                  };
                  setData(newData);
                  onDataChange?.(newData);
                }}
              >
                + Add Experience
              </button>
            </div>

            <AnimatePresence initial={false}>
              {data.workExperience.map((w, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl bg-[#111111] p-4 ring-1 ring-white/10 md:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#ABF62D] text-lg font-bold text-black">
                        {idx + 1}
                      </div>
                      <p className="text-xs font-semibold text-white/50">Add what you did in 3 bullets.</p>
                    </div>
                    <button
                      type="button"
                      className="rounded-xl bg-[#ABF62D] px-3 py-2 text-sm font-bold text-black ring-1 ring-[#ABF62D]/60 hover:bg-[#9fdf2a]"
                      onClick={() => {
                        const newData = { ...data, workExperience: removeAt(data.workExperience, idx) };
                        setData(newData);
                        onDataChange?.(newData);
                      }}
                      disabled={!hasAtLeastOneWork || data.workExperience.length <= 1}
                      aria-disabled={data.workExperience.length <= 1}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="label">Company or Internship Name</label>
                      <SuggestInput
                        value={w.companyOrInternshipName}
                        onChange={(nextValue) => updateWork(idx, { companyOrInternshipName: nextValue })}
                        suggestions={companySuggestions}
                      />
                    </div>
                    <div>
                      <label className="label">Your Role/Position</label>
                      <SuggestInput
                        value={w.yourRoleOrPosition}
                        onChange={(nextValue) => updateWork(idx, { yourRoleOrPosition: nextValue })}
                        suggestions={roleSuggestions}
                      />
                    </div>

                    <div>
                      <label className="label">Start Date to End Date</label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          className="input"
                          type="month"
                          value={w.startDate}
                          onChange={(e) => updateWork(idx, { startDate: e.target.value })}
                        />
                        <input
                          className="input"
                          type="month"
                          value={w.endDate}
                          onChange={(e) => updateWork(idx, { endDate: e.target.value })}
                          placeholder="Present"
                        />
                      </div>
                      <p className="mt-2 text-[11px] font-semibold text-white/50">Leave end date empty for “Present”.</p>
                    </div>

                    <div className="md:col-span-1">
                      <div className="space-y-2">
                        <div className="rounded-2xl bg-[#111111] p-3 ring-1 ring-white/10">
                          <label className="label">Bullet 1</label>
                          <textarea
                            className="input min-h-[92px]"
                            value={w.bullet1}
                            onChange={(e) => updateWork(idx, { bullet1: e.target.value })}
                            placeholder="What did you do?"
                          />
                          <div className={`mt-2 text-xs font-semibold ${w.bullet1.length > 150 ? 'text-[#ff4444]' : 'text-white/40'}`}>
                            {w.bullet1.length} / 150 characters
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl bg-[#111111] p-3 ring-1 ring-white/10">
                      <label className="label">Bullet 2</label>
                      <textarea
                        className="input min-h-[92px]"
                        value={w.bullet2}
                        onChange={(e) => updateWork(idx, { bullet2: e.target.value })}
                        placeholder="Impact or responsibility"
                      />
                      <div className={`mt-2 text-xs font-semibold ${w.bullet2.length > 150 ? 'text-[#ff4444]' : 'text-white/40'}`}>
                        {w.bullet2.length} / 150 characters
                      </div>
                    </div>
                    <div className="rounded-2xl bg-[#111111] p-3 ring-1 ring-white/10 md:col-span-2">
                      <label className="label">Bullet 3</label>
                      <textarea
                        className="input min-h-[92px]"
                        value={w.bullet3}
                        onChange={(e) => updateWork(idx, { bullet3: e.target.value })}
                        placeholder="Result, metric, or project outcome"
                      />
                      <div className={`mt-2 text-xs font-semibold ${w.bullet3.length > 150 ? 'text-[#ff4444]' : 'text-white/40'}`}>
                        {w.bullet3.length} / 150 characters
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 h-px w-full bg-gradient-to-r from-saffron to-deepblue/20 opacity-60" />
                </motion.div>
              ))}
            </AnimatePresence>
          </section>

          {/* Certifications */}
          <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black text-[#ABF62D]">Certifications</p>
                <p className="text-xs font-semibold text-white/50">Add multiple certifications.</p>
              </div>
              <button
                type="button"
                className="btn-ghost btn bg-white px-3 py-2"
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    certifications: [
                      ...prev.certifications,
                      {
                        certificateName: "",
                        issuedBy: "",
                        year: "",
                      },
                    ],
                  }))
                }
              >
                + Add Certification
              </button>
            </div>

            <AnimatePresence initial={false}>
              {data.certifications.map((c, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl bg-[#111111] p-4 ring-1 ring-white/10 md:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#ABF62D] text-lg font-bold text-black">
                        {idx + 1}
                      </div>
                      <p className="text-xs font-semibold text-white/50">Keep it concise and current.</p>
                    </div>
                    <button
                      type="button"
                      className="rounded-xl bg-[#ABF62D] px-3 py-2 text-sm font-bold text-black ring-1 ring-[#ABF62D]/60 hover:bg-[#9fdf2a]"
                      onClick={() => {
                        const newData = { ...data, certifications: removeAt(data.certifications, idx) };
                        setData(newData);
                        onDataChange?.(newData);
                      }}
                      disabled={!hasAtLeastOneCert || data.certifications.length <= 1}
                      aria-disabled={data.certifications.length <= 1}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <label className="label">Certificate Name</label>
                      <SuggestInput
                        value={c.certificateName}
                        placeholder="e.g., AWS Cloud Practitioner"
                        suggestions={certificateSuggestions}
                        onChange={(value) => updateCertification(idx, { certificateName: value })}
                      />
                    </div>
                    <div>
                      <label className="label">Issued By</label>
                      <input
                        className="input"
                        value={c.issuedBy}
                        onChange={(e) => updateCertification(idx, { issuedBy: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="label">Year</label>
                      <input
                        className="input"
                        value={c.year}
                        onChange={(e) => updateCertification(idx, { year: e.target.value })}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </section>

          {/* Achievements */}
          <section className="space-y-3">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black text-[#ABF62D]">Achievements</p>
                <p className="text-xs font-semibold text-white/50">Awards, competitions, ranks, and more.</p>
              </div>
              <div className="h-px w-16 bg-gradient-to-r from-saffron to-deepblue/40 opacity-60" />
            </div>
            <label className="label">Any awards, competitions, ranks</label>
            <textarea
              className="input min-h-[130px]"
              value={data.achievements}
              onChange={(e) => {
                const newData = { ...data, achievements: e.target.value };
                setData(newData);
                onDataChange?.(newData);
              }}
              placeholder="e.g., Best Project Award (2024), Rank 1 in college contest, Scholarship..."
            />
            <div className={`mt-2 text-xs font-semibold ${data.achievements.length > 150 ? 'text-[#ff4444]' : 'text-white/40'}`}>
              {data.achievements.length} / 150 characters
            </div>
          </section>

          {/* Submit */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              className="btn-ghost btn bg-white"
              onClick={() => {
                const newData = initialData;
                setData(newData);
                onDataChange?.(newData);
              }}
            >
              Reset
            </button>
            <button type="submit" className="btn-primary btn text-base">
              Preview My Resume
            </button>
          </div>
        </form>
      </div>
    </div>

      {/* Crop Modal */}
      {showCropModal && selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Crop Your Photo</h3>
              <button
                onClick={() => setShowCropModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="relative">
              <Cropper
                image={selectedImage}
                aspect={1}
                cropShape="round"
                showGrid={true}
                minZoom={1}
                maxZoom={3}
                onComplete={handleCropComplete}
                className="max-h-[400px]"
              />
            </div>
            
            <div className="flex justify-between gap-4 mt-6">
              <button
                onClick={() => setShowCropModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const canvas = document.querySelector('canvas');
                  if (canvas) {
                    const croppedImage = canvas.toDataURL('image/jpeg', 0.8);
                    handleCropComplete(croppedImage);
                  }
                }}
                className="flex-1 px-4 py-2 bg-[#ABF62D] text-black font-medium rounded-lg hover:bg-[#9fdf2a]"
              >
                Use Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

