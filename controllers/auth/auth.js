import express from "express";


export const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;
    console.log(email, password);
    const user = await User.findOne({ email: email });
    if(!user) {
      return response.status(404).json({ message: "User not found" });
    }
      return response.status(200).json({ message: "user found", user: user});
 
  } catch (error) {
      response.status(500).json({message: "Internal Server Error" ,error: error.message });
  }
}

export const signUpController = async (request, response) => {
  try {
    const { email, password } = request.body;
    console.log(email, password);
    const user = await User.findOne({ email: email });
    if(!user) {
      return response.status(404).json({ message: "User not found" });
    }
      return response.status(200).json({ message: "user found", user: user});
 
  } catch (error) {
      response.status(500).json({message: "Internal Server Error" ,error: error.message });
  }
}