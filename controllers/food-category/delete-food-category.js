// import { FoodCategory } from "../../schemas/food-category-schema.js";

// export const deleteFoodCategoryController = async (request, response) => {
//   try {
//     const { id } = request.body;

//     const deletedCategory = await FoodCategory.findByIdAndDelete(id);

//     if (!deletedCategory) {
//       return response.status(404).json({ message: "Food Category Not Found" });
//     }

//     response.status(200).json({ message: "Deleted", deletedCategory });
//   } catch (error) {
//     response.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

import mongoose from "mongoose";
import { FoodCategory } from "../../schemas/food-category-schema.js";

export const deleteFoodCategoryController = async (request, response) => {
  try {
    const { id } = request.params;

    console.log("DELETE CATEGORY ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid Food Category ID",
      });
    }

    const deletedCategory = await FoodCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return response.status(404).json({
        message: "Food Category Not Found",
      });
    }

    return response.status(200).json({
      message: "Deleted",
      deletedCategory,
    });
  } catch (error) {
    console.error("DELETE CATEGORY ERROR:", error);

    return response.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};