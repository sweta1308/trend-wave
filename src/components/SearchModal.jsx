import { useNavigate } from "react-router";
import { useUser } from "../context/user-context";

export const SearchModal = ({ searchInput, setShowSearchModal }) => {
  const { userState } = useUser();
  const navigate = useNavigate();
  const filteredUser =
    searchInput?.trim().length > 0 &&
    userState?.filter(
      (user) =>
        user?.firstName
          ?.toLowerCase()
          .includes(searchInput.trim().toLowerCase()) ||
        user?.lastName
          ?.toLowerCase()
          .includes(searchInput.trim().toLowerCase()) ||
        user?.username?.toLowerCase().includes(searchInput.trim().toLowerCase())
    );

  return (
    <div className="p-[20px] text-sm z-50 m-auto absolute top-[80px] bg-white shadow-lg left-[38%] w-[300px] xl:left-[30%] md:top-[150px] sm:top-[120px] sm:left-[25%] xs:left-[12%] dark:bg-dark-mode">
      <i
        className="fa-solid fa-xmark absolute right-[20px] cursor-pointer hover:text-primary-color"
        onClick={() => setShowSearchModal(false)}
      ></i>
      <div>
        {searchInput?.length > 0 && (
          <div>{filteredUser?.length === 0 && <h1>No Users Found</h1>}</div>
        )}
        {searchInput?.length === 0 && <h1>No Users Found</h1>}
      </div>
      <div>
        {filteredUser?.length > 0 && (
          <div>
            {filteredUser?.map((user) => (
              <div
                className="flex items-center cursor-pointer my-[5px]"
                onClick={() => {
                  navigate(`/profile/${user?.username}`);
                  setShowSearchModal(false);
                }}
              >
                <img
                  className="w-[50px] rounded-full mr-[10px]"
                  src={user?.avatarUrl}
                  alt="avatar"
                />
                <div>
                  <h3>
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p>@{user?.username}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
