"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeData, getEmptyResumeData } from "@/lib/resumeTypes";
import TagInput from "./TagInput";

interface ResumeFormProps {
  initialData?: ResumeData;
  onDataChange?: (data: ResumeData) => void;
  onSubmit?: (data: ResumeData) => void;
}

const techSkillSuggestions = [
  "HTML/CSS", "JavaScript", "Python", "React",
  "Node.js", "SQL", "TypeScript", "Git", "AWS", "Figma"
];

const softSkillSuggestions = [
  "Communication", "Leadership", "Team Work",
  "Problem Solving", "Time Management", "Creativity"
];

const languageSuggestions = [
  "English", "Hindi", "Tamil", "Telugu", 
  "Kannada", "Malayalam", "Bengali"
];

const certSuggestions = [
  "Google Digital Marketing",
  "AWS Cloud Practitioner",
  "Meta Frontend Developer",
  "Google Data Analytics",
  "IBM Data Science",
  "Microsoft Azure Fundamentals",
  "Coursera Python",
  "HackerRank JavaScript",
  "Udemy React Complete Guide",
  "NPTEL Programming"
];

const roleSuggestions = [
  "Software Engineer", "Frontend Developer",
  "Backend Developer", "Full Stack Developer",
  "UI/UX Designer", "Data Analyst",
  "Product Manager", "Marketing Intern"
];

const companySuggestions = [
  "TCS", "Infosys", "Wipro", "HCL",
  "Google", "Microsoft", "Amazon",
  "Flipkart", "Zomato", "Freshworks"
];

