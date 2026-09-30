// import { FoodOrder } from "../../schemas/food-order-schema.js";

// // Админ: бүх захиалга
// export const getAllFoodOrders = async (req, res) => {
//   try {
//     const orders = await FoodOrder.find()
//       .populate("user", "email")
//       .populate("foodOrderItems.food")
//       .sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Хэрэглэгч: зөвхөн өөрийн захиалга
// export const getMyFoodOrders = async (req, res) => {
//   try {
//     const orders = await FoodOrder.find({ user: req.user._id })
//       .populate("foodOrderItems.food")
//       .sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import { FoodOrder } from "../../schemas/food-order-schema.js";

// Админ: бүх захиалга, хамгийн шинэ нь эхэндээ
export const getAllFoodOrders = async (req, res) => {
  try {
    const orders = await FoodOrder.find()
      .populate("user", "email address")
      .populate("foodOrderItems.food")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Хэрэглэгч: зөвхөн өөрийн захиалга
export const getMyFoodOrders = async (req, res) => {
  try {
    const orders = await FoodOrder.find({ user: req.user._id ?? req.user.id })
      .populate("foodOrderItems.food")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};