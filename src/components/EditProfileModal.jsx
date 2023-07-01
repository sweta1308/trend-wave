import { useState } from "react";
import { useUser } from "../context/user-context";
import { Avatar } from "./AvatarModal";
import { Modal } from "@mui/material";

export const EditProfile = ({ userObj, setShowEditModal, showEditModal }) => {
  const { editUserdata } = useUser();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [userValue, setUserValue] = useState({
    firstName: userObj?.firstName,
    lastName: userObj?.lastName,
    avatarUrl: userObj?.avatarUrl,
    bio: userObj?.bio,
    website: userObj?.website,
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 340,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };

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
          showAvatarModal={showAvatarModal}
        />
      )}
      <Modal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{ filter: showAvatarModal ? "blur(10px)" : "", ...style }}
          className="bg-white z-40 p-[20px] rounded-lg dark:bg-dark-mode dark:text-white"
        >
          <h1 className="font-bold mb-[15px]">EDIT PROFILE</h1>
          <form className="flex flex-col" onSubmit={submitHandler}>
            <img
              src={userValue?.avatarUrl}
              alt="avatar"
              className="w-[100px] h-[100px] m-auto rounded-full"
            />

            <div className="flex justify-around my-[10px]">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowAvatarModal(true);
                }}
                className="bg-primary-color rounded-lg text-white my-[6px] mb-[20px] p-[7px] hover:bg-primary-dark"
              >
                Update Avatar
              </button>

              <label>
                <p className="cursor-pointer my-[6px] p-[7px] border border-primary-color rounded-lg text-primary-color hover:bg-primary-color hover:text-white">
                  Upload From Photos
                </p>
                <input
                  className="hidden"
                  type="file"
                  accept="/image*"
                  onChange={(e) => {
                    setUserValue({
                      ...userValue,
                      avatarUrl: URL.createObjectURL(e.target.files[0]),
                    });
                  }}
                />
              </label>
            </div>

            <div className="flex xs:flex-col">
              <div className="xs:mb-[10px]">
                <label className="xs:mr-[10px]" for="first-name">
                  First Name
                </label>
                <input
                  value={userValue?.firstName}
                  id="first-name"
                  name="firstName"
                  className="text-sm w-[140px] border border-gray-300 rounded-md p-[5px] dark:bg-dark-mode"
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
                  className="text-sm w-[140px] border border-gray-300 rounded-md p-[5px] dark:bg-dark-mode"
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
              className="text-sm resize-none border border-gray-300 rounded-md p-[5px] dark:bg-dark-mode"
              onChange={handleChange}
            ></textarea>
            <label for="website" className="mt-[10px]">
              Website
            </label>
            <input
              value={userValue?.website}
              id="website"
              name="website"
              className="text-sm border border-gray-300 rounded-md p-[5px] dark:bg-dark-mode"
              onChange={handleChange}
            />
            <div className="mt-[15px]">
              <input
                className="mr-[10px] bg-primary-color text-white px-[15px] py-[5px] rounded-md border border-primary-color cursor-pointer hover:bg-primary-dark hover:border-primary-dark"
                value="Save"
                type="submit"
              />
              <button
                className="px-[15px] py-[5px] border border-primary-color rounded-md text-primary-color hover:bg-primary-color hover:text-white"
                onClick={() => setShowEditModal(false)}
              >
                Discard
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
