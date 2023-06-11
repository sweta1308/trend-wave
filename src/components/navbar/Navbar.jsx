import { useNavigate } from "react-router";
import { logo } from "../../assets";
import { useAuth } from "../../context/auth-context";

export const Navbar = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white flex justify-between items-center px-14 border-b-2 border-black sticky top-0 z-10">
        <img
          src={logo}
          alt="logo"
          className="w-44 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex justify-around items-center w-56">
          <i class="fa-solid fa-moon"></i>
          <p>{`${authState?.user?.firstName} ${authState?.user?.lastName}`}</p>
        </div>
      </div>
    </>
  );
};
