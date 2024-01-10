// /BLOG/BLOG/client/src/context/authContext.js

import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await axiosInstance.post("/auth/login", inputs);
      setCurrentUser(res.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
