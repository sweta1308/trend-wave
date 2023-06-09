import { useState } from "react";
import { useNavigate } from "react-router";
import { logo } from "../assets";
import { useAuth } from "../context/auth-context";
import { SearchModal } from "./SearchModal";
import { useTheme } from "../context/theme-context";

export const Navbar = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const { userLogout } = useAuth();
  const [searchInput, setsearchInput] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-sm sticky top-0 z-30 dark:bg-dark-mode dark:text-white dark:shadow-white">
      <div className="flex justify-between items-center px-14  sm:px-3">
        {showSearchModal && (
          <SearchModal
            searchInput={searchInput}
            setShowSearchModal={setShowSearchModal}
          />
        )}
        <img
          src={logo}
          alt="logo"
          className="w-44 cursor-pointer sm:w-32"
          onClick={() => navigate("/")}
        />
        <div
          onClick={() => setShowSearchModal(true)}
          className="shadow-lg flex items-center rounded-lg md:hidden dark:shadow-sm dark:shadow-white"
        >
          <i className="fa-solid fa-magnifying-glass mx-[10px]"></i>
          <input
            placeholder="Search User"
            value={searchInput}
            onChange={(e) => {
              setsearchInput(e.target.value);
            }}
            className="p-[10px] outline-none text-sm w-[400px] rounded-lg lg:w-[200px] dark:bg-dark-mode"
          />
        </div>

        <div className="flex justify-around items-center w-24 xs:w-18">
          {isDarkMode ? (
            <i
              onClick={() => setIsDarkMode((prev) => !prev)}
              className="fa-solid fa-sun fa-lg cursor-pointer"
            ></i>
          ) : (
            <i
              onClick={() => setIsDarkMode((prev) => !prev)}
              className="fa-solid fa-moon fa-lg cursor-pointer"
            ></i>
          )}

          <i
            onClick={() => userLogout()}
            className="fa-solid fa-arrow-right-from-bracket cursor-pointer hover:text-primary-color"
          ></i>
        </div>
      </div>

      <div
        onClick={() => setShowSearchModal(true)}
        className="border border-gray-400 rounded-lg hidden md:block w-[full] mx-[50px] mb-[30px] sm:mx-[20px]"
      >
        <i className="fa-solid fa-magnifying-glass mx-[10px]"></i>
        <input
          placeholder="Search User"
          value={searchInput}
          onChange={(e) => {
            setsearchInput(e.target.value);
          }}
          className="p-[10px] outline-none text-sm dark:bg-dark-mode"
        />
      </div>
    </div>
  );
};
