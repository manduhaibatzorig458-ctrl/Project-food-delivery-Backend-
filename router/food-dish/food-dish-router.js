// import express from "express"

// import { getFoodDishController } from "../../controllers/food-dish/get-food-dish.js"
// import { deleteFoodCategoryController } from "../../controllers/food-dish/delete-food-dish.js"
// import { updateFoodDishController } from "../../controllers/food-dish/update-food-dish.js"
// import { getFoodByCategoryController } from "../../controllers/food-dish/get-fooddish-by-category.js"

// const router = express.foodDishRouter()

// foodDishRouter.get("/food", getFoodDishController);
// foodDishRouter.get("/food/:categoryId", getFoodDishByCategoryController);
// foodDishRouter.put("/food/:foodId", updateFoodDishController);
// foodDishRouter.delete("/food/:foodId", deleteFoodDishController);

import express from "express";

import { getFoodDishController } from "../../controllers/food-dish/get-food-dish.js";
import { deleteFoodDishController } from "../../controllers/food-dish/delete-food-dish.js";
import { updateFoodDishController } from "../../controllers/food-dish/update-food-dish.js";
import { getFoodDishByCategoryController } from "../../controllers/food-dish/get-fooddish-by-category.js";
import { createFoodDishController } from "../../controllers/food-dish/create-food-dish.js";

const foodDishRouter = express.Router();

foodDishRouter.get("/food/get", getFoodDishController);

foodDishRouter.get("/food/get/:categoryId", getFoodDishByCategoryController);

foodDishRouter.post("/create", createFoodDishController);

foodDishRouter.put("/food/:foodId", updateFoodDishController);

foodDishRouter.delete("/food/:foodId", deleteFoodDishController);

export default foodDishRouter;
