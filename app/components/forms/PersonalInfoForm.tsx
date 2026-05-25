"use client";

import React from "react";
import { useResumeStore } from "../../store/useResumeStore";

const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const { personalInfo } = resumeData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePersonalInfo({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          value={personalInfo.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={personalInfo.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="text"
          name="phone"
          value={personalInfo.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
          placeholder="+1 234 567 890"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
        <input
          type="url"
          name="linkedin"
          value={personalInfo.linkedin}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
          placeholder="https://linkedin.com/in/johndoe"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
        <input
          type="url"
          name="github"
          value={personalInfo.github}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
          placeholder="https://github.com/johndoe"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio URL</label>
        <input
          type="url"
          name="portfolio"
          value={personalInfo.portfolio}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black sm:text-sm"
          placeholder="https://johndoe.com"
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
