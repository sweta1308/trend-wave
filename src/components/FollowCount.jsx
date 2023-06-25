import { useNavigate } from "react-router";
import { usePost } from "../context/post-context";

export const FollowCount = ({ arr, setShowModal, showModal }) => {
  const { getUserPost } = usePost();
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[300px] bg-primary-lightest border p-[15px] absolute top-44 shadow-md z-30 rounded-xl left-[40%] md:left-[30%] sm:left-[20%] xs:w-[250px] xs:left-[15%]">
        <div className="flex justify-between items-center pb-[10px]">
          <p className="font-bold">{showModal.type}</p>
          <i
            className="fa-solid fa-xmark cursor-pointer hover:text-primary-color"
            onClick={() =>
              setShowModal((showModal) => ({
                ...showModal,
                show: false,
                type: "",
              }))
            }
          ></i>
        </div>

        <div>
          {arr.length === 0 && <p>No {showModal.type}</p>}
          {arr.map(({ _id, firstName, lastName, username, avatarUrl }) => (
            <div
              key={_id}
              onClick={() => {
                getUserPost(username);
                navigate(`/profile/${username}`);
                setShowModal((showModal) => ({ ...showModal, show: false }));
              }}
              className="flex cursor-pointer my-[10px] shadow-md p-[10px]"
            >
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-[35px] h-[35px] mr-2 bg-primary-color rounded-full"
              />
              <div>
                <h1 className="font-medium text-sm">{`${firstName} ${lastName}`}</h1>
                <p className="text-xs">@{username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
