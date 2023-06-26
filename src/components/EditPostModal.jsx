import { useState } from "react";
import { usePost } from "../context/post-context";

export const EditPost = ({ userPost, setShowEditPostModal }) => {
  const { editPostData } = usePost();
  const [postValue, setPostValue] = useState({
    _id: userPost?._id,
    content: userPost?.content,
    imageUrl: userPost?.imageUrl,
  });

  const editUserPost = () => {
    editPostData(postValue?._id, postValue);
    setShowEditPostModal(false);
  };

  return (
    <div className="bg-white p-[20px] absolute z-10 w-[360px] shadow-lg left-[50px]">
      <h1 className="font-bold text-lg mb-[10px]">EDIT POST</h1>
      {postValue?.content && (
        <textarea
          cols={10}
          value={postValue?.content}
          onChange={(e) =>
            setPostValue({ ...postValue, content: e.target.value })
          }
          className="p-[10px] resize-none border-none outline-none"
        ></textarea>
      )}

      {postValue?.imageUrl && (
        <div className="relative">
          <i
            onClick={() => setPostValue({ ...postValue, imageUrl: "" })}
            className="fa-solid fa-circle-xmark cursor-pointer absolute right-[25px] top-[10px] text-lg hover:text-primary-color"
          ></i>
          <img
            className="w-[300px] m-auto"
            src={postValue?.imageUrl}
            alt="post"
          />
        </div>
      )}

      <div className="my-[20px]">
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
  );
};
