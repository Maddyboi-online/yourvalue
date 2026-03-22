"use client";

import type { ResumeData } from "@/lib/resumeTypes";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 60,
    flexDirection: 'column',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
    fontFamily: 'Helvetica',
  },
  contact: {
    fontSize: 12,
    marginBottom: 30,
    color: '#333333',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000000',
    borderBottom: '1 solid #000000',
    paddingBottom: 4,
  },
  text: {
    fontSize: 11,
    marginBottom: 6,
    color: '#000000',
    lineHeight: 1.4,
  },
  item: {
    marginBottom: 15,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  itemSubtitle: {
    fontSize: 11,
    color: '#666666',
    fontStyle: 'italic',
  },
  itemDate: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'right',
    marginBottom: 4,
  },
  bullet: {
    fontSize: 10,
    marginLeft: 20,
    marginBottom: 4,
    color: '#000000',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  skill: {
    fontSize: 10,
    marginRight: 15,
    marginBottom: 5,
    color: '#000000',
  },
});

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.name}>{data.personal.fullName}</Text>
        <Text style={styles.contact}>
          {data.personal.phoneNumber} • {data.personal.emailAddress} • {data.personal.cityState}
          {data.personal.linkedInUrl && ` • ${data.personal.linkedInUrl}`}
        </Text>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {data.education.map((edu, idx) => (
            <View key={idx} style={styles.item}>
              <Text style={styles.itemTitle}>{edu.degreeOrClass}</Text>
              <Text style={styles.itemSubtitle}>{edu.schoolCollegeName}, {edu.boardOrUniversity}</Text>
              <Text style={styles.itemDate}>{edu.yearOfPassing}</Text>
              <Text style={styles.text}>Grade: {edu.percentageOrCgpa}</Text>
            </View>
          ))}
        </View>

        {/* Work Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
          {data.workExperience.map((work, idx) => (
            <View key={idx} style={styles.item}>
              <Text style={styles.itemTitle}>{work.yourRoleOrPosition}</Text>
              <Text style={styles.itemSubtitle}>{work.companyOrInternshipName}</Text>
              <Text style={styles.itemDate}>{work.startDate} - {work.endDate}</Text>
              {work.bullet1 && <Text style={styles.bullet}>• {work.bullet1}</Text>}
              {work.bullet2 && <Text style={styles.bullet}>• {work.bullet2}</Text>}
              {work.bullet3 && <Text style={styles.bullet}>• {work.bullet3}</Text>}
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SKILLS</Text>
          <View style={styles.skillsContainer}>
            {data.skills.technicalSkills.map((skill, idx) => (
              <Text key={idx} style={styles.skill}>{skill}</Text>
            ))}
            {data.skills.softSkills.map((skill, idx) => (
              <Text key={idx} style={styles.skill}>{skill}</Text>
            ))}
          </View>
        </View>

        {/* Languages */}
        {data.skills.languagesKnown.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>LANGUAGES</Text>
            <View style={styles.skillsContainer}>
              {data.skills.languagesKnown.map((lang, idx) => (
                <Text key={idx} style={styles.skill}>{lang}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
            {data.certifications.map((cert, idx) => (
              <View key={idx} style={styles.item}>
                <Text style={styles.itemTitle}>{cert.certificateName}</Text>
                <Text style={styles.itemSubtitle}>{cert.issuedBy}</Text>
                <Text style={styles.itemDate}>{cert.year}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Achievements */}
        {data.achievements && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
            <Text style={styles.text}>{data.achievements}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
