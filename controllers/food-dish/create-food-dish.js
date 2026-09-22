import FoodDish from "../../schemas/food-dish-schema.js";

export const createFoodDishController = async (req, res) => {
  try {
    const { foodName, dishName, foodPrice, price, ingredients, categoryId, image } =
      req.body;

    // Support both naming conventions until the frontend is aligned
    const resolvedName = foodName || dishName;
    const resolvedPrice = foodPrice || price;

    if (!resolvedName) {
      return res.status(400).json({ message: "Food name is required" });
    }

    if (!resolvedPrice) {
      return res.status(400).json({ message: "Food price is required" });
    }

    if (!categoryId) {
      return res.status(400).json({ message: "categoryId is required" });
    }

    const newDish = await FoodDish.create({
      foodName: resolvedName,
      foodPrice: resolvedPrice,
      ingredients: ingredients || "",
      categoryId,
      image: image || "",
    });

    return res.status(201).json({
      message: "Dish created successfully",
      foodDish: newDish,
    });
  } catch (error) {
    console.error("CREATE FOOD DISH ERROR:", error);
    return res.status(500).json({ message: "Failed to create dish" });
  }
};