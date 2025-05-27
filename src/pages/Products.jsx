import { collection, getDocs } from "firebase/firestore";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../Firebase/Config";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";

const Products = () => {
  const [getProduct, setGetProduct] = useState([]);
  const [search, setSearch] = useState("");

  const [loader] = useState(false);

  const navigate = useNavigate();

  // Fetch Products from Firestore
  const handleGetProduct = async () => {
    try {
      const collectionRef = collection(db, "Products");
      const getVal = await getDocs(collectionRef);
      setGetProduct(getVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      toast.error("Error fetching products");
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, []);

  return (
    <>
      <section className="m-auto animate-slideRight">
        {loader && <Loader />}
        <Toaster />

        <div className="flex w-[90%] m-auto items-center justify-center">
          <span className="w-full bg-black dark:bg-white h-[0.5px]"></span>
          <h2 className="font-title flex justify-center items-center text-[6vw] md:text-[2vw] px-2">
            Products
          </h2>
          <span className="w-full bg-black dark:bg-white h-[0.5px]"></span>
        </div>

        <Link to="/addProduct">
          <button className="flex ml-16 gap-1 justify-center items-center border-2 hover:border-[#8080da] hover:bg-transparent hover:text-[#8080da] ease-in rounded-md px-7 py-2 font-title bg-[#8080da] text-white">
            Add Product <CiCirclePlus size={25} />
          </button>
        </Link>

        {/* Search Bar */}
        <div className="search-bar relative flex justify-center items-center ml-10 mt-4">
          <div className="absolute mr-[85%] md:mr-[26%]">🔍</div>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Product..."
            className="border rounded-md px-10 w-[100%] md:w-[30%] py-2 border-black bg-white dark:bg-gray-900 dark:text-white"
          />
        </div>

        {/* Products Table */}
        <div className="relative overflow-x-auto mt-8">
          <table className="w-[90%] shadow-2xl rounded-md m-auto text-sm text-left">
            <thead className="text-title text-white uppercase bg-[#8080da]">
              <tr>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Stock Available</th>
                <th className="px-6 py-3">Product Price</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Detail</th>
              </tr>
            </thead>
            <tbody>
              {getProduct.length === 0
                ? "NO Products Available"
                : getProduct
                    .filter((item) =>
                      search.toLowerCase() === ""
                        ? item
                        : item.productName
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    )
                    .map((item) => (
                      <tr
                        key={item.id}
                        className="bg-white dark:bg-[#2a29295a] border-b border-gray-200"
                      >
                        <td className="px-6 py-4">{item.productName}</td>
                        <td
                          className={`px-6 py-4 ${
                            item.stockAvailable <= 30
                              ? "bg-red-500 text-white font-bold"
                              : ""
                          }`}
                        >
                          {item.stockAvailable}
                        </td>
                        <td className="px-6 py-4">£{item.productPrice}</td>
                        <td className="px-6 py-4">
                          {item.description?.slice(0, 40)}...
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="bg-[#8080da] text-white px-5 py-1 rounded-md"
                            onClick={() => navigate(`/product/${item.id}`)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Products;
