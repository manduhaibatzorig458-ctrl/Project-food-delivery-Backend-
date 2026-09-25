import express from "express";

import { getFoodDishController } from "../../controllers/food-dish/get-food-dish.js";
import { deleteFoodDishController } from "../../controllers/food-dish/delete-food-dish.js";
import { updateFoodDishController } from "../../controllers/food-dish/update-food-dish.js";
import { getFoodDishByCategoryController } from "../../controllers/food-dish/get-fooddish-by-category.js";
import { createFoodDishController } from "../../controllers/food-dish/create-food-dish.js";

const foodDishRouter = express.Router();
foodDishRouter.get("/get", getFoodDishController);
foodDishRouter.get("/get/:categoryId", getFoodDishByCategoryController);
foodDishRouter.post("/create", createFoodDishController);
foodDishRouter.put("/:foodId", updateFoodDishController);
foodDishRouter.delete("/:foodId", deleteFoodDishController);

export default foodDishRouter;


// hellod 