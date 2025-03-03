import mongoose from "mongoose";

export async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ Already connected to MongoDB");
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ MONGODB_URI is missing in .env.local");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Successfully connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Stop the app if DB connection fails
  }
}
