"use client";

import reducer from "@/reducers/AuthReducer";

const { createContext, useContext, useReducer } = require("react");
import { toast } from "react-toastify";

const AuthApp = createContext();
const initialState = {
  isLoading: false,
  isError: false,
  registerObj: {
    name: "",
    email: "",
    password: "",
    cpassword: "",
  },
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ************* handle Register Change **************

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "HANDLE_REGISTER_CHANGE",
      payload: { name, value },
    });
  };
  //   console.log(state.registerObj);
  // register submit

  const registerSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.registerObj),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error in register");
      }

      if (data.success) {
        toast.success(data.message || "Registered successfully");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <AuthApp value={{ state, handleRegisterChange, registerSubmit }}>
      {children}
    </AuthApp>
  );
};

const useAuth = () => {
  try {
    return useContext(AuthApp);
  } catch (error) {
    if (error) {
      throw new Error(error.message);
    }
  }
};

export { AuthProvider };
export default useAuth;
