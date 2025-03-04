import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("vibgyor");
const collection = db.collection("registrations");

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userEmail = url.searchParams.get("user");

  if (!userEmail) {
    return NextResponse.json({ error: "User email is required" }, { status: 400 });
  }

  const registrations = await collection.find({ user: userEmail }).toArray();
  return NextResponse.json(registrations);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    console.log("Received POST request:", body); // ✅ Debug log

    const { event, user } = body;

    if (!event) {
      console.error("❌ Error: Missing 'event' field.");
      return NextResponse.json({ error: "Missing 'event' field" }, { status: 400 });
    }

    if (!user) {
      console.error("❌ Error: Missing 'user' field.");
      return NextResponse.json({ error: "Missing 'user' field" }, { status: 400 });
    }

    console.log("✅ Saving to DB:", { event, user }); // ✅ Log before saving

    await collection.insertOne({ ...event, user });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
