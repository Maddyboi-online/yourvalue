import type { ResumeData } from "@/lib/resumeTypes";
import { formatRange, uniqNonEmpty } from "@/lib/formatters";

type Props = {
  data: ResumeData;
  template?: React.ComponentType<{ data: ResumeData }>;
};

function ContactLine({ label, value }: { label: string; value: string }) {
  if (!value.trim()) return null;
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-deepblue/70">
      <span className="text-[11px] font-extrabold text-deepblue/50">{label}:</span>
      <span>{value}</span>
    </span>
  );
}

function BulletList({ bullets }: { bullets: string[] }) {
  const items = bullets.map((b) => b.trim()).filter(Boolean);
  if (items.length === 0) return null;
  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((b) => (
        <li key={b} className="text-[10.5px] leading-relaxed text-deepblue/80">
          <span className="mr-2 text-saffron font-black">•</span>
          {b}
        </li>
      ))}
    </ul>
  );
}

export default function ResumePreview({ data, template }: Props) {
  const personal = data.personal;
  const technical = uniqNonEmpty(data.skills.technicalSkills);
  const soft = uniqNonEmpty(data.skills.softSkills);
  const languages = uniqNonEmpty(data.skills.languagesKnown);

  if (template) {
    const TemplateComponent = template;
    return <TemplateComponent data={data} />;
  }

  return (
    <div className="w-full overflow-x-auto pb-6">
      <div className="mx-auto w-[210mm] min-h-[297mm] bg-white px-5 py-6 shadow-soft ring-1 ring-deepblue/10 md:px-7 md:py-8">
        <div className="relative">
          <div className="absolute left-0 top-0 h-3 w-full bg-gradient-to-r from-saffron to-deepblue/80" />
          <div className="pt-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-[20px] font-black leading-tight text-deepblue md:text-[24px]">
                  {personal.fullName || "Your Name"}
                </h1>
              </div>
              
              {/* Profile Photo */}
              {personal.profilePhoto ? (
                <div className="relative" style={{ width: 80, height: 80, marginLeft: 20 }}>
                  <img 
                    src={personal.profilePhoto} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              ) : null}
            </div>

            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
              <ContactLine label="Phone" value={personal.phoneNumber} />
              <ContactLine label="Email" value={personal.emailAddress} />
              <ContactLine label="City" value={personal.cityState} />
              {personal.linkedInUrl?.trim() ? (
                <a
                  className="inline-flex items-center gap-2 text-[11px] font-semibold text-deepblue/70 hover:text-deepblue"
                  href={personal.linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="text-[11px] font-extrabold text-deepblue/50">LinkedIn:</span>
                  <span className="break-all">{personal.linkedInUrl.replace(/^https?:\/\//, "")}</span>
                </a>
              ) : null}
            </div>
          </div>

          <div className="mt-5 h-px w-full bg-gradient-to-r from-saffron/70 to-deepblue/20" />
        </div>

        {/* Skills */}
        <section className="mt-4">
          <h2 className="flex items-center gap-3 text-[11px] font-black uppercase tracking-wider text-deepblue">
            <span className="inline-flex h-3 w-3 rounded-full bg-saffron" />
            Skills
          </h2>

          <div className="mt-2 space-y-2">
            {technical.length > 0 ? (
              <div>
                <p className="text-[10.5px] font-extrabold text-deepblue/80">Technical</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {technical.slice(0, 10).map((t) => (
                    <span key={t} className="rounded-full bg-deepblue/5 px-2 py-1 text-[10px] font-semibold text-deepblue/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {soft.length > 0 ? (
              <div>
                <p className="text-[10.5px] font-extrabold text-deepblue/80">Soft</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {soft.slice(0, 10).map((t) => (
                    <span key={t} className="rounded-full bg-deepblue/5 px-2 py-1 text-[10px] font-semibold text-deepblue/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {languages.length > 0 ? (
              <div>
                <p className="text-[10.5px] font-extrabold text-deepblue/80">Languages</p>
                <p className="mt-1 text-[10.5px] font-semibold text-deepblue/80">
                  {languages.join(", ")}
                </p>
              </div>
            ) : null}
          </div>
        </section>

        {/* Education */}
        <section className="mt-4">
          <h2 className="flex items-center gap-3 text-[11px] font-black uppercase tracking-wider text-deepblue">
            <span className="inline-flex h-3 w-3 rounded-full bg-saffron" />
            Education
          </h2>
          <div className="mt-2 space-y-3">
            {data.education.map((e, idx) => {
              const title = e.degreeOrClass || "Degree / Class";
              const sub = [e.schoolCollegeName, e.boardOrUniversity].filter(Boolean).join(" • ");
              const meta = [e.yearOfPassing, e.percentageOrCgpa].filter(Boolean).join(" • ");
              if (!title.trim() && !sub.trim() && !meta.trim()) return null;
              return (
                <div key={idx}>
                  <p className="text-[11.5px] font-extrabold text-deepblue/95">{title}</p>
                  {sub ? <p className="text-[10.5px] font-semibold text-deepblue/70">{sub}</p> : null}
                  {meta ? <p className="text-[10px] font-semibold text-deepblue/60">{meta}</p> : null}
                </div>
              );
            })}
          </div>
        </section>

        {/* Work Experience */}
        <section className="mt-4">
          <h2 className="flex items-center gap-3 text-[11px] font-black uppercase tracking-wider text-deepblue">
            <span className="inline-flex h-3 w-3 rounded-full bg-saffron" />
            Work Experience
          </h2>

          <div className="mt-2 space-y-4">
            {data.workExperience.map((w, idx) => {
              const bullets = [w.bullet1, w.bullet2, w.bullet3];
              const hasAnything =
                w.companyOrInternshipName.trim() ||
                w.yourRoleOrPosition.trim() ||
                bullets.some((b) => b.trim());
              if (!hasAnything) return null;
              return (
                <div key={idx}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <p className="text-[11.5px] font-extrabold text-deepblue/95">
                        {w.yourRoleOrPosition || "Role"}
                      </p>
                      <p className="text-[10.5px] font-semibold text-deepblue/70">
                        {w.companyOrInternshipName || "Company / Internship"}
                      </p>
                    </div>
                    <p className="text-[10px] font-semibold text-deepblue/60">
                      {formatRange(w.startDate, w.endDate)}
                    </p>
                  </div>
                  <BulletList bullets={bullets} />
                </div>
              );
            })}
          </div>
        </section>

        {/* Certifications */}
        <section className="mt-4">
          <h2 className="flex items-center gap-3 text-[11px] font-black uppercase tracking-wider text-deepblue">
            <span className="inline-flex h-3 w-3 rounded-full bg-saffron" />
            Certifications
          </h2>
          <div className="mt-2 space-y-2">
            {data.certifications.map((c, idx) => {
              const hasAnything = c.certificateName.trim() || c.issuedBy.trim() || c.year.trim();
              if (!hasAnything) return null;
              return (
                <div key={idx}>
                  <p className="text-[11px] font-extrabold text-deepblue/90">{c.certificateName || "Certificate"}</p>
                  <p className="text-[10px] font-semibold text-deepblue/65">
                    {[c.issuedBy, c.year].filter(Boolean).join(" • ")}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Achievements */}
        {data.achievements.trim() ? (
          <section className="mt-4">
            <h2 className="flex items-center gap-3 text-[11px] font-black uppercase tracking-wider text-deepblue">
              <span className="inline-flex h-3 w-3 rounded-full bg-saffron" />
              Achievements
            </h2>
            <p className="mt-2 whitespace-pre-wrap text-[10.5px] font-semibold leading-relaxed text-deepblue/80">
              {data.achievements}
            </p>
          </section>
        ) : null}

        <div className="mt-8 border-t border-deepblue/10 pt-4">
          <p className="text-center text-[10px] font-semibold text-deepblue/60">
            Made with <span className="font-extrabold text-deepblue">YourValue.in</span>
          </p>
        </div>
      </div>
    </div>
  );
}

