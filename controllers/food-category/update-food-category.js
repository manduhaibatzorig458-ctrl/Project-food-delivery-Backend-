import { FoodCategory } from "../../schemas/food-category-schema.js";

export const updateFoodCategoryController = async (request, response) => {
  try {
    const { id, name } = request.body;

    const foodCategory = await FoodCategory.findByIdAndUpdate(
      id,
      { categoryName: name },
      { new: true }
    );

    if (!foodCategory) {
      return response.status(404).json({ message: "Food Category Not Found" });
    }

    response.status(200).json({ message: "Food Category Updated", foodCategory });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};