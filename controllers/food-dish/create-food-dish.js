import FoodDish from "../../schemas/food-dish-schema.js";

export const createFoodDishController = async (request, response) => {
  try {
    const { foodName, dishName, foodPrice, price, ingredients, categoryId, image } =
      request.body;

    const resolvedName = foodName || dishName;
    const resolvedPrice = foodPrice || price;

    if (!resolvedName) {
      return response.status(400).json({ message: "Food name is required" });
    }

    if (!resolvedPrice) {
      return response.status(400).json({ message: "Food price is required" });
    }

    if (!categoryId) {
      return response.status(400).json({ message: "categoryId is required" });
    }

    const newDish = await FoodDish.create({
      foodName: resolvedName,
      foodPrice: resolvedPrice,
      ingredients: ingredients || "",
      categoryId,
      image: image || "",
    });

    return response.status(201).json({
      message: "Dish created successfully",
      foodDish: newDish,
    });
  } catch (error) {
    console.error("CREATE FOOD DISH ERROR:", error);
    return response.status(500).json({ message: "Failed to create dish" });
  }
};