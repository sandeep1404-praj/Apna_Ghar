import express from "express";
import { User } from "../models/usermodel.js";
export const userRouters = express.Router();

// Fetch user data by ID
userRouters.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
});
// Update user details (Profile Picture, Name, Email, etc.)
userRouters.put("/updateProfile", async (req, res) => {
    try {
      const { userId, name, email, profilePicture } = req.body;
      
      if (!userId) return res.status(400).json({ message: "User ID is required" });
        console.log(userId);
        
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email, profilePicture },
        { new: true }
      );
  
      if (!updatedUser) return res.status(404).json({ message: "User not found" });
  
      res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating profile" });
    }
  });
