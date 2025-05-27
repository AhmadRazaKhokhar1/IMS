// import { IoIosArrowBack } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { db } from "../Firebase/Config";
// import { addDoc, collection, getDocs } from "firebase/firestore";
// import toast, { Toaster } from "react-hot-toast";

// const AddInventory = () => {
//   const [products, setProducts] = useState([]);
//   const [inventory, setInventory] = useState({
//     productId: "",
//     productName: "",
//     stockQuantity: "",
//   });

//   const navigate = useNavigate();
//   const back = () => navigate(-1);

//   // Handle Input Change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInventory((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle Product Selection
//   const handleProductChange = (e) => {
//     const selectedProductId = e.target.value;
//     const selectedProduct = products.find(
//       (product) => product.id === selectedProductId
//     );

//     setInventory({
//       productId: selectedProductId,
//       productName: selectedProduct ? selectedProduct.productName : "",
//       stockQuantity: inventory.stockQuantity,
//     });
//   };

//   // Handle Form Submission
//   const handleAddForm = async (e) => {
//     e.preventDefault();
//     if (!inventory.productId || !inventory.stockQuantity) {
//       toast.error("All fields are required!");
//       return;
//     }

//     try {
//       await addDoc(collection(db, "Inventory"), {
//         productId: inventory.productId,
//         productName: inventory.productName,
//         stockQuantity: Number(inventory.stockQuantity),
//       });

//       toast.success("Inventory Added Successfully");
//       setInventory({
//         productId: "",
//         productName: "",
//         stockQuantity: "",
//       });
      
//       back();
//     } catch (error) {
//       toast.error("Error adding inventory");
//       console.error("Form Submission Error:", error);
//     }
//   };

//   // Fetch Products
//   const fetchProducts = async () => {
//     try {
//       const productsRef = collection(db, "Products");
//       const snapshot = await getDocs(productsRef);
//       const productsData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setProducts(productsData);
//     } catch (error) {
//       toast.error("Error fetching products");
//       console.error("Fetch Error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="min-h-screen  ">
//       <Toaster position="top-center" reverseOrder={false} />

//       <div className="container mx-auto px-4 py-8">
//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-8">
//           <button
//             onClick={back}
//             className="flex items-center gap-2 px-4 py-2 bg-[#5454D4] border border-[#5454D4] text-white hover:text-[#5454D4] rounded-lg hover:bg-transparent transition-colors"
//           >
//             <IoIosArrowBack className="text-xl" />
//             Return Back
//           </button>
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-white ">
//             Add Inventory
//           </h1>
//           <div className="w-24"></div> {/* Spacer for alignment */}
//         </div>

//         {/* Form Section */}
//         <div className="max-w-xl mx-auto bg-white border dark:border-[#6863635a] dark:bg-[#2a29295a] rounded-xl shadow-md p-6">
//           <form onSubmit={handleAddForm} className="space-y-6">
//             {/* Product Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
//                 Product Name <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="productId"
//                 value={inventory.productId}
//                 onChange={handleProductChange}
//                 className="w-full px-4 py-2 border dark:bg-[#2a29295a] border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 required
//               >
//                 <option value="">Select a Product</option>
//                 {products.map((product) => (
//                   <option key={product.id} value={product.id}>
//                     {product.productName}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Stock Quantity */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
//                 Stock Quantity <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 name="stockQuantity"
//                 value={inventory.stockQuantity}
//                 onChange={handleChange}
//                 placeholder="Enter quantity"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 min="0"
//                 required
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-[#5454D4] border border-[#5454D4] text-white hover:text-[#5454D4] font-medium rounded-md hover:bg-transparent transition-colors"
//             >
//               Add Inventory
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddInventory;
