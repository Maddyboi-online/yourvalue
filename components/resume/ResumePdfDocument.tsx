import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "@/lib/resumeTypes";
import { formatRange, uniqNonEmpty } from "@/lib/formatters";

const deepblue = "#0B2D5C";
const saffron = "#F59E0B";

const styles = StyleSheet.create({
  page: {
    padding: 26,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: deepblue,
  },
  topBar: {
    height: 6,
    backgroundColor: saffron,
    marginBottom: 12,
  },
  name: { fontSize: 20, fontWeight: 900, marginBottom: 6, lineHeight: 1.1 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
  contactItemWrap: { marginRight: 10, marginBottom: 4 },
  contactItemLabel: { fontSize: 9, fontWeight: 900, color: deepblue, opacity: 0.55 },
  contactItem: { fontSize: 9, fontWeight: 700, color: deepblue, opacity: 0.7 },

  divider: { height: 1, backgroundColor: "#0B2D5C22", marginVertical: 10 },

  sectionTitleRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
  circle: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: saffron, marginRight: 10 },
  sectionTitle: { fontSize: 10, fontWeight: 900, letterSpacing: 0.5, textTransform: "uppercase" },

  subsectionTitle: { marginTop: 6, fontSize: 9, fontWeight: 900, opacity: 0.85 },
  bodyText: { fontSize: 10, fontWeight: 700, opacity: 0.8, lineHeight: 1.35 },
  smallText: { fontSize: 9, fontWeight: 700, opacity: 0.65, lineHeight: 1.25 },

  tagsRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 4 },
  tag: { borderRadius: 14, backgroundColor: "#0B2D5C0D", paddingHorizontal: 8, paddingVertical: 4, fontSize: 9, fontWeight: 700, color: deepblue, opacity: 0.85, marginRight: 6, marginBottom: 4 },

  educationItem: { marginTop: 8 },
  workItem: { marginTop: 10 },
  workHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  bullet: { flexDirection: "row", marginTop: 3 },
  bulletDot: { color: saffron, fontWeight: 900 },

  footer: { marginTop: 14, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#0B2D5C1A" },
  footerText: { textAlign: "center", fontSize: 9, fontWeight: 700, opacity: 0.6 },
  footerBrand: { fontWeight: 900, opacity: 0.85 },
});

function ContactItem({ label, value }: { label: string; value: string }) {
  if (!value.trim()) return null;
  return (
    <View style={styles.contactItemWrap}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.contactItemLabel}>{label}:</Text>
        <Text style={[styles.contactItem, { marginLeft: 6 }]}>{value}</Text>
      </View>
    </View>
  );
}

