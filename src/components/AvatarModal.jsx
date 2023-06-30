import { useState } from "react";
import { Modal } from "@mui/material";
import { toast } from "react-toastify";
import { avatar } from "../backend/db/avatar";
import { useAuth } from "../context/auth-context";

export const Avatar = ({
  userValue,
  setUserValue,
  setShowAvatarModal,
  showAvatarModal,
}) => {
  const { authState } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState("");

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

  return (
    <Modal
      open={showAvatarModal}
      onClose={() => setShowAvatarModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className="z-50 bg-white p-[20px] rounded-lg dark:bg-dark-mode dark:text-white"
        style={{ ...style }}
      >
        <div className="flex items-center justify-between p-[30px]">
          <h1 className="font-bold text-3xl">Avatars</h1>
          <i
            onClick={() => setShowAvatarModal(false)}
            className="fa-solid fa-xmark cursor-pointer text-lg hover:text-primary-color"
          ></i>
        </div>
        <div className="flex flex-wrap justify-center">
          {avatar
            ?.filter((image) => image !== authState?.user?.avatarUrl)
            .map((avatar) => (
              <div className="m-[5px]">
                <img
                  style={{
                    border: selectedAvatar === avatar ? "4px solid blue" : "",
                  }}
                  className="w-[80px] rounded-full border-2 border-black cursor-pointer xs:w-[70px]"
                  src={avatar}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(avatar)}
                />
              </div>
            ))}
        </div>

        <button
          onClick={() => {
            if (selectedAvatar.length === 0) {
              toast.warning("Please select an avatar!");
            } else {
              setUserValue({ ...userValue, avatarUrl: selectedAvatar });
            }
            setShowAvatarModal(false);
          }}
          className="bg-primary-color text-white w-full p-[10px] my-[20px] hover:bg-primary-dark"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};
