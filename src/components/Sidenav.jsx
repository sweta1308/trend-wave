import { useAuth } from "../context/auth-context";
import { NavLink } from "react-router-dom";

export const Sidenav = () => {
  const { userLogout } = useAuth();

  const getStyles = ({ isActive }) => ({
    backgroundColor: isActive ? "#566176" : "white",
    borderRadius: isActive ? "10px" : "",
    color: isActive ? "white" : "",
  });

  return (
    <>
      <div className="bg-white px-4 pr-1 pt-2 text-center min-h-screen fixed w-[15%] lg:w-[20%] md:flex md:justify-evenly md:w-full md:min-h-0 md:bottom-0 md:z-20 md:pt-2.5 md:py-1 md:pb-3.5 xs:text-sm">
        <NavLink
          style={getStyles}
          className="block py-4 cursor-pointer hover:scale-110 md:px-3 xs:px-2"
          to="/"
        >
          <i class="fa-solid fa-grip"></i>{" "}
          <span className="ml-3 font-medium md:block md:ml-0">Feed</span>
        </NavLink>
        <NavLink
          style={getStyles}
          className="block py-4 cursor-pointer hover:scale-110 md:px-3  xs:px-2"
          to="/explore"
        >
          <i class="fa-regular fa-compass"></i>{" "}
          <span className="ml-3 font-medium md:block md:ml-0">Explore</span>
        </NavLink>
        <NavLink
          style={getStyles}
          className="block py-4 cursor-pointer hover:scale-110 md:px-3  xs:px-2"
          to="/bookmark"
        >
          <i class="fa-regular fa-bookmark"></i>{" "}
          <span className="ml-3 font-medium md:block md:ml-0">Bookmarks</span>
        </NavLink>
        <NavLink
          style={getStyles}
          className="block py-4 cursor-pointer hover:scale-110 md:px-3  xs:px-2"
          to="/profile"
        >
          <i class="fa-regular fa-user"></i>{" "}
          <span className="ml-3 font-medium md:block md:ml-0">Profile</span>
        </NavLink>
        <p
          className="block py-4 cursor-pointer hover:scale-110 md:px-3  xs:px-2"
          onClick={() => userLogout()}
        >
          <i class="fa-solid fa-arrow-right-from-bracket"></i>{" "}
          <span className="ml-3 font-medium md:block md:ml-0">Log Out</span>
        </p>
      </div>
    </>
  );
};
