import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import Logo from "../Assets/Logo.jpg";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";
import { ImStatsBars } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="relative z-30 ">
      <button
        className="md:hidden absolute top-4 left-4 z-50 text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMenu />
      </button>
      <div
        className={`bg-white dark:bg-black shadow-lg w-64 md:w-48 md:relative md:translate-x-0 fixed top-0 left-0 h-full transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:block`}
      >
        <div className="flex justify-center h-[100px] w-[100px] m-auto ">
          <img src={Logo} alt="Logo" className="dark:invert" />
        </div>

        <div className="flex justify-center flex-col font-body mt-12 ">
          <Link to="/">
            <div
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 text-[4vw] md:text-[1.2vw] px-6 cursor-pointer pt-3 pb-2 
                hover:bg-[#d1d1eb] dark:hover:bg-purple-900 transition-colors
                ${
                  isActive("/")
                    ? "text-[#2e2eca] dark:text-accent"
                    : "text-gray-600 dark:text-gray-300"
                }`}
            >
              <MdDashboard size={20} />
              Dashboard
            </div>
          </Link>
          <div className="border-t border-gray-400 dark:border-border w-4/5 m-auto" />

          <Link to="/Products">
            <div
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 text-[4vw] md:text-[1.2vw] px-6 cursor-pointer pt-3 pb-2 
                hover:bg-[#d1d1eb] dark:hover:bg-purple-900 transition-colors
                ${
                  isActive("/Products")
                    ? "text-[#2e2eca] dark:text-accent"
                    : "text-gray-600 dark:text-gray-300"
                }`}
            >
              <MdOutlineProductionQuantityLimits size={20} />
              Products
            </div>
          </Link>

          <div className="border-t border-gray-400 dark:border-border w-4/5 m-auto" />

          <Link to="/Sales">
            <div
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 text-[4vw] md:text-[1.2vw] px-6 cursor-pointer pt-3 pb-2 
                hover:bg-[#d1d1eb] dark:hover:bg-purple-900 transition-colors
                ${
                  isActive("/Sales")
                    ? "text-[#2e2eca] dark:text-accent"
                    : "text-gray-600 dark:text-gray-300"
                }`}
            >
              <ImStatsBars size={20} />
              Sales
            </div>
          </Link>
          <div className="border-t border-gray-400 dark:border-border w-4/5 m-auto" />

          <Link to="/SalesHistory">
            <div
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 text-[4vw] md:text-[1.2vw] px-6 cursor-pointer pt-3 pb-2 
                hover:bg-[#d1d1eb] dark:hover:bg-purple-900 transition-colors
                ${
                  isActive("/SalesHistory")
                    ? "text-[#2e2eca] dark:text-accent"
                    : "text-gray-600 dark:text-gray-300"
                }`}
            >
              <MdOutlineInventory size={20} />
              Sales History
            </div>
          </Link>

          <div className="border-t border-gray-400 dark:border-border w-4/5 m-auto" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
