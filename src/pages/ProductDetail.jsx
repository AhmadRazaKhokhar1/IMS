import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/Config";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
import { IoIosArrowBack } from "react-icons/io";

const ProductDetail = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loader, setLoader] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [singleProduct, setSingleProduct] = useState({
    productName: "",
    stockAvailable: "",
    productPrice: "",
    description: "",
  });

  const { id } = useParams();

  const handleFetchProducts = async () => {
    try {
      const docRef = doc(db, "Products", id);
      const getVal = await getDoc(docRef);
      setProduct({
        ...getVal.data(),
        id: getVal.id,
      });

      if (isEditing) {
        setSingleProduct({
          productName: getVal.data().productName || "",
          stockAvailable: getVal.data().stockAvailable || "",
          productPrice: getVal.data().productPrice || "",
          description: getVal.data().description || "",
        });
      }
    } catch (error) {
      console.log(error, "There is an error while getting product detail");
      toast.error("There is an error while getting product detail");
    }
  };

  useEffect(() => {
    handleFetchProducts();
  }, [id, isEditing]);

  const handleDelete = async () => {
    setLoader(true);
    try {
      const docRef = doc(db, "Products", id);
      await deleteDoc(docRef);
      toast.success("Product Deleted Successfully");
      navigate(-1);
    } catch (error) {
      console.log(error, "There is an error while deleting the Product");
      toast.error("There is an error while deleting the Product");
    } finally {
      setLoader(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSingleProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoader(true);
    try {
      const docRef = doc(db, "Products", id);
      await updateDoc(docRef, singleProduct);
      toast.success("Successfully Updated Product");
      setIsEditing(false);
    } catch (error) {
      console.log(error, "There is an error while updating product");
      toast.error("There is an error while updating product");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <Toaster />
      <div className="flex w-[90%] m-auto items-center justify-center">
        <span className="w-full bg-black dark:bg-white h-[0.5px]"></span>
        <h2 className="font-title flex justify-center items-center text-[6vw] md:text-[2vw] px-2 text-nowrap">
          Product Detail
        </h2>
        <span className="w-full bg-black dark:bg-white h-[0.5px]"></span>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="flex ml-16 gap-1 items-center border-2 hover:border-[#8080da] hover:bg-transparent hover:text-[#8080da] rounded-md px-7 py-2 font-title bg-[#8080da] text-white"
      >
        <IoIosArrowBack size={25} /> Return Back
      </button>

      <div className="bg-white dark:bg-[#2a29295a] my-12 rounded-2xl shadow-2xl dark:shadow-[#6863635a] border dark:border-[#b5a8a85a] w-[100%] md:w-[60%] m-auto p-6">
        <div className="flex flex-col justify-center m-auto mt-5">
          {/* Product Name */}
          <label className="text-[20px] font-title mt-2 ">
            Product Name <span className="text-red-600">*</span>
          </label>
          <div
            className={`border-b-2 outline-none w-full px-2 mt-2 py-2 border-gray-400 rounded-md ${
              isEditing ? "bg-white" : ""
            }`}
          >
            {isEditing ? (
              <input
                type="text"
                name="productName"
                value={singleProduct.productName}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none"
              />
            ) : (
              <>{product?.productName}</>
            )}
          </div>

          {/* Available Stock */}
          <label className="text-[20px] font-title mt-2 ">
            Available Stock <span className="text-red-600">*</span>
          </label>
          <div
            className={`border-b-2 outline-none w-full px-2 mt-2 py-2 border-gray-400 rounded-md ${
              isEditing ? "bg-white" : ""
            }`}
          >
            {isEditing ? (
              <input
                type="number"
                name="stockAvailable"
                value={singleProduct.stockAvailable}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none"
              />
            ) : (
              <>{product?.stockAvailable}</>
            )}
          </div>

          {/* Product Price */}
          <label className="text-[20px] font-title mt-2 ">
            Product Price <span className="text-red-600">*</span>
          </label>
          <div
            className={`border-b-2 outline-none w-full px-2 mt-2 py-2 border-gray-400 rounded-md ${
              isEditing ? "bg-white" : ""
            }`}
          >
            {isEditing ? (
              <input
                type="number"
                name="productPrice"
                value={singleProduct.productPrice}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none"
              />
            ) : (
              <>{product?.productPrice}</>
            )}
          </div>

          {/* Description */}
          <label className="text-[20px] font-title mt-2 ">
            Description <span className="text-red-600">*</span>
          </label>
          <div
            className={`border-b-2 outline-none w-full px-2 mt-2 py-2 border-gray-400 rounded-md ${
              isEditing ? "bg-white" : ""
            }`}
          >
            {isEditing ? (
              <textarea
                name="description"
                value={singleProduct.description}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none"
              />
            ) : (
              <>{product?.description}</>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-7 gap-4">
          {!isEditing ? (
            <>
              <button
                onClick={handleEdit}
                className="flex rounded-md px-4 py-2 bg-[#5554D4] text-white "
              >
                <RiEdit2Fill size={25} /> Edit Product
              </button>
              <button
                onClick={handleDelete}
                className="flex rounded-md px-4 py-2 bg-[#B91C1C] text-white"
              >
                <MdDelete size={25} /> Delete Product
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSubmit}
                className="flex rounded-md px-4 py-2 bg-[#5554D4] text-white "
              >
                <RiEdit2Fill size={25} /> Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex rounded-md px-4 py-2 bg-[#B91C1C] text-white"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
