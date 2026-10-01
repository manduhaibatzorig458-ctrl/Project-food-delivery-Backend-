import mongoose from "mongoose";
import { FoodOrder } from "../../schemas/food-order-schema.js";
import { FoodDish } from "../../schemas/food-dish-schema.js";

const DELIVERY_FEE_CENTS = 99; // cart sheet deer haragddag 0.99$-toi ijil. Hereggui bol 0 bolgo.

export const createFoodOrder = async (req, res) => {
  try {
    const { foodOrderItems } = req.body;
    const address = String(req.body.address ?? "").trim();

    if (!Array.isArray(foodOrderItems) || foodOrderItems.length === 0) {
      return res.status(400).json({ message: "foodOrderItems хоосон байна" });
    }

    if (!address) {
      return res.status(400).json({ message: "Хүргэлтийн хаяг оруулна уу" });
    }

    // Клиентээс зөвхөн food, quantity-г авна. Үнэ огт хэрэглэхгүй.
    const items = foodOrderItems.map((item) => ({
      food: item.food,
      quantity: Number(item.quantity),
    }));

    if (
      items.some(
        (i) =>
          !mongoose.isValidObjectId(i.food) ||
          !Number.isInteger(i.quantity) ||
          i.quantity < 1
      )
    ) {
      return res.status(400).json({ message: "food эсвэл quantity буруу байна" });
    }

    const dishes = await FoodDish.find({
      _id: { $in: items.map((i) => i.food) },
    });

    // Cent-eer nemj, floating point aldaagaas sergiilne.
    let totalCents = DELIVERY_FEE_CENTS;
    for (const item of items) {
      const dish = dishes.find((d) => d._id.toString() === String(item.food));
      if (!dish) {
        return res.status(404).json({ message: `Хоол олдсонгүй: ${item.food}` });
      }
      totalCents += Math.round(dish.price * 100) * item.quantity;
    }

    // Token-oos garsan hereglegchiin id. Talbariin ner tanii auth middleware-aas hamaarna.
    const userId = req.user?._id ?? req.user?.id ?? req.user?.userId ?? req.user?.sub;
    if (!userId) {
      console.log("createFoodOrder: req.user =", req.user); // ner ni yu ve gedgiig harah
      return res.status(401).json({ message: "Нэвтрэх шаардлагатай" });
    }

    const order = await FoodOrder.create({
      user: userId,
      totalPrice: totalCents / 100,
      foodOrderItems: items,
      address,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};