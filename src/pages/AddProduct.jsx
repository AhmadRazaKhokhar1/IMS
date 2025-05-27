import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { db } from "../Firebase/Config";
import { addDoc, collection } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";

const AddProduct = () => {
  const [loader, setLoader] = useState(false);
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    productPrice: "",
    stockAvailable: "",
  });

  const navigate = useNavigate();

  const back = () => navigate(-1);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault(); 
    setLoader(true);

    // Validate required fields
    if (!product.productName || !product.description || !product.productPrice || !product.stockAvailable) {
      toast.error("Please Fill All the Fields");
      setLoader(false);
      return;
    }

    try {
      const collectionRef = collection(db, "Products");

      await addDoc(collectionRef, {
        ...product,
        stockAvailable: Number(product.stockAvailable),
        productPrice: Number(product.productPrice),
      });

      toast.success("Product Added Successfully");
      setProduct({
        productName: "",
        description: "",
        productPrice: "",
        stockAvailable: "",
      });
      back();
    } catch (error) {
      toast.error("Error adding product. Please try again.");
      console.error("Form Submission Error:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      {loader && <Loader />} {/* Show Loader only when loading */}
      <Toaster />
      {/* Title Section */}
      <div className="flex w-[90%] m-auto items-center justify-center">
        <span className="w-full bg-black h-[0.5px]"></span>
        <h2 className="font-title text-nowrap text-[6vw] md:text-[1.5vw] px-2">
          ADD Product
        </h2>
        <span className="w-full bg-black h-[0.5px]"></span>
      </div>
      {/* Back Button */}
      <button
        onClick={back}
        className="flex ml-16 gap-1 items-center border-2 hover:border-[#8080da] hover:bg-transparent hover:text-[#8080da] rounded-md px-7 py-2 font-title bg-[#8080da] text-white"
      >
        <IoIosArrowBack size={25} /> Return Back
      </button>
      {/* Form Section */}
      <div className="bg-white dark:bg-[#2a29295a] my-12 rounded-2xl shadow-2xl dark:shadow-[#6863635a] border dark:border-[#b5a8a85a] w-[100%] md:w-[60%] m-auto p-6">
        <form
          onSubmit={handleAddProduct}
          className="flex flex-col justify-center m-auto mt-10"
        >
          {/* Product Name */}
          <label className="text-[20px] font-title">
            Product Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            placeholder="Enter Product Name"
            required
            className="border-b-2 outline-none w-full px-2 mt-2 py-2 border-gray-400 rounded-md"
          />

          {/* Description */}
          <label className="text-[20px] font-title mt-4">
            Description <span className="text-red-600">*</span>
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter Product Description"
            required
            className="border-b-2 outline-none w-full px-2 mt-2 py-2 border-gray-400 rounded-md"
          />

          {/* Stock Available */}
          <label className="text-[20px] font-title mt-4">
            Stock Available <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="stockAvailable"
            value={product.stockAvailable}
            onChange={handleChange}
            placeholder="Enter Stock Quantity"
            required
            className="border-b-2 outline-none w-full px-2 mt-2 py-2 border-gray-400 rounded-md"
          />

          {/* Product Price */}
          <label className="text-[20px] font-title mt-4">
            Item Price <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="productPrice"
            value={product.productPrice}
            onChange={handleChange}
            placeholder="Enter Item Price"
            required
            className="border-b-2 outline-none w-full px-2 mt-2 py-2 border-gray-400 rounded-md"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="flex gap-1 mt-4 w-fit m-auto border-2 hover:border-[#8080da] hover:bg-transparent hover:text-[#8080da] rounded-md px-7 py-2 font-title bg-[#8080da] text-white"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
