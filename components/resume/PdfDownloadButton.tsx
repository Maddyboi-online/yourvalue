"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { useMemo, useState } from "react";
import confetti from "canvas-confetti";
import type { ResumeData } from "@/lib/resumeTypes";
import ResumePdfDocument from "@/components/resume/ResumePdfDocument";

export default function PdfDownloadButton({ data, template = ResumePdfDocument }: { 
  data: ResumeData; 
  template?: React.ComponentType<{ data: ResumeData }>;
}) {
  const fileName = useMemo(() => {
    const name = (data.personal.fullName || "YourValue").trim().replace(/\s+/g, "-");
    return `${name}-resume.pdf`;
  }, [data.personal.fullName]);

  const [isDownloading, setIsDownloading] = useState(false);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Create confetti with specified colors
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ABF62D', '#D6A3FB', '#ffffff']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ABF62D', '#D6A3FB', '#ffffff']
      });
    }, 250);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    triggerConfetti();
    setTimeout(() => setIsDownloading(false), 3000);
  };

  const TemplateComponent = template;

  return (
    <PDFDownloadLink
      document={<TemplateComponent data={data} />}
      fileName={fileName}
      className="block"
    >
      {({ loading }) => (
        <button 
          type="button" 
          className="btn-primary btn w-full text-base" 
          disabled={loading || isDownloading}
          onClick={!loading ? handleDownload : undefined}
        >
          {loading || isDownloading ? "Generating PDF..." : "Download PDF"}
        </button>
      )}
    </PDFDownloadLink>
  );
}

