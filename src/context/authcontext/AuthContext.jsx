"use client";

import reducer from "@/reducers/AuthReducer";
import { useRouter } from "next/navigation";
import { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";

// -------------------- Context & Initial State --------------------
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
  loginObj: {
    email: "",
    password: "",
  },
  user: {
    token: "",
    user: null,
  },
};

// -------------------- Provider Component --------------------
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      console.log("prased", parsed);
      dispatch({ type: "SET_USER", payload: parsed });
    }
  }, []);

  // -------------------- Handle Register Change --------------------
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "HANDLE_REGISTER_CHANGE",
      payload: { name, value },
    });
  };

  // -------------------- Register Submit --------------------
  const registerSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state.registerObj),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error in register");

      if (data.success) {
        toast.success(data.message || "Account created successfully");
        router.push("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // -------------------- Handle Login Change --------------------
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "HANDLE_LOGIN_CHANGE",
      payload: { name, value },
    });
  };

  // -------------------- Login Submit --------------------
  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state.loginObj),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.msg || "Login failed");
        return;
      }

      // -------------------- Save user & token --------------------
      const { token, isAdmin, ...user } = data.user ? data.user : data; // adjust if API sends user inside `data.user`

      const authData = { token, ...user };

      localStorage.setItem("auth", JSON.stringify(authData));

      dispatch({ type: "SET_USER", payload: authData });

      toast.success(data.msg || "Login successful");
      router.push("/"); // redirect after login
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  // -------------------- Context Value --------------------
  return (
    <AuthApp.Provider
      value={{
        state,
        handleRegisterChange,
        registerSubmit,
        handleLoginChange,
        loginSubmit,
      }}
    >
      {children}
    </AuthApp.Provider>
  );
};

// -------------------- Hook --------------------
const useAuth = () => {
  try {
    return useContext(AuthApp);
  } catch (error) {
    throw new Error(error.message);
  }
};

export { AuthProvider };
export default useAuth;
