import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from 'react-toastify';
import { authReducer } from "../reducer/auth-reducer";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const localStorageItem = JSON.parse(localStorage.getItem("data"))

  const initialState = {
    user: {},
    token: localStorageItem?.token || "",
  };

  const [authState, authDispatch] = useReducer(authReducer, initialState);

  const userLogin = async (loginData) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        data: loginData,
        url: "/api/auth/login",
      });
      if (status === 200) {
        authDispatch({ type: "SET_USER", payload: data?.foundUser });
        authDispatch({ type: "SET_TOKEN", payload: data?.encodedToken });

        navigate(location?.state?.from?.pathname || "/");
        localStorage.setItem(
          "data",
          JSON.stringify({ user: data?.foundUser, token: data?.encodedToken })
        );
        toast.success("Successfully Logged In!")
      }
    } catch (e) {
      toast.error(e.response.data.errors[0])
    }
  };

  const userSignup = async (signupData) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        data: signupData,
        url: "/api/auth/signup",
      });
      if (status === 201) {
        authDispatch({ type: "SET_USER", payload: data?.createdUser });
        authDispatch({ type: "SET_TOKEN", payload: data?.encodedToken });
        navigate(location?.state?.from?.pathname || "/");
        localStorage.setItem(
          "data",
          JSON.stringify({ user: data?.createdUser, token: data?.encodedToken })
        );
        toast.success("Successfully Logged In!")
      }
    } catch (e) {
      toast.error(e.response.data.errors[0])
    }
  };

  useEffect(() => {
    if(localStorageItem) {
      authDispatch({type: "SET_USER", payload: localStorageItem?.user})
      authDispatch({type: "SET_TOKEN", payload: localStorageItem?.token})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const userLogout = () => {
    authDispatch({ type: "SET_USER", payload: {} });
    authDispatch({ type: "SET_TOKEN", payload: "" });
    localStorage.removeItem("data");
  };

  return (
    <>
      <AuthContext.Provider
        value={{ authState, userLogin, userSignup, userLogout }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
