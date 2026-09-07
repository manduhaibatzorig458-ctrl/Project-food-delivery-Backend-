import express from "express";
import mongoose from "mongoose";
import { User } from "./schemas/user-schema.js";
import { connectDB } from "./connectDB.js";
import authRouter from "./router/auth/auth.js";


const app = express();
const PORT = 1000;

app.use(express.json());
connectDB();

app.use("/auth", authRouter)

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

app.patch("/food-category/:foodCategoryId", async (request, response) => {
  try {
    const { foodCategoryId } = request.params;
    const foodCategory = await FoodCategory.findByIdAndUpdate(
      foodCategoryId,
      request.body,
      { new: true }
    );
    if (!foodCategory) {
      return response.status(404).json({ message: "Food category not found" });
    }
    response.status(200).json({ message: "food category updated", foodCategory });
  } catch (error) {
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