import mongoose from "mongoose";

const MONGODB_CONNECT_URL = process.env.MONGO_DB || null;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECT_URL);

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
};
