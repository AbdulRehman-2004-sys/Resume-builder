"use client";

import React from "react";
import { useResumeStore, Experience } from "../../store/useResumeStore";
import { Plus, Trash2 } from "lucide-react";

const ExperienceForm = () => {
  const { resumeData, updateExperience } = useResumeStore();

  const handleAddExp = () => {
    updateExperience([
      ...resumeData.experience,
      {
        id: Date.now().toString(),
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        achievements: [""],
      },
    ]);
  };

  const handleRemoveExp = (index: number) => {
    const newExp = [...resumeData.experience];
    newExp.splice(index, 1);
    updateExperience(newExp);
  };

  const handleChange = (index: number, field: keyof Experience, value: string) => {
    const newExp = [...resumeData.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    updateExperience(newExp);
  };

  const handleAddAchievement = (expIndex: number) => {
    const newExp = [...resumeData.experience];
    const newAchievements = [...newExp[expIndex].achievements, ""];
    newExp[expIndex] = { ...newExp[expIndex], achievements: newAchievements };
    updateExperience(newExp);
  };

  const handleAchievementChange = (expIndex: number, achIndex: number, value: string) => {
    const newExp = [...resumeData.experience];
    const newAchievements = [...newExp[expIndex].achievements];
    newAchievements[achIndex] = value;
    newExp[expIndex] = { ...newExp[expIndex], achievements: newAchievements };
    updateExperience(newExp);
  };

  const handleRemoveAchievement = (expIndex: number, achIndex: number) => {
    const newExp = [...resumeData.experience];
    const newAchievements = [...newExp[expIndex].achievements];
    newAchievements.splice(achIndex, 1);
    newExp[expIndex] = { ...newExp[expIndex], achievements: newAchievements };
    updateExperience(newExp);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {resumeData.experience.map((exp, index) => (
        <div key={exp.id} className="p-4 border border-gray-200 rounded-lg relative bg-white shadow-sm">
          <button
            onClick={() => handleRemoveExp(index)}
            className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded"
          >
            <Trash2 size={16} />
          </button>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                type="text"
                value={exp.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                placeholder="Software Engineer"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleChange(index, "company", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                placeholder="Google"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="text"
                value={exp.startDate}
                onChange={(e) => handleChange(index, "startDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                placeholder="Jan 2020"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="text"
                value={exp.endDate}
                onChange={(e) => handleChange(index, "endDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                placeholder="Present"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Achievements / Responsibilities</label>
            <div className="space-y-2">
              {exp.achievements.map((ach, achIndex) => (
                <div key={achIndex} className="flex gap-2">
                  <input
                    type="text"
                    value={ach}
                    onChange={(e) => handleAchievementChange(index, achIndex, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                    placeholder="Developed a new feature that increased user retention by 20%"
                  />
                  <button
                    onClick={() => handleRemoveAchievement(index, achIndex)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleAddAchievement(index)}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              <Plus size={14} className="mr-1" /> Add Bullet Point
            </button>
          </div>
        </div>
      ))}
      
      <button
        onClick={handleAddExp}
        className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg flex items-center justify-center hover:border-black hover:text-black transition-colors"
      >
        <Plus size={16} className="mr-2" /> Add Experience
      </button>
    </div>
  );
};

export default ExperienceForm;
