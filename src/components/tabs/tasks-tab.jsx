import { Card, CardBody, Chip, Tab, Tabs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import NoTasks from "../TaskComponents/no-tasks";
import AllTasks from "../TaskComponents/all-tasks";
import { getAllTasks } from "@/services/taskService";
import TaskSkeleton from "../skeletons/task-skeleton";
import { NotebookTabs } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const TasksTab = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useAppContext();

  const getTasks = async () => {
    try {
      if (user) {
        const response = await getAllTasks();
        if (response.length > 0) {
          setAllTasks(response);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, [refresh, user]);

  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          variant="bordered"
          radius="sm"
          color="warning"
        >
          <Tab key="owned" title="Owned Tasks">
            <Card radius="sm" shadow="none">
              <CardBody>
                <div className="flex items-center gap-1 pb-2 font-semibold text-sm">
                  <NotebookTabs className="w-4" />
                  {allTasks?.length === 0 ? (
                    <p>Add your first task</p>
                  ) : (
                    <p>Add more tasks</p>
                  )}
                </div>
                <div className="">
                  <AllTasks
                    loading={loading}
                    allTasks={allTasks}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="company" title="Company Tasks">
            <Card>
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default TasksTab;
