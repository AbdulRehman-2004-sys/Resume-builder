"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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

type ResumeStore = {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  currentStep: number;
  setCurrentStep: (step: number | ((prev: number) => number)) => void;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  updateSkills: (skills: Skill[]) => void;
  updateExperience: (experience: Experience[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateEducation: (education: Education[]) => void;
  updateAwards: (awards: Award[]) => void;
  resumeId: string | null;
  setResumeId: (id: string | null) => void;
  slug: string | null;
  setSlug: (slug: string | null) => void;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  resetToInitial: () => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: initialData,
      setResumeData: (data) => set({ resumeData: data }),
      currentStep: 1,
      setCurrentStep: (step) => set((state) => ({ 
        currentStep: typeof step === 'function' ? step(state.currentStep) : step 
      })),
      updatePersonalInfo: (data) => set((state) => ({
        resumeData: { ...state.resumeData, personalInfo: { ...state.resumeData.personalInfo, ...data } }
      })),
      updateSummary: (summary) => set((state) => ({
        resumeData: { ...state.resumeData, summary }
      })),
      updateSkills: (skills) => set((state) => ({
        resumeData: { ...state.resumeData, skills }
      })),
      updateExperience: (experience) => set((state) => ({
        resumeData: { ...state.resumeData, experience }
      })),
      updateProjects: (projects) => set((state) => ({
        resumeData: { ...state.resumeData, projects }
      })),
      updateEducation: (education) => set((state) => ({
        resumeData: { ...state.resumeData, education }
      })),
      updateAwards: (awards) => set((state) => ({
        resumeData: { ...state.resumeData, awards }
      })),
      resumeId: null,
      setResumeId: (id) => set({ resumeId: id }),
      slug: null,
      setSlug: (slug) => set({ slug }),
      selectedTemplate: "classic",
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
      resetToInitial: () => set({ resumeData: initialData }),
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state })
    }),
    {
      name: 'resumeBuilderDraft',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      }
    }
  )
);
