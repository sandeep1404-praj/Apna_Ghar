import mongoose from "mongoose";

const ContactRequestSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: String,
  timestamp: { type: Date, default: Date.now }
});

 const ContactRequest = mongoose.model("ContactRequest", ContactRequestSchema);
  export default ContactRequest;