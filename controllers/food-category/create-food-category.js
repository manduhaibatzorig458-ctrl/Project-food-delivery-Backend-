import { FoodCategory } from "../../schemas/food-category-schema.js";

export const createFoodCategoryController = async (request, response) => {
  try {
    const { categoryName } = request.body;

    if (!categoryName) {
      return response.status(400).json({ message: "categoryName is required" });
    }

    const foodCategory = await FoodCategory.create({ categoryName });

    console.log("food category created suc", foodCategory);

    response.status(201).json({ message: "food category created", foodCategory });
  } catch (error) {
    console.log("error", error);
    response.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};