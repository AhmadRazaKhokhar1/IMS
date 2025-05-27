import React, { useEffect, useState, useMemo } from "react";
import Chart from "react-apexcharts";
import { db } from "../Firebase/Config";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";
import { useDarkMode } from "../context/DarkModeContext";

const ProductChart = () => {
    const { isDarkMode } = useDarkMode();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch Sales Data from Firebase and aggregate by product
    const fetchSalesData = async () => {
        try {
            const collectionRef = collection(db, "Sales");
            const getVal = await getDocs(collectionRef);
            
            // Aggregate sales data by product name
            const aggregatedData = {};
            getVal.docs.forEach(doc => {
                const data = doc.data();
                const productName = data.productName;
                
                // Initialize product entry if doesn't exist
                if (!aggregatedData[productName]) {
                    aggregatedData[productName] = {
                        ...data,
                        total: 0
                    };
                }
                
                // Add to existing total
                aggregatedData[productName].total += data.total || 0;
            });

            // Convert object to array format
            const processedProducts = Object.values(aggregatedData);
            
            console.log("Processed Sales Data:", processedProducts);
            setProducts(processedProducts);
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

    // Memoized extracted data for Donut Chart
    const productNames = useMemo(
        () => products.map((item) => item?.productName || "Unnamed"),
        [products]
    );

    const totalSales = useMemo(
        () => products.map((item) => item?.total ?? 0),
        [products]
    );

    const options = {
        chart: {
            type: "donut",
            height: 350,
            toolbar: {
                show: true,
                tools: {
                    download: true,
                },
                export: {
                    csv: { filename: "Product_Sales", columnDelimiter: "," },
                    svg: { filename: "Product_Sales" },
                    png: { filename: "Product_Sales" },
                },
            },
            background: "transparent",
        },
        labels: productNames,
        colors: [
            "#FF5733", "#33FF57", "#337BFF", "#FFC300", "#FF33EC",
            "#33FFF2", "#8D33FF", "#FF8D33", "#33FF8D", "#FF338D",
            "#338DFF", "#8DFF33", "#FF338D", "#8D338D", "#33FFD1",
            "#FFD133", "#D133FF", "#33A8FF", "#FF33A8", "#A8FF33",
            "#FF5733", "#33FFA8", "#A833FF", "#FF33D1", "#33D1FF",
        ],
        legend: {
            position: "bottom",
            labels: {
                colors: isDarkMode ? "#FFFFFF" : "#000000",
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val.toFixed(1)}%`,
        },
        theme: {
            mode: isDarkMode ? "dark" : "light",
        },
    };

    const series = totalSales;

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <h2 className="font-title text-[22px] mt-8">Total Sales Per Product</h2>
            {loading ? (
                <p>Loading data...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : products.length > 0 ? (
                <Chart
                    className="pl-24 md:pl-0"
                    options={options}
                    series={series}
                    type="donut"
                    height={400}
                    width={500}
                />
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default ProductChart;