"use client";

import { useEffect, useRef } from "react";
import { useResumeContext } from "../../context/ResumeContext";
import ResumePreview from "../../components/ResumePreview";

export default function LiveResumeContent({ initialData }: { initialData: any }) {
  const { setResumeData } = useResumeContext();

  useEffect(() => {
    if (initialData) {
      setResumeData(initialData);
    }
  }, [initialData, setResumeData]);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#525659] flex flex-col items-center py-8 relative">
      {/* Top right download button */}
      <div className="fixed top-4 right-4 z-50 print:hidden">
        <button
          onClick={handleDownload}
          className="bg-black text-white px-6 py-2 flex items-center justify-center font-medium rounded-md hover:bg-gray-800 transition shadow-lg"
        >
          Download PDF
        </button>
      </div>

      {/* Resume Container */}
      <div className="shadow-2xl bg-white w-[794px] min-h-[1123px] overflow-hidden print:shadow-none print:w-full print:h-auto print:p-0">
        <ResumePreview />
      </div>
      
      {/* Print styles */}
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
          /* Hide everything else */
          body > *:not(.min-h-screen) {
            display: none !important;
          }
        }
      `}} />
    </div>
  );
}
