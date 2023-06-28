import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Modal } from "@mui/material";
import { usePost } from "../context/post-context";

export const NewPost = ({ showModal, setShowModal }) => {
  const { createNewPost } = usePost();
  const initialState = {
    content: "",
    imageUrl: "",
  };

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

  const [userInput, setUserInput] = useState(initialState);
  const [image, setImage] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);

  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="bg-white">
        <div style={{ ...style }} className="bg-white z-40 p-[20px] rounded-lg">
          <i
            className="fa-solid fa-xmark absolute right-[20px] cursor-pointer hover:text-primary-color"
            onClick={() => setShowModal(false)}
          ></i>
          <div className="flex w-full justify-center">
            <div>
              <textarea
                cols="100"
                value={userInput?.content}
                className="text-black h-[100px] shadow-lg resize-none py-[10px] px-[15px] text-sm border-none outline-none w-[100%]"
                placeholder="What's happening?"
                onChange={(e) =>
                  setUserInput({ ...userInput, content: e.target.value })
                }
              ></textarea>

              {image && (
                <div className="relative">
                  <i
                    onClick={() => {
                      setImage(null);
                      setUserInput({ ...userInput, imageUrl: "" });
                    }}
                    className="fa-solid fa-circle-xmark cursor-pointer absolute right-[10px] top-[10px] text-lg hover:text-primary-color xs:right-[50px]"
                  ></i>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="m-auto w-[200px] xs:w-[250px]"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center mr-[55px] mt-[15px]">
            <div>
              <label
                className="relative"
                onClick={() => setShowEmoji(!showEmoji)}
              >
                <i
                  className="fa-regular fa-face-smile fa-xl cursor-pointer"
                  style={{ color: "#377dff" }}
                ></i>
              </label>
              {showEmoji && (
                <div
                  className="z-20 absolute top-[100%]"
                  onClick={() => setShowEmoji(true)}
                >
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
      </div>
    </Modal>
  );
};
//py-[15px] w-[700px] m-auto pl-[90px] relative lg:w-[500px] xs:w-[370px] xs:pl-[20px]
