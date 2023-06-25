import { useState } from "react";
import { toast } from "react-toastify";
import { avatar } from "../backend/db/avatar";
import { useAuth } from "../context/auth-context";

export const Avatar = ({ userValue, setUserValue, setShowAvatarModal }) => {
  const { authState } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState("");
  return (
    <div className="z-50 w-[400px] p-[20px] m-auto absolute bg-white left-[35%] top-[8%] md:left-[20%] sm:left-[10%] xs:w-[320px]">
      <div className="flex items-center justify-between p-[30px]">
        <h1 className="font-bold text-3xl">Avatars</h1>
        <i
          onClick={() => setShowAvatarModal(false)}
          className="fa-solid fa-xmark cursor-pointer text-lg hover:text-primary-color"
        ></i>
      </div>
      <div className="flex flex-wrap">
        {avatar
          ?.filter((image) => image !== authState?.user?.avatarUrl)
          .map((avatar) => (
            <div className="m-[5px]">
              <img
                style={{
                  border: selectedAvatar === avatar ? "4px solid blue" : "",
                }}
                className="w-[100px] rounded-full border-2 border-black cursor-pointer xs:w-[70px]"
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
  );
};
