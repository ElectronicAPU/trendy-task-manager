import formattedDate from "@/utils/dateFormat";
import React from "react";
import NoTasks from "./no-tasks";
import TaskSkeleton from "../skeletons/task-skeleton";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AllTasks = ({ allTasks, loading, refresh, setRefresh }) => {
  const router = useRouter();

  console.log(allTasks);

  const goToTaskPage = (taskId) => {
    if (!taskId) {
      toast.error("Task not found");
      return;
    }

    router.push(`/tasks/${taskId}`);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full">
        <NoTasks refresh={refresh} setRefresh={setRefresh} tasks={allTasks} />
        {loading ? (
          <TaskSkeleton />
        ) : (
          <>
            {allTasks?.map((task) => (
              <Button
                onClick={() => goToTaskPage(task._id)}
                variant="faded"
                color=""
                key={task._id}
                className="w-full h-full p-0 "
              >
                <div className="p-2 w-full h-64 flex flex-col justify-start items-start gap-3">
                  <h1 className="font-bold">
                    Title: <span className="font-semibold">{task.title}</span>
                  </h1>
                  <div className="font-bold">
                    Status: <span className="font-semibold">{task.status}</span>
                  </div>
                  <div className="font-bold">
                    Priority:{" "}
                    <span className="font-semibold">{task.priority}</span>
                  </div>
                  <div className="font-bold">
                    Start Time:{" "}
                    <span className="font-semibold">
                      {formattedDate(task.startdata)}
                    </span>
                  </div>
                  <div className="font-bold">
                    End Time:{" "}
                    <span className="font-semibold">
                      {formattedDate(task.enddate)}
                    </span>
                  </div>
                  <div className="font-bold flex w-full">
                    Descriptions:{" "}
                    <div
                      className="font-semibold"
                      dangerouslySetInnerHTML={{ __html: task.description }}
                    />
                  </div>
                </div>
              </Button>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default AllTasks;
