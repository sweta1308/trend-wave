import { useState } from "react";
import { useNavigate } from "react-router";
import "./Signup.css";
import { useAuth } from "../../context/auth-context";

export const Signup = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { userSignup } = useAuth();

  const [userSignupDetails, setUserSignupDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const signupSubmitHandler = (e) => {
    e.preventDefault();
    userSignup(userSignupDetails)
  };

  return (
    <>
      <div className="signup-container px-10 py-5 mt-16 w-96 m-auto sm:w-80 sm:px-6">
        <h1 className="text-3xl py-5 underline decoration-blue-400 font-bold text-center mb-8">
          Signup
        </h1>

        <form className="relative" onSubmit={signupSubmitHandler}>
          <div className="flex sm:block">
            <div className="mr-2 sm:mr-0">
              <label for="first-name">
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                required
                name="firstName"
                value={userSignupDetails.firstName}
                id="first-name"
                placeholder="Adarsh"
                onChange={(e) =>
                  setUserSignupDetails({
                    ...userSignupDetails,
                    firstName: e.target.value,
                  })
                }
                className="border border-solid border-gray-600 rounded text-xs p-2 w-full"
              />
            </div>

            <div className="ml-2 sm:ml-0">
              <label for="last-name">
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                required
                name="lastName"
                value={userSignupDetails.lastName}
                id="last-name"
                onChange={(e) =>
                  setUserSignupDetails({
                    ...userSignupDetails,
                    lastName: e.target.value,
                  })
                }
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
            name='email'
            value={userSignupDetails.email}
            type="email"
            id="email"
            placeholder="adarshbalika@example.com"
            onChange={(e) =>
              setUserSignupDetails({
                ...userSignupDetails,
                email: e.target.value,
              })
            }
            className="border border-solid border-gray-600 rounded text-xs p-2 w-full"
          />

          <label for="username">
            Username <span className="text-red-600">*</span>
          </label>
          <input
            required
            name="username"
            value={userSignupDetails.username}
            id="username"
            placeholder="adarshbalika"
            onChange={(e) =>
              setUserSignupDetails({
                ...userSignupDetails,
                username: e.target.value,
              })
            }
            className="border border-solid border-gray-600 rounded text-xs p-2 w-full"
          />

          <label for="password" className="mt-3">
            Password <span className="text-red-600">*</span>
          </label>
          <input
            type={isPasswordVisible ? "text" : "password"}
            required
            name="password"
            value={userSignupDetails.password}
            id="password"
            placeholder={isPasswordVisible ? "password" : "********"}
            onChange={(e) =>
              setUserSignupDetails({
                ...userSignupDetails,
                password: e.target.value,
              })
            }
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
            value="Sign Up"
            className="w-full py-2 cursor-pointer text-md bg-primary-color text-white hover:bg-primary-dark hover:transition-colors hover:duration-200 hover:ease-in-out"
          />
        </form>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <span className="text-primary-color cursor-pointer hover:underline" onClick={() => navigate("/login")}>
            Log In
          </span>
        </p>
      </div>
    </>
  );
};
