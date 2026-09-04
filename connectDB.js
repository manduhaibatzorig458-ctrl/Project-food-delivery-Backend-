import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://maagii458_db_user:myPassword@food-delivery.jqua7p8.mongodb.net/?appName=food-delivery");
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  } 
}


