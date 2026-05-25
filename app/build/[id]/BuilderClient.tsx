"use client";

import React, { useRef, useEffect } from "react";
import { useResumeStore } from "@/app/store/useResumeStore";
import TopBar from "@/app/components/TopBar";
import FormWizard from "@/app/components/FormWizard";
import ResumePreview from "@/app/components/ResumePreview";
import ResumePreviewModern from "@/app/components/ResumePreviewModern";
import ResumePreviewMinimal from "@/app/components/ResumePreviewMinimal";

function BuilderContent({ initialData, resumeId }: { initialData: any, resumeId: string }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { resumeData, setResumeData, setResumeId, selectedTemplate, setSelectedTemplate, resumeId: storeResumeId, resetToInitial, hasHydrated } = useResumeStore();

  useEffect(() => {
    // Wait until Zustand has fully hydrated from localStorage before making decisions
    if (!hasHydrated) return;

    // Only overwrite the Zustand store with database initialData 
    // if we navigated to a DIFFERENT resume ID than what's in the store.
    // This ensures that local unsaved changes are NOT wiped out on browser refresh.
    if (storeResumeId !== resumeId) {
      if (resumeId === 'new') {
        resetToInitial();
        setResumeId('new');
      } else {
        if (initialData) {
          setResumeData(initialData);
          if (initialData.templateId) {
            setSelectedTemplate(initialData.templateId);
          }
        }
        setResumeId(resumeId);
      }
    }
  }, [hasHydrated, initialData, resumeId, storeResumeId, setResumeData, setResumeId, setSelectedTemplate, resetToInitial]);

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-black font-sans print:bg-white">
      <div className="print:hidden">
        <TopBar onDownloadPDF={handleDownloadPDF} />
      </div>
      
      <main className="flex-1 flex overflow-hidden flex-col md:flex-row print:block print:overflow-visible">
        {/* Left Panel: Form Wizard */}
        <div className="w-full md:w-[450px] shrink-0 md:h-[calc(100vh-73px)] overflow-hidden flex flex-col z-10 relative bg-white print:hidden">
            <FormWizard />
        </div>

        {/* Right Panel: Resume Preview */}
        <div className="flex-1 md:h-[calc(100vh-73px)] overflow-y-auto bg-[#525659] custom-scrollbar flex justify-center py-8 print:block print:h-auto print:overflow-visible print:bg-white print:py-0 print:m-0">
          <div className="scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-top print:scale-100 print:w-full">
            {selectedTemplate === 'classic' && <ResumePreview ref={targetRef} />}
            {selectedTemplate === 'modern' && <ResumePreviewModern ref={targetRef} />}
            {selectedTemplate === 'minimal' && <ResumePreviewMinimal ref={targetRef} />}
          </div>
        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          body {
            background-color: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}} />
    </div>
  );
}

export default function BuilderClient({ initialData, resumeId }: { initialData: any, resumeId: string }) {
  return (
    <BuilderContent initialData={initialData} resumeId={resumeId} />
  );
}
