"use client";
import MainLayout from "@/components/layouts/main-layout";
import { getTaskById } from "@/services/taskService";
import { Button, Card, CardBody, CardHeader, Tooltip } from "@nextui-org/react";
import { Edit, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const TaskId = () => {
  const [singleTask, setSingleTask] = useState({});
  const [loading, setLoading] = useState(true);
  const { taskId } = useParams();

  useEffect(() => {
    const handleTask = async () => {
      try {
        const response = await getTaskById({ taskId });
        if (response.success) {
          setSingleTask(response.data);
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
    return () => {
      setLoading(loading);
    };
  }, [taskId]);

  return (
    <>
      <MainLayout>
        <Card radius="sm">
          <CardHeader>
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-1 font-bold text-xl">
                <h1 className="">Title :</h1>
                <div className="bg-gray-100 w-fit px-1 rounded-md flex items-center gap-1 ">
                  <span>{singleTask.title}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Tooltip
                  radius="full"
                  showArrow
                  color="warning"
                  content="Edit Task"
                >
                  <Button
                    size="sm"
                    className="bg-warning-500 border-none"
                    radius="sm"
                    variant="faded"
                    isIconOnly
                  >
                    <Edit className="text-white w-4" />
                  </Button>
                </Tooltip>
                <Tooltip
                  radius="full"
                  showArrow
                  color="danger"
                  content="Delete Task"
                >
                  <Button
                    size="sm"
                    className="bg-danger-500 border-none"
                    radius="sm"
                    variant="faded"
                    isIconOnly
                  >
                    <Trash className="text-white w-4" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex gap-1">
                <h1 className="font-medium">Status :</h1>
                <div className="bg-gray-100 w-fit px-1 rounded-md flex items-center gap-1 font-semibold">
                  <div
                    className={`w-2 h-2  rounded-full ${
                      singleTask.status === "Work in progress"
                        ? "bg-yellow-500"
                        : singleTask.status === "Starting soon"
                        ? "bg-gray-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                  <span>{singleTask.status}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <h1 className="font-medium">Priority :</h1>
                <div className="bg-gray-100 w-fit px-1 rounded-md flex items-center gap-1 font-semibold">
                  <div
                    className={`w-2 h-2  rounded-full ${
                      singleTask.priority === "High"
                        ? "bg-red-500"
                        : singleTask.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                  <span>{singleTask.priority}</span>
                </div>
              </div>
              <div className="h-full">
                <h1 className="font-medium">Description: </h1>
                <div className="border w-full p-1 mt-1 min-h-96 max-h-full overflow-y-auto rounded-md bg-transparent">
                  <div
                    className="text-sm "
                    dangerouslySetInnerHTML={{ __html: singleTask.description }}
                  />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </MainLayout>
    </>
  );
};

export default TaskId;
