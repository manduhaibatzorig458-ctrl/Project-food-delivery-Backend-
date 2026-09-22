import { FoodDish } from "../../schemas/food-dish-schema.js";

// GET /food/:categoryId
// Тухайн category-д хамаарах бүх хоолыг авах
const getFoodByCategoryController = async (request, response) => {
  try {
    const { categoryId } = request.params;

    const foods = await FoodDish.find({ category: categoryId }).populate(
      "category"
    );

    if (!foods || foods.length === 0) {
      return response.status(404).json({ message: "Энэ category-д хоол олдсонгүй" });
    }

    return response.status(200).json(foods);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export default getFoodByCategory;