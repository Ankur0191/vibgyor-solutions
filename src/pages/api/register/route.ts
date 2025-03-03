import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);

export async function POST(req: NextRequest) {
  try {
    const { userId, eventTitle, userEmail } = await req.json();
    await client.connect();
    const db = client.db("vibgyor"); // Replace with your DB name
    const collection = db.collection("registrations");

    // Check if user is already registered for this event
    const existingRegistration = await collection.findOne({ userId, eventTitle });
    if (existingRegistration) {
      return NextResponse.json({ message: "Already registered!" }, { status: 400 });
    }

    // Save registration
    await collection.insertOne({ userId, eventTitle, userEmail, registeredAt: new Date() });

    return NextResponse.json({ message: "Successfully registered!" }, { status: 201 });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
