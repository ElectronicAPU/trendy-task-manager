"use client";
import Loader from "@/components/Loader";
import EndDatePicker from "@/components/datepickers/end-date-picker";
import StartDatePicker from "@/components/datepickers/start-date-picker";
import MainLayout from "@/components/layouts/main-layout";
import PrioritySelection from "@/components/selects/priority-selection";
import StatusSelctions from "@/components/selects/status-selections";
import { getTaskById } from "@/services/taskService";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import dayjs from "dayjs";
import { Edit } from "lucide-react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  const [singleTask, setSingleTask] = useState({});
  const [title, setTitle] = useState(singleTask?.title || "");
  const [selectPriority, setSelectPriority] = useState(
    singleTask?.priority || "High"
  );
  const [selectStatus, setSelectStatus] = useState(
    singleTask?.status || "Starting soon"
  );
  const [description, setDescription] = useState(singleTask?.description || "");
  const [loading, setLoading] = useState(true);

  const [formatTime, setFormatTime] = useState();
  const [endDateTime, setEndDateTime] = useState(
    dayjs(singleTask?.enddate || new Date())
  );


  useEffect(() => {
    const handleDateTime = () => {
      const end_date = parseInt(singleTask?.enddate); // Parse as integer

      // If you want to use dayjs for formatting
      // const formattedEndDate = dayjs(end_date).format("YYYY-MM-DD HH:mm:ss");

      if (!isNaN(end_date) && singleTask?.enddate) {
        const formattedEndDate = new Date(end_date).toLocaleDateString(
          undefined,
          {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }
        );
        setFormatTime(formattedEndDate);
        return formattedEndDate;
      }
    };

    handleDateTime();
  }, [singleTask?.enddate, endDateTime]);

  const { taskId } = useParams();

  useEffect(() => {
    const handleTask = async () => {
      try {
        const response = await getTaskById({ taskId });
        if (response.success) {
          setSingleTask(response.data);
          setTitle(response.data.title || "");
          setSelectPriority(response.data.priority || "");
          setSelectStatus(response.data.status || "");
          setDescription(response.data.description || "");
          setEndDateTime(dayjs(Number(response.data.enddate) || new Date()));
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };
    handleTask();
  }, [taskId]);

  const { onClose } = useDisclosure();

  const setEndDateTimeMemoized = useCallback(
    (newValue) => setEndDateTime(newValue),
    [endDateTime]
  );

  const endDateTimeInMilliseconds = useMemo(
    () => endDateTime?.valueOf() || null,
    [endDateTime]
  );

  const handleJoditChange = useCallback((newContent) => {
    setDescription(newContent);
  }, [description]);

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
      enddate: endDateTimeInMilliseconds,
      description,
    };

    console.log(formData);

    // const response = await createTask(formData);

    // if (response.success) {
    //   toast.success(response.message);
    //   // setRefresh(!refresh);
    //   onClose();
    // } else {
    //   toast.error(response.message);
    // }
  };

  return (
    <>
      <MainLayout>
        {loading && <Loader />}
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
                <h1 className="text-sm font-semibold pb-1">Start Date (Fixed)*</h1>
                <div className="h-14 sm:w-72 border border-warning-500 rounded-md flex items-center px-4">
                  <span>{formatTime}</span>
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
