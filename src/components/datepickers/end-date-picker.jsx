"use client";
import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useTheme } from "next-themes";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

export default function EndDatePicker({ endDateTime, setEndDateTime }) {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme === "dark" ? dark : light}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <DateTimePicker
            // label="Controlled field"
            value={endDateTime}
            onChange={setEndDateTime}
          />
        </DemoContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
