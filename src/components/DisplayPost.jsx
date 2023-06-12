import { useState } from "react";
import { useUser } from "../context/user-context";
import { useEffect } from "react";

export const DisplayPost = ({ userPost }) => {
  const { _id, content, imageUrl, likes, comments, username, createdAt } =
    userPost;

  const { userState } = useUser();
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    setUserDetails(userState.find((user) => user.username === username));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      key={_id}
      className="w-[500px] p-5 bg-white my-2 rounded-xl md:w-[350px] xs:w-[280px]"
    >
      <div className="flex items-center justify-between">
        <div className="flex">
          <img
            src={userDetails?.avatarUrl}
            alt="avatar"
            className="w-[40px] h-[40px] mr-2 bg-primary-color rounded-full"
          />
          <div>
            <h1 className="font-bold">{`${userDetails.firstName} ${userDetails.lastName}`}</h1>
            <p className="text-xs">{` ${new Date(createdAt)
              .toDateString()
              .split(" ")
              .slice(1, 4)
              .join(" ")}`}</p>
          </div>
        </div>
        <i className="fa-solid fa-ellipsis cursor-pointer"></i>
      </div>
      <p className="pt-5 pb-3">{content}</p>
      {imageUrl && (
        <img
          className="w-[500px] rounded-xl md:w-[350px] xs:w-[280px]"
          src={imageUrl}
          alt="uploads"
        />
      )}
      <div className="w-[150px] text-[15px] my-3 text-gray-text flex justify-between">
        <p>{likes.likeCount} Likes</p>
        <p>
          {comments.length > 0 &&
            comments.length +
              `${comments.length === 1 ? " Comment" : " Comments"}`}
        </p>
      </div>

      <hr />

      <div className="my-3 text-[15px] flex justify-between">
        <div className="cursor-pointer">
          <i class="fa-regular fa-heart"></i> <span>Like</span>
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
