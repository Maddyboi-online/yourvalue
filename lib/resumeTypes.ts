export type ResumePersonalInfo = {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  cityState: string;
  linkedInUrl?: string;
};

export type ResumeEducation = {
  schoolCollegeName: string;
  degreeOrClass: string;
  boardOrUniversity: string;
  yearOfPassing: string;
  percentageOrCgpa: string;
};

export type ResumeSkills = {
  technicalSkills: string[];
  softSkills: string[];
  languagesKnown: string[];
};

export type ResumeWorkExperience = {
  companyOrInternshipName: string;
  yourRoleOrPosition: string;
  startDate: string; // YYYY-MM
  endDate: string; // YYYY-MM or empty
  bullet1: string;
  bullet2: string;
  bullet3: string;
};

export type ResumeCertification = {
  certificateName: string;
  issuedBy: string;
  year: string;
};

export type ResumeData = {
  personal: ResumePersonalInfo;
  education: ResumeEducation[];
  skills: ResumeSkills;
  workExperience: ResumeWorkExperience[];
  certifications: ResumeCertification[];
  achievements: string;
};

export const RESUME_STORAGE_KEY = "yourvalue:resumeData:v1";

export function getEmptyResumeData(): ResumeData {
  return {
    personal: {
      fullName: "",
      phoneNumber: "",
      emailAddress: "",
      cityState: "",
      linkedInUrl: "",
    },
    education: [
      {
        schoolCollegeName: "",
        degreeOrClass: "",
        boardOrUniversity: "",
        yearOfPassing: "",
        percentageOrCgpa: "",
      },
    ],
    skills: {
      technicalSkills: [],
      softSkills: [],
      languagesKnown: [],
    },
    workExperience: [
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
    certifications: [
      {
        certificateName: "",
        issuedBy: "",
        year: "",
      },
    ],
    achievements: "",
  };
}

