import React from "react";
import Tasks from "./tasks";
import { getTestUsers } from "@/services/testUsersService";
import { useSearchParams } from "next/navigation";

const TaskPage = async () => {

  return (
    <>
      <Tasks />
    </>
  );
};

export default TaskPage;
