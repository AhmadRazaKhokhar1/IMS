import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-50 dark:bg-black text-gray-900 dark:text-white w-full h-screen">
      <Sidebar />
      <div className="flex flex-col w-full h-screen">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-5 mt-[10px]">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
