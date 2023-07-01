import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { usePost } from "../context/post-context";
import { Modal } from "@mui/material";

export const EditPost = ({ userPost, setShowEditPostModal, editPostModal }) => {
  const { editPostData } = usePost();
  const [showEmoji, setShowEmoji] = useState(false);
  const [postValue, setPostValue] = useState({
    _id: userPost?._id,
    content: userPost?.content,
    imageUrl: userPost?.imageUrl,
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

  const editUserPost = () => {
    editPostData(postValue?._id, postValue);
    setShowEditPostModal(false);
  };

  return (
    <Modal
      open={editPostModal}
      onClose={() => setShowEditPostModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className="bg-white p-[20px] rounded-lg dark:bg-dark-mode dark:text-white"
        style={{ ...style }}
      >
        <h1 className="font-bold text-lg m-[10px]">EDIT POST</h1>
        {postValue?.content && (
          <textarea
            cols={10}
            value={postValue?.content}
            onChange={(e) =>
              setPostValue({ ...postValue, content: e.target.value })
            }
            className="p-[10px] resize-none border-none outline-none dark:bg-dark-mode"
          ></textarea>
        )}

        {postValue?.imageUrl && (
          <div className="relative">
            <i
              onClick={() => setPostValue({ ...postValue, imageUrl: "" })}
              className="fa-solid fa-circle-xmark cursor-pointer absolute right-[25px] top-[10px] text-lg hover:text-primary-color"
            ></i>
            <img
              className="w-[300px] h-[300px] m-auto"
              src={postValue?.imageUrl}
              alt="post"
            />
          </div>
        )}

        <div className="my-[20px] flex items-center ">
          <div>
            <label
              className="relative mr-[15px]"
              onClick={() => setShowEmoji(!showEmoji)}
            >
              <i
                className="fa-regular fa-face-smile fa-xl cursor-pointer"
                style={{ color: "#377dff" }}
              ></i>
            </label>
            {showEmoji && (
              <div
                className="z-20 absolute left-[200px] bottom-0 md:left-0 md:top-[100%]"
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
                    setPostValue({
                      ...postValue,
                      content: postValue.content + emoji.native,
                    });
                  }}
                />{" "}
              </div>
            )}
          </div>
          <button
            onClick={editUserPost}
            className="bg-primary-color text-white px-[12px] py-[7px] rounded-lg mr-[15px] hover:bg-primary-dark"
          >
            Save
          </button>
          <button
            className="border border-primary-color rounded-lg text-primary-color px-[12px] py-[7px] hover:bg-primary-color hover:text-white"
            onClick={() => setShowEditPostModal(false)}
          >
            Discard
          </button>
        </div>
      </div>
    </Modal>
  );
};
