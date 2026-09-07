import { FoodCategory } from "../../schemas/food-category-schema.js";

export const getFoodCategoryController = async (request, response) => {
  try {
    const foodCategories = await FoodCategory.find();
    response.status(200).json({ message: "Food Categories Found", foodCategories });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};