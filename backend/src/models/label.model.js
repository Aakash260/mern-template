import mongoose from "mongoose";

const labelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    discountPercentage: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Label = mongoose.model("Label", labelSchema);

export default Label;
