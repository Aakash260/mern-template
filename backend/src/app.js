import express from "express";
import cors from "cors";
import storeRoute from "./routes/store.route.js";
import labelRoute from "./routes/label.route.js";
import productRoute from "./routes/product.route.js";
const app = express();
app.use(cors("*"));
app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/", storeRoute);
app.use("/api/v1/", labelRoute);
app.use("/api/v1/", productRoute);

export default app;
