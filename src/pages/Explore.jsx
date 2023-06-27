import { Navbar } from "../components/Navbar";
import { Sidenav } from "../components/Sidenav";
import { usePost } from "../context/post-context";
import { DisplayPost } from "../components/DisplayPost";
import PulseLoader from "react-spinners/PulseLoader";
import { RightNav } from "../components/RightNav";
import { useAuth } from "../context/auth-context";

export const Explore = () => {
  document.title = "Trend Wave | Explore";
  const { postState } = usePost();
  const { authState } = useAuth();

  const exploreData = postState?.post?.filter(
    (data) => data?.username !== authState?.user?.username
  );

  return (
    <>
      <Navbar />
      <div className="flex relative">
        <Sidenav />
        <div className="min-h-screen bg-primary-lightest py-5 mx-5 relative left-[15%] w-[65%] flex flex-col items-center rounded-xl lg:left-[30%] lg:w-[65%] md:left-0 md:w-full md:pb-[110px]">
          {postState.postLoading && (
            <PulseLoader color="var(--primary-color)" size={30} />
          )}
          {exploreData?.map((posts) => (
            <div key={posts._id}>
              <DisplayPost userPost={posts} />
            </div>
          ))}
        </div>
        <RightNav />
      </div>
    </>
  );
};
