"use client";
import { loggedInUser } from "@/services/userService";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppContextWrapper = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const handleUser = async () => {
      try {
        const reuslt = await loggedInUser();
        if (reuslt.success) {
          setUser(reuslt.data);
        }
      } catch (error) {
        // toast.error(error.respose.data.message);
        console.log(error);
      }
    };
    handleUser();
  }, []);

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
