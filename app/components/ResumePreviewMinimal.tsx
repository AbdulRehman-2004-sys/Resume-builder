"use client";

import React, { forwardRef } from "react";
import { useResumeStore, Skill, Experience, Project, Education, Award } from "../store/useResumeStore";

const ResumePreviewMinimal = forwardRef<HTMLDivElement>((props, ref) => {
  const { resumeData } = useResumeStore();
  const { personalInfo, summary, skills, experience, projects, education, awards } = resumeData;

  return (
    <div 
      ref={ref}
      className="bg-white text-gray-900 w-[794px] min-h-[1123px] shadow-2xl box-border p-12 font-serif mx-auto print:shadow-none print:m-0"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-normal tracking-wide mb-4 text-black">{personalInfo.name}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600 uppercase tracking-widest">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
        </div>
      </div>

      {/* SUMMARY */}
      {summary && (
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <div className="text-sm leading-loose text-gray-700 italic" dangerouslySetInnerHTML={{ __html: summary }} />
        </div>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-center mb-6 text-black">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp: Experience) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-2 border-b border-gray-200 pb-1">
                  <div className="font-bold text-sm text-black">{exp.title}, <span className="font-normal italic">{exp.company}</span></div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{exp.startDate} – {exp.endDate}</div>
                </div>
                <ul className="list-none space-y-2 text-sm text-gray-700 leading-relaxed">
                  {exp.achievements.map((ach: string, idx: number) => (
                    <li key={idx} className="relative pl-4">
                      <span className="absolute left-0 top-0 text-gray-400">-</span>
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-center mb-6 text-black mt-4">Projects</h2>
          <div className="space-y-6">
            {projects.map((proj: Project) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-2 border-b border-gray-200 pb-1">
                  <div className="font-bold text-sm text-black">{proj.title}</div>
                  <a href={proj.link} className="text-xs text-gray-500 italic hover:text-black">{proj.link}</a>
                </div>
                <ul className="list-none space-y-2 text-sm text-gray-700 leading-relaxed mb-2">
                  {proj.achievements.map((ach: string, idx: number) => (
                    <li key={idx} className="relative pl-4">
                      <span className="absolute left-0 top-0 text-gray-400">-</span>
                      {ach}
                    </li>
                  ))}
                </ul>
                {proj.techStack && (
                  <div className="text-xs text-gray-500 pl-4"><span className="uppercase tracking-wider text-[10px]">Built with:</span> {proj.techStack}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GRID FOR SKILLS & EDUCATION */}
      <div className="grid grid-cols-2 gap-12 mt-8">
        {/* EDUCATION */}
        {education.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6 text-black border-b border-black pb-2">Education</h2>
            <div className="space-y-4">
              {education.map((ed: Education) => (
                <div key={ed.id}>
                  <div className="font-bold text-sm text-black">{ed.degree}</div>
                  <div className="text-sm text-gray-700 italic">{ed.institution}</div>
                  <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{ed.startDate} – {ed.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6 text-black border-b border-black pb-2">Skills</h2>
            <div className="space-y-3">
              {skills.map((skill: Skill, index: number) => (
                <div key={index} className="text-sm">
                  <span className="font-bold text-black uppercase tracking-wider text-[10px] block mb-0.5">{skill.category}</span>
                  <span className="text-gray-700 leading-snug">{skill.items}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
});

ResumePreviewMinimal.displayName = "ResumePreviewMinimal";
export default ResumePreviewMinimal;
