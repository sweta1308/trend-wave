import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";
import { useUser } from "../context/user-context";
import { usePost } from "../context/post-context";

export const RightNav = () => {
  const { userState, userLoading, followUser, unfollowUser } = useUser();
  const { authState } = useAuth();
  const { getUserPost } = usePost();
  const navigate = useNavigate();

  const isFollowed = (userId) =>
    userState
      ?.find((user) => user._id === userId)
      ?.followers.some((user) => user._id === authState?.user?._id);

  return (
    <div className="fixed left-[83%] pl-10 xl:pl-5 px-3 py-5 text-center min-h-screen lg:hidden dark:text-white">
      <h1 className="text-left font-bold mb-5 ">Suggestions for you</h1>

      {userLoading ? (
        <BeatLoader color="var(--primary-color)" size={10} />
      ) : (
        userState?.slice(0, 5)?.map((user) => (
          <div key={user._id}>
            {user?.username !== authState?.user?.username ? (
              <div key={user?._id} className="flex flex-col my-4">
                <div
                  onClick={() => {
                    getUserPost(user?.username);
                    navigate(`/profile/${user?.username}`);
                  }}
                  className="flex cursor-pointer"
                >
                  <img
                    src={user?.avatarUrl}
                    alt="avatar"
                    className="w-[35px] h-[35px] mr-2 bg-primary-color rounded-full"
                  />
                  <div>
                    <h1 className="font-medium text-sm">{`${user?.firstName} ${user?.lastName}`}</h1>
                    <p className="text-xs">@{user?.username}</p>
                  </div>
                </div>

                {isFollowed(user?._id) ? (
                  <button
                    onClick={() => unfollowUser(user?._id)}
                    className="text-primary-color border-2 border-primary-color rounded-md cursor-pointer text-sm py-[5px] hover:bg-primary-color hover:text-white my-2"
                  >
                    Following
                  </button>
                ) : (
                  <button
                    onClick={() => followUser(user?._id)}
                    className="bg-primary-color text-white border-2 border-primary-color rounded-md cursor-pointer text-sm py-[5px] hover:bg-primary-dark hover:border-primary-dark my-2"
                  >
                    <i className="fa-solid fa-plus fa-xs"></i> Follow
                  </button>
                )}
              </div>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
};
