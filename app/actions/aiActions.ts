"use server";

import OpenAI from 'openai';
import { createClient } from '../lib/supabase-server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeResumeWithAI(resumeData: any) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const prompt = `
      You are an expert ATS (Applicant Tracking System) and senior technical recruiter. 
      Analyze the following resume data and provide a JSON response containing:
      1. An "atsScore" (number from 0 to 100).
      2. A "summary" string (a brief 2-3 sentence overall evaluation).
      3. An array of "feedback" objects. Instead of general advice, extract specific weak or poorly written text/concepts from the resume (as "weakness") and write a direct, ATS-friendly, highly professional corrected version for it (as "improvement").
      
      Here is the resume data:
      ${JSON.stringify(resumeData)}
      
      Respond ONLY with valid JSON matching this schema:
      {
        "atsScore": number,
        "summary": string,
        "feedback": [
          {
            "weakness": string,
            "improvement": string
          }
        ]
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // using latest model
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that outputs only valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        }
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    const result = JSON.parse(content);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    return { success: false, error: error.message || "Failed to analyze resume" };
  }
}
