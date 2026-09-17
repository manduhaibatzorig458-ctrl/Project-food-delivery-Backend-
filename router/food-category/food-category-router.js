import express, { request, response } from "express";

import { createFoodCategoryController } from "../../controllers/food-category/create-food-category.js";
import { getFoodCategoryController } from "../../controllers/food-category/get-food-category.js";
import { updateFoodCategoryController } from "../../controllers/food-category/update-food-category.js";
import { deleteFoodCategoryController } from "../../controllers/food-category/delete-food-category.js";

const router = express.Router();


const requireCategoryName = (request, response, next) => {
    const { categoryName } = request.body;

    if (!categoryName) {
      return response.status(400).json({ message: "categoryName is required" });
    } else {
        next()
    }
}

const requireToken = (request, response, next) => {
    console.log(request.header)
}

router.post("/create", requireToken, requireCategoryName, createFoodCategoryController);
router.get("/get", getFoodCategoryController);
router.put("/update", updateFoodCategoryController);
router.delete("/delete/:id",deleteFoodCategoryController);

export default router;