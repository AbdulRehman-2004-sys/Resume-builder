"use client";

import React, { forwardRef } from "react";
import { useResumeStore } from "../store/useResumeStore";

const ResumePreview = forwardRef<HTMLDivElement>((props, ref) => {
  const { resumeData } = useResumeStore();
  const { personalInfo, summary, skills, experience, projects, education, awards } = resumeData;

  // The design requires black/white, exact borders, and standard fonts (like Arial or Inter).
  return (
    <div 
      ref={ref}
      className="bg-white text-black w-[794px] min-h-[1123px] shadow-2xl box-border p-2 font-sans text-sm mx-auto print:shadow-none print:m-0"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
        {/* HEADER */}
        <div className="mb-2 text-center sm:text-left">
          <h1 className="text-4xl font-bold tracking-tight">{personalInfo.name}</h1>
          <div className="flex justify-between items-start text-xs leading-relaxed border-b border-black">
            <div className="flex flex-col">
              {personalInfo.linkedin && (
                <div className="flex gap-2">
                  <span className="font-bold w-16">Linkedin:</span>
                  <a href={personalInfo.linkedin}>{personalInfo.linkedin}</a>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex gap-2">
                  <span className="font-bold w-16">Github:</span>
                  <a href={personalInfo.github}>{personalInfo.github}</a>
                </div>
              )}
              {personalInfo.portfolio && (
                <div className="flex gap-2">
                  <span className="font-bold w-16">Portfolio:</span>
                  <a href={personalInfo.portfolio}>{personalInfo.portfolio}</a>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1 items-end">
              {personalInfo.email && (
                <div className="flex items-center gap-2 font-bold">
                  <span>✉</span> {personalInfo.email}
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2 font-bold">
                  <span>📞</span> {personalInfo.phone}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        {summary && (
          <div className="text-justify">
            <div className="text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: summary }} />
          </div>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="">
            <h2 className="text-lg font-bold text-center border-t border-black my-1 underline decoration-2 underline-offset-4">Skills</h2>
            <ul className="text-xs ">
              {skills.map((skill, index) => (
                <li key={index} className="flex">
                  <span className="font-bold w-28 shrink-0">• {skill.category}:</span>
                  <span>{skill.items}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <div className="">
            <h2 className="text-lg font-bold text-center border-t border-black my-1 underline decoration-2 underline-offset-4">Work Experience</h2>
            <div className="space-y-2 text-xs">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold mb-1">
                    <span>{exp.title} | {exp.company}</span>
                    <span>{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="leading-snug">{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {projects.length > 0 && (
          <div className="">
            <h2 className="text-lg font-bold text-center border-t border-black my-1 underline decoration-2 underline-offset-4">Projects</h2>
            <div className="space-y-2 text-xs">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="font-bold mb-1">
                    {proj.title} | <a href={proj.link}>{proj.link}</a>
                  </div>
                  <ul className="list-disc list-inside space-y-1 pl-1 mb-1">
                    {proj.achievements.map((ach, idx) => (
                      <li key={idx} className="leading-snug">{ach}</li>
                    ))}
                  </ul>
                  {proj.techStack && (
                    <div className="pl-1">
                      <span className="font-bold underline">Tech Stack:</span> {proj.techStack}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <div className="">
            <h2 className="text-lg font-bold text-center border-t border-black my-1 underline decoration-2 underline-offset-4">Education</h2>
            <div className="space-y-2 text-xs">
              {education.map((ed) => (
                <div key={ed.id}>
                  <div className="flex justify-between font-bold">
                    <span>{ed.institution}</span>
                    <span>{ed.startDate} – {ed.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{ed.degree}</span>
                    {ed.gpa && <span className="font-extrabold">GPA: {ed.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AWARDS */}
        {awards.length > 0 && (
          <div className="">
            <h2 className="text-lg font-bold text-center border-t border-black my-1 underline decoration-2 underline-offset-4">Awards & Achievements</h2>
            <ul className="list-disc list-inside text-xs space-y-1 pl-1">
              {awards.map((award) => (
                <li key={award.id} className="leading-snug">{award.description}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
  );
});

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;
