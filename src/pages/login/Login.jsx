import { useState } from "react";
import { login, logo } from "../../assets";
import "./Login.css";
import { useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <>
      <div className="flex">
        <img src={login} alt="login-header" className="h-screen w-1/2 md:hidden" />
        <div className="p-24 pb-16 lg:px-16 md:py-4 sm:px-8">
          <img src={logo} alt="logo" className="w-1/2 hidden md:block" />
          <h1 className="text-2xl font-bold text-center mb-8 underline decoration-blue-400">Login</h1>
          <form className="relative">
            <label for="username">Username <span className="text-red-600">*</span></label>
            <input
              required
              id="username"
              placeholder="adarshbalika"
              className="w-full border border-solid border-gray-600 rounded text-xs p-2"
            />
            <label for="password" className="mt-3">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              required
              id="password"
              placeholder={isPasswordVisible ? "password" : "********"}
              className="w-full border border-solid border-gray-600 rounded text-xs p-2"
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
            <input type="submit" value="Log In" className="submit-btn w-full py-2 cursor-pointer text-md"/>
            <button className="guest-submit py-2 cursor-pointer text-md">Guest Login</button>
          </form>

          <p className="text-sm text-center mt-2">Don't have an account? <span className="sign-up" onClick={() => navigate('/signup')}>Sign Up</span></p>
        </div>
      </div>
    </>
  );
};
