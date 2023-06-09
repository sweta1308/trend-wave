import { useState } from "react";
import { useNavigate } from "react-router";

export const Signup = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="w-96 m-auto sm:w-72">
        <h1 className="text-3xl py-12 underline decoration-blue-400 font-bold text-center mb-8">
          Signup
        </h1>
        <form className="relative">
          <div className="flex sm:block">
            <div className="mr-2 sm:mr-0">
              <label for="first-name">
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                required
                id="first-name"
                placeholder="Adarsh"
                className="border border-solid border-gray-600 rounded text-xs p-2 w-full"
              />
            </div>

            <div className="ml-2 sm:ml-0">
              <label for="last-name">
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                required
                id="last-name"
                placeholder="Balika"
                className="border border-solid border-gray-600 rounded text-xs p-2 w-full"
              />
            </div>
          </div>

          <label for="email">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            required
            type="email"
            id="email"
            placeholder="adarshbalika@example.com"
            className="border border-solid border-gray-600 rounded text-xs p-2 w-full"
          />

          <label for="username">
            Username <span className="text-red-600">*</span>
          </label>
          <input
            required
            id="username"
            placeholder="adarshbalika"
            className="border border-solid border-gray-600 rounded text-xs p-2 w-full"
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
              className="eye-icon fa-regular fa-eye-slash cursor-pointer mt-2 absolute right-5"
            ></i>
          ) : (
            <i
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className="eye-icon fa-regular fa-eye cursor-pointer mt-2 absolute right-5"
            ></i>
          )}
          <input
            type="submit"
            value="Sign In"
            className="submit-btn w-full py-2 cursor-pointer text-md"
          />
        </form>

        <p className="text-sm text-center">Already have an account? <span className="sign-up" onClick={() => navigate('/login')}>Log In</span></p>

      </div>
    </>
  );
};
