"use client";

import React, { useState } from "react";
import { useResumeContext } from "../context/ResumeContext";
import { ChevronLeft, ChevronRight, CheckCircle2, Copy, ExternalLink, Loader2 } from "lucide-react";
import { saveResume } from "../actions/resumeActions";

// Import all form components
import PersonalInfoForm from "./forms/PersonalInfoForm";
import SummaryForm from "./forms/SummaryForm";
import SkillsForm from "./forms/SkillsForm";
import ExperienceForm from "./forms/ExperienceForm";
import ProjectsForm from "./forms/ProjectsForm";
import EducationForm from "./forms/EducationForm";
import AwardsForm from "./forms/AwardsForm";

const TOTAL_STEPS = 7;

const STEPS = [
  { id: 1, name: "Personal" },
  { id: 2, name: "Summary" },
  { id: 3, name: "Skills" },
  { id: 4, name: "Experience" },
  { id: 5, name: "Projects" },
  { id: 6, name: "Education" },
  { id: 7, name: "Awards" },
];

const FormWizard = () => {
  const { currentStep, setCurrentStep, resumeData, resumeId, setResumeId, slug, setSlug } = useResumeContext();
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await saveResume(resumeData, resumeId);
    if (result.success && result.id && result.slug) {
      setResumeId(result.id);
      setSlug(result.slug);
      setShowSuccess(true);
      
      // Open the new tab
      const generatedLink = `${window.location.origin}/${result.slug}/${result.id}`;
      window.open(generatedLink, '_blank');
    } else {
      alert(`Failed to save resume: ${result.error || "Please try again."}`);
    }
    setIsSaving(false);
  };

  const liveLink = typeof window !== "undefined" && slug && resumeId ? `${window.location.origin}/${slug}/${resumeId}` : "";

  const handleCopyLink = () => {
    if (liveLink) {
      navigator.clipboard.writeText(liveLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <PersonalInfoForm />;
      case 2: return <SummaryForm />;
      case 3: return <SkillsForm />;
      case 4: return <ExperienceForm />;
      case 5: return <ProjectsForm />;
      case 6: return <EducationForm />;
      case 7: return <AwardsForm />;
      default: return <PersonalInfoForm />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 border-r border-gray-200 w-full max-w-lg shadow-[inset_-1px_0_10px_rgba(0,0,0,0.02)]">
      {/* Progress Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Resume</h2>
        
        {/* Step Indicators */}
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full" />
          <div 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-black -z-10 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
          />
          
          {STEPS.map((step) => (
            <div 
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold cursor-pointer transition-colors z-0
                ${currentStep === step.id 
                  ? "bg-black text-white ring-4 ring-gray-100" 
                  : currentStep > step.id 
                    ? "bg-gray-800 text-white" 
                    : "bg-white text-gray-400 border border-gray-300"
                }`}
            >
              {step.id}
            </div>
          ))}
        </div>
        <div className="mt-3 text-sm font-medium text-gray-600 text-center">
          {STEPS[currentStep - 1].name}
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        {showSuccess ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Resume Saved Successfully!</h3>
            <p className="text-gray-500 max-w-sm">Your resume is live and ready to be shared with recruiters.</p>
            
            <div className="w-full max-w-sm mt-6 p-4 bg-gray-100 rounded-lg border border-gray-200 flex flex-col gap-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Your Live Link</span>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={liveLink} 
                  className="flex-1 bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 outline-none"
                />
                <button 
                  onClick={handleCopyLink}
                  className="p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  title="Copy link"
                >
                  {copied ? <CheckCircle2 size={18} className="text-green-600" /> : <Copy size={18} className="text-gray-600" />}
                </button>
              </div>
              <a 
                href={liveLink} 
                target="_blank" 
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 mt-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                View Live Resume <ExternalLink size={16} />
              </a>
            </div>

            <button 
              onClick={() => setShowSuccess(false)}
              className="mt-4 text-sm font-medium text-gray-500 hover:text-black underline underline-offset-4"
            >
              Continue Editing
            </button>
          </div>
        ) : (
          renderStep()
        )}
      </div>

      {/* Navigation Footer */}
      <div className="p-4 border-t border-gray-200 bg-white flex justify-between items-center">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            currentStep === 1 
            ? "text-gray-400 cursor-not-allowed" 
            : "text-gray-700 bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <ChevronLeft size={16} className="mr-1" /> Previous
        </button>
        
        {currentStep === TOTAL_STEPS && !showSuccess ? (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors text-white bg-green-600 hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {isSaving ? <Loader2 size={16} className="mr-2 animate-spin" /> : null}
            {resumeId ? "Update Resume" : "Create Resume"}
          </button>
        ) : (
          <button
            onClick={nextStep}
            disabled={currentStep === TOTAL_STEPS || showSuccess}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              currentStep === TOTAL_STEPS || showSuccess
              ? "text-gray-400 cursor-not-allowed hidden"
              : "text-white bg-black hover:bg-gray-800"
            }`}
          >
            Next <ChevronRight size={16} className="ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FormWizard;
