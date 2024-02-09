import { User } from "@/models/userModel";
import jwt from "jsonwebtoken";

export const findUser = async (token) => {
  try {
    if (!token) {
      throw new Error("Token not found");
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const currUser = await User.findById(user._id);

    return currUser; 
    
  } catch (error) {
    // Log the entire error for better debugging
    console.error("Error in findUser:", error);
    // Re-throw the error to propagate it to the caller
    throw error;
  }
};


export const findToken = async (req) => {
  try {
    if (!req) {
      throw new Error("Request not found");
    }

    const token = req.cookies.get("token")?.value;
    if (!token) {
      throw new Error("Token not found in request cookies");
    }

    return token;
  } catch (error) {
    // Log the entire error for better debugging
    console.error("Error in findToken:", error);
    // Re-throw the error to propagate it to the caller
    throw error;
  }
};
