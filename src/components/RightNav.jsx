import BeatLoader from "react-spinners/BeatLoader";
import { useAuth } from "../context/auth-context";
import { useUser } from "../context/user-context";

export const RightNav = () => {
  const { userState, userLoading } = useUser();
  const { authState } = useAuth();
  return (
    <div className="fixed left-[83%] pl-10 xl:pl-5 px-3 py-5 border-l-2 border-solid border-black text-center min-h-screen lg:hidden">
      <h1 className="text-left font-bold mb-5 underline decoration-2 decoration-blue-400">
        Suggestions for you
      </h1>

      {userLoading ? (
        <BeatLoader color="var(--primary-color)" size={10} />
      ) : (
        userState?.slice(0, 5)?.map((user) => (
          <div>
            {user?.username !== authState?.user?.username ? (
              <div className="flex flex-col my-4">
                <div className="flex">
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

                <button className="bg-primary-color text-white rounded-md cursor-pointer text-sm py-[5px] hover:bg-primary-dark my-2">
                  <i className="fa-solid fa-plus fa-xs"></i> Follow
                </button>
              </div>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
};
