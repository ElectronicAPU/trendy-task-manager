"use client";
import MainLayout from "@/components/layouts/main-layout";
import DeleteTaskModal from "@/components/modals/delete-task-modal";
import { getTaskById } from "@/services/taskService";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Code,
  Skeleton,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TaskId = () => {
  const [singleTask, setSingleTask] = useState({});
  const [loading, setLoading] = useState(true);

  const { taskId } = useParams();
  const router = useRouter();
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

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
  }, [taskId]);

  const handleEditRoute = () => {
    router.push(`/tasks/${taskId}/edit`);
  };

  const handleOpenModal = () => {
    onOpen();
  };

  return (
    <>
      {isOpen && (
        <DeleteTaskModal onOpenChange={onOpenChange} isOpen={isOpen} />
      )}
      <MainLayout>
        <Card radius="sm">
          <CardHeader>
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-1">
                <h1 className="font-bold text-sm sm:text-xl">Title :</h1>
                {loading ? (
                  <Skeleton className="w-32 rounded-md">
                    <div className="h-7 w-32 rounded-md bg-default-300"></div>
                  </Skeleton>
                ) : (
                  <Code className=" w-fit px-1 py-0.5 text-sm sm:text-xl font-bold ">
                    <span>{singleTask?.title}</span>
                  </Code>
                )}
              </div>
              <div className="flex gap-2">
                <Tooltip
                  radius="full"
                  showArrow
                  color="warning"
                  content="Edit Task"
                >
                  <Button
                    onClick={handleEditRoute}
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
                    onClick={handleOpenModal}
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
              <div className="flex items-center gap-1">
                <h1 className="font-medium">Status :</h1>
                {loading ? (
                  <Skeleton className="w-28 rounded-md">
                    <div className="h-5 w-28 rounded-md bg-default-300"></div>
                  </Skeleton>
                ) : (
                  <>
                    <Code className=" w-fit px-1 py-0.5 rounded-md flex items-center gap-1 font-semibold">
                      <div
                        className={`w-2 h-2  rounded-full ${
                          singleTask?.status === "Work in progress"
                            ? "bg-yellow-500"
                            : singleTask?.status === "Starting soon"
                            ? "bg-gray-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <span>{singleTask?.status}</span>
                    </Code>
                    <Link
                      href={`/tasks/${taskId}/edit`}
                      className="text-xs underline flex items-center text-blue-600 hover:text-blue-500 gap-1"
                    >
                      update <Edit className="w-3" />
                    </Link>
                  </>
                )}
              </div>
              <div className="flex items-center gap-1">
                <h1 className="font-medium">Priority :</h1>
                {loading ? (
                  <Skeleton className="w-28 rounded-md">
                    <div className="h-5 w-28 rounded-md bg-default-300"></div>
                  </Skeleton>
                ) : (
                  <>
                    <Code className=" w-fit px-1 py-0.5 rounded-md flex items-center gap-1 font-semibold">
                      <div
                        className={`w-2 h-2  rounded-full ${
                          singleTask?.priority === "High"
                            ? "bg-red-500"
                            : singleTask?.priority === "Medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <span>{singleTask?.priority}</span>
                    </Code>
                    <Link
                      href={`/tasks/${taskId}/edit`}
                      className="text-xs underline flex items-center text-blue-600 hover:text-blue-500 gap-1"
                    >
                      update <Edit className="w-3" />
                    </Link>
                  </>
                )}
              </div>
              <div className="h-full">
                <h1 className="font-medium">Description: </h1>
                {loading ? (
                  <Skeleton className="w-full rounded-md">
                    <div className="h-96 w-full rounded-md bg-default-300"></div>
                  </Skeleton>
                ) : (
                  <Code className=" w-full p-1 mt-1 min-h-96 max-h-full overflow-y-auto rounded-md">
                    <div
                      className="text-sm "
                      dangerouslySetInnerHTML={{
                        __html: singleTask?.description,
                      }}
                    />
                  </Code>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </MainLayout>
    </>
  );
};

export default TaskId;
