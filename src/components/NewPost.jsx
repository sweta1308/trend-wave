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
      <div className="bg-white dark:bg-dark-mode">
        <div
          style={{ ...style }}
          className="bg-white w-[400px] xs:w-[320px] z-40 p-[20px] rounded-lg dark:bg-dark-mode"
        >
          <i
            className="fa-solid fa-xmark absolute right-[20px] cursor-pointer hover:text-primary-color dark:text-white"
            onClick={() => setShowModal(false)}
          ></i>
          <div className="flex w-full justify-center">
            <div>
              <textarea
                cols="100"
                value={userInput?.content}
                className="text-black mt-[15px] w-[350px] xs:w-[280px] h-[150px] shadow-lg resize-none py-[10px] px-[15px] text-sm border-none outline-none dark:bg-dark-mode dark:shadow-gray-700 dark:text-white"
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
                setShowModal(false);
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
