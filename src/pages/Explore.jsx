import { Navbar } from "../components/Navbar";
import { Sidenav } from "../components/Sidenav";
import { usePost } from "../context/post-context";
import { DisplayPost } from "../components/DisplayPost";
import PulseLoader from "react-spinners/PulseLoader";
import { RightNav } from "../components/RightNav";

export const Explore = () => {
  document.title = "Trend Wave | Explore";
  const { postState } = usePost();

  return (
    <>
      <Navbar />
      <div className="flex relative">
        <Sidenav />
        <div className="py-5 mx-5 relative left-[15%] w-[65%] flex flex-col items-center bg-primary-lightest rounded-xl lg:left-[30%] lg:w-[65%] md:left-0 md:w-full md:pb-[110px]">
          {postState.postLoading && (
            <PulseLoader color="var(--primary-color)" size={30} />
          )}
          {postState?.post?.map((posts) => (
            <div>
              <DisplayPost userPost={posts} />
            </div>
          ))}
        </div>
        <RightNav />
      </div>
    </>
  );
};
