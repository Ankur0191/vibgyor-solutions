import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  clerkId: string;
  name: string;
  email: string;
  university?: string;
  course?: string;
  progress: {
    achievements: string[];
    ongoingActivities: string[];
  };
  certificates: {
    title: string;
    issuedDate: Date;
    approved: boolean;
  }[];
}

const StudentSchema: Schema = new Schema({
  clerkId: { type: String, required: true, unique: true }, // Linking to Clerk
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  university: { type: String },
  course: { type: String },
  progress: {
    achievements: { type: [String], default: [] },
    ongoingActivities: { type: [String], default: [] },
  },
  certificates: [
    {
      title: { type: String, required: true },
      issuedDate: { type: Date, default: Date.now },
      approved: { type: Boolean, default: false },
    },
  ],
});

const Student =
  mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);
export default Student;
