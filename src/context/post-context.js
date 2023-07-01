import { useReducer, useContext, createContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "./auth-context";
import { postReducer } from "../reducer/post-reducer";
import { useNavigate } from "react-router";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const initialState = {
    postLoading: false,
    post: [],
    userPost: [],
    sortBy: "Latest",
  };
  const [postState, postDispatch] = useReducer(postReducer, initialState);
  const { authState } = useAuth();
  const navigate = useNavigate();

  const getPostData = async () => {
    try {
      postDispatch({ type: "POST_LOADING", payload: true });
      const { data, status } = await axios({
        method: "GET",
        url: "/api/posts",
      });
      if (status === 200 || status === 201) {
        postDispatch({ type: "GET_POST", payload: data?.posts });
        postDispatch({ type: "POST_LOADING", payload: false });
      }
    } catch (e) {
      toast.error(e.response.data.errors[0]);
    }
  };

  const createNewPost = async (postData) => {
    try {
      const { data, status } = await axios.post(
        `/api/posts`,
        { postData },
        { headers: { authorization: authState?.token } }
      );
      if (status === 201) {
        postDispatch({ type: "GET_POST", payload: data?.posts });
        toast.success("Post created successfully!");
      }
    } catch (e) {
      toast.error(e.response.data.errors[0]);
    }
  };

  const getUserPost = async (username) => {
    try {
      const { data, status } = await axios({
        method: "GET",
        url: `/api/posts/user/${username}`,
      });
      if (status === 200 || status === 201) {
        postDispatch({ type: "USER_POST", payload: data?.posts });
      }
    } catch (e) {
      toast.error(e.response.data.errors[0]);
    }
  };

  const likePost = async (postId) => {
    try {
      const { data, status } = await axios({
        method: "POSt",
        url: `/api/posts/like/${postId}`,
        headers: { authorization: authState?.token },
      });
      if (status === 200 || status === 201) {
        postDispatch({ type: "GET_POST", payload: data?.posts });
        toast.success("Post Liked");
        return data.posts.find((post) => post._id === postId);
      }
    } catch (e) {
      toast.error(e.response.data.errors[0]);
    }
  };

  const dislikePost = async (postId) => {
    try {
      const { data, status } = await axios({
        method: "POSt",
        url: `/api/posts/dislike/${postId}`,
        headers: { authorization: authState?.token },
      });
      if (status === 200 || status === 201) {
        postDispatch({ type: "GET_POST", payload: data?.posts });
        toast.success("Post unliked");
      }
    } catch (e) {
      toast.error(e.response.data.errors[0]);
    }
  };

  const editPostData = async (postId, postData) => {
    try {
      const { data, status } = await axios.post(
        `/api/posts/edit/${postId}`,
        { postData },
        { headers: { authorization: authState?.token } }
      );
      if (status === 201) {
        postDispatch({ type: "GET_POST", payload: data?.posts });
        toast.success("Post edited successfully!");
      }
    } catch (e) {
      toast.error(e.response.data.errors[0]);
    }
  };

  const deletePost = async (postId, fromSinglePost) => {
    try {
      const { data, status } = await axios({
        method: "DELETE",
        url: `/api/posts/${postId}`,
        headers: { authorization: authState?.token },
      });
      if (status === 200 || status === 201) {
        postDispatch({ type: "GET_POST", payload: data?.posts });
        fromSinglePost && navigate("/");
        toast.success("Post deleted!");
      }
    } catch (e) {
      toast.error(e.response.data.errors[0]);
    }
  };

  useEffect(() => {
    if (authState.token) {
      getPostData();
    }
  }, [authState.token]);

  return (
    <PostContext.Provider
      value={{
        postState,
        postDispatch,
        createNewPost,
        getUserPost,
        likePost,
        dislikePost,
        deletePost,
        editPostData,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
