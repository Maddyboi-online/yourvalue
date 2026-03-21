"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { useMemo } from "react";
import type { ResumeData } from "@/lib/resumeTypes";
import ResumePdfDocument from "@/components/resume/ResumePdfDocument";

export default function PdfDownloadButton({ data }: { data: ResumeData }) {
  const fileName = useMemo(() => {
    const name = (data.personal.fullName || "YourValue").trim().replace(/\s+/g, "-");
    return `${name}-resume.pdf`;
  }, [data.personal.fullName]);

  return (
    <PDFDownloadLink
      document={<ResumePdfDocument data={data} />}
      fileName={fileName}
      className="block"
    >
      {({ loading }) => (
        <button type="button" className="btn-primary btn w-full text-base" disabled={loading}>
          {loading ? "Generating PDF..." : "Download PDF"}
        </button>
      )}
    </PDFDownloadLink>
  );
}

