import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import Chart from "react-apexcharts";

const Card = ({ expanded, setExpanded, ...props }) => {
  return (
    <AnimatePresence>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={setExpanded} />
      ) : (
        <CompactCard param={props} setExpanded={setExpanded} />
      )}
    </AnimatePresence>
  );
};

function CompactCard({ param, setExpanded }) {
  return (
    <motion.div
      className="compactCard flex flex-1 h-[7rem] bg-white dark:bg-[#2926265a] shadow-lg shadow-[#d1d1eb] dark:shadow-[#6863635a] border border-[#6863635a] rounded-md text-black dark:text-white relative cursor-pointer p-4"
      onClick={setExpanded}
      layoutId={`expandableCard-${param.title}`} // Unique layoutId
    >
      <div className="flex flex-col justify-end flex-1 gap-[1rem]">
        <param.icon size={25} />
        <span>{param.title}</span>
      </div>
      <div className="flex flex-1 flex-col justify-between text-end">
        <span className="text-[18px] font-bold">£{param.value}</span>
        <span className="text-[12px]">Last 24 Hours</span>
      </div>
    </motion.div>
  );
}

function ExpandedCard({ param, setExpanded }) {
  const data = {
    options: {
      chart: { type: "area", height: "auto" },
      dropShadow: { enabled: false },
      fill: { colors: ["#fff"], type: "gradient" },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", colors: ["white"] },
      xaxis: {
        type: "datetime",
        categories: [
          "2024-01-19T00:00:00.000Z",
          "2024-01-19T01:30:00.000Z",
          "2024-01-19T02:30:00.000Z",
          "2024-01-19T03:30:00.000Z",
          "2024-01-19T04:30:00.000Z",
          "2024-01-19T05:30:00.000Z",
          "2024-01-19T06:30:00.000Z",
        ],
      },
    },
  };

  return (
    <motion.div
      className="absolute w-[60vw] bg-white dark:bg-black h-[85vh] z-10 left-[22em] top-16 rounded-md flex flex-col items-center justify-center p-4  shadow-[#d1d1eb] dark:shadow-[#6863635a] border dark:border-2 border-[#6863635a]  text-black dark:text-white "
      layoutId={`expandableCard-${param.title}`} // Unique layoutId
    >
      <div className="self-end cursor-pointer text-black dark:text-white">
        <RxCross2 onClick={setExpanded} />
      </div>
      <span className="text-[#5454D4] text-[26px] font-bold text-shadow">
        {param.title}
      </span>
      <div className="w-[80%]">
        <Chart series={param.series} type="area" options={data.options} />
      </div>
      <span className="text-black dark:text-white text-[16px]">
        Last 24 hours
      </span>
    </motion.div>
  );
}

export default Card;
