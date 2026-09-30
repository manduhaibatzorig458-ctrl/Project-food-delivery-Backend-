import { FoodOrder } from "../../schemas/food-order-schema.js";
import { FoodDish } from "../../schemas/food-dish-schema.js";

export const createFoodOrder = async (req, res) => {
  try {
    const { foodOrderItems } = req.body;

    if (!Array.isArray(foodOrderItems) || foodOrderItems.length === 0) {
      return res.status(400).json({ message: "foodOrderItems хоосон байна" });
    }

    // Клиентээс зөвхөн food, quantity-г авна. Үнэ огт хэрэглэхгүй.
    const items = foodOrderItems.map((item) => ({
      food: item.food,
      quantity: Number(item.quantity),
    }));

    if (items.some((i) => !i.food || !Number.isInteger(i.quantity) || i.quantity < 1)) {
      return res.status(400).json({ message: "food эсвэл quantity буруу байна" });
    }

    const dishes = await FoodDish.find({
      _id: { $in: items.map((i) => i.food) },
    });

    let totalPrice = 0;
    for (const item of items) {
      const dish = dishes.find((d) => d._id.toString() === String(item.food));
      if (!dish) {
        return res.status(404).json({ message: `Хоол олдсонгүй: ${item.food}` });
      }
      totalPrice += dish.price * item.quantity;
    }

    const order = await FoodOrder.create({
      user: req.user._id ?? req.user.id,
      totalPrice,
      foodOrderItems: items,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};