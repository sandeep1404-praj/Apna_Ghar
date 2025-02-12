import express from "express";
import Property from "../models/Property.js";
import ContactRequest from "../models/ContactRequest.js";
import { User } from "../models/usermodel.js";
import { sendEmail } from "../config/emailConfig.js";
export const propertyrouter = express.Router();

// Get all properties
propertyrouter.get("/all", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error });
  }
})

// ✅ 1. Add a property (Only Seller)
propertyrouter.post("/", async (req, res) => {
  try {
    const { sellerId, title, description, location, price, propertyType, images } = req.body;

    if (!sellerId || !title || !description || !location || !price || !propertyType || !images) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProperty = new Property({ sellerId, title, description, location, price, propertyType, images });
    await newProperty.save();

    res.status(201).json({ message: "Property added successfully", property: newProperty });
  } catch (error) {
    res.status(500).json({ message: "Error adding property", error: error.message });
  }
});

// ✅ 2. Get all properties of the logged-in seller
propertyrouter.get("/seller/:sellerId", async (req, res) => {
  try {
    const { sellerId } = req.params;
    const properties = await Property.find({ sellerId });

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error: error.message });
  }
});
propertyrouter.delete("/remove-property/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Validate if propertyId is valid
    if (!propertyId) {
      return res.status(400).json({ message: "Invalid property ID" });
    }

    // Find the property in the database
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Delete the property
    await Property.findByIdAndDelete(propertyId);

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Error deleting property", error: error.message });
  }
});

// ✅ 3. Edit property (Only Seller)
propertyrouter.put("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;
    const updatedProperty = await Property.findByIdAndUpdate(propertyId, req.body, { new: true });

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ message: "Property updated successfully", property: updatedProperty });
  } catch (error) {
    res.status(500).json({ message: "Error updating property", error: error.message });
  }
});

// ✅ 4. Get all properties (For Seller to see other sellers' properties)
propertyrouter.get("/", async (req, res) => {
  try {
    const properties = await Property.find().populate("sellerId", "fullName email");
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error: error.message });
  }
});

propertyrouter.post("/contact-seller", async (req, res) => {
  try {
    const { propertyId, buyerId, message } = req.body;

    // ✅ Find property and seller details
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: "Property not found!" });

    const seller = await User.findById(property.sellerId);
    if (!seller) return res.status(404).json({ message: "Seller not found!" });

    const buyer = await User.findById(buyerId);
    if (!buyer) return res.status(404).json({ message: "Buyer not found!" });

    // ✅ Save contact request
    const contactRequest = new ContactRequest({
      propertyId,
      sellerId: property.sellerId,
      buyerId,
      message,
    });
    await contactRequest.save();

    // ✅ Send email to the seller
    const emailText = `
      Hello ${seller.fullName},

      A buyer is interested in your property: "${property.title}".

      Buyer Details:
      - Name: ${buyer.fullName}
      - Email: ${buyer.email}
      - Phone: ${buyer.phone}

      Message from Buyer:
      "${message}"

      Please contact the buyer at your earliest convenience.

      Regards,
      Apna Ghar Team
    `;

    await sendEmail(seller.email, "New Buyer Interest in Your Property", emailText);

    res.status(201).json({ message: "Request sent to seller & email notification sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error!", error });
  }
});