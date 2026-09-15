import express from "express";
import { User } from "../../schemas/user-schema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SALT_ROUND = 10

const JWT_SECRET = 'testing'

const signAuthToken = (user) => {
  console.log(user)
  return jwt.sign({email: user.email, password: user.password}, JWT_SECRET,{
    expiresIn: "7d"
  })
}

// bcrypt => password => random string === 'password' => true | false 

export const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email : email});

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
    console.log(user.password, "user password")
    console.log(password, "password")

    const isPasswordMatchig = await bcrypt.compare(password, user.password)

    if(!isPasswordMatchig){
      return response.status(401).json({message: "Password not matching"})
    }
    const token = signAuthToken(user);

    response.status(200).json({ message: "User found", user: "user", token: token});
  } catch (err) {
    console.error("loginController error:", err);
    response
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

export const signUpController = async (request, response) => {
  try {
    const { email, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND)
    if (!email || !password) {
      return response
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const newUser = await User.create({ email, password : hashedPassword});

    const token = signAuthToken(newUser);

    response.status(201).json({ message: "User created", user: newUser, token: token });
  } catch (err) {
    console.error("signUpController error:", err);
    response
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
