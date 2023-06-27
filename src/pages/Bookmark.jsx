import PulseLoader from "react-spinners/PulseLoader";
import { Navbar } from "../components/Navbar";
import { RightNav } from "../components/RightNav";
import { Sidenav } from "../components/Sidenav";
import { useBookmark } from "../context/bookmark-context";
import { usePost } from "../context/post-context";
import { DisplayPost } from "../components/DisplayPost";

export const Bookmark = () => {
  document.title = "Trend Wave | Bookmark";
  const { bookmarkState } = useBookmark();
  const { postState } = usePost();
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidenav />
        <div className="min-h-screen bg-primary-lightest py-5 mx-5 relative left-[15%] w-[65%] flex flex-col items-center rounded-xl lg:left-[30%] lg:w-[65%] md:left-0 md:w-full md:pb-[110px]">
          <h1 className="text-2xl font-bold mb-5 underline decoration-blue-400">
            Bookmarks
          </h1>
          {bookmarkState?.bookmark?.length === 0 ? (
            <h1 className="text-2xl font-medium text-primary-color mt-10">
              No Bookmarks Added!
            </h1>
          ) : (
            <div>
              {bookmarkState?.isBookmarkLoading ? (
                <PulseLoader color="var(--primary-color)" size={30} />
              ) : (
                <div>
                  {bookmarkState?.bookmark?.map((postId) => (
                    <div>
                      <DisplayPost
                        userPost={postState?.post?.find(
                          (post) => post._id === postId
                        )}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <RightNav />
      </div>
    </>
  );
};
