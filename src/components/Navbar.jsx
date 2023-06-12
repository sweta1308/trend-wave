import { useNavigate } from "react-router";
import { logo } from "../assets";
import { useAuth } from "../context/auth-context";

export const Navbar = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white flex justify-between items-center px-14 sticky top-0 z-10 sm:px-3">
        <img
          src={logo}
          alt="logo"
          className="w-44 cursor-pointer sm:w-36"
          onClick={() => navigate("/")}
        />
        <div className="flex justify-around items-center w-56 sm:w-44 xs:w-36">
          <i class="fa-solid fa-moon"></i>
          <p>{`${authState?.user?.firstName} ${authState?.user?.lastName}`}</p>
        </div>
      </div>
    </>
  );
};
