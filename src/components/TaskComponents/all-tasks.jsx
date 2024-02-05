import formattedDate from "@/utils/dateFormat";
import React from "react";
import NoTasks from "./no-tasks";

const AllTasks = ({ allTasks, refresh, setRefresh }) => {
  return (
    <>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full">
        <NoTasks refresh={refresh} setRefresh={setRefresh} tasks={allTasks} />
        {allTasks?.map((task) => (
          <div key={task._id} className="border rounded-lg p-2 w-full h-64">
            <h1>{task.title}</h1>
            <div>{task.status}</div>
            <div>{task.priority}</div>
            <div>{formattedDate(task.startdata)}</div>
            <div>{formattedDate(task.enddate)}</div>
            <div dangerouslySetInnerHTML={{ __html: task.description }} />
          </div>
        ))}
      </div>
    </>
  );
};

export default AllTasks;
