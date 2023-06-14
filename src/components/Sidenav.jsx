import { useAuth } from "../context/auth-context";
import { NavLink } from "react-router-dom";

export const Sidenav = () => {
  const { userLogout } = useAuth();

  const getStyles = ({ isActive }) => ({
    backgroundColor: isActive ? "#377dff" : "white",
    borderRadius: isActive ? "10px" : "",
    color: isActive ? "white" : "",
  });

  return (
    <>
      <div className="bg-white px-4 pr-3 pt-2 text-left md:text-center min-h-screen fixed w-[15%] xl:text-[14px] lg:text-[16px] lg:w-[20%] md:flex md:justify-evenly md:w-full md:min-h-0 md:bottom-0 md:z-20 md:pt-2.5 md:py-1 md:pb-3.5 xs:text-sm">
        <NavLink
          style={getStyles}
          className="block py-2 cursor-pointer md:px-5 xs:px-2 hover:text-primary-color pl-10 xl:pl-5 md:text-xs"
          to="/"
        >
          <i className="fa-solid fa-grip md:text-base"></i>{" "}
          <span className="ml-3 font-medium md:block md:ml-0">Feed</span>
        </NavLink>
        <NavLink
          style={getStyles}
          className="block py-2 cursor-pointer md:px-5 xs:px-2 hover:text-primary-color pl-10 xl:pl-5 md:text-xs"
          to="/explore"
        >
          <i className="fa-regular fa-compass md:text-base"></i>{" "}
          <span className="ml-3 font-medium md:block md:ml-0">Explore</span>
        </NavLink>
        <NavLink
          style={getStyles}
          className="block py-2 cursor-pointer md:px-5 xs:px-2 hover:text-primary-color pl-10 xl:pl-5 md:text-xs"
          to="/bookmark"
        >
          <i className="fa-regular fa-bookmark md:text-base"></i>{" "}
          <span className="ml-3 font-medium md:block md:ml-0">Bookmarks</span>
        </NavLink>
        <p
          className="block py-2 cursor-pointer md:px-5 xs:px-2 hover:text-primary-color pl-10 xl:pl-5 md:text-xs"
          onClick={() => userLogout()}
        >
          <i className="fa-solid fa-arrow-right-from-bracket md:text-base"></i>{" "}
          <span className="ml-3 font-medium md:block md:ml-0">Log Out</span>
        </p>
      </div>
    </>
  );
};
