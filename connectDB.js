import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://maagii458_db_user:myPassword@ac-l7znulz-shard-00-00.jqua7p8.mongodb.net:27017,ac-l7znulz-shard-00-01.jqua7p8.mongodb.net:27017,ac-l7znulz-shard-00-02.jqua7p8.mongodb.net:27017/?tls=true&authSource=admin&retryWrites=true&w=majority"
    );

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};