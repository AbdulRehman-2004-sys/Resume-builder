"use client";

import React from "react";
import { useResumeStore } from "../../store/useResumeStore";
import Editor from 'react-simple-wysiwyg';

const SummaryForm = () => {
  const { resumeData, updateSummary } = useResumeStore();

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
        <div className="prose-sm bg-white">
          <Editor
            value={resumeData.summary}
            onChange={(e) => updateSummary(e.target.value)}
            containerProps={{ style: { height: '250px', overflowY: 'auto' } }}
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Tip: Keep it concise and focused on your most relevant skills and experiences.
        </p>
      </div>
    </div>
  );
};

export default SummaryForm;
