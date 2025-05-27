import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase/Config";
import { MdDelete } from "react-icons/md";
import { FaPrint } from "react-icons/fa6";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { BiSearch } from "react-icons/bi";

const SalesHistory = () => {
  const [getSale, setGetSale] = useState([]);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // Default to descending order

  // Fetch Sales History
  const handleGetSaleHistory = async () => {
    const collectionRef = collection(db, "Sales");
    const getval = await getDocs(collectionRef);
    setGetSale(getval.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Handle Delete Invoice
  const handleDelete = async (id) => {
    setLoader(true);
    try {
      const docref = doc(db, "Sales", id);
      await deleteDoc(docref);
      toast.success("Invoice Deleted Successfully");
      handleGetSaleHistory();
    } catch (error) {
      console.error("Error deleting invoice:", error);
      toast.error("Error deleting invoice");
    } finally {
      setLoader(false);
    }
  };

  // Handle Print Invoice
  const handlePrint = (sale) => {
    // Printing logic remains the same
    setTimeout(() => {
      const printWindow = window.open("", "", "width=800,height=600");
      printWindow.document.write(`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invoice</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body class="bg-gray-100 p-6">
            <div class="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-lg">
                <div class="flex justify-between items-center mb-6">
                    <div class="text-right">
                        <p class="text-lg font-bold text-gray-800">INVOICE</p>
                        <p class="text-gray-500">Date: ${new Date().toLocaleDateString()}</p>
                    </div>
                </div>
                <div class="mb-6">
                    <h2 class="text-lg font-semibold">Billed to:</h2>
                    <p>${sale.customerName}</p>
                </div>
                <table class="min-w-full bg-white">
                    <thead>
                        <tr class="w-full bg-gray-200 text-left">
                            <th class="py-2 px-4">Item</th>
                            <th class="py-2 px-4">Quantity</th>
                            <th class="py-2 px-4">Price</th>
                            <th class="py-2 px-4">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b">
                            <td class="py-2 px-4">${sale.productName}</td>
                            <td class="py-2 px-4">${sale.quantity}</td>
                            <td class="py-2 px-4">${sale.price}</td>
                            <td class="py-2 px-4">${sale.total}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex justify-between mt-4">
                    <h2 class="font-semibold">Total</h2>
                    <h2 class="font-bold">${sale.total}</h2>
                </div>
                <div class="mt-4">
                    <p class="font-semibold">Payment method: Cash</p>
                    <p>Note: Thank you for choosing us!</p>
                </div>
            </div>
            <script>
                window.print();
                window.close();
            </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }, 500);
  };

  // Toggle sort order between ascending and descending
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Sort the data based on the selected sort order
  const sortedSales = [...getSale].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.total - b.total; // Ascending order
    } else {
      return b.total - a.total; // Descending order
    }
  });

  // Filtered and sorted data
  const filteredSales = sortedSales.filter((item) =>
    search.toLowerCase() === ""
      ? item
      : item.productName.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    handleGetSaleHistory();
  }, []);

  return (
    <section className="m-auto animate-slideRight">
      {loader && <Loader />}
      <div className="flex w-[90%] m-auto items-center justify-center">
        <span className="w-full bg-black dark:bg-white h-[0.5px]"></span>
        <h2 className="font-title text-nowrap flex justify-center items-center text-[6vw] md:text-[2vw] px-2">
          Sales History
        </h2>
        <span className="w-full bg-black dark:bg-white h-[0.5px]"></span>
      </div>

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

      {/* Sort Button */}
      <div className="flex justify-end mb-4 mt-4">
        <button
          onClick={toggleSortOrder}
          className="bg-[#8080da] text-white py-2 px-4 rounded-md"
        >
          Sort Sale ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>

      {/* Products Table */}
      <div className="relative overflow-x-auto mt-8">
        <table className="w-[90%] shadow-2xl rounded-md m-auto text-sm text-left">
          <thead className="text-title text-white uppercase bg-[#8080da]">
            <tr>
              <th className="px-6 py-3">Customer Name</th>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Product Price</th>
              <th className="px-6 py-3">Product Quantity</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="dark:bg-[#2a29295a]">
            {filteredSales.map((sale) => (
              <tr
                key={sale.id}
                className="border-b bg-gray-100 text-title dark:bg-[#2a29295a]"
              >
                <td className="px-6 py-3">{sale.customerName}</td>
                <td className="px-6 py-3">{sale.productName}</td>
                <td className="px-6 py-3">£{sale.price}</td>
                <td className="px-6 py-3">{sale.quantity}</td>
                <td className="px-6 py-3 font-bold">£{sale.total}</td>
                <td className="px-6 py-3 flex gap-3">
                  <button onClick={() => handlePrint(sale)} className="text-blue-600">
                    <FaPrint size={20} />
                  </button>
                  <button onClick={() => handleDelete(sale.id)} className="text-red-600">
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SalesHistory;
