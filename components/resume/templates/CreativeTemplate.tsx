"use client";

import type { ResumeData } from "@/lib/resumeTypes";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 0,
    flexDirection: 'row',
  },
  leftColumn: {
    backgroundColor: '#F8F9FA',
    width: 180,
    padding: 40,
    borderRight: '2 solid #D6A3FB',
  },
  rightColumn: {
    flex: 1,
    padding: 40,
    backgroundColor: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#D6A3FB',
    borderBottom: '2 solid #D6A3FB',
    paddingBottom: 4,
  },
  leftSectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#D6A3FB',
  },
  text: {
    fontSize: 10,
    marginBottom: 6,
    color: '#333333',
    lineHeight: 1.4,
  },
  leftText: {
    fontSize: 9,
    marginBottom: 4,
    color: '#666666',
    lineHeight: 1.3,
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
    fontSize: 10,
    color: '#666666',
    fontStyle: 'italic',
  },
  itemDate: {
    fontSize: 9,
    color: '#D6A3FB',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bullet: {
    fontSize: 9,
    marginLeft: 15,
    marginBottom: 3,
    color: '#333333',
  },
  skillBar: {
    backgroundColor: '#E5E7EB',
    height: 4,
    borderRadius: 2,
    marginBottom: 8,
  },
  skillFill: {
    backgroundColor: '#D6A3FB',
    height: 4,
    borderRadius: 2,
  },
  photoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#D6A3FB',
    borderRadius: 40,
    marginBottom: 20,
    alignSelf: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactIcon: {
    width: 12,
    height: 12,
    backgroundColor: '#D6A3FB',
    borderRadius: 6,
    marginRight: 8,
  },
});

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          <View style={styles.photoPlaceholder} />
          
          <View style={styles.section}>
            <Text style={styles.leftSectionTitle}>CONTACT</Text>
            <View style={styles.contactItem}>
              <View style={styles.contactIcon} />
              <Text style={styles.leftText}>{data.personal.phoneNumber}</Text>
            </View>
            <View style={styles.contactItem}>
              <View style={styles.contactIcon} />
              <Text style={styles.leftText}>{data.personal.emailAddress}</Text>
            </View>
            <View style={styles.contactItem}>
              <View style={styles.contactIcon} />
              <Text style={styles.leftText}>{data.personal.cityState}</Text>
            </View>
            {data.personal.linkedInUrl && (
              <View style={styles.contactItem}>
                <View style={styles.contactIcon} />
                <Text style={styles.leftText}>LinkedIn</Text>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.leftSectionTitle}>SKILLS</Text>
            {data.skills.technicalSkills.map((skill, idx) => (
              <View key={idx}>
                <Text style={styles.leftText}>{skill}</Text>
                <View style={styles.skillBar}>
                  <View style={[styles.skillFill, { width: '80%' }]} />
                </View>
              </View>
            ))}
            {data.skills.softSkills.map((skill, idx) => (
              <View key={idx}>
                <Text style={styles.leftText}>{skill}</Text>
                <View style={styles.skillBar}>
                  <View style={[styles.skillFill, { width: '70%' }]} />
                </View>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.leftSectionTitle}>LANGUAGES</Text>
            {data.skills.languagesKnown.map((lang, idx) => (
              <Text key={idx} style={styles.leftText}>{lang}</Text>
            ))}
          </View>
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          <Text style={styles.name}>{data.personal.fullName}</Text>
          
          {/* Education */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {data.education.map((edu, idx) => (
              <View key={idx} style={styles.item}>
                <Text style={styles.itemTitle}>{edu.degreeOrClass}</Text>
                <Text style={styles.itemSubtitle}>{edu.schoolCollegeName}</Text>
                <Text style={styles.itemDate}>{edu.yearOfPassing}</Text>
                <Text style={styles.text}>{edu.boardOrUniversity}</Text>
                <Text style={styles.text}>Grade: {edu.percentageOrCgpa}</Text>
              </View>
            ))}
          </View>

          {/* Work Experience */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EXPERIENCE</Text>
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
        </View>
      </Page>
    </Document>
  );
}
