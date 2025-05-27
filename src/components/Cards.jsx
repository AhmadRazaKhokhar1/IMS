import React, { useEffect, useState } from "react";
import { CardsData } from "./CardsData";
import Card from "./Card";
import { db } from "../Firebase/Config";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";

const Cards = () => {
  const [expandedIndex, setExpandedIndex] = useState(null); // Track which card is expanded

  const [salesData, setSalesData] = useState([]);

  // Get Sales Data from Firebase===============================================================

  const handleGetSales = async () => {
    try {
      const collectionRef = collection(db, "Sales");

      const getVal = await getDocs(collectionRef);

      setSalesData(getVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      toast.error("Error fetching Sales");
      console.error("Error fetching Sales:", error);
    }
  };

  useEffect(() => {
    handleGetSales();
  }, []);

  return (
    <div className="flex gap-5">
      {salesData.map((item, index) => (
        <div key={index} className="w-[100%]">
          <Card
            title={item.productName}
            color={item.color}
            barValue={item.barValue}
            value={item.value}
            series={item.series}
            icon={item.icon}
            expanded={expandedIndex === index} // Check if this card is expanded
            setExpanded={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
