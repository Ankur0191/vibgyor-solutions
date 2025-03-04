import { NextResponse } from "next/server";
import { dbConnect } from "@/databases/dbConnect";
import Student from "@/databases/models/student";

// ✅ GET: Fetch student details (Auto-update name if null)
export const GET = async (req: Request) => {
  console.log("🔄 API `/api/students` called...");

  await dbConnect().catch((err) => console.error("❌ Database connection error:", err));

  const url = new URL(req.url);
  const clerkId = url.searchParams.get("clerkId");

  console.log("📩 Received Clerk ID:", clerkId);

  if (!clerkId) {
    return NextResponse.json({ error: "Missing Clerk ID" }, { status: 400 });
  }

  try {
    let student = await Student.findOne({ clerkId });

    // ✅ If student exists but has a null or unknown name, fetch from Clerk API
    if (student && (!student.name || student.name === "null" || student.name === "Unknown User")) {
      console.log("⚠️ Student exists but `name` is invalid. Fetching from Clerk...");

      const clerkResponse = await fetch(`https://api.clerk.dev/v1/users/${clerkId}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      });

      if (clerkResponse.ok) {
        const clerkUser = await clerkResponse.json();
        const name = clerkUser?.username || clerkUser?.first_name || clerkUser?.last_name || "Unknown User";

        // ✅ Update student name in MongoDB
        student.name = name;
        await student.save();
        console.log("✅ Updated student name:", name);
      } else {
        console.error("❌ Failed to fetch name from Clerk API.");
      }
    }

    // ✅ If student does not exist, create new student
    if (!student) {
      console.log("⚠️ Student not found, creating new one...");

      const clerkResponse = await fetch(`https://api.clerk.dev/v1/users/${clerkId}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      });

      let name = "Unknown User";
      let email = "unknown@example.com";

      if (clerkResponse.ok) {
        const clerkUser = await clerkResponse.json();
        name = clerkUser?.username || clerkUser?.first_name || clerkUser?.last_name || name;
        email = clerkUser?.email_addresses?.[0]?.email_address || email;
      }

      student = await Student.create({
        clerkId,
        name,
        email,
        university: "",
        course: "",
        progress: { achievements: [], ongoingActivities: [] },
        certificates: [],
      });

      console.log("✅ New student created:", student);
    }

    console.log("✅ Student data retrieved:", student);
    return NextResponse.json(student);
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

// ✅ PATCH: Update Student Data (Allows name, university, course update)
export const PATCH = async (req: Request) => {
  console.log("🔄 PATCH `/api/students` called...");

  await dbConnect().catch((err) => console.error("❌ Database connection error:", err));

  try {
    const bodyText = await req.text();
    if (!bodyText) {
      console.error("❌ Empty request body received");
      return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
    }

    const body = JSON.parse(bodyText);
    const { clerkId, name, university, course } = body;

    console.log("📩 Updating student for Clerk ID:", clerkId);

    if (!clerkId) {
      return NextResponse.json({ error: "Missing Clerk ID" }, { status: 400 });
    }

    let student = await Student.findOne({ clerkId });

    if (!student) {
      console.log("⚠️ Student not found for update. Creating a new one...");

      // ✅ Fetch user details from Clerk API
      const clerkResponse = await fetch(`https://api.clerk.dev/v1/users/${clerkId}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      });

      let fetchedName = "Unknown User";
      let email = "unknown@example.com";

      if (clerkResponse.ok) {
        const clerkUser = await clerkResponse.json();
        fetchedName = clerkUser?.username || clerkUser?.first_name || clerkUser?.last_name || fetchedName;
        email = clerkUser?.email_addresses?.[0]?.email_address || email;
      }

      // ✅ Create new student if missing
      student = await Student.create({
        clerkId,
        name: name || fetchedName,
        email,
        university: university || "",
        course: course || "",
        progress: { achievements: [], ongoingActivities: [] },
        certificates: [],
      });
    } else {
      student.name = name ?? student.name; // ✅ Allow name update
      student.university = university ?? student.university; // ✅ Keep existing if not updated
      student.course = course ?? student.course; // ✅ Keep existing if not updated
      await student.save();
    }

    console.log("✅ Student updated successfully:", student);
    return NextResponse.json(student);
  } catch (error) {
    console.error("❌ PATCH API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
