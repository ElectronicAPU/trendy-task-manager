import React, { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTheme } from "next-themes";

// Define custom theme for light and dark modes
const dark = createTheme({
  palette: {
    mode: "dark", // Set theme mode to dark by default
    primary: {
      main: "#2196f3", // Set primary color
    },
  },
});
const light = createTheme({
  palette: {
    mode: "light", // Set theme mode to dark by default
    primary: {
      main: "#2196f3", // Set primary color
    },
  },
});

export default function StartDatePicker({ startDateTime, setStartDateTime }) {
  const { theme } = useTheme(); 

  return (
    <>
      <ThemeProvider theme={theme === "dark" ? dark : light}>
      {/* Wrap your component with ThemeProvider */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <DateTimePicker value={startDateTime} onChange={setStartDateTime} />
        </DemoContainer>
      </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
