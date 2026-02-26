import React, { useEffect, useState } from "react";
import { axiosClient } from "../utils/axiosClient";

const SelectStore = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axiosClient.get("/stores");
        setStores(res.data);
      } catch (error) {
        console.error("Error fetching stores", error);
      }
    };

    fetchStores();
  }, []);

  const handleStoreChange = async (storeId) => {
    setSelectedStore(storeId);
    setProducts([]);

    if (!storeId) return;

    try {
      setLoading(true);
      const res = await axiosClient.get(`/${storeId}/products`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(products);
  return (
    <div className="min-h-[80vh] p-4">
      <h2>Select Store</h2>

      <select
        value={selectedStore}
        className="border rounded"
        onChange={(e) => handleStoreChange(e.target.value)}
      >
        <option value="">-- Select Store --</option>
        {stores.map((store) => (
          <option key={store._id} value={store._id}>
            {store.name}
          </option>
        ))}
      </select>

      {loading && (
        <p className="grid place-content-center h-[60vh] text-xl">
          Loading products...
        </p>
      )}

      {products.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-6">Products</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {products.map((product) => (
              <div
                key={product.productId}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-5 relative border overflow-hidden"
              >
                {/* Discount Corner Badge */}
                {product.discount > 0 && (
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-3 py-1 rounded-br-lg font-semibold">
                    {product.discount}% OFF
                  </div>
                )}

                {/* Label Badge */}
                {product.label && (
                  <div className="absolute top-3 right-3 bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                    {product.label.labelName}
                  </div>
                )}

                {/* Product Name */}
                <h4 className="text-lg font-semibold mb-2 mt-4">
                  {product.name}
                </h4>

                {/* Stock */}
                <p className="text-sm text-gray-500 mb-2">
                  Stock: <span className="font-medium">{product.quantity}</span>
                </p>

                {/* Price Section */}
                <div className="mt-4">
                  {product.discount > 0 && (
                    <p className="text-sm text-gray-400 line-through">
                      Base Price: ₹{product.basePrice}
                    </p>
                  )}
                  <div className="flex items-center">
                    <div>Final Price:</div>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{product.finalPrice}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && selectedStore && products.length === 0 && (
        <p>No products found for this store.</p>
      )}
    </div>
  );
};

export default SelectStore;
