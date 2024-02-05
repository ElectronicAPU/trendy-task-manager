"use client";
import React, { useState, useCallback, useMemo, memo } from "react";
import StartDatePicker from "../datepickers/start-date-picker";
import EndDatePicker from "../datepickers/end-date-picker";
import PrioritySelection from "../selects/priority-selection";
import { Input } from "@nextui-org/react";
import StatusSelctions from "../selects/status-selections";
import dynamic from "next/dynamic";
import dayjs from "dayjs";

// Import JoditEditor dynamically
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const config = {
  toolbarAdaptive: false,
  buttons: "bold,italic,underline,|,ul,ol,|,outdent,indent,|,link,|,source",
};

const AddTaskForm = () => {
  const [title, setTitle] = useState("");
  const [selectPriority, setSelectPriority] = useState("High");
  const [selectStatus, setSelectStatus] = useState("Starting soon");
  const [description, setDescription] = useState("");

  const [startDateTime, setStartDateTime] = useState(dayjs());
  const [endDateTime, setEndDateTime] = useState(dayjs());

  const setStartDateTimeMemoized = useCallback(
    (newValue) => setStartDateTime(newValue),
    []
  );

  const setEndDateTimeMemoized = useCallback(
    (newValue) => setEndDateTime(newValue),
    []
  );

  const startDateTimeInMilliseconds = useMemo(
    () => startDateTime?.valueOf() || null,
    [startDateTime]
  );
  const endDateTimeInMilliseconds = useMemo(
    () => endDateTime?.valueOf() || null,
    [endDateTime]
  );


  const handleJoditChange = useCallback((newContent) => {
    setDescription(newContent);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold pb-1">Title</h1>
          <Input
            type="text"
            id="titleInput"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            radius="sm"
            variant="bordered"
            placeholder="Enter Title *"
          />
        </div>
        {/* Priority selection */}
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold pb-1">Priority</h1>
          <PrioritySelection
            selectPriority={selectPriority}
            setSelectPriority={setSelectPriority}
          />
        </div>
        {/* Status selection */}
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold pb-1">Status</h1>
          <StatusSelctions
            selectStatus={selectStatus}
            setSelectStatus={setSelectStatus}
          />
        </div>
        {/* Date picker */}
        <div className="flex gap-4">
          <div>
            <h1 className="text-sm font-semibold pb-1">Start Date</h1>
            <div className="-mt-2">
              <StartDatePicker
                startDateTime={startDateTime}
                setStartDateTime={setStartDateTimeMemoized}
              />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-semibold pb-1">End Date</h1>
            <div className="-mt-2">
              <EndDatePicker
                endDateTime={endDateTime}
                setEndDateTime={setEndDateTimeMemoized}
              />
            </div>
          </div>
        </div>
        {/* Descriptions */}
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold pb-1">Descriptions</h1>
          <JoditEditor
            className="min-h-72"
            config={config}
            value={description}
            onChange={handleJoditChange}
          />
        </div>
      </div>
    </>
  );
};

export default AddTaskForm;
