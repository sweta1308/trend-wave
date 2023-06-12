import { useReducer, useContext, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import { userReducer } from "../reducer/user-reducer";
import axios from "axios";
import { useAuth } from "./auth-context";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { authState } = useAuth();
  const [userState, userDispatch] = useReducer(userReducer, []);

  const getUserData = async () => {
    try {
      const { data, status } = await axios({
        method: "GET",
        url: "/api/users",
      });
      if (status === 200 || status === 201) {
        userDispatch({ type: "GET_USER", payload: data?.users });
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
      <UserContext.Provider value={{ userState }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export const useUser = () => useContext(UserContext);
