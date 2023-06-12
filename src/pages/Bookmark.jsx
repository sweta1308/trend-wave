import { Navbar } from "../components/Navbar";
import { RightNav } from "../components/RightNav";
import { Sidenav } from "../components/Sidenav";

export const Bookmark = () => {
  document.title = "Trend Wave | Bookmark";
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidenav />
        <div className="py-5 mx-2 relative left-[15%] w-[65%] flex flex-col items-center bg-primary-lightest rounded-xl lg:left-[30%] lg:w-[65%] md:left-0 md:w-full md:pb-[110px]">
          <h1>Bookmark</h1>
        </div>
        <RightNav />
      </div>
    </>
  );
};
