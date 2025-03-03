const mongoose = require("mongoose");

// ✅ Correct MongoDB URI with database name
const MONGO_URI = "mongodb+srv://ankurmishra0905:VIBGYOR123@cluster1.bmpz2.mongodb.net/vibgyor";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}

async function findStudent() {
  await connectDB();
  const student = await mongoose.connection.db.collection("users").findOne({ clerkId: "user_2tJGj3qPLlrjDB0VBmazLeKFQqG" });
  console.log(student || "⚠️ Student not found!");
  mongoose.connection.close(); // Close connection after fetching
}

findStudent();
