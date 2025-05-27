import React, { useEffect, useState, useMemo } from "react";
import Chart from "react-apexcharts";
import { db } from "../Firebase/Config";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";
import { useDarkMode } from "../context/DarkModeContext";

const ProductChart = () => {
  const { isDarkMode } = useDarkMode(); // Get the dark mode state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Sales Data from Firebase
  const fetchSalesData = async () => {
    try {
      const collectionRef = collection(db, "Products");
      const getVal = await getDocs(collectionRef);
      const data = getVal.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      console.log("Fetched Sales Data:", data); // Debugging Log
      setProducts(data);
    } catch (error) {
      setError("Error fetching sales data");
      toast.error("Error fetching Sales");
      console.error("Error fetching Sales:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  // Memoized extracted data
  const productNames = useMemo(
    () => products.map((item) => item?.productName || "Unnamed"),
    [products]
  );

  const stockQuantities = useMemo(
    () => products.map((item) => item?.stockAvailable ?? 0), // Ensure a valid number
    [products]
  );

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: true,
        },
        export: {
          csv: { filename: "Product_Stock", columnDelimiter: "," },
          svg: { filename: "Product_Stock" },
          png: { filename: "Product_Stock" },
        },
      },
      background: "transparent",
    },
    xaxis: {
      categories: productNames,
      labels: {
        style: {
          colors: isDarkMode ? "#FFFFFF" : "#000000", // White in dark mode, Black in light mode
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDarkMode ? "#FFFFFF" : "#000000",
        },
      },
    },
    legend: {
      labels: {
        colors: isDarkMode ? "#FFFFFF" : "#000000",
      },
    },
    tooltip: {
      theme: isDarkMode ? "dark" : "light",
      style: {
        colors: [isDarkMode ? "#FFFFFF" : "#000000"],
      },
    },
    plotOptions: {
      bar: { columnWidth: "55%", distributed: true },
    },
    colors: [
      "#FF5733",
      "#33FF57",
      "#337BFF",
      "#FFC300",
      "#FF33EC",
      "#33FFF2",
      "#8D33FF",
      "#FF8D33",
      "#33FF8D",
      "#FF338D",
      "#338DFF",
      "#8DFF33",
      "#FF338D",
      "#8D338D",
      "#33FFD1",
      "#FFD133",
      "#D133FF",
      "#33A8FF",
      "#FF33A8",
      "#A8FF33",
      "#FF5733",
      "#33FFA8",
      "#A833FF",
      "#FF33D1",
      "#33D1FF",
    ],
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#FFFFFF"], // Data labels color adjustment
      },
    },
    theme: {
      mode: isDarkMode ? "dark" : "light", // Change chart theme for dark mode
    },
  };

  const series = [{ name: "Stock Available", data: stockQuantities }];

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h2 className="font-title text-[22px] mt-8">
        Products Quantity Remaining
      </h2>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length > 0 ? (
        <Chart
          className=" pl-[160vw] md:pl-0 "
          options={options}
          series={series}
          type="bar"
          height={500}
          width={900}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default ProductChart;
