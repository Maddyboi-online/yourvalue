"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface ShareButtonProps {
  shareUrl: string;
  resumeTitle: string;
}

export default function ShareButton({ shareUrl, resumeTitle }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const shareOnWhatsApp = () => {
    const message = `Check out my resume: ${resumeTitle}\n${shareUrl}\n\nBuild your own professional resume for free at YourValue.in!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank');
  };

  const downloadQRCode = () => {
    // For now, we'll open a QR code generator service
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shareUrl)}`;
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `${resumeTitle.replace(/\s+/g, '-').toLowerCase()}-qr.png`;
    link.click();
    toast.success("QR Code downloaded!");
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-white">Share Resume</h3>
      
      {/* Copy Link */}
      <div className="flex gap-2">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="flex-1 px-3 py-2 bg-[#1a1a1a] border border-[#333333] rounded-lg text-white text-sm"
        />
        <button
          onClick={copyToClipboard}
          className="btn px-4 py-2 bg-[#ABF62D] text-black hover:bg-[#9fdf2a] transition-colors text-sm font-semibold"
        >
          {copied ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          )}
        </button>
      </div>

      {/* Share Options */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={shareOnWhatsApp}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.644.149-.199.297-.462.297-.76 0-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67-.149-.197 0-.395.05-.572.149-.177.099-.672.672-1.046 1.64-.374.967-.374 1.809.0 2.059.374.249 1.758.867 2.03.967.273.099.471.149.67.149.197 0 .395-.05.572-.149.177-.099.672-.672 1.046-1.64.374-.967.374-1.809 0-2.059-.374-.249-1.758-.867-2.03-.967-.273-.099-.471-.149-.67-.149z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.966 8.516c.052.362.052 1.815 0 2.177-.052.362-.347.672-.672.672-.325 0-.672-.31-.672-.672-.052-.362-.052-1.815 0-2.177.052-.362.347-.672.672-.672.325 0 .672.31.672.672z"/>
          </svg>
          WhatsApp
        </button>
        
        <button
          onClick={shareOnLinkedIn}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </button>
      </div>

      {/* QR Code Download */}
      <button
        onClick={downloadQRCode}
        className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-[#111111] border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors text-sm font-semibold"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Download QR Code
      </button>
    </div>
  );
}
