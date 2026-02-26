import React, { useEffect, useState } from "react";
import { axiosClient } from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const HandleLabel = () => {
  const navigate = useNavigate();
  const [labels, setLabels] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    const fetchLabels = async () => {
      const res = await axiosClient.get("/labels");
      setLabels(res.data);
    };

    fetchLabels();
  }, []);

  const handleUpdate = async () => {
    if (!selectedLabel) return;
    const numericDiscount = Number(discount);
    if (!discount) {
      toast.error("Please enter discount value");
      return;
    }

    if (isNaN(numericDiscount)) {
      toast.error("Discount must be a number");
      return;
    }

    if (numericDiscount <= 0) {
      toast.error("Discount must be greater than 0");
      return;
    }

    if (numericDiscount > 90) {
      toast.error("Discount cannot exceed 90%");
      return;
    }
    await axiosClient.put(`/labels/${selectedLabel}`, {
      discountPercentage: numericDiscount,
    });

    toast.success("Discount Updated!");

    const res = await axiosClient.get("/labels");
    setLabels(res.data);
  };

  return (
    <div className="min-h-[80vh] grid place-content-center">
      <div className="p-6 border rounded-xl shadow-md max-w-md ">
        <h2 className="text-xl font-semibold mb-4">Update Label Discount</h2>

        <select
          className="w-full border p-2 rounded mb-3"
          onChange={(e) => setSelectedLabel(e.target.value)}
        >
          <option value="">Select Label</option>
          {labels.map((label) => (
            <option key={label._id} value={label._id}>
              {label.name} ({label.discountPercentage}%)
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Enter new discount %"
          className="w-full border p-2 rounded mb-3"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 text-white cursor-pointer py-2 rounded hover:bg-blue-700"
        >
          Update Discount
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 mt-2 cursor-pointer text-white py-2 rounded hover:bg-blue-700"
        >
          Visit Multi Store
        </button>
      </div>
    </div>
  );
};

export default HandleLabel;
