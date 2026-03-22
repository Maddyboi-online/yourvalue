"use client";

import type { ResumeData } from "@/lib/resumeTypes";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#000000',
    padding: 0,
    flexDirection: 'row',
  },
  sidebar: {
    backgroundColor: '#ABF62D',
    width: 120,
    padding: 40,
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    padding: 40,
    color: '#FFFFFF',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
    fontFamily: 'Space Grotesk',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#ABF62D',
    fontFamily: 'Space Grotesk',
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    color: '#FFFFFF',
    lineHeight: 1.4,
  },
  skillPill: {
    backgroundColor: '#ABF62D',
    color: '#000000',
    padding: '4 8',
    borderRadius: 12,
    fontSize: 10,
    fontWeight: 'bold',
    margin: 2,
  },
  timeline: {
    borderLeft: '2 solid #ABF62D',
    paddingLeft: 15,
    marginLeft: 10,
  },
  timelineItem: {
    marginBottom: 15,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ABF62D',
  },
  timelineDate: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.7,
  },
  sidebarText: {
    fontSize: 10,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },
  sidebarSection: {
    marginBottom: 30,
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
});

export default function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>CONTACT</Text>
            <Text style={styles.sidebarText}>{data.personal.phoneNumber}</Text>
            <Text style={styles.sidebarText}>{data.personal.emailAddress}</Text>
            <Text style={styles.sidebarText}>{data.personal.cityState}</Text>
            {data.personal.linkedInUrl && (
              <Text style={styles.sidebarText}>LinkedIn</Text>
            )}
          </Text>
          
          <Text style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>SKILLS</Text>
            {data.skills.technicalSkills.map((skill, idx) => (
              <Text key={idx} style={styles.skillPill}>{skill}</Text>
            ))}
            {data.skills.softSkills.map((skill, idx) => (
              <Text key={idx} style={styles.skillPill}>{skill}</Text>
            ))}
          </Text>

          <Text style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>LANGUAGES</Text>
            {data.skills.languagesKnown.map((lang, idx) => (
              <Text key={idx} style={styles.sidebarText}>{lang}</Text>
            ))}
          </Text>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.name}>{data.personal.fullName}</Text>
          
          {/* Education */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            <View style={styles.timeline}>
              {data.education.map((edu, idx) => (
                <View key={idx} style={styles.timelineItem}>
                  <Text style={styles.timelineTitle}>{edu.degreeOrClass}</Text>
                  <Text style={styles.text}>{edu.schoolCollegeName}</Text>
                  <Text style={styles.text}>{edu.boardOrUniversity}</Text>
                  <Text style={styles.timelineDate}>{edu.yearOfPassing} • {edu.percentageOrCgpa}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Work Experience */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EXPERIENCE</Text>
            <View style={styles.timeline}>
              {data.workExperience.map((work, idx) => (
                <View key={idx} style={styles.timelineItem}>
                  <Text style={styles.timelineTitle}>{work.yourRoleOrPosition}</Text>
                  <Text style={styles.text}>{work.companyOrInternshipName}</Text>
                  <Text style={styles.timelineDate}>{work.startDate} - {work.endDate}</Text>
                  {work.bullet1 && <Text style={styles.text}>• {work.bullet1}</Text>}
                  {work.bullet2 && <Text style={styles.text}>• {work.bullet2}</Text>}
                  {work.bullet3 && <Text style={styles.text}>• {work.bullet3}</Text>}
                </View>
              ))}
            </View>
          </View>

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
              <View style={styles.timeline}>
                {data.certifications.map((cert, idx) => (
                  <View key={idx} style={styles.timelineItem}>
                    <Text style={styles.timelineTitle}>{cert.certificateName}</Text>
                    <Text style={styles.text}>{cert.issuedBy}</Text>
                    <Text style={styles.timelineDate}>{cert.year}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Achievements */}
          {data.achievements && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
              <Text style={styles.text}>{data.achievements}</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
