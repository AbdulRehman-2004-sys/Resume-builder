"use client";

import React from "react";
import { useResumeContext } from "../../context/ResumeContext";

const SummaryForm = () => {
  const { resumeData, updateSummary } = useResumeContext();

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
        <textarea
          value={resumeData.summary}
          onChange={(e) => updateSummary(e.target.value)}
          rows={8}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
          placeholder="Briefly describe your professional background and key achievements..."
        />
        <p className="mt-2 text-xs text-gray-500">
          Tip: Keep it concise and focused on your most relevant skills and experiences.
        </p>
      </div>
    </div>
  );
};

export default SummaryForm;
