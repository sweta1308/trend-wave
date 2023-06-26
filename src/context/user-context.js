import {
  useReducer,
  useContext,
  createContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { userReducer } from "../reducer/user-reducer";
import { useAuth } from "./auth-context";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { authState, authDispatch } = useAuth();
  const [userState, userDispatch] = useReducer(userReducer, []);
  const [userLoading, setUserLoading] = useState(false);

  const getUserData = async () => {
    try {
      setUserLoading(true);
      const { data, status } = await axios({
        method: "GET",
        url: "/api/users",
      });
      if (status === 200 || status === 201) {
        userDispatch({ type: "GET_USER", payload: data?.users });
        setUserLoading(false);
      }
    } catch (e) {
      toast.error(e.response.data.errors[0]);
    }
  };

  const followUser = async (userId) => {
    try {
      const { data, status } = await axios.post(
        `/api/users/follow/${userId}`,
        {},
        { headers: { authorization: authState?.token } }
      );
      if (status === 200 || status === 201) {
        userDispatch({ type: "UPDATE_USER", payload: data?.followUser });
        userDispatch({ type: "UPDATE_USER", payload: data?.user });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const unfollowUser = async (userId) => {
    try {
      const { data, status } = await axios.post(
        `/api/users/unfollow/${userId}`,
        {},
        { headers: { authorization: authState?.token } }
      );
      if (status === 200 || status === 201) {
        userDispatch({ type: "UPDATE_USER", payload: data?.followUser });
        userDispatch({ type: "UPDATE_USER", payload: data?.user });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editUserdata = async (userData) => {
    try {
      const { data, status } = await axios.post(
        "/api/users/edit",
        { userData },
        { headers: { authorization: authState?.token } }
      );
      if (status === 201) {
        userDispatch({ type: "UPDATE_USER", payload: data?.user });
        authDispatch({ type: "SET_USER", payload: data?.user });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          userState,
          userLoading,
          followUser,
          unfollowUser,
          editUserdata,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};

export const useUser = () => useContext(UserContext);
