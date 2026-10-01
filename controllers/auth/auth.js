import { User } from "../../schemas/user-schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUND = 10;

// Token-д id, email, role орно. Password (hash ч гэсэн) ХЭЗЭЭ Ч оруулахгүй:
// JWT-ийн payload нь шифрлэгдээгүй, хэн ч base64-ээр уншиж чадна.
const signAuthToken = (user) =>
  jwt.sign(
    { id: String(user._id), email: user.email, role: user.role },
    process.env.JWT_SECRET, // require-token.js-тэй яг ижил secret
    { expiresIn: "7d" }
  );

const publicUser = (user) => ({
  _id: user._id,
  email: user.email,
  role: user.role,
});

export const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      return response.status(401).json({ message: "Password not matching" });
    }

    const token = signAuthToken(user);

    response.status(200).json({
      message: "User found",
      user: publicUser(user),
      token,
    });
  } catch (err) {
    console.error("loginController error:", err);
    response.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

export const signUpController = async (request, response) => {
  try {
    // role-ийг клиентээс АВАХГҮЙ: үгүй бол хэн ч admin болж бүртгүүлж чадна.
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

    // role нь schema-ийн default утгаар орно. Admin-ыг өгөгдлийн сан дээр оноо.
    const newUser = await User.create({ email, password: hashedPassword });

    const token = signAuthToken(newUser);

    response.status(201).json({
      message: "User created",
      user: publicUser(newUser),
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      return response.status(409).json({ message: "Email already registered" });
    }
    console.error("signUpController error:", err);
    response.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};