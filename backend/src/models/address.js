import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street_one: String,
  street_two: String,
});

export default addressSchema;
