import { useState } from "react";

export const EditPost = ({ userPost, setShowEditPostModal }) => {
  const [postValue, setPostValue] = useState({
    content: userPost?.content,
    imageUrl: userPost?.imageUrl,
  });
  return (
    <div>
      <h1>EDIT POST</h1>
      <textarea
        value={postValue?.content}
        onChange={(e) =>
          setPostValue({ ...postValue, content: e.target.value })
        }
      ></textarea>
      <i className="fa-solid fa-circle-xmark cursor-pointer text-lg hover:text-primary-color"></i>
      <img src={postValue?.imageUrl} alt="post" />

      <div>
        <button>Save</button>
        <button onClick={() => setShowEditPostModal(false)}>Discard</button>
      </div>
    </div>
  );
};
