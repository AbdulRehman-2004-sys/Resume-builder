"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
};

export type Skill = {
  category: string;
  items: string;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  achievements: string[];
};

export type Project = {
  id: string;
  title: string;
  link: string;
  achievements: string[];
  techStack: string;
};

export type Education = {
  id: string;
  institution: string;
  startDate: string;
  endDate: string;
  degree: string;
  gpa: string;
};

export type Award = {
  id: string;
  description: string;
};

export type ResumeData = {
  personalInfo: PersonalInfo;
  summary: string;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  awards: Award[];
};

const initialData: ResumeData = {
  personalInfo: {
    name: "Abdul Rehman",
    email: "abdhrehmanryk80@gmail.com",
    phone: "+92 3258262894",
    linkedin: "https://www.linkedin.com/in/abdul-rehman4002",
    github: "https://github.com/AbdulRehman-2004-sys",
    portfolio: "https://abdulrehman-2004.netlify.app",
  },
  summary: "FullStack MERN Developer with hands-on experience building scalable web applications and real-time systems. Skilled in React.js, Node.js, MongoDB with a strong focus on performance optimization, responsive design, and modern UI/UX. Proven ability to develop production-ready applications, integrate APIs, and collaborate in team environments.",
  skills: [
    { category: "Languages", items: "JavaScript (ES6+), TypeScript, HTML5, CSS3" },
    { category: "Frontend", items: "React.js, Next.js, Three.js, React Three Fiber, Tailwind CSS, GSAP, Framer Motion" },
    { category: "Backend", items: "Node.js, Express.js" },
    { category: "Databases", items: "MongoDB, MySQL, Supabase" },
    { category: "Tools", items: "Git, GitHub, Postman, Thunder Client, Notion" },
    { category: "Platforms", items: "Vercel, Netlify, Render, Cloudinary, GitHub Actions (CI/CD)" },
    { category: "SOFT SKILLS", items: "Problem Solving • Communication • Teamwork • Time Management • Adaptability" },
  ],
  experience: [
    {
      id: "1",
      title: "Frontend Developer Intern",
      company: "AZLogics DEV",
      startDate: "July 2025",
      endDate: "August 2025",
      achievements: [
        "Built responsive frontend features with React and Next.js, increasing accessibility and usability",
        "Collaborated with senior developers to deliver UI improvements ahead of deadlines",
        "Integrated dynamic API data rendering, improving real-time content delivery",
      ],
    },
    {
      id: "2",
      title: "Frontend Developer Intern",
      company: "TechXudo",
      startDate: "December 2024",
      endDate: "April 2025",
      achievements: [
        "Built responsive React UIs in a team, improving page load speed by 25% and cross-device usability",
        "Integrated REST APIs for efficient data flow and reduced client-side delays",
        "Optimized rendering and layout logic, enhancing overall user experience and speed",
      ],
    },
  ],
  projects: [
    {
      id: "1",
      title: "Quick Jobs",
      link: "https://job-portal-25.vercel.app",
      achievements: [
        "Built a responsive React job portal, improving cross-device load speed by 30% and enhancing user engagement",
        "Integrated REST APIs for dynamic job listings and optimized data fetching for faster performance",
      ],
      techStack: "React.js, Redux Toolkit, Three.js, Tailwind CSS, JavaScript (ES6+), Node.js, Express.js, MongoDB, Cloudinary, GSAP",
    },
  ],
  education: [
    {
      id: "1",
      institution: "Khawaja Fareed University of Engineering and Information Technology",
      startDate: "September 2023",
      endDate: "July 2027",
      degree: "BS Software Engineering",
      gpa: "3.84",
    },
    {
      id: "2",
      institution: "Oxbridge College",
      startDate: "September 2021",
      endDate: "March 2023",
      degree: "F.Sc pre-engineering",
      gpa: "A",
    },
  ],
  awards: [
    {
      id: "1",
      description: "Secured 2nd Place out of 50+ participants in the University-Level Computing Competition at KFUEIT (2024), demonstrating strong algorithmic problem-solving and technical execution under time constraints.",
    },
  ],
};

type ResumeContextType = {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  updateSkills: (skills: Skill[]) => void;
  updateExperience: (experience: Experience[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateEducation: (education: Education[]) => void;
  updateAwards: (awards: Award[]) => void;
  resumeId: string | null;
  setResumeId: React.Dispatch<React.SetStateAction<string | null>>;
  slug: string | null;
  setSlug: React.Dispatch<React.SetStateAction<string | null>>;
  selectedTemplate: string;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<string>>;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("classic");

  // Load from URL if present (for "Share Link" functionality)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const dataParam = urlParams.get("data");
      if (dataParam) {
        try {
          const decodedData = JSON.parse(decodeURIComponent(atob(dataParam)));
          setResumeData(decodedData);
        } catch (error) {
          console.error("Failed to parse resume data from URL", error);
        }
      }
    }
  }, []);

  const updatePersonalInfo = (data: Partial<PersonalInfo>) => {
    setResumeData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, ...data } }));
  };

  const updateSummary = (summary: string) => {
    setResumeData((prev) => ({ ...prev, summary }));
  };

  const updateSkills = (skills: Skill[]) => {
    setResumeData((prev) => ({ ...prev, skills }));
  };

  const updateExperience = (experience: Experience[]) => {
    setResumeData((prev) => ({ ...prev, experience }));
  };

  const updateProjects = (projects: Project[]) => {
    setResumeData((prev) => ({ ...prev, projects }));
  };

  const updateEducation = (education: Education[]) => {
    setResumeData((prev) => ({ ...prev, education }));
  };

  const updateAwards = (awards: Award[]) => {
    setResumeData((prev) => ({ ...prev, awards }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        currentStep,
        setCurrentStep,
        updatePersonalInfo,
        updateSummary,
        updateSkills,
        updateExperience,
        updateProjects,
        updateEducation,
        updateAwards,
        resumeId,
        setResumeId,
        slug,
        setSlug,
        selectedTemplate,
        setSelectedTemplate,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResumeContext must be used within a ResumeProvider");
  }
  return context;
};
