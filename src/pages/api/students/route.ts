import { NextResponse } from "next/server";
import { dbConnect } from "../../../databases/dbConnect";
import Student from "../../../databases/models/student";

export async function GET(req: Request) {
  console.log("🔄 API `/api/student` called...");
  
  await dbConnect();  // Ensure this is being called

  const url = new URL(req.url);
  const clerkId = url.searchParams.get("clerkId");
  const name = url.searchParams.get("name");
  const email = url.searchParams.get("email");

  console.log("📩 Received params:", { clerkId, name, email });

  if (!clerkId || !name || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    let student = await Student.findOne({ clerkId });

    if (!student) {
      console.log("⚠️ Student not found, creating new one...");
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

    return NextResponse.json(student);
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
