import User from "../models/user.js";
import fs from "fs";
import { isEmpty, deleteFiles } from "../utils/isEmpty.js";

const submitUser = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    if (
      isEmpty(data.first_name) ||
      isEmpty(data.last_name) ||
      isEmpty(data.email) ||
      !data.dob
    ) {
      deleteFiles(req.files);
      return res.status(400).json({ message: "All fields are required" });
    }

    const age = new Date().getFullYear() - new Date(data.dob).getFullYear();
    if (age < 18) {
      deleteFiles(req.files);
      return res.status(400).json({ message: "Age must be 18+" });
    }

    if (!req.files || req.files.length < 2) {
      deleteFiles(req.files);
      return res.status(400).json({ message: "Minimum 2 documents required" });
    }

    if (data.same_as_residential) {
      data.permanent_address = data.residential_address;
    } else {
      if (
        !data.permanent_address?.street_one ||
        !data.permanent_address?.street_two
      ) {
        deleteFiles(req.files);
        return res.status(400).json({ message: "Permanent address required" });
      }
    }

    req.files.forEach((file, index) => {
      const docType = data.documents[index].file_type;

      if (docType === "pdf" && file.mimetype !== "application/pdf") {
        deleteFiles(req.files);
        return res
          .status(400)
          .json({ message: `Document ${index + 1} must be a PDF` });
      }

      if (
        docType === "image" &&
        !["image/png", "image/jpeg"].includes(file.mimetype)
      ) {
        deleteFiles(req.files);
        return res
          .status(400)
          .json({ message: `Document ${index + 1} must be an image` });
      }
    });

    const documents = req.files.map((file, index) => ({
      file_name: data.documents[index].file_name,
      file_type: data.documents[index].file_type,
      url: file.path,
    }));
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      deleteFiles(req.files);
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = new User({
      ...data,
      documents,
    });

    await user.save();

    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    req.files?.forEach((file) => fs.unlinkSync(file.path));
    res.status(500).json({ error: error.message });
  }
};

export default submitUser;
