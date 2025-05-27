import { useDarkMode } from "../context/DarkModeContext";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <div className="flex justify-end items-center py-3 px-5  dark:bg-black">
      <div className="flex items-center gap-4 mr-14 text-center">
        {/* Theme Switch */}
        <div className="theme cursor-pointer" onClick={toggleDarkMode}>
          {isDarkMode ? "🌞 Light" : "🌙 Dark"}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
