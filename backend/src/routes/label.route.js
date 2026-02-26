import express from "express";
import {
  allLabel,
  handleLabel,
  createLabel,
} from "../controllers/label.controller.js";
const labelRoute = express.Router();

labelRoute.post("/create-label", createLabel);

labelRoute.get("/labels", allLabel);

labelRoute.put("/labels/:labelId", handleLabel);

export default labelRoute;
