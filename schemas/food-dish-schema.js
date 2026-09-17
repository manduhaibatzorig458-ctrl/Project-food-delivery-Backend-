import { StreamDescription } from "mongodb"
import mongoose from "mongoose"

const foodDishSchema = new mongoose.Schema(
    {
      foodName: {
       type: String,
       required: true
    },
      price: {
        type: Number,
        required: true
    },
     image: {
        type: String,
        required: true
     },
      ingredients: {
        type: String,
        required: true
     }
      
    })