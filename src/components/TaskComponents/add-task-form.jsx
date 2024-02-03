import React, { useState } from "react";
import StartDatePicker from "../datepickers/start-date-picker";
import { StyledEngineProvider } from '@mui/material/styles';

const AddTaskForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState("");

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold pb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter Title *"
              className="border outline-none h-10 rounded-md px-2 text-sm font-semibold placeholder:text-sm placeholder:font-normal"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold pb-1">Priority</label>
         
              <StartDatePicker />
           
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTaskForm;
