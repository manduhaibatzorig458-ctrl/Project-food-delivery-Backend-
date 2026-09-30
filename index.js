import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRouter from "./router/auth/auth.js";
import foodCategoryRouter from "./router/food-category/food-category-router.js";
import foodDishRouter from "./router/food-dish/food-dish-router.js";
import { foodOrderRouter } from "./router/food-order/food-order-router.js";
import { adminFoodOrderRouter } from "./router/food-order/admin-food-order-router.js";
import { usersRouter } from "./router/users-router.js";

import { User } from "./schemas/user-schema.js";
import { connectDB } from "./connectDB.js";

const app = express();
const PORT = 1000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());
connectDB();

app.use("/auth", authRouter);
app.use("/food-category", foodCategoryRouter);
app.use("/food-dish", foodDishRouter);
app.use("/orders", foodOrderRouter);
app.use("/admin/orders", adminFoodOrderRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




// mongodb+srv://maagii458_db_user:maagii458_db_user@cluster0.o9aoqqe.mongodb.net/
// 