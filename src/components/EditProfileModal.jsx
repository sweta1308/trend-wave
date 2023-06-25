import { useState } from "react";
import { useUser } from "../context/user-context";
import { Avatar } from "./AvatarModal";
import { useAuth } from "../context/auth-context";

export const EditProfile = ({ userObj, setShowEditModal }) => {
  const { authState } = useAuth();
  const { editUserdata } = useUser();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [userValue, setUserValue] = useState({
    firstName: userObj?.firstName,
    lastName: userObj?.lastName,
    avatarUrl: userObj?.avatarUrl,
    bio: userObj?.bio,
    website: userObj?.website,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserValue((userValue) => ({ ...userValue, [name]: value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    editUserdata(userValue);
    setShowEditModal(false);
  };

  return (
    <>
      {showAvatarModal && (
        <Avatar
          setUserValue={setUserValue}
          setShowAvatarModal={setShowAvatarModal}
        />
      )}
      <div
        style={{ filter: showAvatarModal ? "blur(10px)" : "" }}
        className="p-[30px] block w-[400px] absolute left-[35%] top-[4%] z-20 bg-white md:left-[20%] sm:left-[10%] xs:w-[320px]"
      >
        <h1 className="font-bold mb-[15px]">EDIT PROFILE</h1>
        <form className="flex flex-col" onSubmit={submitHandler}>
          <img
            src={userValue?.avatarUrl}
            alt="avatar"
            className="w-[100px] h-[100px] m-auto rounded-full"
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              setShowAvatarModal(true);
            }}
            className="bg-primary-color text-white my-[6px] mb-[20px] p-[7px] hover:bg-primary-dark"
          >
            Update Avatar
          </button>
          <div className="flex xs:flex-col">
            <div className="xs:mb-[10px]">
              <label className="xs:mr-[10px]" for="first-name">
                First Name
              </label>
              <input
                value={userValue?.firstName}
                id="first-name"
                name="firstName"
                className="text-sm w-[160px] border border-gray-300 rounded-md p-[5px]"
                onChange={handleChange}
              />
            </div>

            <div>
              <label for="last-name" className="mt-[10px] mr-[10px]">
                Last Name
              </label>
              <input
                value={userValue?.lastName}
                id="last-name"
                name="lastName"
                className="text-sm w-[160px] border border-gray-300 rounded-md p-[5px]"
                onChange={handleChange}
              />
            </div>
          </div>

          <label for="bio" className="mt-[10px]">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={userValue?.bio}
            className="text-sm resize-none border border-gray-300 rounded-md p-[5px]"
            onChange={handleChange}
          ></textarea>
          <label for="website" className="mt-[10px]">
            Website
          </label>
          <input
            value={userValue?.website}
            id="website"
            name="website"
            className="text-sm border border-gray-300 rounded-md p-[5px]"
            onChange={handleChange}
          />
          <div className="mt-[15px]">
            <input
              className="mr-[10px] bg-primary-color text-white px-[15px] py-[5px] rounded-md border border-primary-color cursor-pointer hover:bg-primary-dark hover:border-primary-dark"
              value="Save"
              type="submit"
            />
            <button
              className="bg-white px-[15px] py-[5px] border border-primary-color rounded-md text-primary-color hover:bg-primary-color hover:text-white"
              onClick={() => setShowEditModal(false)}
            >
              Discard
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
