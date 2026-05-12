import mongoose, { Schema, Document } from "mongoose";

export interface IResume extends Document {
  slug: string;
  data: any; // Storing the whole JSON context here
}

const ResumeSchema: Schema = new Schema(
  {
    slug: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true }, // Mixed type for arbitrary JSON
  },
  { timestamps: true }
);

// Prevent mongoose from compiling the model multiple times in Next.js development
export default mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);
