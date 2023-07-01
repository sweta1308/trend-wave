import axios from "axios";
import { useContext, createContext } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "./auth-context";
import { usePost } from "./post-context";

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const { authState } = useAuth();
  const { postDispatch } = usePost();

  const addComments = async (postId, commentData) => {
    try {
      const { data, status } = await axios.post(
        `/api/comments/add/${postId}`,
        { commentData },
        { headers: { authorization: authState?.token } }
      );
      if (status === 201 || status === 200) {
        postDispatch({ type: "GET_POST", payload: data?.posts });
        toast.success("Added comment!");
      }
    } catch (e) {
      toast.error(e.response.data.errors[0]);
    }
  };

  const editComment = async (postId, commentId, commentData) => {
    try {
      const { data, status } = await axios.post(
        `/api/comments/edit/${postId}/${commentId}`,
        { commentData },
        { headers: { authorization: authState?.token } }
      );
      if (status === 201 || status === 200) {
        postDispatch({ type: "GET_POST", payload: data?.posts });
        toast.success("Comment edited!");
      }
    } catch (e) {
      toast.error(e.response.data.errors[0]);
    }
  };

  const deleteComment = async (postId, commentId) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: `/api/comments/delete/${postId}/${commentId}`,
        headers: { authorization: authState?.token },
      });
      if (status === 201 || status === 200) {
        postDispatch({ type: "GET_POST", payload: data?.posts });
        toast.success("Comment removed!");
      }
    } catch (e) {
      toast.error(e.response.data.errors[0]);
    }
  };

  return (
    <CommentContext.Provider
      value={{ addComments, deleteComment, editComment }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComment = () => useContext(CommentContext);
