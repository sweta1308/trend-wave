import { useState } from "react";
import { useUser } from "../context/user-context";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { usePost } from "../context/post-context";
import { useAuth } from "../context/auth-context";

export const DisplayPost = ({ userPost }) => {
  const { _id, content, imageUrl, likes, comments, username, createdAt } =
    userPost;
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { getUserPost, likePost, dislikePost } = usePost();
  const { userState } = useUser();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    setUserDetails(userState.find((user) => user.username === username));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const likedByUser = () =>
    userPost?.likes?.likedBy.filter((user) => user._id === authState?.user?._id)
      .length !== 0;

  return (
    <div
      key={_id}
      className="w-[500px] p-5 bg-white my-2 rounded-xl md:w-[350px] xs:w-[320px]"
    >
      <div className="flex items-center justify-between">
        <div
          className="flex cursor-pointer"
          onClick={() => {
            getUserPost(userDetails?.username);
            navigate(`/profile/${username}`);
          }}
        >
          <img
            src={userDetails?.avatarUrl}
            alt="avatar"
            className="w-[40px] h-[40px] mr-2 bg-primary-color rounded-full"
          />
          <div>
            <h1 className="font-bold">{`${userDetails?.firstName} ${userDetails?.lastName}`}</h1>
            <p className="text-xs">{` ${new Date(createdAt)
              .toDateString()
              .split(" ")
              .slice(1, 4)
              .join(" ")}`}</p>
          </div>
        </div>
        <i className="fa-solid fa-ellipsis cursor-pointer"></i>
      </div>
      <div className="cursor-pointer" onClick={() => navigate(`/post/${_id}`)}>
        <p className="pt-5 pb-3">{content}</p>
        {imageUrl && (
          <img
            className="w-[500px] rounded-xl md:w-[350px] xs:w-[280px]"
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

      <div className="my-3 text-[15px] flex justify-between">
        <div
          className="cursor-pointer"
          onClick={() => {
            likedByUser() ? dislikePost(_id) : likePost(_id);
          }}
        >
          {likedByUser() ? (
            <div>
              <i className="fa-solid fa-heart" style={{ color: "#377dff" }}></i>{" "}
              <span className="text-primary-color">Liked</span>
            </div>
          ) : (
            <div>
              <i className="fa-regular fa-heart"></i> <span>Like</span>
            </div>
          )}
        </div>
        <div className="cursor-pointer">
          <i class="fa-regular fa-comment"></i> <span>Comment</span>
        </div>
        <div className="cursor-pointer">
          <i class="fa-regular fa-bookmark"></i> <span>Bookmark</span>
        </div>
      </div>

      <hr />
    </div>
  );
};
