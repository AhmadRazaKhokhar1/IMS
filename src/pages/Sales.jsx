import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase/Config";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Sales = () => {
  const [getProduct, setGetProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const navigate = useNavigate();
  const [loader, setLoader] = useState();

  // Fetch Products from Firestore
  const handleFetchProduct = async () => {
    try {
      const collectionRef = collection(db, "Products");
      const getval = await getDocs(collectionRef);
      setGetProduct(getval.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products!");
    }
  };

  // Load products when component mounts
  useEffect(() => {
    handleFetchProduct();
  }, []);

  // Handle product selection
  const handleProductSelect = async (event) => {
    const productId = event.target.value;
    if (!productId) return;

    const productRef = doc(db, "Products", productId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const productData = productSnap.data();
      setSelectedProduct({ ...productData, id: productId });
    } else {
      toast.error("Product not found!");
    }
  };

  // Handle sale submission
  const handleSubmitSale = async () => {
    if (!customerName || !selectedProduct || quantity <= 0) {
      toast.error("Please fill all fields correctly!");
      return;
    }

    // Check stock availability
    if (quantity > selectedProduct.stockAvailable) {
      toast.error("Not enough stock available!");
      return;
    }

    const saleData = {
      customerName,
      productName: selectedProduct.productName,
      price: selectedProduct.productPrice,
      quantity,
      total: selectedProduct.productPrice * quantity,
      timestamp: new Date(),
    };
    setLoader(true);
    try {
      // Save sale to Firestore
      await addDoc(collection(db, "Sales"), saleData);

      // Update product stock
      const newStock = selectedProduct.stockAvailable - quantity;
      const productRef = doc(db, "Products", selectedProduct.id);
      await updateDoc(productRef, { stockAvailable: newStock });

      toast.success("Sale recorded and stock updated!");

      // Reset fields
      setCustomerName("");
      setSelectedProduct(null);
      setQuantity(1);
      handleFetchProduct(); // Refresh product list
      navigate("/SalesHistory");
    } catch (error) {
      console.error("Error saving sale:", error);
      toast.error("Failed to save sale!");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="p-4 animate-slideRight">
      {loader && <Loader />}
      <Toaster />

      <div className="flex w-[90%] m-auto items-center justify-center">
        <span className="w-full bg-black h-[0.5px]"></span>
        <h2 className="font-title flex justify-center items-center text-nowrap text-[6vw] md:text-[1.5vw] px-2">
          Sales Entry
        </h2>
        <span className="w-full bg-black h-[0.5px]"></span>
      </div>

      <div className="bg-white dark:bg-[#2a29295a] my-12 rounded-2xl shadow-2xl dark:shadow-[#6863635a] border dark:border-[#b5a8a85a] w-[100%] md:w-[60%] m-auto p-6">
        {/* Customer Name */}
        <input
          type="text"
          placeholder="Enter Customer Name"
          className="border p-2 w-full mt-2 dark:bg-gray-900"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        {/* Product Selection */}
        <select
          className="border p-2 w-full mt-2 dark:bg-gray-900"
          onChange={handleProductSelect}
        >
          <option value="">Select Product</option>
          {getProduct.map((item) => (
            <option key={item.id} value={item.id}>
              {item.productName} - £{item.productPrice} (Stock:{" "}
              {item.stockAvailable || 0})
            </option>
          ))}
        </select>

        <div className="bg-green-300">
          {/* Auto-filled product details */}
          {selectedProduct && (
            <div className="mt-3 border flex flex-col gap-3 p-2">
              <p>
                <strong>Product Name:</strong> {selectedProduct.productName}
              </p>
              <p>
                <strong>Stock Available:</strong>{" "}
                {selectedProduct.stockAvailable}
              </p>
              <p>
                <strong>Price per unit:</strong> £{selectedProduct.productPrice}
              </p>
            </div>
          )}
        </div>
        {/* Quantity Input */}
        {selectedProduct && (
          <input
            type="number"
            placeholder="Enter Quantity"
            className="border p-2 w-full mt-2"
            value={quantity}
            min={1}
            max={selectedProduct.stockAvailable}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        )}

        {/* Display Total Price */}
        {selectedProduct && (
          <p className="mt-2 text-lg bg-red-500 text-white py-1 px-12 font-bold">
            Total: £{selectedProduct.productPrice * quantity || 0}
          </p>
        )}

        {/* Submit Button */}
        <button
          className="flex justify-center m-auto mt-6 items-center border-2 hover:border-[#8080da] hover:bg-transparent hover:text-[#8080da] ease-in rounded-md px-16 py-2 font-title bg-[#8080da] text-white"
          onClick={handleSubmitSale}
        >
          Submit Sale
        </button>
      </div>
    </div>
  );
};

export default Sales;
