import mongoose from "mongoose";

const savedPropertySchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  savedAt: { type: Date, default: Date.now },
});

export const SavedProperty = mongoose.model("SavedProperty", savedPropertySchema);