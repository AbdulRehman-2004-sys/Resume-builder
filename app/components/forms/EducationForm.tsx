"use client";

import React from "react";
import { useResumeStore, Education } from "../../store/useResumeStore";
import { Plus, Trash2 } from "lucide-react";

const EducationForm = () => {
  const { resumeData, updateEducation } = useResumeStore();

  const handleAddEducation = () => {
    updateEducation([
      ...resumeData.education,
      {
        id: Date.now().toString(),
        institution: "",
        startDate: "",
        endDate: "",
        degree: "",
        gpa: "",
      },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    const newEd = [...resumeData.education];
    newEd.splice(index, 1);
    updateEducation(newEd);
  };

  const handleChange = (index: number, field: keyof Education, value: string) => {
    const newEd = [...resumeData.education];
    newEd[index] = { ...newEd[index], [field]: value };
    updateEducation(newEd);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {resumeData.education.map((ed, index) => (
        <div key={ed.id} className="p-4 border border-gray-200 rounded-lg relative bg-white shadow-sm">
          <button
            onClick={() => handleRemoveEducation(index)}
            className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded"
          >
            <Trash2 size={16} />
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <input
                type="text"
                value={ed.institution}
                onChange={(e) => handleChange(index, "institution", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                placeholder="University of Example"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree / Major</label>
              <input
                type="text"
                value={ed.degree}
                onChange={(e) => handleChange(index, "degree", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                placeholder="BS Computer Science"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">GPA (Optional)</label>
              <input
                type="text"
                value={ed.gpa}
                onChange={(e) => handleChange(index, "gpa", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                placeholder="3.8"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="text"
                value={ed.startDate}
                onChange={(e) => handleChange(index, "startDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                placeholder="Sep 2019"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="text"
                value={ed.endDate}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                placeholder="May 2023"
              />
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={handleAddEducation}
        className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg flex items-center justify-center hover:border-black hover:text-black transition-colors"
      >
        <Plus size={16} className="mr-2" /> Add Education
      </button>
    </div>
  );
};

export default EducationForm;
