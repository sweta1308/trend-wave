import { Link } from "react-router-dom";
import { error404 } from "../assets";

export const PageNotFound = () => {
  return (
    <main className="min-h-screen flex justify-center items-center flex-col">
      <img src={error404} alt="404 illustration" />
      <h2 className="font-bold text-xl">
        Oops! The page you’re trying to reach doesn’t exist.
      </h2>
      <Link
        to="/"
        className="mt-[10px] hover:text-primary-color hover:underline"
      >
        Click here to go back home
      </Link>
    </main>
  );
};
