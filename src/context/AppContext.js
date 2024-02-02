"use client";
import { loggedInUser } from "@/services/userService";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppContextWrapper = ({ children }) => {
  const [user, setUser] = useState(undefined);

  let sharedState = {
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={sharedState}> {children}</AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
