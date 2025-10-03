"use client";

import React, { createContext, useEffect, useState, useContext } from "react";
import { User, AuthContextType } from "../lib/user";
import api from "../api/api";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const isLoggedIn = !!user;

  useEffect(() => {
    console.log("fetching me");
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    console.log("token", token);    
    if (!token) {
      setUser(null);
      return;
    }
    const fetchMe = async () => {
        
      try {
        const res = await api.get("/user/me");
        console.log(res.data);
        const data = res.data as {
          user: Omit<User, "referral_code" | "count" | "house">;
          referral_code?: string;
          count?: number;
          house?: User["house"];
        };
        const mergedUser: User = {
          ...data.user,
          referral_code: data.referral_code,
          count: data.count,
          house: data.house ?? null,
        };
        setUser(mergedUser);
      } catch(e) {
        console.error(e)
        // Interceptor will handle 401; ensure state reflects logged-out
        setUser(null);
      }
    };
    fetchMe();
  }, []);

  const value = {
    user,
    setUser,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
