import PulseLoader from "react-spinners/PulseLoader";
import { Navbar } from "../components/Navbar";
import { NewPost } from "../components/NewPost";
import { RightNav } from "../components/RightNav";
import { Sidenav } from "../components/Sidenav";
import { useAuth } from "../context/auth-context";
import { usePost } from "../context/post-context";
import { useUser } from "../context/user-context";
import { DisplayPost } from "../components/DisplayPost";
import { FilterComponent } from "../components/FilterComponent";

export const Home = () => {
  document.title = "Trend Wave | Feed";
  const { postState } = usePost();
  const { userState } = useUser();
  const { authState } = useAuth();
  let userFeed = [];
  const loggedInUser = userState?.find(
    ({ _id }) => _id === authState?.user?._id
  );
  const followFeedPost = postState?.post?.filter(({ username }) => {
    const followUsernameArr = loggedInUser?.following?.map(
      ({ username }) => username
    );
    return followUsernameArr?.includes(username);
  });

  userFeed = [
    ...userFeed,
    ...followFeedPost,
    ...postState?.post?.filter(
      ({ username }) => username === loggedInUser?.username
    ),
  ];

  const sortAsTrending = () => {
    userFeed = userFeed.sort(
      (a, b) => b?.likes?.likeCount - a?.likes?.likeCount
    );
    return userFeed;
  };

  const sortAsLatest = () => {};

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidenav />
        <div className="py-5 mx-5 relative left-[15%] w-[65%] flex flex-col items-center bg-primary-lightest rounded-xl lg:left-[30%] lg:w-[65%] md:left-0 md:w-full md:pb-[110px]">
          <NewPost />
          <FilterComponent
            sortAsTrending={sortAsTrending}
            sortAsLatest={sortAsLatest}
          />
          {postState.postLoading && (
            <PulseLoader color="var(--primary-color)" size={30} />
          )}
          <div className="mt-[30px]">
            {userFeed.length === 0 && (
              <h1 className="font-bold text-3xl">No Posts to show.</h1>
            )}
            {userFeed?.map((posts) => (
              <div key={posts._id}>
                <DisplayPost userPost={posts} />
              </div>
            ))}
          </div>
        </div>
        <RightNav />
      </div>
    </>
  );
};
