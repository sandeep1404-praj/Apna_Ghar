import express from "express";

import Property from "../models/Property.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import ContactRequest from "../models/ContactRequest.js";


export const sellerrouter = express.Router();

// Add a new property
sellerrouter.post("/add-property", authMiddleware, async (req, res) => {
  try {
    if (req.user.userType !== "seller") return res.status(403).json({ message: "Access Denied" });

    const { title, description, location, price, propertyType, images } = req.body;
    const newProperty = new Property({
      sellerId: req.user.id,
      title,
      description,
      location,
      price,
      propertyType,
      images,
    });

    await newProperty.save();
    res.status(201).json({ message: "Property listed successfully", newProperty });

  } catch (error) {
    res.status(500).json({ message: "Error adding property", error });
  }
});

// Get all properties by a seller
sellerrouter.get("/my-properties", authMiddleware, async (req, res) => {
  try {
    if (req.user.userType !== "seller") return res.status(403).json({ message: "Access Denied" });

    const properties = await Property.find({ sellerId: req.user.id });
    res.json({properties});

  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error });
  }
});
// 🟢 Seller fetches ONLY the buyer requests for their own properties
sellerrouter.get("/buyer-requests/:sellerId", async (req, res) => {
  try {
    const { sellerId } = req.params;

    // ✅ Fetch all buyer requests for this specific seller
    const requests = await ContactRequest.find({ sellerId }).populate("buyerId", "fullName email phone");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
});
//! Deleting the buyer request
sellerrouter.delete("/remove-buyer-request/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;

    // Find and delete request from database
    const deletedRequest = await ContactRequest.findByIdAndDelete(requestId);

    if (!deletedRequest) {
      return res.status(404).json({ message: "Buyer request not found" });
    }

    res.json({ message: "Buyer request removed successfully" });
  } catch (error) {
    console.error("Error deleting buyer request:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});