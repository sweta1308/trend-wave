import { Navbar } from "../components/Navbar";
import { NewPost } from "../components/NewPost";
import { RightNav } from "../components/RightNav";
import { Sidenav } from "../components/Sidenav";

export const Home = () => {
  document.title = "Trend Wave | Feed";
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidenav />
        <div className="py-5 mx-5 relative left-[15%] w-[65%] flex flex-col items-center bg-primary-lightest rounded-xl lg:left-[30%] lg:w-[65%] md:left-0 md:w-full md:pb-[110px]">
          <NewPost />
        </div>
        <RightNav />
      </div>
    </>
  );
};
