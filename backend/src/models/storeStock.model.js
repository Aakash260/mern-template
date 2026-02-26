import mongoose from "mongoose";

const storeStockSchema = new mongoose.Schema(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

storeStockSchema.index({ store: 1, product: 1 }, { unique: true });

const StoreStock = mongoose.model("StoreStock", storeStockSchema);

export default StoreStock;
