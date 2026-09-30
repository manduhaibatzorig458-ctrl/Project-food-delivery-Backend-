import { Router } from "express";
import { getAllFoodOrders } from "../../controllers/food-order/get-food-orders.js";
import { updateFoodOrderStatus } from "../../controllers/food-order/update-food-order-status.js";
import { requireToken } from "../../middleware/require-token.js";
import { requireAdmin } from "../../middleware/require-admin.js";

export const adminFoodOrderRouter = Router();

adminFoodOrderRouter.use(requireToken, requireAdmin);

adminFoodOrderRouter.get("/", getAllFoodOrders);           // GET /admin/orders
adminFoodOrderRouter.patch("/:id", updateFoodOrderStatus); // PATCH /admin/orders/:id