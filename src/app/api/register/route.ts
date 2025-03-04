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
  const { event, user } = await req.json();

  if (!event || !user) {
    return NextResponse.json({ error: "Missing event or user data" }, { status: 400 });
  }

  await collection.insertOne({ ...event, user });
  return NextResponse.json({ success: true });
}
