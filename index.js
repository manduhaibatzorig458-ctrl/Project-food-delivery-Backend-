import express from "express";
import mongoose from "mongoose";
import { User } from "./schemas/user-schema.js";
import { connectDB } from "./connectDB.js";
import { FoodCategory } from "./schemas/food-category-schema.js";

const app = express();
const PORT = 1000;

app.use(express.json());
connectDB();

app.post("/sign-up", async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.create({ email, password });
 
    console.log("--> Шинэ хэрэглэгч амжилттай хадгалагдлаа:", user);
 
    response.status(201).json({ message: "user created", user });
  } catch (error) {
    console.log("error", error);
    response.status(500).json({message: "Internal Server Error" ,error: error.message });
  }
})

app.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    console.log(email, password);
    const user = await User.findOne({ email: email });
    if(!user) {
      return response.status(404).json({ message: "User not found" });
    }
      return response.status(200).json({ message: "user found", user: user});
 
  } catch (error) {
      response.status(500).json({message: "Internal Server Error" ,error: error.message });
  }
})

// FOOD CAREGORY 

 app.get("/food-category", async (request, response) => {
  try {
    const foodCategories = await FoodCategory.find();
    response.status(200).json({ message: "food categories fetched", foodCategories });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error: error.message });
  }
})

app.post("/food-category", async (request, response) => {
  try {
    const { categoryName } = request.body;
    const foodCategory = await FoodCategory.create({ categoryName });
 
    console.log("--> Шинэ ангилал амжилттай хадгалагдлаа:", foodCategory);
 
    response.status(201).json({ message: "food category created", foodCategory });
  } catch (error) {
    console.log("error", error);
    response.status(500).json({ message: "Internal Server Error", error: error.message });
  }
})

app.delete("/food-category/:foodCategoryId", async (request, response) => {
  try {
    const { foodCategoryId } = request.params;
    const foodCategory = await FoodCategory.findByIdAndDelete(foodCategoryId);
    if (!foodCategory) {
      return response.status(404).json({ message: "Food category not found" });
    }
    response.status(200).json({ message: "food category deleted", foodCategory });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error: error.message });
  }
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// mongodb+srv://maagii458_db_user:maagii458_db_user@cluster0.o9aoqqe.mongodb.net/
// 