"use client";

import React, { forwardRef } from "react";
import { useResumeContext, Skill, Experience, Project, Education, Award } from "../context/ResumeContext";

const ResumePreviewModern = forwardRef<HTMLDivElement>((props, ref) => {
  const { resumeData } = useResumeContext();
  const { personalInfo, summary, skills, experience, projects, education, awards } = resumeData;

  return (
    <div 
      ref={ref}
      className="bg-white text-gray-800 w-[794px] min-h-[1123px] shadow-2xl box-border font-sans flex mx-auto overflow-hidden"
      style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
    >
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-900 text-white p-8 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight leading-none mb-2">{personalInfo.name}</h1>
          {experience[0] && (
            <div className="text-gray-400 text-sm font-medium tracking-widest uppercase">{experience[0].title}</div>
          )}
        </div>

        <div className="space-y-4 text-xs text-gray-300">
          <h2 className="text-white font-bold tracking-widest uppercase border-b border-gray-700 pb-2 mb-4">Contact</h2>
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.linkedin && <a href={personalInfo.linkedin} className="block truncate">{personalInfo.linkedin}</a>}
          {personalInfo.github && <a href={personalInfo.github} className="block truncate">{personalInfo.github}</a>}
          {personalInfo.portfolio && <a href={personalInfo.portfolio} className="block truncate">{personalInfo.portfolio}</a>}
        </div>

        {skills.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-white font-bold tracking-widest uppercase border-b border-gray-700 pb-2 mb-4">Skills</h2>
            {skills.map((skill: Skill, index: number) => (
              <div key={index} className="text-xs">
                <span className="text-gray-400 font-semibold block mb-1">{skill.category}</span>
                <span className="text-gray-200">{skill.items}</span>
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-white font-bold tracking-widest uppercase border-b border-gray-700 pb-2 mb-4">Education</h2>
            {education.map((ed: Education) => (
              <div key={ed.id} className="text-xs">
                <div className="font-bold text-white">{ed.degree}</div>
                <div className="text-gray-400">{ed.institution}</div>
                <div className="text-gray-500 mt-1">{ed.startDate} - {ed.endDate}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8 bg-white flex flex-col gap-6">
        {summary && (
          <div>
            <h2 className="text-gray-900 font-bold tracking-widest uppercase border-b-2 border-gray-100 pb-2 mb-4">Profile</h2>
            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              {summary}
            </p>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <h2 className="text-gray-900 font-bold tracking-widest uppercase border-b-2 border-gray-100 pb-2 mb-4">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp: Experience) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-bold text-gray-900 text-sm">{exp.title}</h3>
                    <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-2">{exp.company}</div>
                  <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs text-gray-600 leading-relaxed">
                    {exp.achievements.map((ach: string, idx: number) => (
                      <li key={idx} className="pl-1">{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h2 className="text-gray-900 font-bold tracking-widest uppercase border-b-2 border-gray-100 pb-2 mb-4">Projects</h2>
            <div className="space-y-6">
              {projects.map((proj: Project) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-bold text-gray-900 text-sm">{proj.title}</h3>
                    <a href={proj.link} className="text-xs text-blue-600 hover:underline">{proj.link}</a>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs text-gray-600 leading-relaxed mb-2">
                    {proj.achievements.map((ach: string, idx: number) => (
                      <li key={idx} className="pl-1">{ach}</li>
                    ))}
                  </ul>
                  {proj.techStack && (
                    <div className="text-xs text-gray-500"><span className="font-medium text-gray-700">Technologies:</span> {proj.techStack}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {awards.length > 0 && (
          <div>
            <h2 className="text-gray-900 font-bold tracking-widest uppercase border-b-2 border-gray-100 pb-2 mb-4">Awards</h2>
            <ul className="list-disc list-outside ml-4 space-y-2 text-xs text-gray-600 leading-relaxed">
              {awards.map((award: Award) => (
                <li key={award.id} className="pl-1">{award.description}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
});

ResumePreviewModern.displayName = "ResumePreviewModern";
export default ResumePreviewModern;
