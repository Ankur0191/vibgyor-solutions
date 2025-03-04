import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("vibgyor");
const collection = db.collection("registrations");

export async function GET() {
  const registrations = await collection.find({}).toArray();
  return NextResponse.json(registrations);
}

export async function POST(req: Request) {
  const { event } = await req.json();
  await collection.insertOne(event);
  return NextResponse.json({ success: true });
}
