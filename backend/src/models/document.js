import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  file_name: {
    type: String,
    required: [true, "File name is required"],
  },
  file_type: {
    type: String,
    required: [true, "File type is required"],
  },
  url: {
    type: String,
    required: [true, "File URL is required"],
  },
});

export default documentSchema;
