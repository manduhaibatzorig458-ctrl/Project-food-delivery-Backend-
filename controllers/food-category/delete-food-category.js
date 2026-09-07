import { FoodCategory } from "../../schemas/food-category-schema.js";

export const deleteFoodCategoryController = async (request, response) => {
  try {
    const { id } = request.body;

    const deletedCategory = await FoodCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return response.status(404).json({ message: "Food Category Not Found" });
    }

    response.status(200).json({ message: "Deleted", deletedCategory });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};