"use client";

import reducer from "@/reducers/AuthReducer";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
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
  loginObj: {
    email: "",
    password: "",
  },
  user: null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  // -------------------- Get Current User --------------------
  const getCurrentUser = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING" });

      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        dispatch({ type: "SET_USER", payload: data.user });
      } else {
        dispatch({ type: "CLEAR_USER" });
      }
    } catch (error) {
      dispatch({ type: "CLEAR_USER" });
    }
  }, []);

  // -------------------- Load user from cookie session --------------------
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

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

      if (!res.ok) throw new Error(data.msg || "Error in register");

      if (data.success) {
        toast.success(data.msg || "Account created successfully");
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
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.msg || "Login failed");
        return;
      }

      dispatch({ type: "SET_USER", payload: data.user });

      toast.success(data.msg || "Login successful");

      if (data.user.isAdmin) {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  // -------------------- Logout --------------------
  const logoutUser = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        dispatch({ type: "CLEAR_USER" });
        toast.success(data.msg || "Logged out");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <AuthApp.Provider
      value={{
        state,
        handleRegisterChange,
        registerSubmit,
        handleLoginChange,
        loginSubmit,
        logoutUser,
        getCurrentUser,
      }}
    >
      {children}
    </AuthApp.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthApp);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export { AuthProvider };
export default useAuth;
