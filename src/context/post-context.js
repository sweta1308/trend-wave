import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { postReducer } from "../reducer/post-reducer";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "./auth-context";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const initialState = {
    postLoading: false,
    post: [],
  };
  const [postState, postDispatch] = useReducer(postReducer, initialState);
  const { authState } = useAuth();

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

  useEffect(() => {
    if (authState.token) {
      getPostData();
    }
  }, [authState.token]);

  return (
    <PostContext.Provider value={{ postState }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
