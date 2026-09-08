// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb+srv://maagii458_db_user:myPassword@food-delivery.jqua7p8.mongodb.net/?appName=food-delivery");
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.log(err);
//   } 
// }

import dns from "dns";
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://maagii458_db_user:Test123456789@food-delivery.jqua7p8.mongodb.net/food-delivery"
    );

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
};