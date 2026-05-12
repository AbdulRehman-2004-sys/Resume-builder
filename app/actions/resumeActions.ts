"use server";

import connectToDatabase from "../lib/mongodb";
import Resume from "../lib/models/Resume";

export async function saveResume(resumeData: any, existingId?: string | null) {
  try {
    await connectToDatabase();

    const fullName = resumeData.personalInfo?.name || "anonymous";
    let baseSlug = fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (!baseSlug) baseSlug = "resume";

    if (existingId) {
      // Update existing record
      const updatedResume = await Resume.findByIdAndUpdate(
        existingId,
        { data: resumeData, slug: baseSlug },
        { new: true }
      );
      if (updatedResume) {
        return { success: true, id: updatedResume._id.toString(), slug: updatedResume.slug };
      }
    }

    // Create a unique slug if creating new
    let slug = baseSlug;
    let count = 1;
    while (await Resume.findOne({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    // Create new record
    const newResume = await Resume.create({
      slug,
      data: resumeData,
    });

    return { success: true, id: newResume._id.toString(), slug: newResume.slug };
  } catch (error: any) {
    console.error("Error saving resume:", error);
    return { success: false, error: error.message || "Failed to save resume" };
  }
}

export async function getResumeById(id: string) {
  try {
    await connectToDatabase();
    const resume = await Resume.findById(id).lean();
    if (!resume) {
      return { success: false, error: "Resume not found" };
    }
    return {
      success: true,
      data: JSON.parse(JSON.stringify(resume.data)),
      slug: resume.slug,
    };
  } catch (error) {
    console.error("Error fetching resume:", error);
    return { success: false, error: "Failed to fetch resume" };
  }
}
