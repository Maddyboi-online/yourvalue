"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ResumeData, ResumeEducation, ResumeWorkExperience, ResumeCertification } from "@/lib/resumeTypes";
import TagInput from "@/components/builder/TagInput";

type Props = {
  initialData: ResumeData;
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

export default function ResumeForm({ initialData, onSubmit }: Props) {
  const technicalSkillSuggestions = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "SQL",
    "TypeScript",
    "HTML/CSS",
    "Git",
    "AWS",
    "MongoDB",
    "Next.js",
    "Flutter",
    "Java",
    "C++",
    "Figma",
  ];
  const softSkillSuggestions = [
    "Leadership",
    "Communication",
    "Problem Solving",
    "Team Management",
    "Critical Thinking",
    "Time Management",
    "Creativity",
    "Adaptability",
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

  const [data, setData] = useState<ResumeData>(initialData);

  const hasAtLeastOneEducation = useMemo(() => data.education.length > 0, [data.education.length]);
  const hasAtLeastOneWork = useMemo(() => data.workExperience.length > 0, [data.workExperience.length]);
  const hasAtLeastOneCert = useMemo(() => data.certifications.length > 0, [data.certifications.length]);

  const updatePersonal = (patch: Partial<ResumeData["personal"]>) => {
    setData((prev) => ({ ...prev, personal: { ...prev.personal, ...patch } }));
  };

  const updateEducation = (index: number, patch: Partial<ResumeEducation>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e, i) => (i === index ? { ...e, ...patch } : e)),
    }));
  };

  const updateWork = (index: number, patch: Partial<ResumeWorkExperience>) => {
    setData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((w, i) => (i === index ? { ...w, ...patch } : w)),
    }));
  };

  const updateCertification = (index: number, patch: Partial<ResumeCertification>) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c, i) => (i === index ? { ...c, ...patch } : c)),
    }));
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

      <div className="mt-6 rounded-[24px] border border-[rgba(171,246,45,0.2)] bg-[#111111] p-4 shadow-soft md:p-6">
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
                <p className="text-sm font-black text-[#ABF62D]">Personal Info</p>
                <p className="text-xs font-semibold text-white/50">Basic details recruiters look for.</p>
              </div>
              <div className="h-px w-16 bg-gradient-to-r from-saffron to-deepblue/40 opacity-60" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="label">Full Name</label>
                <input
                  className="input"
                  value={data.personal.fullName}
                  onChange={(e) => updatePersonal({ fullName: e.target.value })}
                  placeholder="e.g., Arjun Sharma"
                  required
                />
              </div>
              <div>
                <label className="label">Phone Number</label>
                <input
                  className="input"
                  value={data.personal.phoneNumber}
                  onChange={(e) => updatePersonal({ phoneNumber: e.target.value })}
                  placeholder="e.g., +91 98765 43210"
                />
              </div>
              <div>
                <label className="label">Email Address</label>
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
                <label className="label">City and State</label>
                <input
                  className="input"
                  value={data.personal.cityState}
                  onChange={(e) => updatePersonal({ cityState: e.target.value })}
                  placeholder="e.g., Mumbai, Maharashtra"
                />
              </div>
              <div className="md:col-span-2">
                <label className="label">LinkedIn URL (optional)</label>
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
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    education: [
                      ...prev.education,
                      {
                        schoolCollegeName: "",
                        degreeOrClass: "",
                        boardOrUniversity: "",
                        yearOfPassing: "",
                        percentageOrCgpa: "",
                      },
                    ],
                  }))
                }
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
                      onClick={() => setData((prev) => ({ ...prev, education: removeAt(prev.education, idx) }))}
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
                onChange={(next) => setData((prev) => ({ ...prev, skills: { ...prev.skills, technicalSkills: next } }))}
                placeholder="e.g., React, TypeScript, SQL"
                suggestions={technicalSkillSuggestions}
              />
              <TagInput
                label="Soft Skills (add as tags)"
                value={data.skills.softSkills}
                onChange={(next) => setData((prev) => ({ ...prev, skills: { ...prev.skills, softSkills: next } }))}
                placeholder="e.g., Communication, Leadership"
                suggestions={softSkillSuggestions}
              />
            </div>

            <TagInput
              label="Languages Known"
              value={data.skills.languagesKnown}
              onChange={(next) => setData((prev) => ({ ...prev, skills: { ...prev.skills, languagesKnown: next } }))}
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
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    workExperience: [
                      ...prev.workExperience,
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
                  }))
                }
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
                      onClick={() =>
                        setData((prev) => ({ ...prev, workExperience: removeAt(prev.workExperience, idx) }))
                      }
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
                      onClick={() =>
                        setData((prev) => ({ ...prev, certifications: removeAt(prev.certifications, idx) }))
                      }
                      disabled={!hasAtLeastOneCert || data.certifications.length <= 1}
                      aria-disabled={data.certifications.length <= 1}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <label className="label">Certificate Name</label>
                      <input
                        className="input"
                        value={c.certificateName}
                        onChange={(e) => updateCertification(idx, { certificateName: e.target.value })}
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
              onChange={(e) => setData((prev) => ({ ...prev, achievements: e.target.value }))}
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
              onClick={() => setData(initialData)}
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
  );
}

