import { useReducer, useContext, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import { userReducer } from "../reducer/user-reducer";
import axios from "axios";
import { useAuth } from "./auth-context";
import { useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { authState } = useAuth();
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

  useEffect(() => {
    if (authState.token) {
      getUserData();
    }
  }, [authState.token]);

  return (
    <>
      <UserContext.Provider value={{ userState, userLoading }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export const useUser = () => useContext(UserContext);
