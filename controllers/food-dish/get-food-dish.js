import { FoodDish } from "../models/food-dish-schema.js";

export const getFoodDishController = async (request, response) => {
    try {
      const foodDishes = await FoodDish.find();
      response.status(200).json({ message: "Food Dishes Found", foodDishes });
    } catch (error) {
      response.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


