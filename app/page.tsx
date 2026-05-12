"use client";

import React, { useRef } from "react";
import generatePDF from "react-to-pdf";
import { ResumeProvider } from "./context/ResumeContext";
import TopBar from "./components/TopBar";
import FormWizard from "./components/FormWizard";
import ResumePreview from "./components/ResumePreview";

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <ResumeProvider>
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
              <ResumePreview ref={targetRef} />
            </div>
          </div>
        </main>
      </div>

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
    </ResumeProvider>
  );
}
