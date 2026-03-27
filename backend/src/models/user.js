import mongoose from "mongoose";
import addressSchema from "./address.js";
import documentSchema from "./document.js";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "First name is required"],
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  dob: {
    type: Date,
    required: [true, "Date of birth is required"],
  },

  residential_address: addressSchema,
  permanent_address: addressSchema,

  same_as_residential: Boolean,

  documents: [documentSchema],
});

export default mongoose.model("User", userSchema);