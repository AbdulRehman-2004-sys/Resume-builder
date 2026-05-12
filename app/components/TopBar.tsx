"use client";

import React, { useState } from "react";
import { Download, Link as LinkIcon, Check } from "lucide-react";
import { useResumeContext } from "../context/ResumeContext";

interface TopBarProps {
  onDownloadPDF: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onDownloadPDF }) => {
  const { resumeData } = useResumeContext();
  const [copied, setCopied] = useState(false);

  const handleShareLink = () => {
    try {
      const dataString = btoa(encodeURIComponent(JSON.stringify(resumeData)));
      const url = `${window.location.origin}${window.location.pathname}?data=${dataString}`;

      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        console.error("Clipboard write failed:", err);
        alert("Could not copy link to clipboard. Check console.");
      });
    } catch (e) {
      console.error("Failed to generate link:", e);
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold text-xl">
          R
        </div>
        <h1 className="text-xl font-semibold text-gray-900">Resume Builder</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleShareLink}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          {copied ? <Check size={16} className="text-green-600" /> : <LinkIcon size={16} />}
          {copied ? "Copied Link!" : "Share Link"}
        </button>
        <button
          onClick={onDownloadPDF}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md transition-colors shadow-sm"
        >
          <Download size={16} />
          Download PDF
        </button>
      </div>
    </header>
  );
};

export default TopBar;
