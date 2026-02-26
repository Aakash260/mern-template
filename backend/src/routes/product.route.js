import express from "express";
import { createProduct } from "../controllers/product.controller.js";
const productRoute = express.Router();
productRoute.post("/create-product", createProduct);

export default productRoute;
