import express from "express"

import { getFoodDishController } from "../../controllers/food-dish/get-food-dish.js"
import { deleteFoodCategoryController } from "../../controllers/food-dish/delete-food-dish.js"
import { updateFoodDishController } from "../../controllers/food-dish/update-food-dish.js"
import { getFoodByCategoryController } from "../../controllers/food-dish/get-fooddish-by-category.js"

const router = express.foodDishRouter()

foodDishRouter.get("/food", getFoodDishController);
foodDishRouter.get("/food/:categoryId", getFoodDishByCategoryController);
foodDishRouter.put("/food/:foodId", updateFoodDishController);
foodDishRouter.delete("/food/:foodId", deleteFoodDishController);