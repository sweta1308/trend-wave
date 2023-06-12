import { useState } from "react";
import { login, logo } from "../assets";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";

export const Login = () => {
  document.title = "Trend Wave | Login";
  const navigate = useNavigate();
  const { userLogin } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [userLoginDetails, setUserLoginDetails] = useState({
    username: "",
    password: "",
  });

  const guestUserLoginDetails = {
    username: "adarshbalika",
    password: "adarsh@123",
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    userLogin(userLoginDetails);
  };

  return (
    <>
      <div className="flex">
        <img
          src={login}
          alt="login-header"
          className="h-screen w-1/2 md:hidden"
        />

        <div className="p-24 pb-16 lg:px-16 md:py-4 sm:px-8">
          <img src={logo} alt="logo" className="w-1/2 hidden md:block" />
          <h1 className="text-2xl font-bold text-center mb-8 underline decoration-blue-400">
            Login
          </h1>

          <form className="relative" onSubmit={loginSubmitHandler}>
            <label for="username">
              Username <span className="text-red-600">*</span>
            </label>
            <input
              required
              onChange={(e) =>
                setUserLoginDetails({
                  ...userLoginDetails,
                  username: e.target.value,
                })
              }
              name="username"
              value={userLoginDetails.username}
              id="username"
              placeholder="adarshbalika"
              className="mb-6 w-full border border-solid border-gray-600 rounded text-xs p-2"
            />

            <label for="password" className="mt-3">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              onChange={(e) =>
                setUserLoginDetails({
                  ...userLoginDetails,
                  password: e.target.value,
                })
              }
              value={userLoginDetails.password}
              required
              id="password"
              placeholder={isPasswordVisible ? "password" : "********"}
              className="mb-6 w-full border border-solid border-gray-600 rounded text-xs p-2"
            />
            {isPasswordVisible ? (
              <i
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                className="fa-regular fa-eye-slash cursor-pointer mt-2 absolute right-5"
              ></i>
            ) : (
              <i
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                className="fa-regular fa-eye cursor-pointer mt-2 absolute right-5"
              ></i>
            )}

            <input
              type="submit"
              value="Log In"
              className="mb-6 w-full py-2 cursor-pointer text-md bg-primary-color text-white hover:bg-primary-dark hover:transition-colors hover:duration-200 hover:ease-in-out"
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                setUserLoginDetails(guestUserLoginDetails);
              }}
              className="guest-submit py-2 cursor-pointer text-md text-primary-color border-x border-y border-primary-color w-full hover:bg-primary-color hover:text-white hover:transition-colors hover:duration-200 hover:ease-in-out"
            >
              Guest Login
            </button>
          </form>

          <p className="text-sm text-center mt-2">
            Don't have an account?{" "}
            <span
              className="text-primary-color cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
