import mongoose from "mongoose";
const sellerSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      businessName: { type: String },
      governmentID: { type: String, required: true }, // Store document link or ID number
      bankAccount: { type: String },
      properties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
    },
    { timestamps: true }
  );
  
  const Seller = mongoose.model("Seller", sellerSchema);
  export default Seller;
  