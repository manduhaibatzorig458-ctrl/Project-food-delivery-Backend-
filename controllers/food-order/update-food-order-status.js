import { FoodOrder, FoodOrderStatusEnum } from "../../schemas/food-order-schema.js";

export const updateFoodOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!Object.values(FoodOrderStatusEnum).includes(status)) {
      return res.status(400).json({ message: "Буруу status" });
    }

    const order = await FoodOrder.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: "Захиалга олдсонгүй" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};