import { Modal } from "@mui/material";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";
import { useComment } from "../context/comment-context";

export const EditComment = ({
  commentData,
  setCommentData,
  comment,
  postId,
}) => {
  const { editComment } = useComment();
  const [showEmoji, setShowEmoji] = useState(false);
  const [commentValue, setCommentValue] = useState({
    _id: comment?._id,
    text: comment?.text,
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
  return (
    <Modal
      open={commentData}
      onClose={() => setCommentData(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className="bg-white p-[20px] rounded-lg dark:bg-dark-mode dark:text-white"
        style={{ ...style }}
      >
        <h1 className="font-bold text-lg mb-[5px]">EDIT COMMENT</h1>
        <textarea
          cols={10}
          value={commentValue?.text}
          onChange={(e) =>
            setCommentValue({ ...commentValue, text: e.target.value })
          }
          className="p-[10px] h-[100px] resize-none border-none outline-none dark:bg-dark-mode"
        ></textarea>

        <div className="my-[10px] flex items-center ">
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
                    setCommentValue({
                      ...commentValue,
                      text: commentValue.text + emoji.native,
                    });
                  }}
                />{" "}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              editComment(postId, commentValue?._id, commentValue?.text);
              setCommentData(false);
            }}
            className="bg-primary-color text-white px-[12px] py-[7px] rounded-lg mr-[15px] hover:bg-primary-dark"
          >
            Save
          </button>
          <button
            className="border border-primary-color rounded-lg text-primary-color px-[12px] py-[7px] hover:bg-primary-color hover:text-white"
            onClick={() => setCommentData("")}
          >
            Discard
          </button>
        </div>
      </div>
    </Modal>
  );
};
