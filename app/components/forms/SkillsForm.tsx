"use client";

import React from "react";
import { useResumeStore, Skill } from "../../store/useResumeStore";
import { Plus, Trash2 } from "lucide-react";

const SkillsForm = () => {
  const { resumeData, updateSkills } = useResumeStore();

  const handleAddSkill = () => {
    updateSkills([...resumeData.skills, { category: "", items: "" }]);
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = [...resumeData.skills];
    newSkills.splice(index, 1);
    updateSkills(newSkills);
  };

  const handleChange = (index: number, field: keyof Skill, value: string) => {
    const newSkills = [...resumeData.skills];
    newSkills[index][field] = value;
    updateSkills(newSkills);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {resumeData.skills.map((skill, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg relative bg-white shadow-sm">
          <button
            onClick={() => handleRemoveSkill(index)}
            className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded"
          >
            <Trash2 size={16} />
          </button>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category (e.g., Languages, Frontend)</label>
              <input
                type="text"
                value={skill.category}
                onChange={(e) => handleChange(index, "category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                placeholder="Languages"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
              <input
                type="text"
                value={skill.items}
                onChange={(e) => handleChange(index, "items", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                placeholder="JavaScript, TypeScript, HTML, CSS"
              />
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={handleAddSkill}
        className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg flex items-center justify-center hover:border-black hover:text-black transition-colors"
      >
        <Plus size={16} className="mr-2" /> Add Skill Category
      </button>
    </div>
  );
};

export default SkillsForm;
