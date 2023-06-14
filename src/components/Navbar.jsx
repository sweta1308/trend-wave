import { useNavigate } from "react-router";
import { logo } from "../assets";
import { useAuth } from "../context/auth-context";
import { usePost } from "../context/post-context";

export const Navbar = () => {
  const { authState } = useAuth();
  const { getUserPost } = usePost();
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white flex justify-between items-center px-14 sticky top-0 z-10 sm:px-3">
        <img
          src={logo}
          alt="logo"
          className="w-44 cursor-pointer sm:w-32"
          onClick={() => navigate("/")}
        />
        <div className="flex justify-around items-center w-56 xs:w-44">
          <i className="fa-solid fa-moon fa-lg cursor-pointer"></i>
          <div
            onClick={() => {
              getUserPost(authState?.user?.username);
              navigate(`/profile/${authState?.user?.username}`);
            }}
            className="flex items-center cursor-pointer hover:underline hover:decoration-blue-400 hover:text-primary-color sm:text-[14px]"
          >
            <p>{`${authState?.user?.firstName} ${authState?.user?.lastName}`}</p>
            {authState?.user?.avatarUrl ? (
              <img
                src={authState?.user?.avatarUrl}
                alt="avatar"
                className="w-[35px] h-[35px] ml-2 rounded-full"
              />
            ) : (
              <div className="w-[35px] h-[35px] ml-2 text-bold rounded-full bg-primary-color text-white flex justify-center items-center">
                {authState?.user?.firstName?.slice(0, 1)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
