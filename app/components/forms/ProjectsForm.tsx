"use client";

import React from "react";
import { useResumeContext, Project } from "../../context/ResumeContext";
import { Plus, Trash2 } from "lucide-react";

const ProjectsForm = () => {
  const { resumeData, updateProjects } = useResumeContext();

  const handleAddProject = () => {
    updateProjects([
      ...resumeData.projects,
      {
        id: Date.now().toString(),
        title: "",
        link: "",
        achievements: [""],
        techStack: "",
      },
    ]);
  };

  const handleRemoveProject = (index: number) => {
    const newProjects = [...resumeData.projects];
    newProjects.splice(index, 1);
    updateProjects(newProjects);
  };

  const handleChange = (index: number, field: keyof Project, value: string) => {
    const newProjects = [...resumeData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    updateProjects(newProjects);
  };

  const handleAddAchievement = (projIndex: number) => {
    const newProjects = [...resumeData.projects];
    newProjects[projIndex].achievements.push("");
    updateProjects(newProjects);
  };

  const handleAchievementChange = (projIndex: number, achIndex: number, value: string) => {
    const newProjects = [...resumeData.projects];
    newProjects[projIndex].achievements[achIndex] = value;
    updateProjects(newProjects);
  };

  const handleRemoveAchievement = (projIndex: number, achIndex: number) => {
    const newProjects = [...resumeData.projects];
    newProjects[projIndex].achievements.splice(achIndex, 1);
    updateProjects(newProjects);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {resumeData.projects.map((proj, index) => (
        <div key={proj.id} className="p-4 border border-gray-200 rounded-lg relative bg-white shadow-sm">
          <button
            onClick={() => handleRemoveProject(index)}
            className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded"
          >
            <Trash2 size={16} />
          </button>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
              <input
                type="text"
                value={proj.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                placeholder="E-commerce Platform"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
              <input
                type="text"
                value={proj.link}
                onChange={(e) => handleChange(index, "link", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                placeholder="https://myproject.com"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
              <input
                type="text"
                value={proj.techStack}
                onChange={(e) => handleChange(index, "techStack", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                placeholder="React, Node.js, MongoDB"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description / Achievements</label>
            <div className="space-y-2">
              {proj.achievements.map((ach, achIndex) => (
                <div key={achIndex} className="flex gap-2">
                  <input
                    type="text"
                    value={ach}
                    onChange={(e) => handleAchievementChange(index, achIndex, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
                    placeholder="Built authentication system using JWT"
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
        onClick={handleAddProject}
        className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg flex items-center justify-center hover:border-black hover:text-black transition-colors"
      >
        <Plus size={16} className="mr-2" /> Add Project
      </button>
    </div>
  );
};

export default ProjectsForm;