export default function ResumePdfDocument({ data }: { data: ResumeData }) {
  const personal = data.personal;
  const technical = uniqNonEmpty(data.skills.technicalSkills);
  const soft = uniqNonEmpty(data.skills.softSkills);
  const languages = uniqNonEmpty(data.skills.languagesKnown);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.topBar} />
        <Text style={styles.name}>{personal.fullName || "Your Name"}</Text>

        <View style={styles.contactRow}>
          <ContactItem label="Phone" value={personal.phoneNumber} />
          <ContactItem label="Email" value={personal.emailAddress} />
          <ContactItem label="City" value={personal.cityState} />
          {personal.linkedInUrl?.trim() ? (
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.contactItemLabel}>LinkedIn:</Text>
              <Text style={[styles.contactItem, { marginLeft: 6 }]}>{personal.linkedInUrl.replace(/^https?:\/\//, "")}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.divider} />

        {/* Skills */}
        <View style={styles.sectionTitleRow}>
          <View style={styles.circle} />
          <Text style={styles.sectionTitle}>Skills</Text>
        </View>

        {technical.length > 0 ? (
          <View>
            <Text style={styles.subsectionTitle}>Technical</Text>
            <View style={styles.tagsRow}>
              {technical.slice(0, 12).map((t) => (
                <View key={t} style={styles.tag}>
                  <Text>{t}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {soft.length > 0 ? (
          <View>
            <Text style={styles.subsectionTitle}>Soft</Text>
            <View style={styles.tagsRow}>
              {soft.slice(0, 12).map((t) => (
                <View key={t} style={styles.tag}>
                  <Text>{t}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {languages.length > 0 ? (
          <View>
            <Text style={styles.subsectionTitle}>Languages</Text>
            <Text style={styles.bodyText}>{languages.join(", ")}</Text>
          </View>
        ) : null}

        {/* Education */}
        <View style={styles.sectionTitleRow}>
          <View style={styles.circle} />
          <Text style={styles.sectionTitle}>Education</Text>
        </View>

        {data.education.map((e, idx) => {
          const title = e.degreeOrClass?.trim();
          const sub = [e.schoolCollegeName?.trim(), e.boardOrUniversity?.trim()].filter(Boolean).join(" • ");
          const meta = [e.yearOfPassing?.trim(), e.percentageOrCgpa?.trim()].filter(Boolean).join(" • ");
          if (!title && !sub && !meta) return null;
          return (
            <View key={idx} style={styles.educationItem}>
              <Text style={{ fontSize: 11, fontWeight: 900 }}>{title || "Degree / Class"}</Text>
              {sub ? <Text style={styles.smallText}>{sub}</Text> : null}
              {meta ? <Text style={styles.smallText}>{meta}</Text> : null}
            </View>
          );
        })}

        {/* Work Experience */}
        <View style={styles.sectionTitleRow}>
          <View style={styles.circle} />
          <Text style={styles.sectionTitle}>Work Experience</Text>
        </View>

        {data.workExperience.map((w, idx) => {
          const bullets = [w.bullet1, w.bullet2, w.bullet3].map((b) => b.trim()).filter(Boolean);
          const hasAnything =
            w.companyOrInternshipName.trim() || w.yourRoleOrPosition.trim() || bullets.length > 0;
          if (!hasAnything) return null;
          return (
            <View key={idx} style={styles.workItem}>
              <View style={styles.workHeader}>
                <View>
                  <Text style={{ fontSize: 11, fontWeight: 900 }}>{w.yourRoleOrPosition || "Role"}</Text>
                  <Text style={styles.smallText}>{w.companyOrInternshipName || "Company / Internship"}</Text>
                </View>
                <Text style={styles.smallText}>{formatRange(w.startDate, w.endDate)}</Text>
              </View>

              {bullets.length > 0 ? (
                <View style={{ marginTop: 6 }}>
                  {bullets.map((b) => (
                    <View key={b} style={styles.bullet}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={{ fontSize: 10, fontWeight: 700, opacity: 0.8, lineHeight: 1.35 }}>{b}</Text>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
          );
        })}

        {/* Certifications */}
        <View style={styles.sectionTitleRow}>
          <View style={styles.circle} />
          <Text style={styles.sectionTitle}>Certifications</Text>
        </View>

        {data.certifications.map((c, idx) => {
          const hasAnything = c.certificateName.trim() || c.issuedBy.trim() || c.year.trim();
          if (!hasAnything) return null;
          return (
            <View key={idx} style={styles.educationItem}>
              <Text style={{ fontSize: 11, fontWeight: 900 }}>{c.certificateName || "Certificate"}</Text>
              <Text style={styles.smallText}>{[c.issuedBy, c.year].filter(Boolean).join(" • ")}</Text>
            </View>
          );
        })}

        {/* Achievements */}
        {data.achievements.trim() ? (
          <View>
            <View style={styles.sectionTitleRow}>
              <View style={styles.circle} />
              <Text style={styles.sectionTitle}>Achievements</Text>
            </View>
            <Text style={styles.bodyText}>{data.achievements}</Text>
          </View>
        ) : null}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with <Text style={styles.footerBrand}>YourValue.in</Text>
          </Text>
        </View>
      </Page>
    </Document>
  );
}

