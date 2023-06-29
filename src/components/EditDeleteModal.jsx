import { useAuth } from "../context/auth-context";
import { handleCopyLink } from "../utils/handleCopyLink";
import { handleShare } from "../utils/handleShare";

export const EditDeleteModal = ({
  editPost,
  deletePost,
  postId,
  username,
  setIsModalVisible,
}) => {
  const { authState } = useAuth();
  return (
    <div className="text-sm bg-white p-3 w-[150px] shadow-lg absolute right-2 top-12 dark:bg-dark-mode dark:shadow-gray-700">
      <p
        onClick={() => {
          handleCopyLink(postId);
          setIsModalVisible(false);
        }}
        className="my-2 cursor-pointer hover:text-primary-color"
      >
        <i className="fa-solid fa-link"></i> Copy Link
      </p>
      <hr />
      <p
        onClick={() => {
          handleShare(postId);
          setIsModalVisible(false);
        }}
        className="my-2 cursor-pointer hover:text-primary-color"
      >
        <i className="fa-solid fa-share"></i> Share
      </p>
      {authState?.user?.username === username && (
        <div>
          <hr />
          <p
            onClick={editPost}
            className="my-2 cursor-pointer hover:text-primary-color"
          >
            <i className="fa-solid fa-pencil"></i> Edit Post
          </p>
          <hr />
          <p
            className="my-2 cursor-pointer hover:text-red-500"
            onClick={deletePost}
          >
            <i className="fa-solid fa-trash-can"></i> Delete Post
          </p>
        </div>
      )}
    </div>
  );
};
