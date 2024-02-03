"use client";
import { loggedInUser } from "@/services/userService";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppContextWrapper = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleUser = async () => {
      try {
        const result = await loggedInUser();
        if (result.success) {
          setUser(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false);
      }
    };

    handleUser();
  }, []);

  let sharedState = {
    user,
    setUser,
    loading,
    setLoading,
  };

  return (
    <AppContext.Provider value={sharedState}> {children}</AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
