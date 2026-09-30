import { User } from "../../schemas/user-schema.js";

export const updateMe = async (req, res) => {
  try {
    const { address } = req.body;

    if (typeof address !== "string" || !address.trim()) {
      return res.status(400).json({ message: "Хаяг хоосон байна" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id ?? req.user.id,
      { address: address.trim() },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
