import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { bookmarkReducer } from "../reducer/bookmark-reducer";
import axios from "axios";
import { useAuth } from "./auth-context";
import { useEffect } from "react";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const { authState } = useAuth();
  const initialState = {
    isBookmarkLoading: false,
    bookmark: [],
  };
  const [bookmarkState, bookmarkDispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  const getBookmarkData = async () => {
    try {
      bookmarkDispatch({ type: "BOOKMARK_LOADING", payload: true });
      const { data, status } = await axios({
        method: "GET",
        url: "/api/users/bookmark",
        headers: { authorization: authState?.token },
      });
      if (status === 200 || status === 201) {
        bookmarkDispatch({ type: "SET_BOOKMARK", payload: data?.bookmarks });
        bookmarkDispatch({ type: "BOOKMARK_LOADING", payload: false });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addBookmarkData = async (postId) => {
    try {
      bookmarkDispatch({ type: "BOOKMARK_LOADING", payload: true });
      const { data, status } = await axios({
        method: "POST",
        url: `/api/users/bookmark/${postId}`,
        headers: { authorization: authState?.token },
      });
      if (status === 200 || status === 201) {
        bookmarkDispatch({ type: "SET_BOOKMARK", payload: data?.bookmarks });
        bookmarkDispatch({ type: "BOOKMARK_LOADING", payload: false });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeBookmark = async (postId) => {
    try {
      bookmarkDispatch({ type: "BOOKMARK_LOADING", payload: true });
      const { data, status } = await axios({
        method: "POST",
        url: `/api/users/remove-bookmark/${postId}`,
        headers: { authorization: authState?.token },
      });
      if (status === 200 || status === 201) {
        bookmarkDispatch({ type: "SET_BOOKMARK", payload: data?.bookmarks });
        bookmarkDispatch({ type: "BOOKMARK_LOADING", payload: false });
      }
    } catch (e) {
      console.log(e);
    }
  };

  

  useEffect(() => {
    if (authState?.token) {
      getBookmarkData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState?.token]);

  return (
    <BookmarkContext.Provider value={{ bookmarkState, addBookmarkData, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => useContext(BookmarkContext);
