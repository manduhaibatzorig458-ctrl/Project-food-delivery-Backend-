import { Router } from "express";
import { createFoodOrder } from "../../controllers/food-order/create-food-order.js";
import { getMyFoodOrders } from "../../controllers/food-order/get-food-orders.js";
import { requireToken } from "../../middleware/require-token.js";

export const foodOrderRouter = Router();

foodOrderRouter.post("/", requireToken, createFoodOrder);  // POST /orders
foodOrderRouter.get("/me", requireToken, getMyFoodOrders); // GET /orders/me