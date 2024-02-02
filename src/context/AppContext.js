"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppContextWrapper = ({ children }) => {
  const [hello, setHello] = useState("Hello");
  let sharedState = {
    hello,
    setHello,
  };

  return (
    <AppContext.Provider value={sharedState}> {children}</AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
