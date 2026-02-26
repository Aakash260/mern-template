import Label from "../models/label.model.js";

const createLabel = async (req, res) => {
  try {
    const label = await Label.create(req.body);
    res.status(201).json(label);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const allLabel = async (req, res) => {
  try {
    const labels = await Label.find();
    res.json(labels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleLabel = async (req, res) => {
  try {
    const { labelId } = req.params;
    const { discountPercentage } = req.body;

    if (discountPercentage < 0) {
      return res.status(400).json({ message: "Invalid discount" });
    }

    const updatedLabel = await Label.findByIdAndUpdate(
      labelId,
      { discountPercentage },
      { new: true }
    );

    if (!updatedLabel) {
      return res.status(404).json({ message: "Label not found" });
    }

    res.json(updatedLabel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export { createLabel, allLabel, handleLabel };
