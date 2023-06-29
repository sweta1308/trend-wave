import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../context/user-context";
import { usePost } from "../context/post-context";
import { useAuth } from "../context/auth-context";
import { useBookmark } from "../context/bookmark-context";
import { EditDeleteModal } from "./EditDeleteModal";
import { EditPost } from "./EditPostModal";
import { getPostDate } from "../utils/getPostDate";
import { handleShare } from "../utils/handleShare";

export const DisplayPost = ({ userPost, fromSinglePost }) => {
  const { _id, content, imageUrl, likes, comments, username, createdAt } =
    userPost;
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { likePost, dislikePost, deletePost } = usePost();
  const { userState } = useUser();
  const { addBookmarkData, bookmarkState, removeBookmark } = useBookmark();
  const [userDetails, setUserDetails] = useState({});
  const [isModalvisible, setIsModalVisible] = useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);

  useEffect(() => {
    setUserDetails(userState.find((user) => user.username === username));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, userState]);

  const likedByUser = () =>
    userPost?.likes?.likedBy.filter((user) => user._id === authState?.user?._id)
      .length !== 0;

  const toggleLikeHandler = () => {
    if (likedByUser()) {
      dislikePost(_id);
    } else {
      likePost(_id);
    }
  };

  const bookmarkedByUser = () =>
    bookmarkState?.bookmark?.filter((postId) => postId === _id)?.length !== 0;

  return (
    <div className="relative">
      {showEditPostModal && (
        <EditPost
          userPost={userPost}
          setShowEditPostModal={setShowEditPostModal}
          editPostModal={showEditPostModal}
        />
      )}
      <div
        style={{ filter: showEditPostModal ? "blur(10px)" : "" }}
        key={_id}
        className="bg-white w-[600px] m-auto relative p-5 my-2 rounded-xl lg:w-[500px] md:w-[350px] xs:w-[300px] dark:bg-dark-mode"
      >
        <div className="flex items-center justify-between">
          <div
            className="flex cursor-pointer"
            onClick={() => navigate(`/profile/${username}`)}
          >
            <img
              src={userDetails?.avatarUrl}
              alt="avatar"
              className="w-[40px] h-[40px] mr-2 bg-primary-color rounded-full"
            />
            <div>
              <h1 className="font-bold">{`${userDetails?.firstName} ${userDetails?.lastName}`}</h1>
              <p className="text-xs">{` ${getPostDate(createdAt)}`}</p>
            </div>
          </div>
          <i
            onClick={() => setIsModalVisible((prev) => !prev)}
            className="fa-solid fa-ellipsis cursor-pointer"
          ></i>
        </div>

        {isModalvisible && userPost ? (
          <EditDeleteModal
            deletePost={() => {
              deletePost(_id, fromSinglePost);
              setIsModalVisible(false);
            }}
            editPost={() => {
              setShowEditPostModal(true);
              setIsModalVisible(false);
            }}
            username={username}
            postId={_id}
            setIsModalVisible={setIsModalVisible}
          />
        ) : null}

        <div
          className="cursor-pointer"
          onClick={() => navigate(`/post/${_id}`)}
        >
          <p className="pt-5 pb-3">{content}</p>
          {imageUrl && (
            <img
              className="w-[600px] rounded-xl md:w-[350px] xs:w-[280px]"
              src={imageUrl}
              alt="uploads"
            />
          )}
        </div>

        <div className="w-[150px] text-[15px] my-3 text-gray-text flex justify-between">
          <p>{likes?.likeCount} Likes</p>
          <p>
            {comments?.length > 0 &&
              comments?.length +
                `${comments?.length === 1 ? " Comment" : " Comments"}`}
          </p>
        </div>

        <hr />

        <div className="my-3 text-[15px] flex justify-between xs:text-[13px]">
          <div className="cursor-pointer" onClick={toggleLikeHandler}>
            {likedByUser() ? (
              <div>
                <i
                  className="fa-solid fa-heart"
                  style={{ color: "#377dff" }}
                ></i>{" "}
                <span className="text-primary-color">Liked</span>
              </div>
            ) : (
              <div>
                <i className="fa-regular fa-heart"></i> <span>Like</span>
              </div>
            )}
          </div>

          <div
            className="cursor-pointer"
            onClick={() => navigate(`/post/${_id}`)}
          >
            <i className="fa-regular fa-comment"></i> <span>Comment</span>
          </div>

          {bookmarkedByUser() ? (
            <div className="cursor-pointer" onClick={() => removeBookmark(_id)}>
              <i className="fa-solid fa-bookmark"></i> <span>Bookmarked</span>
            </div>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => addBookmarkData(_id)}
            >
              <i className="fa-regular fa-bookmark"></i> <span>Bookmark</span>
            </div>
          )}

          <div className="cursor-pointer">
            <i
              onClick={() => handleShare(_id)}
              className="fa-solid fa-share-from-square"
            ></i>
          </div>
        </div>

        <hr />
      </div>
    </div>
  );
};
