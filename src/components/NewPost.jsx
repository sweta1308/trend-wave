import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useAuth } from "../context/auth-context";
import { usePost } from "../context/post-context";

export const NewPost = () => {
  const { authState } = useAuth();
  const { createNewPost } = usePost();
  const initialState = {
    content: "",
    imageUrl: "",
  };
  const [userInput, setUserInput] = useState(initialState);
  const [image, setImage] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);

  return (
    <>
      <div className="py-[15px] w-[600px] pl-[70px] relative xs:w-[370px] xs:pl-[20px]">
        <div className="flex w-full justify-center">
          <img
            src={authState?.user?.avatarUrl}
            alt="avatar"
            className="w-[60px] h-[60px] mr-[15px] rounded-full xs:w-[45px] xs:h-[45px]"
          />
          <div>
            <textarea
              cols="100"
              rows="2"
              value={userInput?.content}
              className="text-black shadow-lg bg-primary-lightest resize-none py-[10px] px-[15px] text-sm border-none outline-none w-[70%]"
              placeholder="What's happening?"
              onChange={(e) =>
                setUserInput({ ...userInput, content: e.target.value })
              }
            ></textarea>

            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-[300px] xs:w-[250px]"
              />
            )}
          </div>
        </div>

        <div className="flex items-center mr-[55px] mt-[15px] absolute left-[150px] xs:left-[50px]">
          <div>
            <label
              className="relative"
              onClick={() => setShowEmoji(!showEmoji)}
            >
              {showEmoji && (
                <div className="z-20 absolute top-[30px]">
                  {" "}
                  <Picker
                    data={data}
                    maxFrequentRows={0}
                    previewPosition="none"
                    emojiButtonSize={28}
                    emojiSize={20}
                    onEmojiSelect={(emoji) => {
                      setUserInput({
                        ...userInput,
                        content: userInput.content + emoji.native,
                      });
                    }}
                  />{" "}
                </div>
              )}
              <i
                className="fa-regular fa-face-smile fa-xl cursor-pointer"
                style={{ color: "#377dff" }}
              ></i>
            </label>
          </div>

          <label>
            <i className="fa-regular fa-image fa-xl cursor-pointer text-primary-color mx-[15px]"></i>
            <input
              className="hidden"
              type="file"
              accept="/image*"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setUserInput({
                  ...userInput,
                  imageUrl: URL.createObjectURL(e.target.files[0]),
                });
              }}
            />
          </label>
          <button
            onClick={() => {
              createNewPost(userInput);
              setUserInput(initialState);
              setImage(null);
            }}
            className="bg-primary-color text-white py-[5px] px-[15px] rounded-md"
            disabled={userInput?.content === "" && userInput?.imageUrl === ""}
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
};
