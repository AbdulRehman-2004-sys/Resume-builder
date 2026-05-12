import React from "react";
import { getResumeById } from "../../actions/resumeActions";
import { notFound } from "next/navigation";
import { ResumeProvider } from "../../context/ResumeContext";
import LiveResumeContent from "./LiveResumeContent";

export default async function LiveResumePage({ params }: { params: { slug: string; id: string } }) {
  const { id } = params;

  const result = await getResumeById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const resumeData = result.data;

  return (
    <ResumeProvider>
      <LiveResumeContent initialData={resumeData} />
    </ResumeProvider>
  );
}
