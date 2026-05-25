"use server";

import { createClient } from "../lib/supabase-server";

export async function saveResume(resumeData: any, existingId?: string | null) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const fullName = resumeData.personalInfo?.name || "anonymous";
    let baseSlug = fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (!baseSlug) baseSlug = "resume";

    if (existingId && existingId !== 'new') {
      // Update existing record
      // We don't update the slug here to prevent breaking existing shared links
      // and to avoid duplicate key violations if the generated baseSlug is already taken.
      const { data: updatedResume, error } = await supabase
        .from("resumes")
        .update({ data: resumeData })
        .eq("id", existingId)
        .eq("user_id", user.id)
        .select()
        .single();
        
      if (error) throw error;

      if (updatedResume) {
        return { success: true, id: updatedResume.id, slug: updatedResume.slug };
      }
    }

    // Create a unique slug if creating new
    let slug = baseSlug;
    let count = 1;
    
    // Function to check if slug exists
    const checkSlugExists = async (checkSlug: string) => {
      const { data } = await supabase
        .from("resumes")
        .select("id")
        .eq("slug", checkSlug)
        .maybeSingle(); // Use maybeSingle to avoid errors when no rows are found
      return !!data;
    };
    
    while (await checkSlugExists(slug)) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    // Create new record
    const { data: newResume, error } = await supabase
      .from("resumes")
      .insert({
        slug,
        data: resumeData,
        user_id: user.id
      })
      .select()
      .single();
      
    if (error) throw error;

    return { success: true, id: newResume.id, slug: newResume.slug };
  } catch (error: any) {
    console.error("Error saving resume:", error);
    return { success: false, error: error.message || "Failed to save resume" };
  }
}

export async function getResumeById(id: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: resume, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("id", id)
      .maybeSingle();
      
    if (error || !resume) {
      return { success: false, error: "Resume not found" };
    }
    
    // Optional: check if the user is the owner, or if you want resumes to be public for viewing.
    // We will allow anyone to view it if they have the ID/slug, but only owner can edit.
    
    return {
      success: true,
      data: typeof resume.data === 'string' ? JSON.parse(resume.data) : resume.data,
      slug: resume.slug,
      isOwner: user?.id === resume.user_id,
    };
  } catch (error) {
    console.error("Error fetching resume:", error);
    return { success: false, error: "Failed to fetch resume" };
  }
}

export async function getUserResumes() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const { data: resumes, error } = await supabase
      .from("resumes")
      .select("id, slug, created_at, data")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return {
      success: true,
      data: resumes.map(r => ({
        id: r.id,
        slug: r.slug,
        created_at: r.created_at,
        // just extract the name and job title for preview
        name: r.data?.personalInfo?.name || "Untitled Resume",
        title: r.data?.experience?.[0]?.title || "Resume",
      }))
    };
  } catch (error: any) {
    console.error("Error fetching user resumes:", error);
    return { success: false, error: error.message || "Failed to fetch resumes" };
  }
}
