import { FoodDish } from "../models/food-dish-schema.js";
 
export const deleteFoodDishController = async (request, response) => {
  try {
    const { foodId } = request.params;
 
    const deletedFoodDish = await FoodDish.findByIdAndDelete(foodId);
 
    if (!deletedFoodDish) {
      return response.status(404).json({ message: "Food Dish Not Found" });
    }
 
    response.status(200).json({ message: "Deleted", deletedFoodDish });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};