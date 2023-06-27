import { useNavigate } from "react-router";
import { header, logo } from "../assets";

export const Header = () => {
  document.title = "Trend Wave | Register";
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen py-24 px-54 flex justify-evenly xl:px-56 lg:px-32 md:flex-col-reverse md:items-center">
        <div className="w-240 md:text-center">
          <img
            src={logo}
            alt="logo"
            className="w-60 pb-20 md:m-auto md:py-12"
          />
          <p className="uppercase text-xs">
            <span className="text-4xl text-gray-500 font-semibold md:text-3xl">
              Follow
            </span>
            people around the globe
          </p>
          <p className="uppercase text-xs">
            <span className="text-4xl text-gray-500 font-semibold md:text-3xl">
              Connect
            </span>
            with yor friends
          </p>
          <p className="uppercase text-xs">
            <span className="text-4xl text-gray-500 font-semibold md:text-3xl">
              Share
            </span>
            what you are thinking
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-primary-color text-white p-2 text-lg w-72 mt-24 hover:bg-primary-dark"
          >
            Join Now
          </button>
          <p className="text-sm mt-3">
            Already have an account?{" "}
            <span
              className="text-primary-color cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Log In
            </span>
          </p>
        </div>
        <img
          src={header}
          alt="xs:w-80"
          className="header w-96 xl:w-80 lg:w-64"
        />
      </div>
    </>
  );
};
