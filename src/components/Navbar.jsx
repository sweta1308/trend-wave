import { useState } from "react";
import { useNavigate } from "react-router";
import { logo } from "../assets";
import { useAuth } from "../context/auth-context";
import { usePost } from "../context/post-context";
import { SearchModal } from "./SearchModal";
import { useTheme } from "../context/theme-context";

export const Navbar = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const { authState } = useAuth();
  const { getUserPost } = usePost();
  const [searchInput, setsearchInput] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-sm sticky top-0 z-30">
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
          className="border border-gray-400 flex items-center rounded-lg md:hidden"
        >
          <i className="fa-solid fa-magnifying-glass mx-[10px]"></i>
          <input
            placeholder="Search User"
            value={searchInput}
            onChange={(e) => setsearchInput(e.target.value)}
            className="p-[10px] outline-none text-sm w-[350px] lg:w-[200px]"
          />
        </div>

        <div className="flex justify-around items-center w-56 xs:w-44">
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

          <div
            onClick={() => {
              getUserPost(authState?.user?.username);
              navigate(`/profile/${authState?.user?.username}`);
            }}
            className="flex items-center cursor-pointer hover:underline hover:decoration-blue-400 hover:text-primary-color sm:text-[14px]"
          >
            <p>{`${authState?.user?.firstName} ${authState?.user?.lastName}`}</p>
            <img
              src={authState?.user?.avatarUrl}
              alt="avatar"
              className="w-[35px] h-[35px] ml-2 rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-400 rounded-lg hidden md:block w-[full] mx-[50px] mb-[30px] sm:mx-[20px]">
        <i className="fa-solid fa-magnifying-glass mx-[10px]"></i>
        <input
          placeholder="Search User"
          value={searchInput}
          onChange={(e) => setsearchInput(e.target.value)}
          className="p-[10px] outline-none text-sm"
        />
      </div>
    </div>
  );
};
