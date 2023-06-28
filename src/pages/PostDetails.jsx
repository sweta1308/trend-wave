import { useState, useEffect } from "react";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate, useParams } from "react-router";
import { Navbar } from "../components/Navbar";
import { Sidenav } from "../components/Sidenav";
import { RightNav } from "../components/RightNav";
import { DisplayPost } from "../components/DisplayPost";
import { useUser } from "../context/user-context";
import { usePost } from "../context/post-context";
import { useComment } from "../context/comment-context";
import { useAuth } from "../context/auth-context";

export const PostDetails = () => {
  document.title = "Trend Wave | Post details";
  const [postDetails, setPostDetails] = useState({});
  const [postLoading, setPostLoading] = useState(false);
  const { postID } = useParams();
  const { authState } = useAuth();
  const { userState } = useUser();
  const navigate = useNavigate();
  const { getUserPost, postState } = usePost();
  const { addComments, deleteComment } = useComment();
  const [commentInput, setCommentInput] = useState("");

  const getPostDetails = async () => {
    try {
      setPostLoading(true);
      const { data, status } = await axios({
        method: "GET",
        url: `/api/posts/${postID}`,
      });
      if (status === 200 || status === 201) {
        setPostDetails(data?.post);
        setPostLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPostDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postState?.post]);

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidenav />
        <div
          key={postDetails._id}
          className="min-h-screen bg-primary-lightest py-5 mx-5 relative left-[15%] w-[65%] flex flex-col items-center rounded-xl lg:left-[30%] lg:w-[65%] md:left-0 md:w-full md:pb-[110px]"
        >
          {postLoading ? (
            <PulseLoader color="var(--primary-color)" size={30} />
          ) : (
            <div>
              <DisplayPost userPost={postDetails} fromSinglePost />
              <div className="mx-auto my-[15px]">
                <input
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Add Comment..."
                  className="w-[505px] border border-gray-400 px-[15px] py-[10px] text-sm rounded-lg lg:w-[405px] md:w-[255px] xs:w-[220px]"
                />
                <button
                  onClick={() => {
                    addComments(postID, commentInput);
                    setCommentInput("");
                  }}
                  className="bg-primary-color ml-[10px] text-white p-[10px] text-sm rounded-lg hover:bg-primary-dark"
                >
                  Comment
                </button>
              </div>

              {postDetails?.comments?.length > 0 ? (
                <div className="my-2 rounded-xl text-[13px]">
                  {postDetails?.comments?.map((comment) => {
                    const userComment = userState?.find(
                      (user) => user?.username === comment?.username
                    );
                    return (
                      <div
                        key={comment?._id}
                        className="bg-white px-5 py-px pt-2 rounded-lg"
                      >
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => {
                            getUserPost(userComment?.username);
                            navigate(`/profile/${userComment?.username}`);
                          }}
                        >
                          <img
                            src={userComment.avatarUrl}
                            alt="avatar"
                            className="w-[40px] h-[40px] mr-2 bg-primary-color rounded-full"
                          />
                          <div>
                            <h1 className="font-bold">{`${userComment?.firstName} ${userComment?.lastName}`}</h1>
                            <p className="text-xs">@{userComment?.username}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="my-2">{comment?.text}</p>
                          {authState?.user?.username ===
                            userComment?.username && (
                            <i
                              onClick={() =>
                                deleteComment(postDetails?._id, comment?._id)
                              }
                              className="fa-solid fa-trash-can cursor-pointer hover:text-primary-color"
                            ></i>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          )}
        </div>
        <RightNav />
      </div>
    </>
  );
};
