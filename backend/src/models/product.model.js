import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    basePrice: { type: Number, required: true },
    label: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Label",
      required: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