export default function ResumeForm({ 
  initialData, 
  onDataChange, 
  onSubmit 
}: ResumeFormProps) {
  const [data, setData] = useState<ResumeData>(
    initialData || getEmptyResumeData()
  );
  const [photo, setPhoto] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  const update = (newData: ResumeData) => {
    setData(newData);
    onDataChange?.(newData);
  };

  const updatePersonal = (field: string, value: string) => {
    update({
      ...data,
      personal: { ...data.personal, [field]: value }
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setPhoto(result);
      updatePersonal("profilePhoto", result);
    };
    reader.readAsDataURL(file);
  };

  const addEducation = () => {
    update({
      ...data,
      education: [...data.education, {
        schoolCollegeName: "", degreeOrClass: "", boardOrUniversity: "",
        yearOfPassing: "", percentageOrCgpa: ""
      }]
    });
  };

  const removeEducation = (idx: number) => {
    update({
      ...data,
      education: data.education.filter((_, i) => i !== idx)
    });
  };

  const updateEducation = (idx: number, field: string, value: string) => {
    const edu = [...data.education];
    edu[idx] = { ...edu[idx], [field]: value };
    update({ ...data, education: edu });
  };

  const addExperience = () => {
    update({
      ...data,
      workExperience: [...data.workExperience, {
        companyOrInternshipName: "", yourRoleOrPosition: "", startDate: "",
        endDate: "", bullet1: "", bullet2: "", bullet3: ""
      }]
    });
  };

  const removeExperience = (idx: number) => {
    update({
      ...data,
      workExperience: data.workExperience.filter((_, i) => i !== idx)
    });
  };

  const updateExperience = (idx: number, field: string, value: string) => {
    const exp = [...data.workExperience];
    exp[idx] = { ...exp[idx], [field]: value };
    update({ ...data, workExperience: exp });
  };

  const updateBullet = (expIdx: number, bulletIdx: number, value: string) => {
    const exp = [...data.workExperience];
    const bulletField = `bullet${bulletIdx + 1}` as keyof typeof exp[0];
    exp[expIdx] = { ...exp[expIdx], [bulletField]: value };
    update({ ...data, workExperience: exp });
  };

  const addCert = () => {
    update({
      ...data,
      certifications: [...data.certifications, {
        certificateName: "", issuedBy: "", year: ""
      }]
    });
  };

  const removeCert = (idx: number) => {
    update({
      ...data,
      certifications: data.certifications.filter((_, i) => i !== idx)
    });
  };

  const updateCert = (idx: number, field: string, value: string) => {
    const certs = [...data.certifications];
    certs[idx] = { ...certs[idx], [field]: value };
    update({ ...data, certifications: certs });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(data);
  };

  const inputClass = "w-full rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-2.5 text-sm text-[#F5F5F5] placeholder-[#666] focus:border-[#ABF62D] focus:outline-none transition-colors";
  const labelClass = "block text-xs font-semibold text-[#cccccc] mb-1.5";
  const sectionClass = "bg-[#0f0f0f] border border-[#222] rounded-2xl p-6 space-y-5";
  const sectionTitleClass = "text-[#ABF62D] font-bold text-base flex items-center gap-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Personal Info */}
      <div className={sectionClass}>
        <h3 className={sectionTitleClass}>
          <span className="w-1 h-5 bg-[#ABF62D] rounded-full" />
          Personal Info
        </h3>
        
        {/* Photo Upload */}
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-24 h-24 rounded-full border-2 border-dashed border-[#ABF62D] bg-[#1a1a1a] flex items-center justify-center overflow-hidden hover:border-[#9fdf2a] transition-colors"
          >
            {photo ? (
              <img src={photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-8 h-8 text-[#ABF62D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
          <p className="text-xs text-[#888]">Add Photo (Optional)</p>
          {photo && (
            <button
              type="button"
              onClick={() => { setPhoto(""); updatePersonal("profilePhoto", ""); }}
              className="text-xs text-[#ff4444] hover:text-red-300"
            >
              Remove
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Full Name <span className="text-[#ff4444]">*</span></label>
            <input className={inputClass} placeholder="e.g., Arjun Sharma" value={data.personal.fullName} onChange={e => updatePersonal("fullName", e.target.value)} required />
          </div>
          <div>
            <label className={labelClass}>Phone <span className="text-[#ff4444]">*</span></label>
            <input className={inputClass} placeholder="e.g., +91 98765 43210" value={data.personal.phoneNumber} onChange={e => updatePersonal("phoneNumber", e.target.value)} required />
          </div>
          <div>
            <label className={labelClass}>Email <span className="text-[#ff4444]">*</span></label>
            <input className={inputClass} type="email" placeholder="e.g., arjun@email.com" value={data.personal.emailAddress} onChange={e => updatePersonal("emailAddress", e.target.value)} required />
          </div>
          <div>
            <label className={labelClass}>City and State</label>
            <input className={inputClass} placeholder="e.g., Mumbai, Maharashtra" value={data.personal.cityState} onChange={e => updatePersonal("cityState", e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>LinkedIn URL (optional)</label>
            <input className={inputClass} placeholder="https://linkedin.com/in/your-profile" value={data.personal.linkedInUrl} onChange={e => updatePersonal("linkedInUrl", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Education */}
      <div className={sectionClass}>
        <div className="flex items-center justify-between">
          <h3 className={sectionTitleClass}>
            <span className="w-1 h-5 bg-[#ABF62D] rounded-full" />
            Education
          </h3>
          <button type="button" onClick={addEducation} className="text-xs font-bold px-4 py-2 bg-[#ABF62D] text-black rounded-full hover:bg-[#9fdf2a] transition-all">
            + Add Education
          </button>
        </div>
        <AnimatePresence>
          {data.education.map((edu, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-[#111] border border-[#2a2a2a] rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#ABF62D]">Education #{idx + 1}</span>
                {idx > 0 && (
                  <button type="button" onClick={() => removeEducation(idx)} className="text-xs px-3 py-1 bg-[#ff4444] text-white rounded-full">Remove</button>
                )}
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className={labelClass}>School/College Name</label>
                  <input className={inputClass} placeholder="e.g., IIT Madras" value={edu.schoolCollegeName} onChange={e => updateEducation(idx, "schoolCollegeName", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Degree or Class</label>
                  <input className={inputClass} placeholder="e.g., B.Tech, 12th" value={edu.degreeOrClass} onChange={e => updateEducation(idx, "degreeOrClass", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Board/University</label>
                  <input className={inputClass} placeholder="e.g., Anna University" value={edu.boardOrUniversity} onChange={e => updateEducation(idx, "boardOrUniversity", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Year of Passing</label>
                  <input className={inputClass} placeholder="e.g., 2024" value={edu.yearOfPassing} onChange={e => updateEducation(idx, "yearOfPassing", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Percentage / CGPA</label>
                  <input className={inputClass} placeholder="e.g., 8.5 CGPA" value={edu.percentageOrCgpa} onChange={e => updateEducation(idx, "percentageOrCgpa", e.target.value)} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Skills */}
      <div className={sectionClass}>
        <h3 className={sectionTitleClass}>
          <span className="w-1 h-5 bg-[#ABF62D] rounded-full" />
          Skills
        </h3>
        
        <div>
          <label className={labelClass}>Technical Skills</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {techSkillSuggestions.map(s => (
              <button key={s} type="button"
                onClick={() => {
                  if (!data.skills.technicalSkills.includes(s)) {
                    update({ ...data, skills: { ...data.skills, technicalSkills: [...data.skills.technicalSkills, s] } });
                  }
                }}
                className="text-xs px-3 py-1 rounded-full border border-[#ABF62D] bg-[#1a1a1a] text-white hover:bg-[#ABF62D] hover:text-black transition-all"
              >{s}</button>
            ))}
          </div>
          <TagInput
            label="Technical Skills"
            value={data.skills.technicalSkills}
            onChange={(technical) => update({ ...data, skills: { ...data.skills, technicalSkills: technical } })}
            suggestions={techSkillSuggestions}
            placeholder="Type skill and press Enter"
          />
        </div>

        <div>
          <label className={labelClass}>Soft Skills</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {softSkillSuggestions.map(s => (
              <button key={s} type="button"
                onClick={() => {
                  if (!data.skills.softSkills.includes(s)) {
                    update({ ...data, skills: { ...data.skills, softSkills: [...data.skills.softSkills, s] } });
                  }
                }}
                className="text-xs px-3 py-1 rounded-full border border-[#ABF62D] bg-[#1a1a1a] text-white hover:bg-[#ABF62D] hover:text-black transition-all"
              >{s}</button>
            ))}
          </div>
          <TagInput
            label="Soft Skills"
            value={data.skills.softSkills}
            onChange={(soft) => update({ ...data, skills: { ...data.skills, softSkills: soft } })}
            suggestions={softSkillSuggestions}
            placeholder="Type skill and press Enter"
          />
        </div>

        <div>
          <label className={labelClass}>Languages Known</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {languageSuggestions.map(s => (
              <button key={s} type="button"
                onClick={() => {
                  if (!data.skills.languagesKnown.includes(s)) {
                    update({ ...data, skills: { ...data.skills, languagesKnown: [...data.skills.languagesKnown, s] } });
                  }
                }}
                className="text-xs px-3 py-1 rounded-full border border-[#ABF62D] bg-[#1a1a1a] text-white hover:bg-[#ABF62D] hover:text-black transition-all"
              >{s}</button>
            ))}
          </div>
          <TagInput
            label="Languages Known"
            value={data.skills.languagesKnown}
            onChange={(languages) => update({ ...data, skills: { ...data.skills, languagesKnown: languages } })}
            suggestions={languageSuggestions}
            placeholder="Type language and press Enter"
          />
        </div>
      </div>

      {/* Work Experience */}
      <div className={sectionClass}>
        <div className="flex items-center justify-between">
          <h3 className={sectionTitleClass}>
            <span className="w-1 h-5 bg-[#ABF62D] rounded-full" />
            Work Experience
          </h3>
          <button type="button" onClick={addExperience} className="text-xs font-bold px-4 py-2 bg-[#ABF62D] text-black rounded-full hover:bg-[#9fdf2a] transition-all">
            + Add Experience
          </button>
        </div>
        <AnimatePresence>
          {data.workExperience.map((exp, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-[#111] border border-[#2a2a2a] rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#ABF62D]">Experience #{idx + 1}</span>
                <button type="button" onClick={() => removeExperience(idx)} className="text-xs px-3 py-1 bg-[#ff4444] text-white rounded-full">Remove</button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Company/Internship Name</label>
                  <input className={inputClass} list={`company-${idx}`} placeholder="e.g., Google India" value={exp.companyOrInternshipName} onChange={e => updateExperience(idx, "companyOrInternshipName", e.target.value)} />
                  <datalist id={`company-${idx}`}>
                    {companySuggestions.map(c => <option key={c} value={c} />)}
                  </datalist>
                </div>
                <div>
                  <label className={labelClass}>Your Role/Position</label>
                  <input className={inputClass} list={`role-${idx}`} placeholder="e.g., Software Engineer" value={exp.yourRoleOrPosition} onChange={e => updateExperience(idx, "yourRoleOrPosition", e.target.value)} />
                  <datalist id={`role-${idx}`}>
                    {roleSuggestions.map(r => <option key={r} value={r} />)}
                  </datalist>
                </div>
                <div>
                  <label className={labelClass}>Start Date</label>
                  <input className={inputClass} placeholder="e.g., Jan 2023" value={exp.startDate} onChange={e => updateExperience(idx, "startDate", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>End Date</label>
                  <input className={inputClass} placeholder="e.g., Dec 2023 or Present" value={exp.endDate} onChange={e => updateExperience(idx, "endDate", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                {exp.bullet1 && exp.bullet2 && exp.bullet3 ? (
                  <>
                    <div>
                      <label className={labelClass}>Bullet 1</label>
                      <textarea className={`${inputClass} resize-none`} rows={2} placeholder="What did you do? Use numbers if possible" value={exp.bullet1} onChange={e => updateBullet(idx, 0, e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Bullet 2</label>
                      <textarea className={`${inputClass} resize-none`} rows={2} placeholder="What did you do? Use numbers if possible" value={exp.bullet2} onChange={e => updateBullet(idx, 1, e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Bullet 3</label>
                      <textarea className={`${inputClass} resize-none`} rows={2} placeholder="What did you do? Use numbers if possible" value={exp.bullet3} onChange={e => updateBullet(idx, 2, e.target.value)} />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className={labelClass}>Bullet 1</label>
                      <textarea className={`${inputClass} resize-none`} rows={2} placeholder="What did you do? Use numbers if possible" value={exp.bullet1 || ""} onChange={e => updateBullet(idx, 0, e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Bullet 2</label>
                      <textarea className={`${inputClass} resize-none`} rows={2} placeholder="What did you do? Use numbers if possible" value={exp.bullet2 || ""} onChange={e => updateBullet(idx, 1, e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Bullet 3</label>
                      <textarea className={`${inputClass} resize-none`} rows={2} placeholder="What did you do? Use numbers if possible" value={exp.bullet3 || ""} onChange={e => updateBullet(idx, 2, e.target.value)} />
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Certifications */}
      <div className={sectionClass}>
        <div className="flex items-center justify-between">
          <h3 className={sectionTitleClass}>
            <span className="w-1 h-5 bg-[#ABF62D] rounded-full" />
            Certifications
          </h3>
          <button type="button" onClick={addCert} className="text-xs font-bold px-4 py-2 bg-[#ABF62D] text-black rounded-full hover:bg-[#9fdf2a] transition-all">
            + Add Certificate
          </button>
        </div>
        
        <div>
          <p className="text-xs text-[#888] mb-2">Quick add — click to fill:</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {certSuggestions.map(s => (
              <button key={s} type="button"
                onClick={() => {
                  const certs = [...data.certifications];
                  if (certs.length === 0) {
                    certs.push({ certificateName: s, issuedBy: "", year: "" });
                  } else {
                    certs[certs.length - 1] = { ...certs[certs.length - 1], certificateName: s };
                  }
                  update({ ...data, certifications: certs });
                }}
                className="text-xs px-3 py-1 rounded-full border border-[#ABF62D] bg-[#1a1a1a] text-white hover:bg-[#ABF62D] hover:text-black transition-all"
              >{s}</button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {data.certifications.map((cert, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-[#111] border border-[#2a2a2a] rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#ABF62D]">Certificate #{idx + 1}</span>
                <button type="button" onClick={() => removeCert(idx)} className="text-xs px-3 py-1 bg-[#ff4444] text-white rounded-full">Remove</button>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="md:col-span-1">
                  <label className={labelClass}>Certificate Name</label>
                  <input className={inputClass} placeholder="e.g., AWS Cloud Practitioner" value={cert.certificateName} onChange={e => updateCert(idx, "certificateName", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Issued By</label>
                  <input className={inputClass} placeholder="e.g., Amazon" value={cert.issuedBy} onChange={e => updateCert(idx, "issuedBy", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Year</label>
                  <input className={inputClass} placeholder="e.g., 2024" value={cert.year} onChange={e => updateCert(idx, "year", e.target.value)} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Achievements */}
      <div className={sectionClass}>
        <h3 className={sectionTitleClass}>
          <span className="w-1 h-5 bg-[#ABF62D] rounded-full" />
          Achievements
        </h3>
        <div>
          <label className={labelClass}>Awards, Rankings, Competitions</label>
          <textarea
            className={`${inputClass} resize-none`}
            rows={4}
            placeholder="e.g., Won Smart India Hackathon 2023, Top 1% on LeetCode..."
            value={data.achievements}
            onChange={e => update({ ...data, achievements: e.target.value })}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-4 bg-[#ABF62D] text-black font-black text-base rounded-full hover:bg-[#9fdf2a] hover:scale-105 transition-all duration-300"
      >
        Preview My Resume →
      </button>

    </form>
  );
}
