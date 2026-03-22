"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ResumeData, ResumeEducation, ResumeWorkExperience, ResumeCertification } from "@/lib/resumeTypes";
import { getEmptyResumeData } from "@/lib/resumeTypes";
import TagInput from "@/components/builder/TagInput";

type Props = {
  initialData: ResumeData;
  onDataChange?: (data: ResumeData) => void;
  onSubmit: (data: ResumeData) => void;
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
    "Leadership",
    "Team Work",
    "Problem Solving",
    "Time Management",
    "Critical Thinking",
    "Creativity",
    "Adaptability",
    "Project Management",
    "Public Speaking",
  ];

  const languageSuggestions = [
    "English",
    "Hindi",
    "Tamil",
    "Telugu",
    "Kannada",
    "Malayalam",
    "Bengali",
    "Gujarati",
    "Marathi",
    "Punjabi",
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (file) {
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
    updatePersonal({ profilePhoto: undefined });
  };

  return (
    <div className="container-x py-8 md:py-12">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white md:text-3xl">Build your resume in minutes</h1>
          <p className="text-sm font-semibold text-white/50">
            Fill this form and generate a clean, modern, white resume template.
          </p>
        </div>

        <div className="mt-6 rounded-[24px] border border-[#222222] bg-[#0f0f0f] p-4 shadow-soft md:p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(data);
            }}
            className="space-y-7"
          >
            {/* Personal Info */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-[#ABF62D]">Personal Info</p>
                  <p className="text-xs font-semibold text-[#888888]">Basic details recruiters look for.</p>
                </div>
                <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-[#ABF62D]/10 ring-1 ring-[#ABF62D]/30 md:flex">
                  <span className="text-lg font-black text-[#ABF62D]">PI</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Profile Photo */}
                <div className="md:col-span-2">
                  <label className="label text-[#cccccc]">Profile Photo (Optional)</label>
                  <div className="flex items-center gap-4">
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-[#888888] text-sm mb-2">Add Photo (Optional)</p>
                      {croppedImage && (
                        <div className="flex gap-2">
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
                  <label className="label text-[#cccccc]">Full Name <span className="text-red-500">*</span></label>
                  <input
                    className="input"
                    value={data.personal.fullName}
                    onChange={(e) => updatePersonal({ fullName: e.target.value })}
                    placeholder="e.g., Arjun Sharma"
                    required
                  />
                </div>
                
                {/* Phone Input */}
                <div>
                  <label className="label text-[#cccccc]">Phone Number <span className="text-red-500">*</span></label>
                  <input
                    className="input"
                    value={data.personal.phoneNumber}
                    onChange={(e) => updatePersonal({ phoneNumber: e.target.value })}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="label text-[#cccccc]">Email <span className="text-red-500">*</span></label>
                  <input
                    className="input"
                    type="email"
                    value={data.personal.emailAddress}
                    onChange={(e) => updatePersonal({ emailAddress: e.target.value })}
                    placeholder="arjun.sharma@email.com"
                    required
                  />
                </div>

                {/* City Input */}
                <div>
                  <label className="label text-[#cccccc]">City/State</label>
                  <input
                    className="input"
                    value={data.personal.cityState}
                    onChange={(e) => updatePersonal({ cityState: e.target.value })}
                    placeholder="Mumbai, Maharashtra"
                  />
                </div>

                {/* LinkedIn Input */}
                <div className="md:col-span-2">
                  <label className="label text-[#cccccc]">LinkedIn URL (optional)</label>
                  <input
                    className="input"
                    value={data.personal.linkedInUrl ?? ""}
                    onChange={(e) => updatePersonal({ linkedInUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                </div>
              </div>
            </motion.section>

            {/* Skills */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-[#ABF62D]">Skills</p>
                  <p className="text-xs font-semibold text-[#888888]">Showcase your technical and soft skills.</p>
                </div>
                <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-[#ABF62D]/10 ring-1 ring-[#ABF62D]/30 md:flex">
                  <span className="text-lg font-black text-[#ABF62D]">SK</span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Technical Skills */}
                <div>
                  <label className="label text-[#cccccc]">Technical Skills</label>
                  <TagInput
                    label="Technical Skills"
                    value={data.skills.technicalSkills}
                    onChange={(technical) => setData((prev) => ({ ...prev, skills: { ...prev.skills, technicalSkills: technical } }))}
                    suggestions={technicalSkillSuggestions}
                    placeholder="Add technical skills..."
                  />
                </div>

                {/* Soft Skills */}
                <div>
                  <label className="label text-[#cccccc]">Soft Skills</label>
                  <TagInput
                    label="Soft Skills"
                    value={data.skills.softSkills}
                    onChange={(soft) => setData((prev) => ({ ...prev, skills: { ...prev.skills, softSkills: soft } }))}
                    suggestions={softSkillSuggestions}
                    placeholder="Add soft skills..."
                  />
                </div>

                {/* Languages */}
                <div>
                  <label className="label text-[#cccccc]">Languages Known</label>
                  <TagInput
                    label="Languages Known"
                    value={data.skills.languagesKnown}
                    onChange={(languages) => setData((prev) => ({ ...prev, skills: { ...prev.skills, languagesKnown: languages } }))}
                    suggestions={languageSuggestions}
                    placeholder="Add languages..."
                  />
                </div>
              </div>
            </motion.section>

            {/* Education */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-[#ABF62D]">Education</p>
                  <p className="text-xs font-semibold text-[#888888]">Your academic background.</p>
                </div>
                <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-[#ABF62D]/10 ring-1 ring-[#ABF62D]/30 md:flex">
                  <span className="text-lg font-black text-[#ABF62D]">ED</span>
                </div>
              </div>

              <AnimatePresence>
                {data.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="rounded-2xl border border-[#222222] bg-[#1a1a1a] p-4"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="label text-[#cccccc]">School/College Name</label>
                        <input
                          className="input"
                          value={edu.schoolCollegeName}
                          onChange={(e) => updateEducation(index, { schoolCollegeName: e.target.value })}
                          placeholder="IIT Bombay"
                        />
                      </div>
                      <div>
                        <label className="label text-[#cccccc]">Degree</label>
                        <input
                          className="input"
                          value={edu.degreeOrClass}
                          onChange={(e) => updateEducation(index, { degreeOrClass: e.target.value })}
                          placeholder="B.Tech Computer Science"
                        />
                      </div>
                      <div>
                        <label className="label text-[#cccccc]">Board/University</label>
                        <input
                          className="input"
                          value={edu.boardOrUniversity}
                          onChange={(e) => updateEducation(index, { boardOrUniversity: e.target.value })}
                          placeholder="Mumbai University"
                        />
                      </div>
                      <div>
                        <label className="label text-[#cccccc]">Year</label>
                        <input
                          className="input"
                          value={edu.yearOfPassing}
                          onChange={(e) => updateEducation(index, { yearOfPassing: e.target.value })}
                          placeholder="2023"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="label text-[#cccccc]">Percentage/CGPA</label>
                        <input
                          className="input"
                          value={edu.percentageOrCgpa}
                          onChange={(e) => updateEducation(index, { percentageOrCgpa: e.target.value })}
                          placeholder="8.5 CGPA"
                        />
                      </div>
                    </div>
                    {data.education.length > 1 && (
                      <button
                        type="button"
                        className="mt-4 px-3 py-2 text-sm font-medium rounded-lg bg-[#ff4444] text-white hover:opacity-90"
                        onClick={() => {
                          const newData = {
                            ...data,
                            education: removeAt(data.education, index),
                          };
                          setData(newData);
                          onDataChange?.(newData);
                        }}
                      >
                        Remove Education
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                type="button"
                className="px-4 py-2 text-sm font-bold rounded-lg bg-[#ABF62D] text-black hover:opacity-90"
                onClick={() => {
                  const newData = {
                    ...data,
                    education: [...data.education, getEmptyResumeData().education[0]],
                  };
                  setData(newData);
                  onDataChange?.(newData);
                }}
              >
                Add Education
              </button>
            </motion.section>

            {/* Work Experience */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-[#ABF62D]">Work Experience</p>
                  <p className="text-xs font-semibold text-[#888888]">Your professional journey.</p>
                </div>
                <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-[#ABF62D]/10 ring-1 ring-[#ABF62D]/30 md:flex">
                  <span className="text-lg font-black text-[#ABF62D]">WE</span>
                </div>
              </div>

              <AnimatePresence>
                {data.workExperience.map((work, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="rounded-2xl border border-[#222222] bg-[#1a1a1a] p-4"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="label text-[#cccccc]">Company Name</label>
                        <input
                          className="input"
                          value={work.companyOrInternshipName}
                          onChange={(e) => updateWork(index, { companyOrInternshipName: e.target.value })}
                          placeholder="Google"
                        />
                      </div>
                      <div>
                        <label className="label text-[#cccccc]">Role</label>
                        <input
                          className="input"
                          value={work.yourRoleOrPosition}
                          onChange={(e) => updateWork(index, { yourRoleOrPosition: e.target.value })}
                          placeholder="Software Engineer"
                        />
                      </div>
                      <div>
                        <label className="label text-[#cccccc]">Start Date</label>
                        <input
                          className="input"
                          value={work.startDate}
                          onChange={(e) => updateWork(index, { startDate: e.target.value })}
                          placeholder="Jan 2022"
                        />
                      </div>
                      <div>
                        <label className="label text-[#cccccc]">End Date</label>
                        <input
                          className="input"
                          value={work.endDate}
                          onChange={(e) => updateWork(index, { endDate: e.target.value })}
                          placeholder="Present"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="label text-[#cccccc]">What you did (3 bullet points)</label>
                        <textarea
                          className="input min-h-[100px]"
                          value={work.bullet1}
                          onChange={(e) => updateWork(index, { bullet1: e.target.value })}
                          placeholder="• Developed and maintained web applications using React and Node.js"
                        />
                      </div>
                    </div>
                    {data.workExperience.length > 1 && (
                      <button
                        type="button"
                        className="mt-4 px-3 py-2 text-sm font-medium rounded-lg bg-[#ff4444] text-white hover:opacity-90"
                        onClick={() => {
                          const newData = {
                            ...data,
                            workExperience: removeAt(data.workExperience, index),
                          };
                          setData(newData);
                          onDataChange?.(newData);
                        }}
                      >
                        Remove Experience
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                type="button"
                className="px-4 py-2 text-sm font-bold rounded-lg bg-[#ABF62D] text-black hover:opacity-90"
                onClick={() => {
                  const newData = {
                    ...data,
                    workExperience: [...data.workExperience, getEmptyResumeData().workExperience[0]],
                  };
                  setData(newData);
                  onDataChange?.(newData);
                }}
              >
                Add Work Experience
              </button>
            </motion.section>

            {/* Certifications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-[#ABF62D]">Certifications</p>
                  <p className="text-xs font-semibold text-[#888888]">Your professional certifications.</p>
                </div>
                <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-[#ABF62D]/10 ring-1 ring-[#ABF62D]/30 md:flex">
                  <span className="text-lg font-black text-[#ABF62D]">CE</span>
                </div>
              </div>

              {/* Suggestion Pills */}
              <div className="flex flex-wrap gap-2">
                {certificateSuggestions.map((cert) => (
                  <button
                    key={cert}
                    type="button"
                    className="chip"
                    onClick={() => {
                      const newData = {
                        ...data,
                        certifications: [
                          ...data.certifications,
                          getEmptyResumeData().certifications[0],
                        ],
                      };
                      newData.certifications[newData.certifications.length - 1].certificateName = cert;
                      setData(newData);
                      onDataChange?.(newData);
                    }}
                  >
                    {cert}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {data.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="rounded-2xl border border-[#222222] bg-[#1a1a1a] p-4"
                  >
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <label className="label text-[#cccccc]">Certificate Name</label>
                        <SuggestInput
                          value={cert.certificateName}
                          onChange={(name) => updateCertification(index, { certificateName: name })}
                          suggestions={certificateSuggestions}
                          placeholder="e.g., AWS Cloud Practitioner"
                        />
                      </div>
                      <div>
                        <label className="label text-[#cccccc]">Issued By</label>
                        <input
                          className="input"
                          value={cert.issuedBy}
                          onChange={(e) => updateCertification(index, { issuedBy: e.target.value })}
                          placeholder="Amazon Web Services"
                        />
                      </div>
                      <div>
                        <label className="label text-[#cccccc]">Year</label>
                        <input
                          className="input"
                          value={cert.year}
                          onChange={(e) => updateCertification(index, { year: e.target.value })}
                          placeholder="2023"
                        />
                      </div>
                    </div>
                    {data.certifications.length > 1 && (
                      <button
                        type="button"
                        className="mt-4 px-3 py-2 text-sm font-medium rounded-lg bg-[#ff4444] text-white hover:opacity-90"
                        onClick={() => {
                          const newData = {
                            ...data,
                            certifications: removeAt(data.certifications, index),
                          };
                          setData(newData);
                          onDataChange?.(newData);
                        }}
                      >
                        Remove Certification
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                type="button"
                className="px-4 py-2 text-sm font-bold rounded-lg bg-[#ABF62D] text-black hover:opacity-90"
                onClick={() => {
                  const newData = {
                    ...data,
                    certifications: [...data.certifications, getEmptyResumeData().certifications[0]],
                  };
                  setData(newData);
                  onDataChange?.(newData);
                }}
              >
                Add Certification
              </button>
            </motion.section>

            {/* Achievements */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-[#ABF62D]">Achievements</p>
                  <p className="text-xs font-semibold text-[#888888]">Your accomplishments and awards.</p>
                </div>
                <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-[#ABF62D]/10 ring-1 ring-[#ABF62D]/30 md:flex">
                  <span className="text-lg font-black text-[#ABF62D]">AC</span>
                </div>
              </div>

              <div>
                <label className="label text-[#cccccc]">Achievements</label>
                <textarea
                  className="input min-h-[120px]"
                  value={data.achievements}
                  onChange={(e) => setData((prev) => ({ ...prev, achievements: e.target.value }))}
                  placeholder="• Won 1st prize in college hackathon&#10;• Published research paper on machine learning&#10;• Led team of 5 developers for final year project"
                />
              </div>
            </motion.section>

            {/* Submit Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-between gap-4"
            >
              <button
                type="button"
                className="btn-ghost btn bg-white px-3 py-2"
                onClick={() => {
                  setData(getEmptyResumeData());
                  onDataChange?.(getEmptyResumeData());
                }}
              >
                Reset
              </button>
              <button type="submit" className="btn-primary btn text-base">
                Preview My Resume
              </button>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
}
