import { FoodDish } from "../../schemas/food-dish-schema.js";

export const updateFoodDishController = async (request, response) => {
  try {
    const { foodId } = request.params;
    const { foodName, price, image, ingredients, category } = request.body;

    const foodDish = await FoodDish.findByIdAndUpdate(
      foodId,
      { foodName, price, image, ingredients, category },
      { new: true }
    );

    if (!foodDish) {
      return response.status(404).json({ message: "Food Dish Not Found" });
    }

    response.status(200).json({ message: "Food Dish Updated", foodDish });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};