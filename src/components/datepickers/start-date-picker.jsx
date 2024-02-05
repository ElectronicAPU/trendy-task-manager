"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";

export default function StartDatePicker({ startDateTime, setStartDateTime }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimeField"]}>
        <DateTimeField
          // label="Controlled field"
          value={startDateTime}
          onChange={setStartDateTime}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
