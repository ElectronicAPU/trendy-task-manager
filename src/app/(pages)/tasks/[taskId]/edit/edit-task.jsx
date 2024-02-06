"use client";
import EndDatePicker from "@/components/datepickers/end-date-picker";
import StartDatePicker from "@/components/datepickers/start-date-picker";
import MainLayout from "@/components/layouts/main-layout";
import PrioritySelection from "@/components/selects/priority-selection";
import StatusSelctions from "@/components/selects/status-selections";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import dayjs from "dayjs";
import { Edit } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

// Import JoditEditor dynamically
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const config = {
  toolbarAdaptive: false,
  buttons: "bold,italic,underline,|,ul,ol,|,outdent,indent,|,link,|,source",
};

const EditTask = () => {
  const [title, setTitle] = useState("");
  const [selectPriority, setSelectPriority] = useState("High");
  const [selectStatus, setSelectStatus] = useState("Starting soon");
  const [description, setDescription] = useState("");

  const [startDateTime, setStartDateTime] = useState(dayjs());
  const [endDateTime, setEndDateTime] = useState(dayjs());

  const { onClose } = useDisclosure();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }

    const formData = {
      title,
      priority: selectPriority,
      status: selectStatus,
      startdate: startDateTimeInMilliseconds,
      enddate: endDateTimeInMilliseconds,
      description,
    };

    const response = await createTask(formData);

    if (response.success) {
      toast.success(response.message);
      // setRefresh(!refresh);
      onClose();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <MainLayout>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-1 py-2 text-xl font-bold mb-4">
            <Edit /> Update Task
          </div>

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
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <h1 className="text-sm font-semibold pb-1">Start Date</h1>
                <div className="-mt-2 text-white">
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
                required
                className="h-full dark:text-black"
                config={config}
                value={description}
                onChange={handleJoditChange}
              />
            </div>
          </div>
          <div className="w-full flex justify-end gap-2 mt-6 ">
            <Button
              radius="sm"
              color="danger"
              variant="light"
              onPress={onClose}
            >
              Cancel
            </Button>
            <Button
              radius="sm"
              color="primary"
              // onPress={onClose}
              type="submit"
            >
              Update
            </Button>
          </div>
        </form>
      </MainLayout>
    </>
  );
};

export default EditTask;
