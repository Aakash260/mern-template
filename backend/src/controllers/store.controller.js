import StoreStock from "../models/storeStock.model.js";
import Store from "../models/store.model.js";

const createStore = async (req, res) => {
  try {
    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "Store name is required",
      });
    }
    const existingStore = await Store.findOne({
      name: name.trim(),
    });

    if (existingStore) {
      return res.status(400).json({
        message: "Store already exists",
      });
    }

    const store = await Store.create(req.body);

    res.status(201).json(store);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const storeStock = async (req, res) => {
  try {
    const { store, product, quantity } = req.body;
    if (!store || !product || quantity === undefined) {
      return res.status(400).json({
        message: "Store, product and quantity are required",
      });
    }
    let stock = await StoreStock.findOne({ store, product });

    if (stock) {
      stock.quantity += quantity;
      await stock.save();
    } else {
      stock = await StoreStock.create({ store, product, quantity });
    }

    res.status(200).json(stock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const allStore = async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const storeWiseProduct = async (req, res) => {
  try {
    const stocks = await StoreStock.find({
      store: req.params.storeId,
    }).populate({
      path: "product",
      populate: { path: "label" },
    });

    const result = stocks.map((item) => {
      const basePrice = item.product.basePrice;
      const label = item.product.label;
      const discount = label?.discountPercentage || 0;

      const finalPrice = basePrice - (basePrice * discount) / 100;

      return {
        productId: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        basePrice,

        label: label
          ? {
              labelId: label._id,
              labelName: label.name,
              discountPercentage: label.discountPercentage,
            }
          : null,

        discount,
        finalPrice,
      };
    });

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { createStore, storeStock, allStore, storeWiseProduct };
