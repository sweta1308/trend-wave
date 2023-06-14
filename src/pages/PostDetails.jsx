import { useState } from "react";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Sidenav } from "../components/Sidenav";
import { RightNav } from "../components/RightNav";
import { DisplayPost } from "../components/DisplayPost";
import { useUser } from "../context/user-context";
import { usePost } from "../context/post-context";

export const PostDetails = () => {
  document.title = "Trend Wave | Post details";
  const [postDetails, setPostDetails] = useState({});
  const [postLoading, setPostLoading] = useState(false);
  const { postID } = useParams();
  const { userState } = useUser();
  const navigate = useNavigate();
  const { getUserPost } = usePost();

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
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidenav />
        <div
          key={postDetails._id}
          className="py-5 mx-5 relative left-[15%] w-[65%] flex flex-col items-center bg-primary-lightest rounded-xl lg:left-[30%] lg:w-[65%] md:left-0 md:w-full md:pb-[110px]"
        >
          {postLoading ? (
            <PulseLoader color="var(--primary-color)" size={30} />
          ) : (
            <div>
              <DisplayPost userPost={postDetails} />
              {postDetails?.comments?.length > 0 ? (
                <div className="my-2 rounded-xl text-[13px]">
                  {postDetails?.comments?.map((comment) => {
                    const userComment = userState?.find(
                      (user) => user?.username === comment?.username
                    );
                    return (
                      <div
                        key={comment?._id}
                        className="bg-white px-5 py-px pt-2"
                      >
                        <div
                          className="flex cursor-pointer"
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
                        <p className="my-2">{comment?.text}</p>
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
