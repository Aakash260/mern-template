import express from "express";
import {
  createStore,
  storeStock,
  allStore,
  storeWiseProduct,
} from "../controllers/store.controller.js";

const storeRoute = express.Router();

storeRoute.post("/create-store", createStore);
storeRoute.post("/store-stock", storeStock);
storeRoute.get("/stores", allStore);
storeRoute.get("/:storeId/products", storeWiseProduct);

export default storeRoute;
