// import mongoose from "mongoose";

// export const FoodOrderStatusEnum = {
//   PENDING: "PENDING",
//   CANCELED: "CANCELED",
//   DELIVERED: "DELIVERED",
// };

// const foodOrderItemSchema = new mongoose.Schema(
//   {
//     food: { type: mongoose.Schema.Types.ObjectId, ref: "FoodDish", required: true },
//     quantity: { type: Number, required: true, min: 1 },
//   },
//   { _id: false }
// );

// const foodOrderSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     totalPrice: { type: Number, required: true },
//     foodOrderItems: { type: [foodOrderItemSchema], required: true },
//     status: {
//       type: String,
//       enum: Object.values(FoodOrderStatusEnum),
//       default: FoodOrderStatusEnum.PENDING,
//     },
//   },
//   { timestamps: true }
// );

// export const FoodOrder = mongoose.model("FoodOrder", foodOrderSchema);





import mongoose from "mongoose";

export const FoodOrderStatusEnum = {
  PENDING: "PENDING",
  CANCELED: "CANCELED",
  DELIVERED: "DELIVERED",
};

const foodOrderItemSchema = new mongoose.Schema(
  {
    food: { type: mongoose.Schema.Types.ObjectId, ref: "FoodDish", required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const foodOrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    totalPrice: { type: Number, required: true },
    foodOrderItems: { type: [foodOrderItemSchema], required: true },
    // Zahialga uusgehed oruulsan hurgeltiin hayag. Zahialga bur deer hadgalagdana.
    address: { type: String, default: "" },
    status: {
      type: String,
      enum: Object.values(FoodOrderStatusEnum),
      default: FoodOrderStatusEnum.PENDING,
    },
  },
  { timestamps: true }
);

export const FoodOrder = mongoose.model("FoodOrder", foodOrderSchema);