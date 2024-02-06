"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }) {
  return (
    <>
      <ThemeProvider defaultTheme="light" attribute="class">
        <NextUIProvider>
          {children}
          <ToastContainer />
        </NextUIProvider>
      </ThemeProvider>
    </>
  );
}
