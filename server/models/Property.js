import mongoose from "mongoose";
const propertySchema = new mongoose.Schema(
    {
      sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      location: { type: String, required: true },
      price: { type: Number, required: true },
      propertyType: { type: String, enum: ["Flat", "House", "PG", "Other"], required: true },
      images: [{ type: String }],
      available: { type: Boolean, default: true },
    },
    { timestamps: true }
  );
  
  const Property = mongoose.model("Property", propertySchema);
  export default Property;
  