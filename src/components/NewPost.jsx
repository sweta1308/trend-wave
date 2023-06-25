import { useState } from "react";
import { useAuth } from "../context/auth-context";

export const NewPost = () => {
  const { authState } = useAuth();
  const [userInput, setUserInput] = useState("");
  const [userImage, setUserImage] = useState([]);
  return (
    <>
      <div className="bg-white py-[15px]">
        <div className="flex w-full justify-center">
          <img
            src={authState?.user?.avatarUrl}
            alt="avatar"
            className="w-[60px] h-[60px] mr-[15px] rounded-full"
          />

          <textarea
            cols="70"
            rows="2"
            className="bg-primary-lightest resize-none py-[10px] px-[15px] text-sm border-none outline-none w-[70%]"
            placeholder="What's happening?"
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end items-center mr-[55px] mt-[15px]">
          <label>
            <i className="fa-regular fa-image fa-lg cursor-pointer text-primary-color mr-[10px]"></i>
            <input className="hidden" type="file" accept="/image*" />
          </label>
          <button className="bg-primary-color text-white py-[5px] px-[15px] rounded-md">
            Post
          </button>
        </div>
      </div>
    </>
  );
};
