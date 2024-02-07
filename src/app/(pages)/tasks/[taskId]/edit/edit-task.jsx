"use client";
import Loader from "@/components/Loader";
import EndDatePicker from "@/components/datepickers/end-date-picker";
import MainLayout from "@/components/layouts/main-layout";
import PrioritySelection from "@/components/selects/priority-selection";
import StatusSelctions from "@/components/selects/status-selections";
import { getTaskById, updateTask } from "@/services/taskService";
import { Button, Input } from "@nextui-org/react";
import dayjs from "dayjs";
import { Edit } from "lucide-react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const config = {
  toolbarAdaptive: false,
  buttons: "bold,italic,underline,|,ul,ol,|,outdent,indent,|,link,|,source",
};

const EditTask = () => {
  const { taskId } = useParams();
  const router = useRouter()

  const [loading, setLoading] = useState(true);
  const [singleTask, setSingleTask] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    priority: "High",
    status: "Starting soon",
    description: "",
    endDateTime: dayjs(),
  });
  const [formatTime, setFormatTime] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTaskById({ taskId });
        if (response.success) {
          setSingleTask(response.data);
          setFormData({
            title: response.data.title || "",
            priority: response.data.priority || "High",
            status: response.data.status || "Starting soon",
            description: response.data.description || "",
            endDateTime: dayjs(Number(response.data.enddate) || new Date()),
          });
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [taskId]);

  const setEndDateTimeMemoized = useCallback((newValue) => {
    setFormData((prevData) => ({ ...prevData, endDateTime: newValue }));
  }, []);

  useEffect(() => {
    if (singleTask.enddate) {
      setFormatTime(
        new Date(parseInt(singleTask.enddate)).toLocaleDateString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }
  }, [singleTask.enddate]);

  const handleJoditChange = useCallback((newContent) => {
    setFormData((prevData) => ({ ...prevData, description: newContent }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const _formData = {
        title: formData.title,
        priority: formData.priority,
        status: formData.status,
        enddate: formData.endDateTime.valueOf(), // Convert to milliseconds
        description: formData.description,
      };

      const singleTaskDataToCompare = {
        title: singleTask.title,
        priority: singleTask.priority,
        status: singleTask.status,
        enddate: Number(singleTask.enddate), // Convert to number
        description: singleTask.description,
      };

      if (
        JSON.stringify(_formData) === JSON.stringify(singleTaskDataToCompare)
      ) {
        toast.error("Please provide updated data");
        return;
      } else {
        const response = await updateTask(_formData, taskId);

        if (response.success) {
          toast.success(response.message);
          router.push('/')
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
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
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold pb-1">Title</h1>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    title: e.target.value,
                  }))
                }
                required
                radius="sm"
                variant="bordered"
                placeholder="Enter Title *"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold pb-1">Priority</h1>
              <PrioritySelection
                selectPriority={formData.priority}
                setSelectPriority={(value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    priority: value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold pb-1">Status</h1>
              <StatusSelctions
                selectStatus={formData.status}
                setSelectStatus={(value) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    status: value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <h1 className="text-sm font-semibold pb-1">
                  Start Date (Fixed)*
                </h1>
                <div className="h-14 sm:w-72 border border-warning-500 rounded-md flex items-center px-4">
                  <span>{formatTime}</span>
                </div>
              </div>
              <div>
                <h1 className="text-sm font-semibold pb-1">End Date</h1>
                <div className="-mt-2">
                  <EndDatePicker
                    endDateTime={formData.endDateTime}
                    setEndDateTime={setEndDateTimeMemoized}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold pb-1">Descriptions</h1>
              <JoditEditor
                required
                className="h-full dark:text-black"
                config={config}
                value={formData.description}
                onChange={handleJoditChange}
              />
            </div>
          </div>
          <div className="w-full flex justify-end gap-2 mt-6 ">
            <Button radius="sm" color="danger" variant="light">
              Cancel
            </Button>
            <Button radius="sm" color="primary" type="submit">
              Update
            </Button>
          </div>
        </form>
      </MainLayout>
    </>
  );
};

export default EditTask;
