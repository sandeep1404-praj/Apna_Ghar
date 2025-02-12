import express from "express";
import {SavedProperty} from '../models/savePRoperty.js'

export const buyerrouter = express.Router();

// Save property to favorites
buyerrouter.post("/save-property", async (req, res) => {
  try {
    const { propertyId, buyerId } = req.body;

    // Check if already saved
    const existingSave = await SavedProperty.findOne({ propertyId, buyerId });
    if (existingSave) {
      return res.status(400).json({ message: "Property already saved." });
    }

    const newSavedProperty = new SavedProperty({ propertyId, buyerId });
    await newSavedProperty.save();

    res.status(201).json({ message: "Property saved successfully!", savedProperty: newSavedProperty });
  } catch (error) {
    res.status(500).json({ message: "Error saving property", error: error.message });
  }
});

// 📌 Get all saved properties of a buyer
buyerrouter.get("/saved-properties/:buyerId", async (req, res) => {
  try {
    const { buyerId } = req.params;
    const savedProperties = await SavedProperty.find({ buyerId }).populate("propertyId");

    res.status(200).json(savedProperties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching saved properties", error: error.message });
  }
});

// 📌 Remove a saved property
buyerrouter.delete("/remove-property/:savedPropertyId", async (req, res) => {
  try {
    const { savedPropertyId } = req.params;

    const deletedProperty = await SavedProperty.findByIdAndDelete(savedPropertyId);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Saved property not found" });
    }

    res.status(200).json({ message: "Property removed from saved list" });
  } catch (error) {
    res.status(500).json({ message: "Error removing property", error: error.message });
  }
});


