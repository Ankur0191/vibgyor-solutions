import { NextApiRequest, NextApiResponse } from "next";
import {dbConnect} from "@/databases/dbConnect";
import Student from "@/databases/models/student";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const { clerkId, name, email } = req.query;

    try {
      let student = await Student.findOne({ clerkId });

      if (!student) {
        console.log("⚠️ Student not found. Creating new student...");
        student = await Student.create({
          clerkId,
          name,
          email,
          university: "",
          course: "",
          progress: { achievements: [], ongoingActivities: [] },
          certificates: [],
        });
      }

      return res.status(200).json(student);
    } catch (error) {
      console.error("❌ Error fetching student:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  if (req.method === "PATCH") {
    const { clerkId, university, course } = req.body;

    if (!clerkId) return res.status(400).json({ error: "clerkId is required" });

    try {
      const student = await Student.findOneAndUpdate(
        { clerkId },
        { university, course },
        { new: true }
      );

      if (!student) return res.status(404).json({ error: "Student not found" });

      return res.status(200).json(student);
    } catch (error) {
      console.error("❌ Error updating student:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
